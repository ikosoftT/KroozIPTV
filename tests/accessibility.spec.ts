import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
for (const route of [
  '/',
  '/pricing',
  '/channels',
  '/free-trial',
  '/blog',
  '/blog/iptv-buffering-fix',
  '/setup/firestick',
  '/contact',
  '/privacy-policy',
]) {
  test(`WCAG A/AA audit ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
test('mobile navigation accessibility', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
