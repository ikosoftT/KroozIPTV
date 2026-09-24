# KroozIPTV

A complete, statically rendered Next.js App Router website for KroozIPTV. Dark entertainment design, pricing immediately after the homepage hero, WhatsApp ordering, searchable channel requests, device-specific setup guidance, and an internally linked editorial library.

## Run locally

Requires Node.js 22 LTS or a compatible version supported by the pinned Next.js release.

```bash
npm ci
cp .env.example .env.local
# Edit .env.local with the real public origin and WhatsApp number.
npm run dev
```

Open http://localhost:3000. A configured `.env.local` was created in the delivered workspace using the supplied WhatsApp number; it is intentionally ignored by Git. Do not overwrite it unless reconfiguring the site.

```bash
npm run lint          # ESLint, including Next.js and TypeScript rules
npm run typecheck     # Strict TypeScript checks
npm run build         # Production build and static prerendering
npm run start         # Serve the production build on port 3000
npm test              # Playwright behavior, responsive, SEO, and axe audits
npm run format        # Format source code with Prettier
npm run format:check  # Check formatting
npm run check:launch  # Verify origin, WhatsApp, and owner review acknowledgment
```

For browser tests, first run `npx playwright install chromium`. Tests start a production server if one is not already running. Build before testing source changes. External WhatsApp navigation is intercepted in tests; tests do not send messages or place orders.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Absolute HTTPS production origin for canonicals, metadata, schemas, robots, and sitemap. The code fallback is `https://krooztvus.us`; the example file deliberately requires deployment-specific configuration. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | International phone number; punctuation is normalized. The supplied workspace value is `212624637669`. |
| `NEXT_PUBLIC_GA_ID` | Reserved for an optional analytics integration; no third-party tracking is automatically loaded. |
| `OWNER_CONTENT_VERIFIED` | Set to `true` only after reviewing the owner-dependent launch items below. This flag is a checklist acknowledgment, not a replacement for editing the policies. |

All `NEXT_PUBLIC_` values are public and embedded at build time. Rebuild after changing them. No private credentials belong in these variables.

If the WhatsApp number is missing or invalid, buttons open an honest unavailable-state dialog rather than a broken link or an invented recipient. No order is silently stored. Trial notes are held only in page state, then encoded into the WhatsApp destination for the user to review and send.

## Pages

- Commercial: `/`, `/pricing`, `/free-trial`, `/channels`
- Editorial: `/blog` and the ten article slugs in `data/posts.ts`
- Setup: `/setup` plus 12 device/player guides, including Fire TV, Android/Google TV, smart TVs, Apple TV, iPhone/iPad, Windows, macOS, Smarters, TiviMate, Android mobile, NVIDIA Shield, and MAG-compatible devices
- Support: `/devices`, `/faq`, `/contact`, `/about`
- Policies: `/privacy-policy`, `/terms`, `/refund-policy`
- Technical: `/sitemap.xml`, `/robots.txt`, `/icon.svg`, and a branded 404

There are 35 canonical content routes. Unknown article, setup, and support slugs return a real 404. Important copy, pricing, FAQs, and directory entries exist in the initial HTML.

## Structure

```text
app/                     App Router pages, metadata routes, global tokens/CSS
  [slug]/                Data-driven supporting and policy pages
  blog/[slug]/           Static articles with metadata and BlogPosting schema
  setup/[slug]/          Static device-specific guides
components/              Layout, pricing, hero, editorial, forms, filters, SEO
content/                 Complete authored articles and commercial/policy copy
  *.md                   A deliberately small Markdown subset
  
data/                    Typed canonical pricing, channels, devices, FAQs, posts
lib/                     Site/owner config, types, content readers, SEO, analytics
public/images/           Local optimized photography and original SVG artwork
public/brand/            Logo asset
scripts/                 Launch configuration and asset-generation helpers
tests/                   Playwright route, behavior, viewport, and axe checks
artifacts/               Local visual and Lighthouse review artifacts
```

Server Components are the default. Only navigation, WhatsApp interactions, trial controls, and search/filter controls hydrate. FAQs use native accessible `details` elements. The mobile menu uses a native modal dialog for focus containment and Escape handling; opening it locks body scrolling.

