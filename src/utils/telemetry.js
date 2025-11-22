const shouldDebug = () => {
  try {
    if (typeof window === 'undefined') return false;
    return Boolean(window.__RAVEN_TELEMETRY_DEBUG__) || process.env.NODE_ENV === 'development';
  } catch {
    return false;
  }
};

export const logTelemetry = (event, data = {}) => {
  try {
    if (typeof window === 'undefined') return;
    const entry = { event, data, ts: Date.now() };
    if (Array.isArray(window.__RAVEN_TELEMETRY__)) {
      window.__RAVEN_TELEMETRY__.push(entry);
    } else {
      window.__RAVEN_TELEMETRY__ = [entry];
    }
    if (shouldDebug() && window.console?.debug) {
      window.console.debug('[raven-telemetry]', entry);
    }
  } catch {
    /* no-op */
  }
};
