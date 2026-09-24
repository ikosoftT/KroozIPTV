export const pageDefinitions = {
  devices: {
    label: 'Compatible devices',
    title: 'Entertainment on the devices you already use.',
    description:
      'Explore KroozIPTV device compatibility, player requirements, and setup guides for televisions, streaming devices, phones, tablets, and computers.',
    seo: 'KroozIPTV Devices | TV, Mobile & Desktop Compatibility',
  },
  setup: {
    label: 'Setup guides',
    title: 'A clear path from setup to sofa.',
    description:
      'Find the IPTV setup guide for your device. Choose a compatible player, enter account details safely, and test picture, sound, and guide behavior.',
    seo: 'KroozIPTV Setup | Device & IPTV Player Guides',
  },
  faq: {
    label: 'Frequently asked questions',
    title: 'Good questions. Straight answers.',
    description:
      'Understand KroozIPTV ordering, trials, device compatibility, channel requests, connection limits, and setup support before choosing a plan.',
    seo: 'KroozIPTV FAQ | Plans, Trials, Devices & Support',
  },
  contact: {
    label: 'Contact',
    title: 'Contact KroozIPTV. Let’s talk.',
    description:
      'Reach KroozIPTV on WhatsApp for plan questions, trial requests, current channel availability, existing-account help, or device setup guidance.',
    seo: 'Contact KroozIPTV | WhatsApp Sales & Setup Support',
  },
  about: {
    label: 'About KroozIPTV',
    title: 'Built around your kind of watching.',
    description:
      'Learn about KroozIPTV’s focus on flexible subscription choices, device-aware setup guidance, and clear conversations before you order.',
    seo: 'About KroozIPTV | Our Approach to IPTV & Support',
  },
  'privacy-policy': {
    label: 'Privacy policy',
    title: 'Privacy policy.',
    description:
      'Understand the information used by this KroozIPTV website, WhatsApp handoffs, optional analytics, hosting logs, and how to raise a privacy question.',
    seo: 'KroozIPTV Privacy Policy | Website & Contact Data',
  },
  terms: {
    label: 'Terms of service',
    title: 'Terms of service.',
    description:
      'Read KroozIPTV website and ordering terms, including confirmation of packages, devices, account use, third-party players, and support.',
    seo: 'KroozIPTV Terms | Website Use & Subscription Orders',
  },
  'refund-policy': {
    label: 'Refund information',
    title: 'Refund policy & order questions.',
    description:
      'Find out what to confirm before payment and how to raise an activation, service, or refund request with KroozIPTV support.',
    seo: 'KroozIPTV Refund Policy | Requests & Order Support',
  },
} as const;
export type PageSlug = keyof typeof pageDefinitions;
