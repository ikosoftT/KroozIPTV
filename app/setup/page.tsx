import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { devices } from '@/data/devices';
import { PageHero, DeviceIcon, ContentSections, CTASection, FAQAccordion } from '@/components/ui';
import { readDocument } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { pageDefinitions } from '@/data/pages';
const p = pageDefinitions.setup;
export const metadata = pageMetadata(p.seo, p.description, '/setup');
export default function Setup() {
  return (
    <>
      <PageHero eyebrow={p.label} title={p.title} description={p.description} path="/setup" />
      <section className="container section">
        <div className="guide-card-grid">
          {devices.map((d) => (
            <Link className="guide-card" key={d.slug} href={`/setup/${d.slug}`}>
              <DeviceIcon type={d.type} />
              <h2 style={{ fontSize: 21, marginBottom: 14 }}>{d.name}</h2>
              <p>{d.description}</p>
              <span className="text-link">
                Read setup guide
                <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="container section">
        <article className="prose">
          <ContentSections sections={readDocument('setup')} />
          <FAQAccordion
            items={[
              {
                question: 'Should I buy the player before contacting support?',
                answer:
                  'Confirm the device, account format, supported player, and any separate fees first. Installing or paying for an app does not activate a subscription.',
              },
              {
                question: 'What if my current app screens differ?',
                answer:
                  'Use the current manufacturer and publisher instructions. App interfaces and supported platforms can change. Send the exact model and version to support for matching guidance.',
              },
            ]}
          />
        </article>
      </section>
      <CTASection title="A little setup. A lot to look forward to." />
    </>
  );
}
