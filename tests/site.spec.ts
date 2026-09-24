import { test, expect } from '@playwright/test';
const core = [
  '/',
  '/pricing',
  '/free-trial',
  '/channels',
  '/blog',
  '/devices',
  '/setup',
  '/faq',
  '/contact',
  '/about',
  '/privacy-policy',
  '/terms',
  '/refund-policy',
];
test('every sitemap route renders unique, canonical, server-visible content and valid schemas', async ({
  request,
}) => {
  const response = await request.get('/sitemap.xml');
  expect(response.ok()).toBeTruthy();
  const sitemap = await response.text();
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  expect(new Set(urls).size).toBe(urls.length);
  expect(urls).toEqual(expect.arrayContaining(core));
  expect(urls.filter((p) => p.startsWith('/blog/'))).toHaveLength(10);
  expect(urls.filter((p) => p.startsWith('/setup/')).length).toBeGreaterThanOrEqual(9);
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const path of urls) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(200);
    const html = await res.text();
    expect([...html.matchAll(/<h1(?:\s[^>]*)?>/g)], path).toHaveLength(1);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    expect(title, path).toBeTruthy();
    expect(titles.has(title!), `duplicate title ${path}`).toBeFalsy();
    titles.add(title!);
    const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];
    expect(description, path).toBeTruthy();
    expect(descriptions.has(description!), `duplicate description ${path}`).toBeFalsy();
    descriptions.add(description!);
    expect(html).toContain(
      `rel="canonical" href="https://krooztvus.us${path === '/' ? '' : path}"`,
    );
    expect(html).not.toContain('content="noindex');
    expect(html).toContain('property="og:title"');
    expect(html).toContain('name="twitter:card"');
    expect(html.toLowerCase()).not.toContain('lorem ipsum');
    for (const match of html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    )) {
      expect(() => JSON.parse(match[1])).not.toThrow();
    }
    for (const match of html.matchAll(/<img\b[^>]*>/g)) {
      expect(match[0], path).toMatch(/\balt="/);
    }
    const links = [...html.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]);
    for (const href of links) {
      if (href.startsWith('/_next/') || /\.[a-z0-9]+$/i.test(href)) continue;
      expect(urls, `${path} -> ${href}`).toContain(href);
    }
  }
  const robots = await request.get('/robots.txt');
  expect(await robots.text()).toContain('https://krooziptv.vercel.app/sitemap.xml');
  expect((await request.get('/this-page-does-not-exist')).status()).toBe(404);
});
test('homepage preserves pricing priority and sends correct plan messages', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('KroozIPTV');
  const sections = page.locator('main > section');
  await expect(sections.nth(0)).toHaveClass('hero');
  await expect(sections.nth(1)).toHaveAttribute('id', 'pricing');
  for (const [duration, price] of [
    [1, 15],
    [3, 30],
    [6, 55],
    [12, 85],
  ]) {
    const link = page.locator('#pricing').getByRole('link', {
      name: `Choose ${duration} ${duration === 1 ? 'Month' : 'Months'}`,
      exact: true,
    });
    const url = new URL((await link.getAttribute('href'))!);
    expect(url.pathname).toBe('/212624637669');
    expect(url.searchParams.get('text')).toContain(`$${price}`);
    expect(url.searchParams.get('text')).toContain(
      `${duration} ${duration === 1 ? 'Month' : 'Months'}`,
    );
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  }
});
test('directory search and filters work together, including empty state', async ({ page }) => {
  await page.goto('/channels');
  const input = page.getByRole('searchbox');
  await input.fill('ESPN');
  await expect(page.locator('.channel-card')).toHaveCount(2);
  await page.getByRole('button', { name: 'News', exact: true }).click();
  await expect(page.locator('.channel-card')).toHaveCount(0);
  await expect(page.getByText('No matching requests')).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(input).toHaveValue('');
  await expect(page.locator('.channel-card')).toHaveCount(38);
  await page.getByRole('button', { name: 'Kids', exact: true }).click();
  await expect(page.locator('.channel-card')).toHaveCount(3);
});
test('trial selection creates a contextual encoded message and analytics event', async ({
  page,
}) => {
  await page.goto('/free-trial');
  await page.getByLabel('What will you watch on?').selectOption('Apple TV');
  await page.getByLabel('Anything you’d like to check?').fill('News & captions?');
  const link = page.getByRole('link', { name: 'Request Your Free Trial' });
  const url = new URL((await link.getAttribute('href'))!);
  expect(url.hostname).toBe('wa.me');
  expect(url.searchParams.get('text')).toContain('My device is Apple TV.');
  expect(url.searchParams.get('text')).toContain('News & captions?');
  await page.evaluate(() => {
    window.addEventListener('krooz:analytics', (e) => {
      document.body.dataset.analytics = JSON.stringify((e as CustomEvent).detail);
    });
  });
  await page.route('https://wa.me/**', (route) => route.abort());
  await link.click({ noWaitAfter: true });
  await expect(page.locator('body')).toHaveAttribute('data-analytics', /free-trial-form/);
});
test('mobile dialog traps focus, closes with escape, and restores scroll', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Open navigation' });
  await trigger.click();
  await expect(page.locator('dialog.mobile-dialog')).toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');
  for (let i = 0; i < 12; i++) await page.keyboard.press('Tab');
  expect(
    await page.evaluate(() => Boolean(document.activeElement?.closest('dialog'))),
  ).toBeTruthy();
  await page.keyboard.press('Escape');
  await expect(page.locator('dialog.mobile-dialog')).not.toBeVisible();
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
  await trigger.click();
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Pricing', exact: true })
    .click();
  await expect(page).toHaveURL('/pricing');
  await expect(page.locator('dialog.mobile-dialog')).not.toBeVisible();
});
test('FAQ keyboard operation and article table of contents', async ({ page }) => {
  await page.goto('/faq');
  const summary = page.locator('.faq-list summary').first();
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.faq-list details').first()).toHaveAttribute('open', '');
  await page.goto('/blog/iptv-buffering-fix');
  const link = page.locator('.toc a').nth(2);
  const href = await link.getAttribute('href');
  await link.click();
  await expect(page).toHaveURL(new RegExp(`${href}$`));
  await expect(page.locator('article.prose')).toContainText('Ethernet');
});
for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440]) {
  test(`responsive layouts remain inside viewport at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      '/',
      '/pricing',
      '/channels',
      '/free-trial',
      '/blog/iptv-buffering-fix',
      '/setup/smart-tv',
    ]) {
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        `${path} overflows at ${width}`,
      ).toBeTruthy();
      expect(errors).toEqual([]);
      await expect(page.locator('h1')).toBeVisible();
    }
  });
}

test('all homepage images have descriptive alt text, including the six category images', async ({
  page,
}) => {
  await page.goto('/');
  const images = page.locator('main img');
  expect(await images.count()).toBeGreaterThan(6);
  await expect(page.locator('main img:not([alt]), main img[alt=""]')).toHaveCount(0);
  for (const image of await images.all()) {
    expect((await image.getAttribute('alt'))?.trim().length).toBeGreaterThan(10);
  }
  await expect(page.locator('.tv-tile img')).toHaveCount(3);
  await expect(page.locator('.entertainment-card img')).toHaveCount(3);
});

test('movie slider supports arrows, keyboard boundaries, local posters, and title inquiries', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  const section = page.locator('#movie-night');
  const track = page.locator('#movie-track');
  await section.scrollIntoViewIfNeeded();
  await expect(track.locator('li')).toHaveCount(8);
  const previous = page.getByRole('button', { name: 'Previous movies' });
  const next = page.getByRole('button', { name: 'Next movies' });
  await expect(previous).toBeDisabled();
  await next.click();
  await expect.poll(() => track.evaluate((e) => e.scrollLeft)).toBeGreaterThan(100);
  await expect(previous).toBeEnabled();
  await track.focus();
  await page.keyboard.press('End');
  await expect(next).toBeDisabled();
  await page.keyboard.press('Home');
  await expect(previous).toBeDisabled();
  const firstImage = track.locator('img').first();
  await expect
    .poll(() => firstImage.evaluate((e) => (e as HTMLImageElement).naturalWidth))
    .toBeGreaterThan(0);
  expect(decodeURIComponent((await firstImage.getAttribute('src'))!)).toContain('/images/movies/');
  const url = new URL((await track.locator('a').first().getAttribute('href'))!);
  expect(url.hostname).toBe('wa.me');
  expect(url.searchParams.get('text')).toContain('Charade (1963)');
  await page.setViewportSize({ width: 320, height: 844 });
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
    .toBeTruthy();
  expect(await track.evaluate((e) => e.scrollWidth > e.clientWidth)).toBeTruthy();
  await page.goto('/about#movie-artwork-credits');
  await expect(page.locator('#movie-artwork-credits')).toBeVisible();
  await expect(page.locator('.movie-credits-grid a')).toHaveCount(8);
});
