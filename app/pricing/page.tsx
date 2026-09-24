import Link from 'next/link';
import { plans } from '@/data/pricing';
import { faqs } from '@/data/faqs';
import { readDocument } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import {
  PageHero,
  PricingGrid,
  SectionHeading,
  Steps,
  ContentSections,
  FAQAccordion,
  TrialBanner,
  CTASection,
} from '@/components/ui';
import { SetupLinks } from '@/components/devices';
export const metadata = pageMetadata(
  'KroozIPTV Pricing | IPTV Subscription Plans',
  'Compare KroozIPTV subscription durations and integer USD prices. Understand WhatsApp ordering, device setup, player fees, and what to confirm before payment.',
  '/pricing',
);
export default function Pricing() {
  return (
    <>
      <PageHero
        eyebrow="PLANS & PRICING"
        title="Your entertainment. Your timeline."
        description="KroozIPTV pricing and subscription plans, with four clear durations and an easy WhatsApp ordering process. Choose the commitment that suits you, then confirm the details with us."
        path="/pricing"
      />
      <section className="container section">
        <PricingGrid />
      </section>
      <section className="container section">
        <SectionHeading
          eyebrow="SIDE BY SIDE"
          title="Find your fit at a glance."
          description="Duration determines the listed price. Content availability and active connection limits are confirmed before ordering."
        />
        <div className="table-wrap">
          <table>
            <caption className="sr-only">
              KroozIPTV subscription duration and service comparison
            </caption>
            <thead>
              <tr>
                <th scope="col">Plan details</th>
                {plans.map((p) => (
                  <th scope="col" key={p.id}>
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Total listed price (USD)</th>
                {plans.map((p) => (
                  <td key={p.id}>${p.price}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Commitment</th>
                {[
                  'Short initial test',
                  'A season of viewing',
                  'A settled routine',
                  'Longer-term viewing',
                ].map((t) => (
                  <td key={t}>{t}</td>
                ))}
              </tr>
              {['Setup guidance', 'WhatsApp support'].map((t) => (
                <tr key={t}>
                  <th scope="row">{t}</th>
                  {plans.map((p) => (
                    <td key={p.id}>Included</td>
                  ))}
                </tr>
              ))}
              <tr>
                <th scope="row">Simultaneous streams</th>
                {plans.map((p) => (
                  <td key={p.id}>Confirm with support</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Third-party app fees</th>
                {plans.map((p) => (
                  <td key={p.id}>Separate if applicable</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="muted-section section">
        <div className="container">
          <SectionHeading
            eyebrow="NO COMPLICATED CHECKOUT"
            title="A plan. A conversation. Your setup."
          />
          <Steps />
        </div>
      </section>
      <section className="container section content-layout">
        <article className="prose">
          <ContentSections sections={readDocument('pricing')} />
        </article>
        <aside className="article-aside">
          <div className="aside-cta">
            <h3>Still checking your device?</h3>
            <p>Test your player and home connection before making a longer commitment.</p>
            <Link href="/free-trial" className="button primary">
              Explore the Free Trial
            </Link>
            <Link href="/channels" className="text-link" style={{ marginTop: 16 }}>
              Check channel availability →
            </Link>
          </div>
        </aside>
      </section>
      <section className="container section">
        <SectionHeading title="A guide for your screen." />
        <SetupLinks />
      </section>
      <TrialBanner />
      <section className="container section">
        <SectionHeading eyebrow="PRICING QUESTIONS" title="Know the details before you choose." />
        <FAQAccordion
          items={[
            faqs[1],
            faqs[2],
            faqs[4],
            faqs[8],
            faqs[11],
            {
              question: 'Does Best Value mean this is the most popular plan?',
              answer:
                'No. Best Value describes the lowest cost per month among the listed duration prices. We do not claim customer popularity or publish fabricated purchase statistics.',
            },
            {
              question: 'Will I be charged automatically on this website?',
              answer:
                'No. Plan buttons open a WhatsApp conversation. Confirm payment instructions, renewal conditions, and the agreed duration with support before paying.',
            },
            {
              question: 'What should I check before renewal?',
              answer:
                'Confirm the current price, desired package, connection allowance, activation date, and any changes to the device or player. Do not assume every earlier condition remains unchanged.',
            },
          ]}
        />
      </section>
      <CTASection title="Found your plan? Let’s get you set up." />
    </>
  );
}
