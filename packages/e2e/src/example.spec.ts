import { expect, test } from '@playwright/test';

test('example', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  console.log('example');
  await expect(page).toHaveTitle(/Playwright/);
});
