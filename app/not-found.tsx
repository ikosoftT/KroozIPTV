import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="container error-page">
      <span className="eyebrow">404 · THIS CHANNEL IS OFF THE AIR</span>
      <h1>Let’s find something worth watching.</h1>
      <p>
        That page isn’t here. Head back to the plans, find a setup guide, or return home to explore
        KroozIPTV.
      </p>
      <div className="hero-actions">
        <Link href="/" className="button primary">
          Back to Home
        </Link>
        <Link href="/setup" className="button outline">
          Find a Setup Guide
        </Link>
      </div>
    </section>
  );
}
