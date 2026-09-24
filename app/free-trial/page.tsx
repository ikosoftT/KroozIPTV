import Link from 'next/link';
import { Check } from 'lucide-react';
import { TrialForm } from '@/components/trial-form';
import {
  PageHero,
  SectionHeading,
  ContentSections,
  PricingGrid,
  FAQAccordion,
  CTASection,
} from '@/components/ui';
import { DeviceGrid } from '@/components/devices';
import { readDocument } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata(
  'KroozIPTV Free Trial | Try IPTV Before You Subscribe',
  'Request a KroozIPTV free trial on WhatsApp. Choose your device, confirm trial terms, and test playback, guide navigation, and your home connection.',
  '/free-trial',
);
export default function Trial() {
  return (
    <>
      <PageHero
        eyebrow="TRY IT YOUR WAY"
        title="KroozIPTV Free Trial. Make yourself comfortable."
        description="Test the IPTV experience on your device before choosing a plan. Tell us your setup, ask about availability, and put your everyday viewing questions to the test."
        path="/free-trial"
      />
      <section className="container section trial-layout">
        <div>
          <SectionHeading
            eyebrow="A TEST DRIVE FOR YOUR TV"
            title="Your screen. Your connection. Your call."
            description="A good trial tells you more than a feature list. Here’s what to check while you explore."
          />
          <ul className="check-list">
            {[
              'Picture and sound on the device you actually use.',
              'Your preferred channels, with current availability confirmed.',
              'The guide, favorites, captions, and remote controls.',
              'Connection stability during your normal viewing hours.',
              'A compatible player and any separate app charges.',
              'The allowed number of active streams for your trial.',
            ].map((t) => (
              <li key={t}>
                <Check size={18} />
                {t}
              </li>
            ))}
          </ul>
          <div className="callout">
            <h3>No automatic subscription.</h3>
            <p>
              Requesting a trial starts a WhatsApp conversation. Support confirms availability,
              duration, and included access. No card details are collected on this website.
            </p>
          </div>
        </div>
        <TrialForm />
      </section>
      <section className="container section content-layout">
        <article className="prose">
          <ContentSections sections={readDocument('free-trial')} />
        </article>
        <aside className="article-aside">
          <div className="aside-cta">
            <h3>Prepare before you press play.</h3>
            <p>Find your device’s requirements and account-login checklist.</p>
            <Link href="/setup" className="button outline">
              Find a Setup Guide
            </Link>
          </div>
        </aside>
      </section>
      <section className="container section">
        <SectionHeading
          title="Bring your favorite device."
          description="Compatibility depends on the exact model and supported player. Let’s confirm your setup first."
        />
        <DeviceGrid compact />
      </section>
      <section className="pricing-section">
        <div className="container">
          <SectionHeading
            eyebrow="WHEN YOU’RE READY"
            title="Found your fit? Choose your timeline."
            description="Compare the available durations after you have tested your setup and confirmed the package."
            center
          />
          <PricingGrid source="free-trial-pricing" />
        </div>
      </section>
      <section className="container section">
        <SectionHeading title="Before your first trial." />
        <FAQAccordion
          items={[
            {
              question: 'How long does the trial last?',
              answer:
                'Support confirms the available duration in your WhatsApp conversation. This site does not promise a fixed length or automatic extension.',
            },
            {
              question: 'Do I need a payment card to request a trial?',
              answer:
                'No card details are collected by this website. The request opens WhatsApp so support can confirm availability and trial terms.',
            },
            {
              question: 'Can I choose the device I test?',
              answer:
                'Yes. Select the intended device in the request and include its exact model if you know it. Support needs to confirm a compatible player and login method.',
            },
            {
              question: 'Can I test several screens at the same time?',
              answer:
                'Only if the confirmed trial allowance permits it. Installing an app on multiple devices does not establish authorization for simultaneous playback.',
            },
            {
              question: 'What if my trial does not work?',
              answer:
                'Report the device, app version, exact error, and stage that fails. Ask support for the next step; an extension or replacement trial is not automatic.',
            },
            {
              question: 'Will the trial turn into a paid plan automatically?',
              answer:
                'The website does not enroll you in an automatic paid subscription. If you want to continue, choose a plan and confirm payment and renewal conditions with support.',
            },
            {
              question: 'Does trial content guarantee future availability?',
              answer:
                'No. Channel lineups, schedules, and package contents can change. Confirm important channels or events before purchasing.',
            },
          ]}
        />
      </section>
      <CTASection
        title="Try it. Get comfortable. Then decide."
        description="Ask about a trial and find out how KroozIPTV fits the way you watch."
      />
    </>
  );
}
