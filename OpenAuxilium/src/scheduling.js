import { sendAppointmentEmail } from './integrations/emailClient.js';

const SCHEDULING_KEYWORDS = ['book', 'schedule', 'appointment', 'meeting', 'call'];
const AVAILABILITY_TEXT =
  'Availability: 1pm-4pm on Monday, Tuesday, Thursday, and Friday, plus federal holidays.';

function detectSchedulingIntent(message) {
  const lower = (message || '').toLowerCase();
  return SCHEDULING_KEYWORDS.some((word) => lower.includes(word));
}

function buildTranscript(messages) {
  const lines = [];
  (messages || []).forEach((m, index) => {
    const when = m.at ? new Date(m.at) : null;
    const whenLabel = when ? when.toISOString() : 'unknown-time';
    const role = m.role || 'unknown';
    lines.push(`${index + 1}. [${whenLabel}] ${role}: ${m.text}`);
  });
  return lines.join('\n');
}

export async function handleSchedulingMessage(session, message) {
  try {
    if (!detectSchedulingIntent(message)) {
      return null;
    }

    const state = session.state || {};

    // Step 1: if we don't yet have a pending scheduling flow, start it.
    if (!state.scheduling) {
      const reply =
        'I can help you schedule a discovery call. I am usually available between 1pm and 4pm on Monday, Tuesday, Thursday, and Friday, plus federal holidays. What day and time in that window works best for you?';
      return {
        state: {
          ...state,
          scheduling: {
            step: 'ask-time',
          },
        },
        reply,
        source: 'scheduling',
      };
    }

    const scheduling = state.scheduling || {};

    // Step 2: capture preferred time text
    if (scheduling.step === 'ask-time') {
      return {
        state: {
          ...state,
          scheduling: {
            ...scheduling,
            preferredTimeText: message,
            step: 'ask-contact',
          },
        },
        reply:
          'Great. To finalize the booking, what name and email should I include for the teammate who will follow up?',
        source: 'scheduling',
      };
    }

    // Step 3: capture name/email and send email
    if (scheduling.step === 'ask-contact') {
      const preferredTime = scheduling.preferredTimeText || 'not provided';
      const contactState = state.contact || {};
      const chatUserId = session.chatUserId || 'unknown';

      const transcript = buildTranscript(session.messages || []);

      const lines = [
        'New appointment request from website chat',
        '',
        AVAILABILITY_TEXT,
        '',
        `Chat user id: ${chatUserId}`,
        `Preferred time window (as described by user): ${preferredTime}`,
        '',
        'User-provided details in final message:',
        message,
        '',
        'Known contact info (if any):',
        `Name: ${contactState.name || 'not provided'}`,
        `Email: ${contactState.email || 'not provided'}`,
        `Phone: ${contactState.phone || 'not provided'}`,
        '',
        '--- Chat transcript ---',
        transcript || '(no messages captured)',
      ];

      const emailText = lines.join('\n');

      // Try to send email; failures are logged but do not break the chat flow.
      try {
        await sendAppointmentEmail({
          text: emailText,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Appointment email failed:', err.message);
      }

      const reply =
        'Thanks - I have sent your appointment request and chat details to support@ravdevops.com. A teammate will follow up by email with options in the 1pm-4pm window.';

      const booking = {
        eventTypeName: 'appointment request',
        dateTime: preferredTime,
        calendlyInviteeUri: null,
        createdAt: Date.now(),
      };

      return {
        state: {
          ...state,
          scheduling: {
            ...scheduling,
            step: 'done',
          },
        },
        reply,
        source: 'scheduling',
        booking,
      };
    }

    return null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Scheduling handler error:', err.message);
    return null;
  }
}

