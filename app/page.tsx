import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  HomeHero,
  Benefits,
  Entertainment,
  Sports,
  HomeEditorial,
  CategoryPreview,
} from '@/components/home';
import {
  SectionHeading,
  PricingGrid,
  Steps,
  TrialBanner,
  FAQAccordion,
  CTASection,
} from '@/components/ui';
import { DeviceGrid, SetupLinks } from '@/components/devices';
import { BlogGrid } from '@/components/blog';
import { posts } from '@/data/posts';
import { faqs } from '@/data/faqs';
import { pageMetadata } from '@/lib/seo';
import { MovieSection } from '@/components/movies';
export const metadata = pageMetadata(
  'KroozIPTV | IPTV Plans, Live TV, Sports & Entertainment',
  'Explore KroozIPTV plans for live TV, sports, movies, and entertainment. Compare flexible durations, check your device, and request a free trial on WhatsApp.',
  '/',
);
export default function Home() {
  return (
    <>
      <HomeHero />
      <section id="pricing" className="pricing-section">
        <div className="container">
          <SectionHeading
            eyebrow="YOUR NEXT GREAT WATCH STARTS HERE"
            title="Choose Your KroozIPTV Plan"
            description="Four simple plans. One easy conversation. Find your fit and order on WhatsApp."
            center
          />
          <PricingGrid source="pricing-home" />
          <p className="disclaimer" style={{ textAlign: 'center' }}>
            Need a hand getting started? Setup guidance is included.{' '}
            <Link href="/free-trial" className="text-link">
              Try it first with a free trial →
            </Link>
          </p>
        </div>
      </section>
      <Benefits />
      <Entertainment />
      <MovieSection />
      <Sports />
      <section className="container section">
        <div className="section-topline">
          <SectionHeading
            eyebrow="YOUR SCREEN. YOUR CHOICE."
            title="At home on your favorite devices."
            description="Big screen or small, find a compatible player for the devices you already use."
          />
          <Link href="/devices" className="text-link">
            Explore devices
            <ArrowRight size={17} />
          </Link>
        </div>
        <DeviceGrid compact />
        <p className="disclaimer">
          Compatibility depends on your model, operating system, and player. Confirm simultaneous
          connection limits before using multiple screens. Platform names do not imply endorsement.
        </p>
      </section>
      <section className="muted-section section">
        <div className="container">
          <SectionHeading
            eyebrow="FROM CURIOUS TO COMFORTABLE"
            title="Three steps. Then it’s your time."
          />
          <Steps />
          <Link href="/free-trial" className="text-link">
            Just exploring? Start with a trial request
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <CategoryPreview />
      <section className="container section" style={{ paddingTop: 10 }}>
        <SectionHeading
          eyebrow="A LITTLE HELP GOES A LONG WAY"
          title="Setup without the guesswork."
          description="Choose your device for a clear guide to player selection, account details, playback checks, and common fixes."
        />
        <SetupLinks />
        <p className="disclaimer">
          Have a different device?{' '}
          <Link href="/setup" className="text-link">
            Browse all setup guides →
          </Link>
        </p>
      </section>
      <HomeEditorial />
      <TrialBanner />
      <section className="container section">
        <div className="section-topline">
          <SectionHeading
            eyebrow="GET MORE FROM YOUR SETUP"
            title="Good reads. Better watching."
            description="Straightforward guides for first-time viewers and the occasional technical hiccup."
          />
          <Link href="/blog" className="text-link">
            View All IPTV Guides
            <ArrowRight size={17} />
          </Link>
        </div>
        <BlogGrid posts={posts.slice(0, 6)} />
      </section>
      <section className="container section faq-layout">
        <div>
          <SectionHeading
            eyebrow="LET’S CLEAR A FEW THINGS UP"
            title="A few questions before you press play?"
            description="Here are the essentials. For anything specific to your device or viewing plans, we’re a conversation away."
          />
          <Link href="/contact" className="text-link">
            Talk to KroozIPTV
            <ArrowRight size={17} />
          </Link>
        </div>
        <FAQAccordion items={faqs.slice(0, 10)} />
      </section>
      <CTASection />
    </>
  );
}
