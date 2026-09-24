import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Clapperboard } from 'lucide-react';
import movies from '@/data/movies.json';
import { MovieCarousel } from './movie-carousel';
import { SectionHeading } from './ui';
import { WhatsAppButton } from './whatsapp';
export function MovieSection() {
  return (
    <section
      className="movie-section section"
      id="movie-night"
      aria-labelledby="movie-night-heading"
    >
      <div className="container">
        <div className="section-topline">
          <div className="section-heading">
            <span className="eyebrow">FOR THE LOVE OF A GOOD STORY</span>
            <h2 id="movie-night-heading">Make it a movie night.</h2>
            <p>
              Big characters. Unforgettable stories. Browse a few classic favorites and find your
              next conversation starter.
            </p>
          </div>
          <Link href="/channels" className="text-link">
            Explore entertainment
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <MovieCarousel count={movies.length}>
          {movies.map((movie, index) => (
            <li key={movie.id} className="movie-card">
              <div className="movie-poster">
                <Image
                  src={movie.image}
                  alt={movie.posterAlt}
                  fill
                  sizes="(max-width:640px) 66vw, (max-width:900px) 32vw, (max-width:1150px) 24vw, 230px"
                />
                <span className="movie-number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="movie-poster-label">
                  <Clapperboard size={12} />
                  CLASSIC PICK
                </span>
              </div>
              <div className="movie-copy">
                <div className="movie-meta">
                  <span>{movie.year}</span>
                  <span>{movie.genre}</span>
                </div>
                <h3>{movie.title}</h3>
                <WhatsAppButton
                  source={`movie-${movie.id}`}
                  className="text-link"
                  message={`Hi KroozIPTV, is ${movie.title} (${movie.year}) available in my location and package? Please confirm before I order.`}
                >
                  Ask about this movie
                </WhatsAppButton>
              </div>
            </li>
          ))}
        </MovieCarousel>
        <div className="movie-footnote">
          <p>
            Movie-night inspiration, not a confirmed catalog. Ask us about current title
            availability before ordering.
          </p>
          <Link href="/about#movie-artwork-credits">
            Artwork credits
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
export function MovieCredits() {
  return (
    <section id="movie-artwork-credits" className="container section">
      <SectionHeading
        eyebrow="MOVIE ARTWORK"
        title="A little credit where it’s due."
        description="The movie-night selection uses locally optimized scans of classic posters from Wikimedia Commons. Source pages document the artwork’s public-domain status in the United States and any territorial details. Artwork reuse is separate from film distribution rights."
      />
      <div className="movie-credits-grid">
        {movies.map((m) => (
          <a
            key={m.id}
            href={`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(m.sourceFile.replaceAll(' ', '_'))}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {m.title} ({m.year})<ArrowUpRight size={15} />
            <span>Poster source & rights information</span>
          </a>
        ))}
      </div>
    </section>
  );
}
