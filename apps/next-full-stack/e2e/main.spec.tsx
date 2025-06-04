import { test } from '@playwright/test';

test('메인 페이지 로딩', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('load');
});
