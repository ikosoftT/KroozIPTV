import Link from 'next/link';
import { notFound } from 'next/navigation';
import { devices } from '@/data/devices';
import { pageMetadata } from '@/lib/seo';
import {
  Breadcrumbs,
  ContentSections,
  CTASection,
  FAQAccordion,
  SectionHeading,
  DeviceIcon,
} from '@/components/ui';
import { WhatsAppButton } from '@/components/whatsapp';
export function generateStaticParams() {
  return devices.map((d) => ({ slug: d.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = devices.find((d) => d.slug === slug);
  return d
    ? pageMetadata(`${d.name} IPTV Setup | KroozIPTV`, d.description, `/setup/${d.slug}`)
    : {};
}
export default async function SetupGuide({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = devices.find((d) => d.slug === slug);
  if (!d) notFound();
  return (
    <>
      <header className="container page-hero">
        <Breadcrumbs
          items={[
            { label: 'Setup', href: '/setup' },
            { label: d.shortName, href: `/setup/${d.slug}` },
          ]}
        />
        <span className="eyebrow">DEVICE SETUP GUIDE</span>
        <h1>IPTV setup for {d.name}.</h1>
        <p className="lead">{d.description}</p>
        <div className="hero-actions">
          <WhatsAppButton
            className="primary"
            source={`setup-${d.slug}`}
            message={`Hi KroozIPTV, I need setup help for ${d.name}. Please confirm compatible players and the required login format.`}
          >
            Get {d.shortName} setup help
          </WhatsAppButton>
          <Link href="/free-trial" className="button outline">
            Test with a Free Trial
          </Link>
        </div>
      </header>
      <div className="container content-layout">
        <article className="prose">
          <ContentSections sections={d.sections} />
          <section className="prose-section">
            <h2>{d.shortName} setup FAQs</h2>
            <FAQAccordion items={d.faqs} />
          </section>
          <p className="disclaimer">
            Device and platform names identify compatibility topics only; they do not imply
            endorsement. Interfaces and app listings can change. Use current manufacturer and
            publisher instructions for your model.
          </p>
        </article>
        <aside className="article-aside">
          <details open className="toc">
            <summary>Setup checklist</summary>
            <ol>
              {d.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ol>
          </details>
          <div className="aside-cta">
            <h3>Need a second screen?</h3>
            <p>
              Compatibility and simultaneous connections are separate. Confirm your account
              allowance first.
            </p>
            <Link className="text-link" href="/blog/iptv-on-multiple-devices">
              Read the multiple-device guide →
            </Link>
          </div>
        </aside>
      </div>
      <section className="container section">
        <SectionHeading eyebrow="ANOTHER DEVICE?" title="Find the right setup." />
        <div className="guide-links">
          {devices
            .filter((x) => x.slug !== slug)
            .slice(0, 6)
            .map((x) => (
              <Link key={x.slug} href={`/setup/${x.slug}`}>
                <DeviceIcon type={x.type} />
                {x.shortName}
              </Link>
            ))}
        </div>
      </section>
      <CTASection title="Ready to try your setup?" />
    </>
  );
}
