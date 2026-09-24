import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { pageDefinitions, type PageSlug } from '@/data/pages';
import { devices } from '@/data/devices';
import { faqs } from '@/data/faqs';
import { pageMetadata } from '@/lib/seo';
import { readDocument } from '@/lib/content';
import {
  PageHero,
  ContentSections,
  CTASection,
  FAQAccordion,
  SectionHeading,
  DeviceIcon,
  Steps,
} from '@/components/ui';
import { WhatsAppButton } from '@/components/whatsapp';
import { DeviceGrid } from '@/components/devices';
import { trialMessage } from '@/lib/whatsapp';
import { MovieCredits } from '@/components/movies';
// TODO: OWNER MUST VERIFY LEGAL TEXT BEFORE PRODUCTION.
// Confirm legal identity, jurisdiction, refund terms, hosting retention, and contact handling.
const legal = ['privacy-policy', 'terms', 'refund-policy'];
export function generateStaticParams() {
  return Object.keys(pageDefinitions)
    .filter((s) => s !== 'setup')
    .map((slug) => ({ slug }));
}
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = pageDefinitions[slug as PageSlug];
  return p ? pageMetadata(p.seo, p.description, `/${slug}`) : {};
}
export default async function SupportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(slug in pageDefinitions) || slug === 'setup') notFound();
  const p = pageDefinitions[slug as PageSlug];
  return (
    <>
      <PageHero eyebrow={p.label} title={p.title} description={p.description} path={`/${slug}`}>
        {!legal.includes(slug) && (
          <WhatsAppButton className="primary" source={slug}>
            Talk to KroozIPTV
          </WhatsAppButton>
        )}
      </PageHero>
      {slug === 'devices' && (
        <section className="container section">
          <DeviceGrid />
          <p className="disclaimer">
            Platform names identify compatibility topics and do not imply official endorsement.
            Exact model, software version, and player must be confirmed.
          </p>
        </section>
      )}
      {slug === 'faq' && (
        <section className="container section">
          <FAQAccordion items={faqs} />
        </section>
      )}
      {slug === 'contact' && (
        <section className="container section">
          <div className="guide-card-grid">
            {[
              {
                title: 'Find your plan',
                text: 'Tell us your viewing priorities, device, and preferred duration.',
                message: 'Hi KroozIPTV, I would like help choosing a subscription plan.',
              },
              {
                title: 'Request a trial',
                text: 'Test your intended screen and home connection before choosing.',
                message: trialMessage,
              },
              {
                title: 'Existing customer help',
                text: 'Have your order reference and a clear description of the issue ready.',
                message:
                  'Hi KroozIPTV, I need help with an existing order. My order reference is: ',
              },
              {
                title: 'Channel availability',
                text: 'Send the exact channel, event date, and location you want to check.',
                message: 'Hi KroozIPTV, please help me confirm a channel or event before ordering.',
              },
              {
                title: 'Device & setup help',
                text: 'Share your exact model, player version, and the stage that needs attention.',
                message:
                  'Hi KroozIPTV, I need help setting up my device. My device and player are: ',
              },
              {
                title: 'Order or refund question',
                text: 'Ask about the agreed terms or request a review of an order issue.',
                message:
                  'Hi KroozIPTV, I have an order or refund question. Please help me review the agreed terms and next steps.',
              },
            ].map((c) => (
              <article className="guide-card" key={c.title}>
                <h2 style={{ fontSize: 21, marginBottom: 14 }}>{c.title}</h2>
                <p>{c.text}</p>
                <WhatsAppButton
                  className="text-link"
                  source={`contact-${c.title}`}
                  message={c.message}
                >
                  Open WhatsApp
                </WhatsAppButton>
              </article>
            ))}
          </div>
        </section>
      )}
      {slug === 'about' && (
        <section className="container section">
          <SectionHeading
            eyebrow="OUR APPROACH"
            title="Clear choices. Useful guidance. A real conversation."
          />
          <Steps />
        </section>
      )}
      <section className="container section content-layout">
        <article className="prose">
          {legal.includes(slug) && <p className="policy-date">Published September 24, 2026</p>}
          <ContentSections sections={readDocument(slug)} />
        </article>
        <aside className="article-aside">
          <details className="toc" open>
            <summary>On this page</summary>
            <ol>
              {readDocument(slug).map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ol>
          </details>
          <div className="aside-cta">
            <h3>A useful next step.</h3>
            <p>
              {legal.includes(slug)
                ? 'Clarify any material order condition before payment. Keep the written confirmation.'
                : 'Start with the device and viewing questions that matter to you.'}
            </p>
            <Link
              href={legal.includes(slug) ? '/contact' : '/free-trial'}
              className="button outline"
            >
              {legal.includes(slug) ? 'Contact Support' : 'Explore the Free Trial'}
            </Link>
          </div>
        </aside>
      </section>
      {slug === 'devices' && (
        <section className="container section">
          <SectionHeading title="Player setup guides" />
          <div className="guide-links">
            {devices
              .filter((d) => d.type === 'player')
              .map((d) => (
                <Link key={d.slug} href={`/setup/${d.slug}`}>
                  <DeviceIcon type={d.type} />
                  {d.name}
                  <ArrowUpRight />
                </Link>
              ))}
          </div>
        </section>
      )}
      {slug === 'about' && <MovieCredits />}
      {!legal.includes(slug) && <CTASection />}
    </>
  );
}
