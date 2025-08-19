import { expect, test } from '@playwright/test';

test.describe('인증', () => {
  test.beforeEach(async ({ page }) => {
    // 각 테스트 전에 쿠키 초기화
    await page.context().clearCookies();
  });

  test('공개 페이지는 인증 없이 접근 가능해야 함', async ({ page }) => {
    await page.goto('/example/auth/public');
    await page.waitForLoadState('load');

    // 페이지가 로드되었는지 확인
    await expect(page.locator('h1')).toHaveText('인증: Public 페이지');
    // 더 구체적인 선택자 사용
    await expect(page.locator('text=Unauthorized')).toBeVisible();
  });

  test('보호된 페이지는 인증 없이 접근 시 로그인 페이지로 리다이렉트되어야 함', async ({ page }) => {
    await page.goto('/example/auth/protect');
    await page.waitForLoadState('load');

    // 로그인 페이지로 리다이렉트되었는지 확인
    await expect(page).toHaveURL(/\/signin/);
  });

  test('보호된 경로 패턴이 올바르게 설정되어야 함', async ({ page }) => {
    // /protect 경로는 보호되어야 함
    await page.goto('/protect');
    await page.waitForLoadState('load');
    await expect(page).toHaveURL(/\/signin/);

    // /private 경로는 보호되어야 함
    await page.goto('/private');
    await page.waitForLoadState('load');
    await expect(page).toHaveURL(/\/signin/);

    // /mypage 경로는 보호되어야 함
    await page.goto('/mypage');
    await page.waitForLoadState('load');
    await expect(page).toHaveURL(/\/signin/);
  });

  test('공개 경로는 인증 없이 접근 가능해야 함', async ({ page }) => {
    // /example/auth/public은 공개 경로여야 함
    await page.goto('/example/auth/public');
    await page.waitForLoadState('load');
    await expect(page.locator('h1')).toHaveText('인증: Public 페이지');
  });

  test('미들웨어가 정적 파일은 처리하지 않아야 함', async ({ page }) => {
    // 정적 파일 접근 테스트
    const response = await page.goto('/favicon.ico');
    expect(response?.status()).toBe(200);
  });

  test('API 경로는 미들웨어 처리에서 제외되어야 함', async ({ page }) => {
    // API 경로 접근 테스트 (404가 나와도 미들웨어가 처리하지 않아야 함)
    await page.goto('/api/test');
    // API 경로는 미들웨어가 처리하지 않으므로 리다이렉트되지 않아야 함
    await expect(page).toHaveURL('/api/test');
  });
});
