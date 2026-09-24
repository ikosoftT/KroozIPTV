import fs from 'node:fs';
import path from 'node:path';
import type { ContentSection } from './types';
export function readDocument(slug: string): ContentSection[] {
  return fs
    .readFileSync(path.join(process.cwd(), 'content', `${slug}.md`), 'utf8')
    .split(/^## /m)
    .filter(Boolean)
    .map((block) => {
      const [title, ...lines] = block.trim().split('\n');
      return {
        id: title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, ''),
        title,
        paragraphs: lines
          .join('\n')
          .trim()
          .split(/\n\s*\n/)
          .filter(Boolean),
      };
    });
}
