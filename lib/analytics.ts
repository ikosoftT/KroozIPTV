export function trackEvent(name: string, properties: Record<string, string>) {
  if (typeof window === 'undefined') return;
  // An optional analytics adapter can consume this event. No identifiers or message text are included.
  window.dispatchEvent(new CustomEvent('krooz:analytics', { detail: { name, properties } }));
}
