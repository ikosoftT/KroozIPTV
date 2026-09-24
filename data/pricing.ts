import type { Plan } from '@/lib/types';
const definitions = [
  { duration: 1, price: 15, description: 'A little commitment. A whole new way to watch.' },
  { duration: 3, price: 30, description: 'Settle in for a season of entertainment.' },
  { duration: 6, price: 55, description: 'Your everyday entertainment, planned ahead.' },
  { duration: 12, price: 85, description: 'Our best value for the long run.' },
];
export const plans: Plan[] = definitions.map((p) => ({
  ...p,
  id: `${p.duration}-month`,
  name: `${p.duration} ${p.duration === 1 ? 'Month' : 'Months'}`,
  highlighted: p.duration === 12,
  badge: p.duration === 12 ? 'BEST VALUE' : undefined,
  features: [
    'Live TV & entertainment options',
    'Compatible TV, mobile & desktop apps',
    'Setup guidance included',
    'WhatsApp customer support',
  ],
  whatsappMessage: `Hi KroozIPTV, I would like to order the ${p.duration} ${p.duration === 1 ? 'Month' : 'Months'} plan for $${p.price}. Please confirm package availability, connection limits, and payment instructions.`,
}));
