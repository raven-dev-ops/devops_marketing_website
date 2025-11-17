import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { json } from 'express';
import { nanoid } from 'nanoid';
import { findRelevantAnswer } from './knowledgeBase.js';
import { handleSchedulingMessage } from './scheduling.js';
import { generateReply } from './modelRunner.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5050;
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  }),
);

app.use(json());

// In-memory session and user metadata store (per server process)
const sessions = new Map();
const userMeta = new Map();

// Health endpoint for basic checks
app.get('/health', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

// Create a new chat session
app.post('/sessions', (req, res) => {
  const { chatUserId } = req.body || {};
  const sessionId = nanoid();

  sessions.set(sessionId, {
    id: sessionId,
    chatUserId: chatUserId || null,
    createdAt: Date.now(),
    messages: [],
    state: {},
  });

  res.json({ sessionId });
});

// End a chat session and clear its data
app.post('/sessions/:id/end', (req, res) => {
  const { id } = req.params;
  sessions.delete(id);
  res.json({ ok: true });
});

// Main chat endpoint
app.post('/chat', async (req, res) => {
  const { sessionId, chatUserId, message } = req.body || {};

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Missing message.' });
  }

  let session = sessionId ? sessions.get(sessionId) : null;

  if (!session) {
    const newId = nanoid();
    session = {
      id: newId,
      chatUserId: chatUserId || null,
      createdAt: Date.now(),
      messages: [],
      state: {},
    };
    sessions.set(newId, session);
  }

  if (!session.chatUserId && chatUserId) {
    session.chatUserId = chatUserId;
  }

  session.messages.push({ role: 'user', text: message, at: Date.now() });

  // Pull any stored metadata for this user (contact info, last booking, etc.)
  const meta = session.chatUserId ? userMeta.get(session.chatUserId) : null;
  if (meta && meta.contact && !session.state.contact) {
    session.state.contact = meta.contact;
  }

  // Handle follow-up after a returning-user greeting ("about that booking" vs "something else")
  if (session.state.returnGreetingSent && !session.state.returnGreetingHandled && meta && meta.lastBooking) {
    const lower = message.toLowerCase();
    let reply;

    if (lower.includes('something else') || lower.includes('other')) {
      reply = 'No problem — what else can I help you with today?';
      session.state.returnGreetingHandled = 'other';
    } else if (
      lower.includes('booking') ||
      lower.includes('appointment') ||
      lower.includes('call') ||
      lower.includes('yes')
    ) {
      reply =
        'Got it — what would you like to change or ask about that booking? For specifics on rescheduling or details, you can also refer to the Calendly confirmation email.';
      session.state.returnGreetingHandled = 'booking';
    }

    if (reply) {
      session.messages.push({ role: 'bot', text: reply, at: Date.now() });
      return res.json({
        sessionId: session.id,
        reply,
        source: 'returning-user-followup',
      });
    }
  }

  // Check for returning-user greeting based on recent booking metadata.
  const hasMessages = session.messages.length > 0;
  if (
    meta &&
    meta.lastBooking &&
    !session.state.returnGreetingSent &&
    hasMessages &&
    session.messages.length === 1
  ) {
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    if (now - meta.lastBooking.createdAt <= thirtyDaysMs) {
      const when = new Date(meta.lastBooking.dateTime || meta.lastBooking.createdAt);
      const whenLabel = when.toLocaleString([], {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
      const eventName = meta.lastBooking.eventTypeName || 'your recent booking';
      const reply = `Welcome back! I see you have ${eventName} on ${whenLabel}. Is your question about that booking, or something else?`;

      session.state.returnGreetingSent = true;
      session.messages.push({ role: 'bot', text: reply, at: Date.now() });

      return res.json({
        sessionId: session.id,
        reply,
        source: 'returning-user',
      });
    }
  }

  // 1) Try static knowledge base lookup
  const kbAnswer = findRelevantAnswer(message);
  if (kbAnswer) {
    const reply = kbAnswer;
    session.messages.push({ role: 'bot', text: reply, at: Date.now() });
    return res.json({ sessionId: session.id, reply, source: 'knowledge-base' });
  }

  // 2) Try scheduling / Calendly-related handling
  const schedulingResult = await handleSchedulingMessage(session, message);
  if (schedulingResult && schedulingResult.reply) {
    session.state = schedulingResult.state || session.state;

    // If a booking was created, persist minimal metadata per user for future greetings.
    if (schedulingResult.booking && session.chatUserId) {
      const existing = userMeta.get(session.chatUserId) || {};
      userMeta.set(session.chatUserId, {
        ...existing,
        lastBooking: schedulingResult.booking,
      });
    }
    session.messages.push({ role: 'bot', text: schedulingResult.reply, at: Date.now() });
    return res.json({
      sessionId: session.id,
      reply: schedulingResult.reply,
      source: schedulingResult.source || 'scheduling',
    });
  }

  // 3) Fallback: call local model runner abstraction (no external API)
  const aiReply = await generateReply(session.messages);

  session.messages.push({ role: 'bot', text: aiReply, at: Date.now() });

  return res.json({
    sessionId: session.id,
    reply: aiReply,
    source: 'local-model',
  });
});

// Link contact form details to a chat_user_id for reuse in chat
app.post('/contact-link', (req, res) => {
  const { chatUserId, name, email, phone } = req.body || {};
  if (!chatUserId) {
    return res.status(400).json({ error: 'chatUserId is required.' });
  }

  const existing = userMeta.get(chatUserId) || {};
  userMeta.set(chatUserId, {
    ...existing,
    contact: {
      name: name || existing.contact?.name || null,
      email: email || existing.contact?.email || null,
      phone: phone || existing.contact?.phone || null,
      updatedAt: Date.now(),
    },
  });

  return res.json({ ok: true });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`OpenAuxilium-style server listening on port ${port}`);
});
