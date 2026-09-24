import type { MetadataRoute } from 'next';
import { siteConfig, contentDate } from '@/lib/config';
import { posts } from '@/data/posts';
import { devices } from '@/data/devices';
import { pageDefinitions } from '@/data/pages';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/pricing',
    '/free-trial',
    '/channels',
    '/blog',
    ...Object.keys(pageDefinitions).map((s) => `/${s}`),
    ...devices.map((d) => `/setup/${d.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ].map((path) => ({ url: siteConfig.url + path, lastModified: contentDate }));
}
