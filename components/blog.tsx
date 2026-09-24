import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { BlogPost } from '@/lib/types';
import { readTime } from '@/data/posts';
export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="blog-grid">
      {posts.map((p) => (
        <article key={p.slug} className="blog-card">
          <Link href={`/blog/${p.slug}`} tabIndex={-1} aria-hidden="true">
            <div className="blog-card-image">
              <Image
                src={p.image}
                alt={p.imageAlt}
                fill
                sizes="(max-width:640px) 100vw, (max-width:900px) 50vw, 33vw"
              />
            </div>
          </Link>
          <div className="blog-card-content">
            <span className="eyebrow">{p.category}</span>
            <h3>
              <Link href={`/blog/${p.slug}`}>{p.title}</Link>
            </h3>
            <p>{p.description}</p>
            <div className="blog-card-meta">
              <span>
                <time dateTime={p.published}>Sep 24, 2026</time> · {readTime(p)} min read
              </span>
              <Link href={`/blog/${p.slug}`} aria-label={`Read ${p.title}`}>
                <ArrowUpRight />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
