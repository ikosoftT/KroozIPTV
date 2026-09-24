import type { BlogPost } from '@/lib/types';
import { contentDate } from '@/lib/config';
import { readDocument } from '@/lib/content';
const entries = [
  [
    'what-is-iptv',
    'What Is IPTV? A Complete Beginner’s Guide',
    'Understand how IPTV works, what a player does, which devices to check, and the questions to ask before choosing a subscription.',
    'IPTV Basics',
    'nature',
    'Mountain landscape illustrating the variety of entertainment categories',
    ['iptv-vs-cable-tv', 'best-internet-speed-for-iptv', 'iptv-on-multiple-devices'],
  ],
  [
    'iptv-buffering-fix',
    'IPTV Buffering? Causes and 12 Ways to Fix It',
    'Work through twelve controlled checks for IPTV pauses, from Wi-Fi and Ethernet to app cache, device limits, and source-specific problems.',
    'Troubleshooting',
    'streaming',
    'Illustrated television and phone introducing streaming connection checks',
    ['best-internet-speed-for-iptv', 'iptv-not-working', 'iptv-on-multiple-devices'],
  ],
  [
    'install-iptv-firestick',
    'How to Set Up IPTV on Amazon Fire TV & Fire Stick',
    'Prepare a supported Fire TV player, choose the right login method, test playback, and resolve common remote and connection problems.',
    'Setup Guides',
    'devices',
    'Illustrated television player and phone for device setup guidance',
    ['iptv-smarters-setup', 'iptv-buffering-fix', 'iptv-epg-guide'],
  ],
  [
    'iptv-smart-tv-setup',
    'How to Set Up IPTV on a Smart TV',
    'Compare Samsung, LG, Android TV, and Google TV setup requirements, app stores, account formats, and playback checks.',
    'Setup Guides',
    'devices',
    'Illustrated smart television interface with entertainment categories',
    ['iptv-smarters-setup', 'iptv-epg-guide', 'iptv-not-working'],
  ],
  [
    'iptv-smarters-setup',
    'IPTV Smarters Setup Guide: TV, Firestick, Android & iPhone',
    'Understand legitimate player editions, account and playlist fields, separate app charges, and the steps to diagnose a failed login.',
    'Setup Guides',
    'streaming',
    'Illustrated television player and companion phone',
    ['install-iptv-firestick', 'iptv-smart-tv-setup', 'iptv-not-working'],
  ],
  [
    'best-internet-speed-for-iptv',
    'What Internet Speed Do You Need for IPTV?',
    'Plan bandwidth for SD, HD, Full HD, and 4K, test at the actual screen, and distinguish network capacity from device limitations.',
    'Streaming Tips',
    'network',
    'Illustrated television and phone introducing connection planning',
    ['iptv-buffering-fix', 'iptv-on-multiple-devices', 'iptv-not-working'],
  ],
  [
    'iptv-not-working',
    'IPTV Not Working? A Complete Troubleshooting Guide',
    'Follow a decision tree for app crashes, rejected credentials, blank channels, buffering, missing sound, and guide errors.',
    'Troubleshooting',
    'streaming',
    'Illustrated television player introducing playback troubleshooting',
    ['iptv-buffering-fix', 'iptv-epg-guide', 'iptv-smarters-setup'],
  ],
  [
    'iptv-epg-guide',
    'What Is an IPTV EPG? Your TV Guide, Explained',
    'Learn how program schedules match channels and fix missing listings, refresh failures, and incorrect guide times.',
    'IPTV Basics',
    'guide',
    'Illustrated television interface introducing electronic program guides',
    ['iptv-not-working', 'iptv-on-multiple-devices', 'what-is-iptv'],
  ],
  [
    'iptv-on-multiple-devices',
    'How IPTV Works on Multiple Devices',
    'Separate device compatibility from simultaneous connections and plan a household setup with realistic bandwidth and account permissions.',
    'Devices',
    'network',
    'Illustrated television and phone introducing multiple-screen viewing',
    ['best-internet-speed-for-iptv', 'iptv-buffering-fix', 'iptv-vs-cable-tv'],
  ],
  [
    'iptv-vs-cable-tv',
    'IPTV vs Cable TV: What’s the Difference?',
    'Compare television delivery, equipment, internet dependency, recording, household use, and the full cost before changing services.',
    'IPTV Basics',
    'cinema',
    'Film reels and a projector illustrating movie entertainment',
    ['what-is-iptv', 'iptv-on-multiple-devices', 'best-internet-speed-for-iptv'],
  ],
] as const;
const articleFaqs: Record<string, BlogPost['faqs']> = {
  'what-is-iptv': [
    {
      question: 'Does IPTV mean unlimited channels?',
      answer:
        'No. IPTV describes the delivery method. Content, rights, package contents, and location conditions must be confirmed for the particular service.',
    },
    {
      question: 'Does a player include a subscription?',
      answer:
        'Not necessarily. A player organizes and plays content supplied through an account; its license and the content subscription are separate unless explicitly bundled.',
    },
  ],
  'iptv-buffering-fix': [
    {
      question: 'Will faster internet always fix buffering?',
      answer:
        'No. Source problems, wireless instability, device decoding, and account limits can also interrupt playback. Use controlled comparisons to identify the cause.',
    },
    {
      question: 'Should I factory-reset my TV first?',
      answer:
        'No. Start with stream comparisons, network checks, and a normal restart. A factory reset can erase useful configuration without fixing a source-specific issue.',
    },
  ],
  'install-iptv-firestick': [
    {
      question: 'Can every Fire TV use the same player?',
      answer:
        'No. Hardware, software platform, region, and app requirements vary. Confirm the exact model and legitimate app availability.',
    },
    {
      question: 'Can I use the television USB port for power?',
      answer:
        'Use the device’s recommended power supply. An unsuitable TV USB port can provide insufficient or inconsistent power.',
    },
  ],
  'iptv-smart-tv-setup': [
    {
      question: 'Are Samsung and LG setup steps the same as Android TV?',
      answer:
        'No. Their app platforms and store listings differ. Identify the exact television model and follow its supported app-installation path.',
    },
    {
      question: 'What if my TV has no compatible player?',
      answer:
        'Ask support about the model before purchasing. A supported external streaming device may be an alternative.',
    },
  ],
  'iptv-smarters-setup': [
    {
      question: 'Does paying for a player activate my IPTV account?',
      answer:
        'No. A player purchase generally pays for app features. The content subscription must be activated separately by its provider.',
    },
    {
      question: 'Is a playlist URL safe to post publicly?',
      answer: 'No. It may contain credentials and grant account access. Treat it like a password.',
    },
  ],
  'best-internet-speed-for-iptv': [
    {
      question: 'Is an internet speed estimate a guarantee?',
      answer:
        'No. Encoding, frame rate, network stability, and household activity affect the actual requirement. Test the intended stream and device.',
    },
    {
      question: 'Does Ethernet fix every playback issue?',
      answer:
        'No. It can isolate Wi-Fi problems but cannot repair an unavailable source, an account restriction, or unsupported decoding.',
    },
  ],
  'iptv-not-working': [
    {
      question: 'What should I include in a support request?',
      answer:
        'Send the device model, app version, exact error, time zone, affected channels, and controlled comparisons. Hide passwords and full account URLs.',
    },
    {
      question: 'Why can the guide work when video fails?',
      answer:
        'Schedule data and video can be fetched separately. A populated guide does not prove that a stream is available or playable.',
    },
  ],
  'iptv-epg-guide': [
    {
      question: 'Does a guide listing guarantee catch-up?',
      answer:
        'No. Schedule information, replay rights, and player features are separate. Confirm catch-up availability with support.',
    },
    {
      question: 'Should I offset every channel to fix one wrong listing?',
      answer:
        'No. Check the device clock first. One wrong row may reflect a feed mismatch or source problem that a global offset would make worse elsewhere.',
    },
  ],
  'iptv-on-multiple-devices': [
    {
      question: 'Does multi-device compatibility mean simultaneous viewing?',
      answer:
        'No. App availability and active connection allowance are separate. Ask support how many streams the selected account permits.',
    },
    {
      question: 'Can recording use an additional connection?',
      answer:
        'It can, depending on the player and provider. Confirm connection counting, recording support, and content permissions first.',
    },
  ],
  'iptv-vs-cable-tv': [
    {
      question: 'Is IPTV always a replacement for cable?',
      answer:
        'No. The right choice depends on confirmed content, local programming, equipment, accessibility, recording, and household preferences.',
    },
    {
      question: 'What costs should I compare?',
      answer:
        'Include subscription duration, equipment, app licenses, required internet service, activation charges if any, and renewal or cancellation conditions.',
    },
  ],
};
export const posts: BlogPost[] = entries.map(
  ([slug, title, description, category, image, imageAlt, related]) => ({
    slug,
    title,
    description,
    category,
    image: `/images/${image}.${['nature', 'cinema'].includes(image) ? 'webp' : 'svg'}`,
    imageAlt,
    published: contentDate,
    sections: readDocument(slug),
    faqs: articleFaqs[slug],
    related: [...related],
    sources:
      slug === 'best-internet-speed-for-iptv'
        ? [
            {
              label: 'Netflix: service-specific internet speed recommendations',
              url: 'https://help.netflix.com/en/node/306',
            },
          ]
        : slug === 'iptv-smart-tv-setup'
          ? [
              {
                label: 'Google TV: install apps',
                url: 'https://support.google.com/googletv/answer/10050570?hl=en',
              },
            ]
          : undefined,
  }),
);
export function readTime(post: BlogPost) {
  return Math.ceil(
    post.sections
      .flatMap((s) => s.paragraphs)
      .join(' ')
      .split(/\s+/).length / 220,
  );
}
