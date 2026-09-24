'use client';
import { useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import { categories, channels } from '@/data/channels';
import { WhatsAppButton } from './whatsapp';
export function ChannelSearch() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const filtered = channels.filter(
    (c) =>
      (category === 'All' || c.category === category) &&
      `${c.name} ${c.category}`.toLowerCase().includes(query.toLowerCase().trim()),
  );
  return (
    <div className="directory">
      <label htmlFor="channel-search" className="input-label">
        Find a channel or entertainment category
      </label>
      <div className="search-field">
        <Search size={21} />
        <input
          id="channel-search"
          type="search"
          placeholder="Search ESPN, movies, news…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="filter-pills" aria-label="Filter channels by category">
        {['All', ...categories].map((c) => (
          <button key={c} onClick={() => setCategory(c)} aria-pressed={category === c}>
            {c}
          </button>
        ))}
      </div>
      <p className="result-count" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'request' : 'requests'} found · Availability must
        be confirmed
      </p>
      <div className="channel-grid">
        {filtered.map((c) => (
          <article className="channel-card" key={c.name}>
            <span className="eyebrow">{c.category}</span>
            <h3>{c.name}</h3>
            <WhatsAppButton
              source="channels"
              message={`Hi KroozIPTV, is ${c.name} available in my location and selected package? Please confirm current availability before I order.`}
              className="text-link"
              icon={false}
            >
              Check availability
              <ArrowUpRight size={15} />
            </WhatsAppButton>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="empty-state">
          <h3>No matching requests</h3>
          <p>Try a shorter name or ask us about a channel that isn’t listed.</p>
          <button
            className="button outline"
            onClick={() => {
              setQuery('');
              setCategory('All');
            }}
          >
            Clear filters
          </button>
          <WhatsAppButton
            source="channels-empty"
            message={`Hi KroozIPTV, can you check availability for: ${query}?`}
          >
            Ask about this channel
          </WhatsAppButton>
        </div>
      )}
    </div>
  );
}
