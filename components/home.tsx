import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  Monitor,
  Headphones,
  Radio,
  Clapperboard,
  Trophy,
  CalendarDays,
  SlidersHorizontal,
  Zap,
  Check,
} from 'lucide-react';
import { WhatsAppButton } from './whatsapp';
import { trialMessage } from '@/lib/whatsapp';
import { SectionHeading } from './ui';
export function HomeHero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-label">
            <span className="status-dot" /> YOUR ENTERTAINMENT. YOUR WAY.
          </div>
          <h1>
            <span className="hero-brand">KroozIPTV.</span>Live TV. Big games.
            <br />
            <span className="accent">Endless possibilities.</span>
          </h1>
          <p>
            Your IPTV experience for live entertainment, sports, movies, and more. Flexible plans.
            Familiar devices. One great night in.
          </p>
          <div className="hero-actions">
            <Link href="#pricing" className="button primary">
              Explore Plans
              <ArrowRight size={16} />
            </Link>
            <WhatsAppButton source="hero" message={trialMessage} className="outline" icon={false}>
              <Play size={14} />
              Start Free Trial
            </WhatsAppButton>
          </div>
          <div className="hero-trust">
            <span>
              <Monitor />
              Multi-device ready
            </span>
            <span>
              <Zap />
              Setup guidance
            </span>
            <span>
              <Headphones />
              WhatsApp support
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-chip top">
            <Radio size={22} />
            <div>
              <strong>Your front-row feeling.</strong>
              <span>Sports. Stories. Something new.</span>
            </div>
          </div>
          <div className="tv-frame">
            <div className="tv-screen">
              <Image
                className="tv-backdrop"
                src="/images/mountains.webp"
                alt="Dramatic mountain peaks in a conceptual KroozIPTV television interface"
                fill
                priority
                fetchPriority="high"
                sizes="(max-width:640px) 92vw, 48vw"
              />
              <div className="tv-gradient" />
              <div className="tv-top">
                <span className="tv-logo">
                  Krooz<span style={{ color: 'var(--primary)' }}>IPTV.</span>
                </span>
                <div className="tv-nav">
                  <span>Discover</span>
                  <span>Live TV</span>
                  <span>Movies</span>
                  <span>Series</span>
                </div>
              </div>
              <div className="tv-feature">
                <span className="eyebrow">ADVENTURE IS CALLING</span>
                <span className="tv-title">
                  BEYOND
                  <br />
                  THE ORDINARY
                </span>
                <p>A world of entertainment. A different kind of escape.</p>
              </div>
              <div className="tv-tiles">
                {[
                  ['stadium', 'Live sports', 'Floodlit stadium representing live sports viewing'],
                  [
                    'cinema',
                    'Movie nights',
                    'Film reels and a projector representing movie nights',
                  ],
                  [
                    'nature',
                    'Discover more',
                    'Mountain landscape representing nature and discovery programming',
                  ],
                ].map(([img, title, alt]) => (
                  <Link href="/channels" className="tv-tile" key={img}>
                    <Image src={`/images/${img}.webp`} alt={alt} fill sizes="180px" />
                    <span>{title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="tv-stand" />
          <div className="visual-chip bottom">
            <Monitor size={22} />
            <div>
              <strong>Big screen. Small screen.</strong>
              <span>Find your compatible setup.</span>
            </div>
            <Check size={15} />
          </div>
          <p className="visual-caption">Illustrative interface · Content availability varies</p>
        </div>
      </div>
    </section>
  );
}
const benefits = [
  {
    icon: Radio,
    title: 'Tune into live TV',
    copy: 'Discover viewing categories for your everyday routine. Check the specific channels you want before ordering.',
  },
  {
    icon: Trophy,
    title: 'Make it game night',
    copy: 'Explore sports viewing options and ask about the games, events, and schedules that matter to you.',
  },
  {
    icon: Clapperboard,
    title: 'Find your next escape',
    copy: 'Ask about available movies and series, then settle into a story that suits your evening.',
  },
  {
    icon: Monitor,
    title: 'Meet your favorite screen',
    copy: 'Start with the TV, phone, tablet, or computer you already own. We’ll help you check player compatibility.',
  },
  {
    icon: CalendarDays,
    title: 'See what’s coming up',
    copy: 'Browse program schedules where guide data is supported. Plan your evening without endless scrolling.',
  },
  {
    icon: Zap,
    title: 'A clearer path to setup',
    copy: 'Device-specific guides take you from choosing a player to testing picture, sound, and your first stream.',
  },
  {
    icon: Headphones,
    title: 'A conversation away',
    copy: 'Talk to KroozIPTV on WhatsApp for plan questions, availability checks, and help with your setup.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Your plan, your pace',
    copy: 'Choose from four subscription durations. Try your intended setup before making a longer commitment.',
  },
];
export function Benefits() {
  return (
    <section className="container section">
      <SectionHeading
        eyebrow="LESS FRICTION. MORE ENTERTAINMENT."
        title="All the good stuff. In your corner."
        description="A considered IPTV experience starts with the things that make everyday viewing easier."
      />
      <div className="feature-grid">
        {benefits.map((b) => (
          <article className="feature-card" key={b.title}>
            <b.icon strokeWidth={1.5} />
            <h3>{b.title}</h3>
            <p>{b.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
export function Entertainment() {
  return (
    <section className="container section" style={{ paddingTop: 15 }}>
      <div className="section-topline">
        <SectionHeading
          eyebrow="FIND YOUR KIND OF ENTERTAINMENT"
          title="Whatever you’re in the mood for."
          description="The big match. A movie marathon. A little discovery. Start with what you love."
        />
        <Link href="/channels" className="text-link">
          Explore all categories
          <ArrowUpRight size={17} />
        </Link>
      </div>
      <div className="entertainment-grid">
        {[
          [
            'stadium',
            'THE FRONT-ROW FEELING',
            'Live sports',
            'For the moments that bring everyone together.',
            'Football pitch and stadium stands for the live sports category',
          ],
          [
            'cinema',
            'PRESS PAUSE ON THE EVERYDAY',
            'Movie nights',
            'A good story. Your favorite seat.',
            'Vintage film projector and reels for the movie nights category',
          ],
          [
            'nature',
            'STAY A LITTLE CURIOUS',
            'A world to discover',
            'Nature, lifestyle, and new perspectives.',
            'Sunlit mountain valley for nature and documentary entertainment',
          ],
        ].map(([img, tag, title, copy, alt]) => (
          <Link href="/channels" key={img} className="entertainment-card">
            <Image
              src={`/images/${img}.webp`}
              alt={alt}
              fill
              sizes="(max-width:640px) 100vw, 40vw"
            />
            <div className="card-copy">
              <span className="eyebrow">{tag}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
              <ArrowUpRight />
            </div>
          </Link>
        ))}
      </div>
      <div className="category-strip">
        {['Sports', 'News', 'Entertainment', 'Movies', 'Kids', 'Lifestyle', 'International'].map(
          (c) => (
            <Link href="/channels" key={c}>
              {c}
            </Link>
          ),
        )}
      </div>
      <p className="disclaimer">
        Explore categories, then confirm current content availability with support. Images
        illustrate viewing themes.
      </p>
    </section>
  );
}
export function Sports() {
  return (
    <section className="sports-section section">
      <div className="container split-grid">
        <div className="sports-image">
          <Image
            src="/images/stadium.webp"
            alt="A floodlit sports stadium, illustrating live sports viewing"
            fill
            sizes="(max-width:640px) 100vw, 50vw"
          />
          <span>
            The lights are on.
            <br />
            Make a night of it.
          </span>
        </div>
        <div>
          <span className="eyebrow">FOR THE LOVE OF THE GAME</span>
          <h2>
            Your couch.
            <br />
            Front-row energy.
          </h2>
          <p>
            From Sunday football to a midweek tip-off, build your viewing around the sports you
            follow. Tell us the event, date, and your location, and we’ll help you check current
            availability before you choose a plan.
          </p>
          <div className="sports-tags">
            {[
              'Football',
              'Basketball',
              'Baseball',
              'Hockey',
              'Soccer',
              'Combat sports',
              'Motorsports',
              'College sports',
            ].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <WhatsAppButton
            className="outline"
            source="home-sports"
            message="Hi KroozIPTV, I would like to check availability for a sports event. Please help me confirm the event, date, and location before ordering."
          >
            Check your game’s availability
          </WhatsAppButton>
          <p className="disclaimer">
            Channel and event availability may vary by package, location, rights, and schedule. No
            league or network affiliation is implied.
          </p>
        </div>
      </div>
    </section>
  );
}
export function HomeEditorial() {
  return (
    <section className="container section editorial-grid">
      <SectionHeading
        eyebrow="A BETTER FIT FOR YOUR ROUTINE"
        title="Entertainment on your terms. Really."
        description="Start with the way you watch, then choose the setup and subscription that make sense for you."
      />
      <div className="editorial-copy">
        <div>
          <h3>One evening. Plenty of possibilities.</h3>
          <p>
            Some nights call for a live game. Others are made for a familiar show, a documentary, or
            something new to watch together. IPTV delivers television over an internet connection
            through a compatible player, giving you another way to organize your viewing. The
            experience depends on your account, device, player, and network working well together.
          </p>
          <p>
            Begin with a short list of what you want to watch. A category such as sports or movies
            is a starting point for a conversation, not a guarantee of a particular channel. Use our{' '}
            <Link href="/channels">channel request directory</Link> and ask support about your
            priorities. If one event or local feed is essential, confirm that detail before paying.
          </p>
        </div>
        <div>
          <h3>The best screen might already be yours.</h3>
          <p>
            A familiar television, a supported streaming device, or your everyday laptop may be
            enough to get started. Check the exact model and operating system first: smart TVs do
            not all share the same app store, and a player available on a phone may not be designed
            for a remote. Our <Link href="/devices">device overview</Link> helps you find the
            relevant setup path.
          </p>
          <p>
            Keep player fees separate from the service price. Some third-party apps require their
            own license, and installing an app does not activate a subscription. Likewise,
            compatibility with multiple devices does not promise multiple simultaneous streams.
            Confirm your household’s connection allowance in the order conversation.
          </p>
        </div>
        <div>
          <h3>Choose a duration with confidence.</h3>
          <p>
            A shorter plan can be a practical way to learn how a setup fits your routine. A longer
            duration may suit a viewer who has already tested the player, confirmed the content they
            care about, and understands the account conditions. Compare the{' '}
            <Link href="/pricing">four KroozIPTV plans</Link> by commitment as well as price,
            without assuming every package can replace every traditional television service.
          </p>
          <p>
            Ordering happens through WhatsApp. Your selected plan is included in the message,
            leaving room to confirm availability, total price, payment instructions, and activation
            timing before any payment. Keep those agreed details and the order reference for future
            support. There is no card-entry form or automatic checkout on this site.
          </p>
        </div>
        <div>
          <h3>A useful test beats a big promise.</h3>
          <p>
            Test the device you intend to use, in the room where you watch, during your usual
            viewing hours. Check picture, audio, captions, guide readability, and remote navigation.
            A stable connection matters more than the largest number on a broadband advert, and
            other household traffic can affect the result. Ethernet is a useful comparison when
            Wi-Fi is inconsistent.
          </p>
          <p>
            If something needs attention, our{' '}
            <Link href="/blog/iptv-buffering-fix">buffering checklist</Link> and{' '}
            <Link href="/blog/iptv-not-working">troubleshooting guide</Link> help separate a local
            network issue from an app, account, or channel problem. Share the exact symptom with
            support rather than repeatedly resetting the whole setup. A little clarity at the
            beginning makes everyday viewing easier.
          </p>
        </div>
      </div>
    </section>
  );
}
export function CategoryPreview() {
  return (
    <section className="container section">
      <div className="section-topline">
        <SectionHeading
          eyebrow="MAKE YOUR WATCHLIST"
          title="A category for every kind of evening."
          description="Explore common viewing interests, including local and regional requests. Ask us to confirm your must-haves."
        />
        <Link href="/channels" className="text-link">
          Explore Channels
          <ArrowRight size={17} />
        </Link>
      </div>
      <div className="category-strip">
        {[
          'Sports',
          'News',
          'Entertainment',
          'Movies',
          'Kids',
          'Lifestyle',
          'International',
          'Local / Regional',
        ].map((c) => (
          <Link href="/channels" key={c}>
            {c}
            <span aria-hidden="true"> ↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
