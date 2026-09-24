import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Monitor,
  Smartphone,
  Laptop,
  Play,
  MessageCircle,
} from 'lucide-react';
import type { FAQ, ContentSection } from '@/lib/types';
import { siteConfig } from '@/lib/config';
import { plans } from '@/data/pricing';
import { PlanCTA, WhatsAppButton } from './whatsapp';
import { trialMessage } from '@/lib/whatsapp';
import { RichText } from './rich-text';
export function SchemaScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
export function Breadcrumbs({ items }: { items: { label: string; href: string }[] }) {
  const all = [{ label: 'Home', href: '/' }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        {all.map((item, i) => (
          <span key={item.href}>
            {i > 0 && <span className="crumb-separator">/</span>}
            {i === all.length - 1 ? (
              <span aria-current="page">{item.label}</span>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
          </span>
        ))}
      </nav>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: all.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.label,
            item: siteConfig.url + item.href,
          })),
        }}
      />
    </>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={`section-heading ${center ? 'center' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
export function PageHero({
  eyebrow,
  title,
  description,
  path,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  path: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero container">
      <Breadcrumbs items={[{ label: eyebrow, href: path }]} />
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p className="lead">{description}</p>
      {children && <div className="hero-actions">{children}</div>}
    </section>
  );
}
export function PricingGrid({ source = 'pricing-page' }: { source?: string }) {
  return (
    <>
      <div className="pricing-grid">
        {plans.map((plan) => (
          <article
            className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}
            key={plan.id}
          >
            {plan.badge && (
              <div className="plan-badge">
                {plan.badge}
                <span>THE FULL YEAR, SORTED</span>
              </div>
            )}
            <div className="plan-heading">
              <h3>{plan.name}</h3>
              <span className="plan-duration">
                {plan.duration === 1
                  ? 'Keep it flexible'
                  : plan.duration === 12
                    ? 'Make it your go-to'
                    : 'Stay entertained'}
              </span>
            </div>
            <p className="price">
              <span>$</span>
              {plan.price}
              <span className="price-currency">USD</span>
            </p>
            <p className="plan-description">{plan.description}</p>
            <div className="plan-divider" />
            <ul>
              {plan.features.map((f) => (
                <li key={f}>
                  <Check size={15} />
                  {f}
                </li>
              ))}
            </ul>
            <PlanCTA plan={plan} source={source} />
            <Link href="/free-trial" className="plan-trial">
              Want to try it first?
            </Link>
          </article>
        ))}
      </div>
      <p className="pricing-note">
        <MessageCircle size={16} /> Order directly on WhatsApp. Confirm content, connections, and
        setup before payment.
      </p>
    </>
  );
}
export function FAQAccordion({ items }: { items: FAQ[] }) {
  return (
    <div className="faq-list">
      {items.map((f) => (
        <details key={f.question}>
          <summary>
            {f.question}
            <ChevronDown size={19} />
          </summary>
          <p>{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
export function CTASection({
  title = 'Your next great watch starts here.',
  description = 'Find your plan, check your device, and let’s get you set up.',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="container section">
      <div className="cta-panel">
        <div>
          <span className="eyebrow">MAKE ROOM FOR BETTER TV</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="cta-buttons">
          <Link href="/pricing" className="button primary">
            Choose a Plan
            <ArrowRight size={17} />
          </Link>
          <WhatsAppButton message={trialMessage} source="final-cta" className="outline">
            Request Free Trial
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
export function TrialBanner() {
  return (
    <section className="container section">
      <div className="trial-banner">
        <span className="trial-symbol">
          <Play size={32} fill="currentColor" />
        </span>
        <div>
          <span className="eyebrow">A LITTLE CURIOUS? GOOD.</span>
          <h2>Try KroozIPTV before choosing a plan.</h2>
          <p>
            Test your device, explore available content, and see how it fits your routine. Ask us
            about trial availability and duration.
          </p>
        </div>
        <WhatsAppButton message={trialMessage} source="trial-banner" className="primary">
          Request Free Trial
        </WhatsAppButton>
      </div>
    </section>
  );
}
export function Steps() {
  return (
    <div className="steps-grid">
      {[
        [
          '01',
          'Find your fit',
          'Pick a subscription duration or request a trial. List the channels and devices that matter to you.',
        ],
        [
          '02',
          'Say hello on WhatsApp',
          'Confirm your package, connection allowance, and payment instructions with KroozIPTV.',
        ],
        [
          '03',
          'Set up. Settle in.',
          'Receive your account details and follow the guide for your compatible player. Support can help with setup.',
        ],
      ].map(([n, t, d]) => (
        <article className="step" key={n}>
          <span className="step-number">{n}</span>
          <h3>{t}</h3>
          <p>{d}</p>
        </article>
      ))}
    </div>
  );
}
export function DeviceIcon({ type }: { type: string }) {
  return type === 'phone' ? (
    <Smartphone />
  ) : type === 'computer' ? (
    <Laptop />
  ) : type === 'player' ? (
    <Play />
  ) : (
    <Monitor />
  );
}
export function ContentSections({ sections }: { sections: ContentSection[] }) {
  return (
    <>
      {sections.map((s) => (
        <section key={s.id} id={s.id} className="prose-section">
          <h2>{s.title}</h2>
          {s.paragraphs.map((p, i) => (
            <p key={i}>
              <RichText text={p} />
            </p>
          ))}
          {s.bullets && (
            <ul>
              {s.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </>
  );
}
