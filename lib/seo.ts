import type { Metadata } from 'next';
import { siteConfig } from './config';
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image = siteConfig.socialImage,
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
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          type: 'image/jpeg',
          alt: siteConfig.socialImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: image, alt: siteConfig.socialImageAlt }],
    },
  };
}
