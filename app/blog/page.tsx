import Image from 'next/image';
import Link from 'next/link';
import { posts } from '@/data/posts';
import { BlogGrid } from '@/components/blog';
import { PageHero, SectionHeading, CTASection, FAQAccordion } from '@/components/ui';
import { SetupLinks } from '@/components/devices';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata(
  'KroozIPTV Blog | IPTV Setup & Troubleshooting Guides',
  'Practical IPTV guides covering devices, buffering, program guides, internet speed, and household viewing. Find a clear next step for your setup.',
  '/blog',
);
export default function Blog() {
  const p = posts[0];
  return (
    <>
      <PageHero
        eyebrow="THE KROOZIPTV JOURNAL"
        title="Less guesswork. More good watching."
        description="KroozIPTV IPTV guides, setup help, and streaming tips. Start with the basics, get your device ready, or find a useful fix for the problem in front of you."
        path="/blog"
      />
      <section className="container">
        <article className="blog-featured">
          <div className="blog-featured-image">
            <Image
              src={p.image}
              alt={p.imageAlt}
              fill
              priority
              sizes="(max-width:640px) 100vw, 50vw"
            />
          </div>
          <div className="blog-featured-copy">
            <span className="eyebrow">START HERE · IPTV BASICS</span>
            <h2>{p.title}</h2>
            <p>{p.description}</p>
            <Link href={`/blog/${p.slug}`} className="button primary">
              Get to know IPTV ↗
            </Link>
          </div>
        </article>
        <div className="category-strip" style={{ marginBottom: 35 }}>
          {['IPTV Basics', 'Setup Guides', 'Troubleshooting', 'Devices', 'Streaming Tips'].map(
            (c) => (
              <a key={c} href={`#${c.toLowerCase().replaceAll(' ', '-')}`}>
                {c}
              </a>
            ),
          )}
        </div>
        {['IPTV Basics', 'Setup Guides', 'Troubleshooting', 'Devices', 'Streaming Tips'].map(
          (c) => (
            <section
              id={c.toLowerCase().replaceAll(' ', '-')}
              key={c}
              style={{ paddingBottom: 50 }}
            >
              <SectionHeading title={c} />
              <BlogGrid posts={posts.filter((p) => p.category === c)} />
            </section>
          ),
        )}
      </section>
      <section className="container section editorial-grid">
        <SectionHeading
          eyebrow="FIND THE RIGHT STARTING POINT"
          title="A guide for the question you actually have."
        />
        <div className="editorial-copy">
          <div>
            <h3>New to IPTV?</h3>
            <p>
              Begin with the explanation of IPTV and the cable comparison. They separate the
              delivery technology from the service, player, and device. That distinction helps you
              ask useful questions before buying: which content is confirmed, what your player
              costs, and how many active connections the account allows.
            </p>
            <p>
              Then visit the <Link href="/devices">device overview</Link>. A smart TV is not one
              universal app platform, and a player available on your phone may not exist on your
              television. Check the model and login format before assuming the setup is ready.
            </p>
          </div>
          <div>
            <h3>Something not working?</h3>
            <p>
              Use the troubleshooting decision tree to classify the symptom first. An app crash,
              rejected password, single unavailable channel, and blank guide deserve different
              checks. Once you know the stage that fails, the focused buffering or EPG guide can
              help you avoid resetting parts of the setup that already work.
            </p>
            <p>
              Keep the exact error, device model, and player version for{' '}
              <Link href="/contact">support</Link>. Share account details only through a verified
              private conversation. Our guides explain the reasoning behind each test so you can
              report a result instead of a list of random changes.
            </p>
          </div>
          <div>
            <h3>Planning a household setup?</h3>
            <p>
              Read the multiple-device and internet-speed guides together. Broadband capacity and
              account connection allowances are separate limits. Test each device individually
              before testing simultaneous use, and confirm any recording or travel requirements with
              support.
            </p>
            <p>
              Once the practical questions are answered, review{' '}
              <Link href="/pricing">KroozIPTV pricing</Link> or{' '}
              <Link href="/free-trial">request a trial</Link>. Helpful reading should lead to a
              decision based on the setup you actually need, with current content and terms
              confirmed before payment.
            </p>
          </div>
        </div>
      </section>
      <section className="container section">
        <SectionHeading
          title="Looking for your device?"
          description="Use a concise setup checklist alongside the longer articles."
        />
        <SetupLinks />
      </section>
      <section className="container section">
        <SectionHeading title="About these guides" />
        <FAQAccordion
          items={[
            {
              question: 'Who writes the KroozIPTV guides?',
              answer:
                'The articles are published under the KroozIPTV Editorial byline. They explain general setup and troubleshooting principles and avoid claiming personal tests of every device or service combination.',
            },
            {
              question: 'What if my app’s menus look different?',
              answer:
                'App interfaces and store listings change. Follow the current device manufacturer and player publisher instructions, and ask support to match the guidance to your exact version.',
            },
            {
              question: 'Do these guides guarantee channel access?',
              answer:
                'No. Editorial examples and channel requests do not establish availability, content rights, or package inclusion. Confirm specific viewing needs with support before ordering.',
            },
          ]}
        />
      </section>
      <CTASection title="Know your setup? Find your plan." />
    </>
  );
}
