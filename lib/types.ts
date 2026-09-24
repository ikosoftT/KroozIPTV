export interface Plan {
  id: string;
  name: string;
  duration: number;
  price: number;
  badge?: string;
  description: string;
  features: string[];
  whatsappMessage: string;
  highlighted: boolean;
}
export type ChannelCategory =
  | 'Sports'
  | 'News'
  | 'Entertainment'
  | 'Movies'
  | 'Kids'
  | 'Lifestyle'
  | 'Documentary'
  | 'Music'
  | 'International'
  | 'Local / Regional';
export interface Channel {
  name: string;
  category: ChannelCategory;
}
export interface FAQ {
  question: string;
  answer: string;
}
export interface ContentSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}
export interface Device {
  slug: string;
  name: string;
  shortName: string;
  type: 'tv' | 'phone' | 'computer' | 'player';
  description: string;
  requirements: string[];
  sections: ContentSection[];
  faqs: FAQ[];
}
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  imageAlt: string;
  published: string;
  sections: ContentSection[];
  faqs: FAQ[];
  related: string[];
  sources?: { label: string; url: string }[];
}
