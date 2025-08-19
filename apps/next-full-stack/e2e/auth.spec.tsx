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

  test('로그인 후 보호된 페이지에 접근할 수 있어야 함', async ({ page }) => {
    // 로그인 페이지로 이동
    await page.goto('/signin');
    await page.waitForLoadState('load');

    // 로그인 폼 작성 후 클릭
    await page.getByLabel('Email').fill('hyi86@naver.com');
    await page.getByLabel('Password').fill('123123123');
    await page.getByRole('button', { name: 'Login' }).click();

    // 로그인 완료 대기 (쿠키 설정 대기)
    await page.waitForTimeout(500);

    // 보호된 페이지로 이동
    await page.goto('/example/auth/protect');
    await page.waitForLoadState('load');

    // 보호된 페이지 접근 후 쿠키 확인
    const protectedPageCookies = await page.context().cookies();

    const accessToken = protectedPageCookies.find((cookie) => cookie.name === 'access-token');
    expect(accessToken).toBeDefined();
    expect(accessToken?.value).toBeTruthy();

    const refreshToken = protectedPageCookies.find((cookie) => cookie.name === 'refresh-token');
    expect(refreshToken).toBeDefined();
    expect(refreshToken?.value).toBeTruthy();
  });

  test('잘못된 로그인 정보로는 로그인이 실패해야 함', async ({ page }) => {
    await page.goto('/signin');
    await page.waitForLoadState('load');

    // 로그인 폼 작성 후 클릭
    await page.getByLabel('Email').fill('hyi86@navar.com'); // 잘못된 도메인
    await page.getByLabel('Password').fill('123123123');
    await page.getByRole('button', { name: 'Login' }).click();

    // 로그인 완료 대기 (쿠키 설정 대기)
    await page.waitForTimeout(500);

    // 로그인 실패 후에도 로그인 페이지에 머물러 있어야 함
    await expect(page).toHaveURL(/\/signin/);

    // 에러 메시지가 표시되는지 확인 (에러 메시지가 있다면)
    // await expect(page.locator('.error-message')).toBeVisible();
  });
});
