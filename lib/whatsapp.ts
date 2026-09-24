import { siteConfig } from './config';
export function buildWhatsAppUrl({ message }: { message: string; plan?: string; source?: string }) {
  const number = siteConfig.whatsapp.replace(/[\s()+-]/g, '');
  return /^[1-9]\d{6,14}$/.test(number)
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : null;
}
export const trialMessage =
  'Hi KroozIPTV, I would like to request a free IPTV trial. Please confirm availability and trial terms.';
