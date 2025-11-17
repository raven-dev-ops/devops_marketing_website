import fetch from 'node-fetch';

const CALENDLY_PAT = process.env.CALENDLY_PAT;
const CALENDLY_USER_URI = process.env.CALENDLY_USER_URI;
const CALENDLY_DEFAULT_EVENT_TYPE_URI = process.env.CALENDLY_DEFAULT_EVENT_TYPE_URI;

function getAuthHeaders() {
  if (!CALENDLY_PAT) {
    throw new Error('CALENDLY_PAT is not configured in environment.');
  }
  return {
    Authorization: `Bearer ${CALENDLY_PAT}`,
    'Content-Type': 'application/json',
  };
}

export async function listEventTypes() {
  if (!CALENDLY_USER_URI) {
    throw new Error('CALENDLY_USER_URI is not configured.');
  }

  const url = new URL('https://api.calendly.com/event_types');
  url.searchParams.set('user', CALENDLY_USER_URI);

  const res = await fetch(url.toString(), {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Calendly listEventTypes failed: ${res.status} ${text}`);
  }

  const json = await res.json();
  return json.resource || json;
}

export async function getAvailableTimes(eventTypeUri, dateRange) {
  // For simplicity, we defer to Calendly's scheduling API; in a real implementation
  // you would call their availability endpoints. Here we return an empty list if
  // configuration is missing.
  if (!CALENDLY_PAT || !eventTypeUri) {
    return [];
  }

  // Placeholder: this should call Calendly's scheduling/availability API.
  // To keep the implementation safe without full API wiring, we just return [].
  // The scheduling flow can detect this and fall back to asking the user to
  // use the embedded Calendly UI instead.
  return [];
}

export async function createInvitee({ eventTypeUri, name, email, startTime }) {
  if (!CALENDLY_PAT) {
    throw new Error('CALENDLY_PAT is not configured.');
  }
  if (!eventTypeUri) {
    if (!CALENDLY_DEFAULT_EVENT_TYPE_URI) {
      throw new Error('CALENDLY_DEFAULT_EVENT_TYPE_URI is not configured.');
    }
    // eslint-disable-next-line no-param-reassign
    eventTypeUri = CALENDLY_DEFAULT_EVENT_TYPE_URI;
  }

  const body = {
    event_type: eventTypeUri,
    invitee: {
      email,
      name,
    },
    // Note: Calendly's full scheduling API may require additional fields.
    // For now we pass startTime as a custom field if provided.
    custom_fields: startTime
      ? [
          {
            name: 'preferred_start_time',
            value: startTime,
          },
        ]
      : [],
  };

  const res = await fetch('https://api.calendly.com/invitees', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Calendly createInvitee failed: ${res.status} ${text}`);
  }

  const json = await res.json();
  return json.resource || json;
}

