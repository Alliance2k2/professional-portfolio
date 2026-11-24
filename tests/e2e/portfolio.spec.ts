import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('home is accessible, theme persists, assistant answers', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Turning complexity',
  );
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  const theme = await page.locator('html').getAttribute('data-theme');
  await page.getByRole('button', { name: 'Toggle color theme' }).click();
  await page.reload();
  await expect(page.locator('html')).not.toHaveAttribute(
    'data-theme',
    theme ?? 'dark',
  );
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole('button', { name: 'Ask Alliance AI' }).click();
  await page
    .getByRole('textbox', { name: 'Ask about the portfolio' })
    .fill('What is your education?');
  await page.getByRole('button', { name: 'Ask', exact: true }).click();
  await expect(
    page.getByRole('link', { name: 'Education', exact: true }).last(),
  ).toBeVisible();
  await expect(page.getByRole('status')).toContainText('MSc');
  await page.keyboard.press('Escape');
  await expect(
    page.getByRole('button', { name: 'Ask Alliance AI' }),
  ).toBeFocused();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});
test('all essential pages and case studies resolve', async ({ page }) => {
  for (const route of [
    '/about',
    '/experience',
    '/education',
    '/projects',
    '/research',
    '/skills',
    '/certifications',
    '/blog',
    '/resume',
    '/contact',
    '/privacy',
    '/projects/cs-ircfs',
    '/projects/cs-evidence-assistant',
    '/projects/financial-stability-africa',
    '/projects/malaria-functional-analysis',
    '/projects/arrowstack-identity',
    '/projects/last-mile-logistics',
    '/projects/production-optimization',
    '/research/malaria',
    '/research/citizen-science',
  ]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  }
  const response = await page.goto('/blog/rag-notes');
  expect(response?.status()).toBe(404);
});
test('project search and contact fallback work', async ({ page }) => {
  await page.goto('/projects');
  await page.getByRole('textbox', { name: 'Search projects' }).fill('Prisma');
  await expect(
    page.getByRole('heading', {
      name: 'Identity with accountability built in.',
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Understanding malaria through time.' }),
  ).toHaveCount(0);
  await page.goto('/contact');
  await page.getByLabel('Name', { exact: true }).fill('Test User');
  await page.getByLabel('Email', { exact: true }).fill('test@example.com');
  await page
    .getByLabel('Subject', { exact: true })
    .fill('Research collaboration');
  await page
    .getByLabel('Message', { exact: true })
    .fill('I would like to discuss a research collaboration.');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByRole('status')).toContainText('not sent');
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test('navigation works at the current viewport', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) await page.getByRole('button', { name: 'Open menu' }).click();
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Work', exact: true })
    .click();
  await expect(page).toHaveURL(/\/projects$/);
});