## Update pricing

Edit `data/pricing.ts`. The four duration/price definitions generate cards, comparison values, and contextual WhatsApp messages. Prices are integers. The annual Best Value label refers to the listed per-month comparison, not fabricated popularity. Do not duplicate prices in editorial copy.

## Update WhatsApp and analytics

Change `NEXT_PUBLIC_WHATSAPP_NUMBER`, then rebuild. `lib/whatsapp.ts` validates the number and URL-encodes the message. `WhatsAppButton`, `PlanCTA`, and `FloatingWhatsApp` are in `components/whatsapp.tsx`.

`trackEvent` dispatches `krooz:analytics` in the browser with a source and optional plan identifier. It does not send data to an external service. To add analytics, explicitly implement an adapter, provide any appropriate user controls, and update the privacy notice first. Do not capture message contents, trial notes, credentials, or full WhatsApp URLs.

## Channel requests

Add entries to `data/channels.ts` using an existing typed category, or extend the category type and filter list together. These are **requests, not a confirmed channel lineup**. Preserve the visible availability disclaimer and contextual check buttons. Do not add network logos, guaranteed availability, or affiliation claims without verified permission and operator confirmation.

Search combines a case-insensitive name/category match with the selected category. It runs in the browser and has a clear empty state and reset action.

## Articles and content

1. Write `content/<slug>.md` with a meaningful introduction under its first `## Heading`, followed by useful distinct sections.
2. Add the entry in `data/posts.ts`: slug, title, description, category, local image and alt text, related slugs, FAQs, and appropriate primary-source references.
3. Use `[descriptive text](/internal/path)` for contextual internal links. This project intentionally supports `##` sections, plain paragraphs, and inline links; it does not claim full Markdown/MDX support.
4. Use real publication dates. The initial content date is September 24, 2026. Do not automatically refresh article dates on each request. Add a separate modified date when a material revision is actually made.
5. The index, static params, sitemap, TOC, read time, breadcrumbs, and schemas derive from the post records.

Device guides live in `data/devices.ts`. Each has distinct installation, login, playback, and troubleshooting guidance. Shared safety and preparation text supports those device-specific instructions rather than replacing them.

Supporting page metadata is in `data/pages.ts`; supporting prose is in `content/`. The core commercial routes have explicit page components and their own authored documents.

## Metadata and SEO

`lib/seo.ts` produces unique page titles, descriptions, canonical URLs, Open Graph, and Twitter data. The root layout sets `metadataBase`, language, Organization, and WebSite schema. Visible breadcrumbs and BreadcrumbList use the same data. Articles add BlogPosting with the actual byline and fixed publication date. There are no fabricated reviews, ratings, awards, or unsupported FAQ rich-result claims.

`app/sitemap.ts` includes only canonical content routes; dates reflect this content release. `app/robots.ts` allows public crawling and references the configured sitemap. Next handles trailing slashes. Configure HTTPS and a single www/non-www hostname at the deployment layer; do not rely on metadata to enforce redirects.

## Images and design

The responsive design uses local WebP photography, original SVG diagrams, `next/image`, and self-hosted `next/font` output. No poster library or network logo was scraped. The hero is a clearly labeled illustrative interface rather than a working or promised catalog. Below-fold photography is lazy-loaded; the hero image receives priority loading.

Photographic source URLs and original assets:

- Mountain peaks: https://images.unsplash.com/photo-1464822759023-fed622ff2c3b
- Stadium: https://images.unsplash.com/photo-1522778119026-d647f0596c20
- Cinema equipment: https://images.unsplash.com/photo-1440404653325-ab127d49abc1
- Nature landscape: https://images.unsplash.com/photo-1469474968028-56623f02e42e
- Photography usage terms: https://unsplash.com/license
- All diagram SVGs, logo treatment, and the TV frame are original project artwork/code.

`public/images/social.jpg` is the default 1200×630 social asset. `scripts/create-assets.mjs` documents optimization and artwork generation; it expects source JPEG files only when regenerating photographic WebP assets. It is not required to run the website.

## Validation

