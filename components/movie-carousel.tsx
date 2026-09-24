'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/** Native scrolling keeps the poster list available without JS and supports touch. */
export function MovieCarousel({ children, count }: { children: React.ReactNode; count: number }) {
  const track = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState({
    first: 1,
    last: 1,
    canPrevious: false,
    canNext: true,
  });

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    function update() {
      if (!element) return;
      const box = element.getBoundingClientRect();
      const visible = Array.from(element.children)
        .map((child, i) => ({ box: child.getBoundingClientRect(), index: i + 1 }))
        .filter((child) => child.box.left >= box.left - 2 && child.box.right <= box.right + 2);
      const maxScroll = element.scrollWidth - element.clientWidth;
      const next = {
        first: visible[0]?.index ?? 1,
        last: visible.at(-1)?.index ?? 1,
        canPrevious: element.scrollLeft > 2,
        canNext: element.scrollLeft < maxScroll - 2,
      };
      setPosition((previous) =>
        previous.first === next.first &&
        previous.last === next.last &&
        previous.canPrevious === next.canPrevious &&
        previous.canNext === next.canNext
          ? previous
          : next,
      );
    }
    const frame = requestAnimationFrame(update);
    element.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, []);

  function move(direction: number) {
    const element = track.current;
    if (!element) return;
    const card = element.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
    const step = card ? card.offsetWidth + gap : element.clientWidth;
    const columns = Math.max(1, Math.floor((element.clientWidth + gap) / step));
    element.scrollBy({
      left: direction * step * columns,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }

  return (
    <div className="movie-carousel">
      <div className="movie-carousel-tools">
        <p>
          <span className="status-dot" /> A little cinema inspiration
        </p>
        <div className="movie-controls">
          <span className="movie-position" aria-live="polite" aria-atomic="true">
            {position.first}
            {position.last !== position.first ? `–${position.last}` : ''} <span>of {count}</span>
          </span>
          <button
            type="button"
            className="icon-button"
            aria-label="Previous movies"
            aria-controls="movie-track"
            disabled={!position.canPrevious}
            onClick={() => move(-1)}
          >
            <ArrowLeft size={19} />
          </button>
          <button
            type="button"
            className="icon-button"
            aria-label="Next movies"
            aria-controls="movie-track"
            disabled={!position.canNext}
            onClick={() => move(1)}
          >
            <ArrowRight size={19} />
          </button>
        </div>
      </div>
      <ul
        ref={track}
        id="movie-track"
        className="movie-track"
        tabIndex={0}
        aria-label="Movie-night picks. Swipe or use the arrow buttons to browse."
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            move(event.key === 'ArrowRight' ? 1 : -1);
          } else if (event.key === 'Home' || event.key === 'End') {
            event.preventDefault();
            track.current?.scrollTo({
              left: event.key === 'Home' ? 0 : track.current.scrollWidth,
              behavior: 'instant',
            });
          }
        }}
      >
        {children}
      </ul>
    </div>
  );
}
