import knowledgeBase from '../../OpenAuxilium/src/data/knowledgeBase.json';
import { logTelemetry } from './telemetry';

const entries = Array.isArray(knowledgeBase?.entries) ? knowledgeBase.entries : [];

const normalize = (text) =>
  (text || '')
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

const buildEcho = (words, max = 4) => {
  if (!words.length) return '';
  return words.slice(0, max).join(' ');
};

const isGreeting = (words) =>
  ['hi', 'hey', 'hello', 'yo', 'sup', 'whats', "what's", 'whatsup', 'howdy', 'hiya'].some((g) =>
    words.includes(g)
  );
const isHowAreYou = (words) =>
  words.join(' ').includes('how are you') || words.includes('hru') || words.includes('howdy');
const isQuoteIntent = (words) =>
  ['quote', 'pricing', 'estimate', 'cost', 'budget', 'rates', 'price'].some((w) => words.includes(w));
const projectKeywords = ['project', 'product', 'build', 'plan', 'launch', 'saas', 'app'];
const isProjectIntent = (words) => words.some((w) => projectKeywords.includes(w));
const isOutlineIntent = (words) =>
  ['outline', 'plan', 'steps', 'roadmap'].some((w) => words.includes(w));
const isTimelineIntent = (words) =>
  ['timeline', 'deadline', 'when', 'soon', 'fast', 'rush', 'week', 'month'].some((w) =>
    words.includes(w)
  );
const isDomainIntent = (words) =>
  ['health', 'healthcare', 'medical', 'finance', 'fintech', 'insurance', 'gov', 'government', 'pci'].some(
    (w) => words.includes(w)
  );
const isScheduleIntent = (words) =>
  ['schedule', 'meet', 'meeting', 'call', 'calendly', 'book'].some((w) => words.includes(w));
const hasTimeframe = (text) => /\b(day|week|month|deadline|today|tomorrow|next)\b/i.test(text);
const hasVolume = (text) => /\b\d+k?\b/i.test(text) || /\b(users?|seats?|daily|monthly)\b/i.test(text);

const truncate = (text, max = 140) => {
  if (!text) return '';
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}...`;
};

const firstSentence = (text) => {
  if (!text) return '';
  const parts = text.split(/(?<=[.!?])\s+/);
  return parts[0] || text;
};

const quickPlan = () =>
  'Outline: quick call to lock scope, propose stack, then build and test. Want the Calendly link (https://calendly.com/ravdevops/discovery-meeting)?';

const buildProjectAck = (raw, echo) => {
  const timeframeMention = hasTimeframe(raw) ? ' this week' : '';
  const focus = echo || 'your project';
  return `Got it on ${focus}${timeframeMention}. ${quickPlan()}`;
};

const promptForDetails =
  'Tell me your focus—services, pricing, or your project—and I will suggest the next step. One line on users + timeline helps.';
const pricingFollowups = [
  'Happy to map out starter vs. pro tiers. How many users and calls per day?',
  'I can share ranges if I know users and key integrations. What are you connecting to?',
  'Give me users per month and key integrations so I can outline pricing.',
];
const volumeFollowups = [
  'Sounds like higher usage—want rough ranges or the Calendly link (https://calendly.com/ravdevops/discovery-meeting) to chat?',
  'High volume noted. Should I share ranges or drop the Calendly link (https://calendly.com/ravdevops/discovery-meeting)?',
];
const domainFollowups = [
  'If this touches PII/PCI, I will tailor auth and storage. What data fields do you store?',
  'For regulated data, we can isolate storage and tighten auth. Which users need access?',
];
const insuranceFollowups = [
  'For insurance data, we can keep policy/claims data isolated with strict auth. Which roles need access?',
  'Insurance data often has PII; we can segment storage and logging. What policy/claims fields are in scope?',
];
const financeFollowups = [
  'For finance/PCI, we can isolate payment flows and tighten auth. What payment/account data is stored?',
  'Finance/PCI flows: we can vault sensitive data and add MFA. What data fields and integrations are in scope?',
];
const greetingReplies = [
  'All good here. Want to talk services, pricing, or your project?',
  'Howdy! What are you working on—services, pricing, or your project?',
  'Hi there. Should we dig into services, pricing, or your project?',
];
const followupReplies = [
  'Want a quick outline or a Calendly link to talk live?',
  'Should I share a short plan or send the Calendly link?',
  'Prefer a written outline, or jump on Calendly to chat this week?',
  'I can outline next steps, or send the Calendly link—your pick.',
];
const priceSecondTurn = [
  'For rough ranges: starter tier for light usage, pro tier for heavier. Want those ranges or the Calendly link?',
  'I can share rough ranges now or send the Calendly link to refine live. Which do you prefer?',
];

const scoreEntry = (words, entry) => {
  const fields = [];

  if (entry.question) fields.push(entry.question);
  if (Array.isArray(entry.questions)) fields.push(...entry.questions);
  if (Array.isArray(entry.keywords)) fields.push(...entry.keywords);
  if (Array.isArray(entry.tags)) fields.push(...entry.tags);
  if (entry.title) fields.push(entry.title);

  const haystackWords = new Set(normalize(fields.join(' ')));
  if (!haystackWords.size) return 0;

  return words.reduce((score, w) => score + (haystackWords.has(w) ? 1 : 0), 0);
};

export const getOfflineReply = (message) => {
  const words = normalize(message);
  if (!words.length) return null;
  const echo = buildEcho(words, 4);
  const record = (intent, extra = {}) => logTelemetry('offline_intent', { intent, ...extra });

  if (isHowAreYou(words)) {
    record('how_are_you');
    return 'Doing well and here to help. Want to talk services, pricing, or your project?';
  }
  if (isGreeting(words)) {
    record('greeting');
    return randomChoice(greetingReplies);
  }
  if (isOutlineIntent(words)) {
    record('outline');
    return quickPlan();
  }
  if (isQuoteIntent(words)) {
    record('quote');
    if (hasVolume(message)) {
      record('quote_volume');
      return randomChoice(volumeFollowups);
    }
    return randomChoice(pricingFollowups);
  }
  if (hasVolume(message) && isProjectIntent(words)) {
    record('volume_project');
    return randomChoice(volumeFollowups);
  }
  if (isTimelineIntent(words)) {
    record('timeline');
    return 'Noted on timeline. What is the deadline and the must-have for launch?';
  }
  if (isDomainIntent(words)) {
    record('domain');
    if (hasInsuranceTerms(words)) {
      return randomChoice(insuranceFollowups);
    }
    if (hasFinanceTerms(words)) {
      return randomChoice(financeFollowups);
    }
    return randomChoice(domainFollowups);
  }
  if (isScheduleIntent(words)) {
    record('schedule');
    return 'I can set up a call. Want the Calendly link, or should I share a quick outline first?';
  }
  if (isProjectIntent(words)) {
    record('project');
    return buildProjectAck(message, echo);
  }

  let best = null;
  let bestScore = 0;

  for (const entry of entries) {
    const score = scoreEntry(words, entry);
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }

  if (!best || bestScore < 2) {
    record('low_confidence');
    return promptForDetails;
  }

  if (best.answer) {
    const topic = best.title || best.question || 'this topic';
    const trimmed = truncate(firstSentence(best.answer));
    record('kb_match', { topic, score: bestScore });
    return `For ${topic}: ${trimmed} ${randomChoice(followupReplies)}`;
  }

  record('fallback');
  return promptForDetails;
};
