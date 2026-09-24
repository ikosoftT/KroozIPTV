import type { Channel, ChannelCategory } from '@/lib/types';
export const categories: ChannelCategory[] = [
  'Sports',
  'News',
  'Entertainment',
  'Movies',
  'Kids',
  'Lifestyle',
  'Documentary',
  'Music',
  'International',
  'Local / Regional',
];
export const channels: Channel[] = [
  ...[
    'ESPN',
    'ESPN2',
    'NFL Network',
    'NBA TV',
    'MLB Network',
    'NHL Network',
    'FS1',
    'FS2',
    'CBS Sports Network',
  ].map((name) => ({ name, category: 'Sports' as const })),
  ...['CNN', 'MSNBC', 'CNBC', 'Fox News'].map((name) => ({ name, category: 'News' as const })),
  ...['TNT', 'TBS', 'USA Network', 'AMC', 'FX', 'FXX', 'Comedy Central', 'Paramount Network'].map(
    (name) => ({ name, category: 'Entertainment' as const }),
  ),
  ...['Movie channels', 'Independent cinema'].map((name) => ({
    name,
    category: 'Movies' as const,
  })),
  ...['Cartoon Network', 'Nickelodeon', 'Disney Channel'].map((name) => ({
    name,
    category: 'Kids' as const,
  })),
  ...['Food Network', 'HGTV'].map((name) => ({ name, category: 'Lifestyle' as const })),
  ...['Discovery', 'History', 'National Geographic'].map((name) => ({
    name,
    category: 'Documentary' as const,
  })),
  { name: 'Music programming', category: 'Music' },
  { name: 'BBC America', category: 'International' },
  { name: 'Spanish-language programming', category: 'International' },
  ...['NBC', 'ABC', 'CBS', 'FOX'].map((name) => ({ name, category: 'Local / Regional' as const })),
];
export const channelDisclaimer =
  'Channel availability, schedules, and package contents may change. Contact KroozIPTV before purchasing if access to a specific channel or event is important to you. Names and trademarks belong to their respective owners and do not imply affiliation or endorsement.';
