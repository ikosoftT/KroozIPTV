import nextEnv from '@next/env';
nextEnv.loadEnvConfig(process.cwd());
const errors = [];
const url = process.env.NEXT_PUBLIC_SITE_URL;
try {
  const parsed = new URL(url);
  if (
    parsed.protocol !== 'https:' ||
    ['localhost', 'example.com', '127.0.0.1'].includes(parsed.hostname)
  )
    errors.push('Set NEXT_PUBLIC_SITE_URL to the final HTTPS production origin.');
} catch {
  errors.push('Set a valid NEXT_PUBLIC_SITE_URL.');
}
const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/[\s()+-]/g, '');
if (!/^[1-9]\d{6,14}$/.test(number)) errors.push('Set a valid international WhatsApp number.');
if (process.env.OWNER_CONTENT_VERIFIED !== 'true')
  errors.push(
    'Owner review is outstanding: legal identity, privacy/hosting practices, refund conditions, package availability/rights, trial terms, connection limits, and activation process. After review, update copy and set OWNER_CONTENT_VERIFIED=true.',
  );
if (errors.length) {
  console.error('Launch configuration needs attention:\n' + errors.map((e) => `- ${e}`).join('\n'));
  process.exitCode = 1;
} else
  console.log(
    'Launch configuration checks passed. Verify production redirects, WhatsApp recipient, and live HTTP responses after deployment.',
  );
