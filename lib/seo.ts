import type { Metadata } from 'next';
import { siteConfig } from './config';
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image = '/images/social.jpg',
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