The browser suite covers all sitemap routes for HTTP success, unique titles/descriptions, a single H1, canonical metadata, social metadata, valid JSON-LD, alt attributes, and internal links. Functional checks cover selected-plan WhatsApp messages, channel filters/empty states, trial message encoding, local analytics events, keyboard FAQs, article anchors, and modal focus/scroll behavior.

Responsive checks run representative commercial and article/setup routes at 320, 375, 390, 430, 768, 1024, 1280, and 1440 pixels. Automated axe scans cover nine page types and the open mobile menu. These scans supplement visual/keyboard review and do not constitute a guarantee of complete accessibility compliance.

Local Lighthouse results are lab observations, not a guarantee of field Core Web Vitals, hosting latency, or rankings. Run an audit again against the final deployed origin.

## Deploy

1. Complete the owner review below and edit source copy/configuration to match the actual service.
2. Set the final environment values in the hosting provider before building.
3. Run `npm ci`, `npm run lint`, `npm run build`, and `npm test`.
4. Run `npm run check:launch`.
5. Deploy with a Next.js-compatible Node host or managed Next.js platform. Use `npm run build` and `npm run start` for a Node deployment. This project uses server-side image optimization and is not configured as a plain static export.
6. Configure TLS and permanent redirects to one canonical hostname. Keep any preview/staging deployment access-controlled or non-indexable at the hosting layer without altering public production indexing.
7. Check live page responses, sitemap, robots, image delivery, canonical origin, and WhatsApp recipient/messages. Submit the sitemap through the owner’s search tooling if desired.

### Owner-dependent launch review

The development build works with the supplied number. Public deployment has not been performed. Before launch, the owner must verify and finalize:

- Contracting legal identity, jurisdiction, business/contact information, and the policy text. `lib/owner-config.ts` intentionally contains empty verified-detail fields, and the policy route has the required source TODO.
- Actual refund/cancellation conditions, activation process, payment instructions, trial availability/duration, and active connection limits. No invented guaranteed window, response time, or refund entitlement has been presented as fact.
- Rights and current package/channel availability, service locations, and any content claims to be advertised.
- Hosting/log retention and handling of WhatsApp/order conversations. Update privacy text for any added analytics or data services.
- Final production hostname and the supplied WhatsApp recipient.

`check:launch` intentionally reports the outstanding review until it is acknowledged. The production build itself does not silently fail or pretend those business facts are verified.

## Movie-night slider and image alt text

The homepage now includes an eight-film, manually curated classic movie slider after the entertainment category section. Pricing remains immediately after the hero. Native horizontal scrolling provides touch/swipe navigation; arrow buttons, keyboard Left/Right/Home/End, disabled boundary controls, and reduced-motion support are included. It does not autoplay or imply that the films are available through KroozIPTV. Each card asks support about that exact title and year.

The selection is labeled **Movie-night picks/classic picks**, not “viral” or a live trending feed. The owner requested free assets without TMDB access. The artwork therefore comes from public-domain poster records on Wikimedia Commons, with the individual source and territorial copyright rationale available through `/about#movie-artwork-credits` and `data/movie-credits.json`. No TMDB API key, subscription, client-side image fetch, or invented trend ranking is used. A movie poster’s reuse status does not establish rights to distribute the film.

- Curated records: `data/movies.json`
- Local optimized posters: `public/images/movies/*.webp`
- Download/rights provenance: `data/movie-credits.json`
- Repeatable import: `npm run images:movies`
- Slider interaction: `components/movie-carousel.tsx`
- Server-rendered cards and credits: `components/movies.tsx`

The importer resolves each reviewed Commons file through its public API, checks its public-domain label, downloads it from Wikimedia, and creates a 480×720 WebP while preserving the complete poster. It is a maintenance command, not a dependency of page rendering or production builds. Review rights information before replacing source records; the script’s metadata check does not replace that review. Commit the generated poster files and credits when changing the selection, then rebuild.

The six previously empty alt attributes on the TV-preview tiles and entertainment cards now describe their actual imagery. All current homepage images, including movie posters, have meaningful nonempty alt text. Browser regression checks cover this and the slider’s navigation, local image loading, and contextual WhatsApp messages.
