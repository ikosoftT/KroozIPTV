import Link from 'next/link';
import { ChannelSearch } from '@/components/channel-search';
import { WhatsAppButton } from '@/components/whatsapp';
import {
  PageHero,
  SectionHeading,
  ContentSections,
  FAQAccordion,
  CTASection,
  TrialBanner,
} from '@/components/ui';
import { DeviceGrid } from '@/components/devices';
import { channelDisclaimer } from '@/data/channels';
import { readDocument } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata(
  'KroozIPTV Channels | Sports, News & Entertainment',
  'Search popular channel requests and entertainment categories. Ask KroozIPTV to confirm current availability, regional feeds, and events before subscribing.',
  '/channels',
);
export default function Channels() {
  return (
    <>
      <PageHero
        eyebrow="EXPLORE ENTERTAINMENT"
        title="KroozIPTV channels & entertainment categories."
        description="Your must-watch list starts here. Explore popular channels customers commonly ask about, then check what’s currently available for your location and package."
        path="/channels"
      >
        <WhatsAppButton
          className="primary"
          source="channels-hero"
          message="Hi KroozIPTV, I want to check whether a specific channel or package is available in my location before ordering."
        >
          Ask About a Channel
        </WhatsAppButton>
        <Link href="/pricing" className="button outline">
          Compare Plans
        </Link>
      </PageHero>
      <section className="container section">
        <div className="callout" style={{ marginTop: 0 }}>
          <h2 style={{ fontSize: 19 }}>A directory of requests, not a confirmed lineup.</h2>
          <p style={{ marginTop: 12 }}>{channelDisclaimer}</p>
        </div>
        <ChannelSearch />
      </section>
      <section className="container section content-layout">
        <article className="prose">
          <ContentSections sections={readDocument('channels')} />
        </article>
        <aside className="article-aside">
          <div className="aside-cta">
            <h3>Got a must-watch?</h3>
            <p>
              Send the channel or event, date, and your location. A specific question gets a more
              useful answer.
            </p>
            <WhatsAppButton
              className="primary"
              source="channels-aside"
              message="Hi KroozIPTV, please help me check a must-watch channel or event before I choose a plan."
            >
              Confirm Availability
            </WhatsAppButton>
          </div>
        </aside>
      </section>
      <section className="container section">
        <SectionHeading
          title="Find the right screen for your list."
          description="Check the device and player alongside the content, so your whole setup is ready."
        />
        <DeviceGrid compact />
      </section>
      <section className="container section">
        <SectionHeading title="Channel availability, explained." />
        <FAQAccordion
          items={[
            {
              question: 'Are all the listed channels included in KroozIPTV?',
              answer:
                'No. This page lists popular requests and categories, not a verified lineup. Contact support to confirm specific channels, events, regional feeds, and package contents before ordering.',
            },
            {
              question: 'Does a network name imply an official partnership?',
              answer:
                'No. Names are used only to identify the subjects of customer availability questions. No affiliation or endorsement is claimed.',
            },
            {
              question: 'How do I ask about a local channel?',
              answer:
                'Send the channel or affiliate name and the city or region you mean. A national network name alone may not identify the local schedule or feed.',
            },
            {
              question: 'Can I check a game before purchasing?',
              answer:
                'Yes. Send the event or teams, date, time zone, and location. Support must confirm current availability; a sports category or network listing does not guarantee a specific game.',
            },
            {
              question: 'What if a channel does not appear in search?',
              answer:
                'The directory is not exhaustive. Use the availability button or contact page to ask about an unlisted channel. No search result is itself a confirmation of availability or non-availability.',
            },
            {
              question: 'Can channels and schedules change?',
              answer:
                'Yes. Availability, schedules, and package contents can change. Confirm essential viewing before paying and avoid assuming that a previous trial guarantees future access.',
            },
          ]}
        />
      </section>
      <TrialBanner />
      <CTASection title="Your favorites, checked. Your next step, simple." />
    </>
  );
}
