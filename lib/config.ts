export const siteConfig = {
  name: 'KroozIPTV',
  description:
    'Explore flexible IPTV plans, check entertainment availability, and find practical setup help for your favorite devices.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://krooztvus.us').replace(/\/$/, ''),
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
  locale: 'en_US',
  socialImage: '/images/krooziptv-og.jpg',
  socialImageAlt:
    'KroozIPTV — Live TV, your way. Sports, movies, and entertainment on familiar devices.',
};
export const contentDate = '2026-09-24';
