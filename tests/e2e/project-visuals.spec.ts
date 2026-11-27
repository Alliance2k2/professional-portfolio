import { test, expect } from '@playwright/test';

test('home stays concise and Work and Research open dedicated pages', async ({
  page,
  isMobile,
}) => {
  await page.goto('/');
  await expect(page.locator('.home-destination')).toHaveCount(2);
  await expect(
    page.locator('.project-card, .timeline, .skills-grid'),
  ).toHaveCount(0);
  await page.screenshot({
    path: `work-sample-assets/focused-home-${isMobile ? 'mobile' : 'desktop'}.png`,
    fullPage: true,
  });
  await page
    .getByRole('link', { name: 'Explore my work', exact: true })
    .click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.locator('.project-card')).toHaveCount(8);
  await expect(page.locator('.project-preview img')).toHaveCount(8);
  await expect(page.locator('.project-cover')).toHaveCount(0);
  for (const image of await page.locator('.project-preview img').all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element: HTMLImageElement) => element.decode());
    expect(
      await image.evaluate(
        (element: HTMLImageElement) => element.naturalWidth > 0,
      ),
    ).toBe(true);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({
    path: `work-sample-assets/focused-work-${isMobile ? 'mobile' : 'desktop'}.png`,
    fullPage: true,
  });
  await page.goto('/');
  await page
    .getByRole('link', { name: 'Explore research', exact: true })
    .click();
  await expect(page).toHaveURL(/\/research$/);
  await expect(page.locator('.project-card')).toHaveCount(2);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test('project visuals browse individually and enlarge at original size', async ({
  page,
  isMobile,
}) => {
  await page.goto('/projects/cs-ircfs');
  await expect(page.locator('.active-visual-image')).toHaveCount(1);
  await expect(page.locator('.active-visual-image')).toHaveAttribute(
    'src',
    '/projects/cs-ircfs-landing.webp',
  );
  await page.getByRole('button', { name: 'Next visual', exact: true }).click();
  await expect(page.locator('.active-visual-image')).toHaveAttribute(
    'src',
    '/projects/cs-ircfs-district-map.webp',
  );
  await page.getByRole('button', { name: 'Enlarge', exact: true }).click();
  const viewer = page.getByRole('dialog', {
    name: 'Project visuals: enlarged visual',
  });
  await expect(viewer).toBeVisible();
  await page.screenshot({
    path: `work-sample-assets/focused-viewer-${isMobile ? 'mobile' : 'desktop'}.png`,
  });
  await viewer
    .getByRole('button', { name: 'View original size', exact: true })
    .click();
  await expect(page.locator('.visual-viewer-scroll')).toHaveClass(
    /is-original-size/,
  );
  const image = viewer.locator('img');
  await image.evaluate((el: HTMLImageElement) => el.decode());
  expect(
    await image.evaluate(
      (el: HTMLImageElement) =>
        Math.round(el.getBoundingClientRect().width) === el.naturalWidth,
    ),
  ).toBe(true);
  await page.keyboard.press('Escape');
  await expect(viewer).not.toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Enlarge', exact: true }),
  ).toBeFocused();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
