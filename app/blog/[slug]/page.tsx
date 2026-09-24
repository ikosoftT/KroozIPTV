import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { posts, readTime } from '@/data/posts';
import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/config';
import {
  Breadcrumbs,
  ContentSections,
  CTASection,
  FAQAccordion,
  SchemaScript,
  SectionHeading,
} from '@/components/ui';
import { BlogGrid } from '@/components/blog';
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((p) => p.slug === slug);
  if (!p) return {};
  const meta = pageMetadata(`${p.title} | KroozIPTV`, p.description, `/blog/${p.slug}`);
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: 'article',
      publishedTime: p.published,
      modifiedTime: p.published,
      authors: ['KroozIPTV Editorial'],
    },
  };
}
export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <>
      <header className="page-hero container">
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: p.title, href: `/blog/${p.slug}` },
          ]}
        />
        <span className="eyebrow">{p.category}</span>
        <h1 className="article-title">{p.title}</h1>
        <p className="lead">{p.description}</p>
        <div className="article-meta">
          <span>
            By <Link href="/about">KroozIPTV Editorial</Link>
          </span>
          <span>
            Published <time dateTime={p.published}>September 24, 2026</time>
          </span>
          <span>{readTime(p)} min read</span>
        </div>
        <div className="article-hero-image">
          <Image
            src={p.image}
            alt={p.imageAlt}
            fill
            priority
            sizes="(max-width:1100px) 100vw, 1020px"
          />
        </div>
      </header>
      <div className="container content-layout">
        <article className="prose">
          <ContentSections sections={p.sections} />
          <section className="prose-section">
            <h2>Frequently asked questions</h2>
            <FAQAccordion items={p.faqs} />
          </section>
          {p.sources && (
            <section className="sources">
              <h2>References and further reading</h2>
              {p.sources.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label} ↗
                </a>
              ))}
            </section>
          )}
          <p className="disclaimer">
            Editorial guidance from KroozIPTV. Interfaces, app availability, and service conditions
            can change. Confirm current instructions with the relevant manufacturer, player
            publisher, or service support.
          </p>
        </article>
        <aside className="article-aside">
          <details className="toc" open>
            <summary>
              In this guide
              <ChevronDown size={16} />
            </summary>
            <ol>
              {p.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ol>
          </details>
          <div className="aside-cta">
            <span className="eyebrow">PUT IT TO THE TEST</span>
            <h3 style={{ marginTop: 12 }}>Your device. Your routine.</h3>
            <p>Ask about a trial and test the setup you actually plan to use.</p>
            <Link href="/free-trial" className="button primary">
              Explore the Free Trial
            </Link>
            <Link href="/pricing" className="text-link" style={{ marginTop: 16 }}>
              Compare KroozIPTV plans →
            </Link>
          </div>
        </aside>
      </div>
      <section className="container section">
        <SectionHeading eyebrow="KEEP EXPLORING" title="A little more know-how." />
        <BlogGrid
          posts={p.related.map((slug) => posts.find((p) => p.slug === slug)!).filter(Boolean)}
        />
      </section>
      <CTASection />
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: p.title,
          description: p.description,
          image: siteConfig.url + siteConfig.socialImage,
          datePublished: p.published,
          dateModified: p.published,
          author: {
            '@type': 'Organization',
            name: 'KroozIPTV Editorial',
            url: siteConfig.url + '/about',
          },
          publisher: { '@id': `${siteConfig.url}/#organization` },
          mainEntityOfPage: siteConfig.url + `/blog/${p.slug}`,
          inLanguage: 'en-US',
        }}
      />
    </>
  );
}
