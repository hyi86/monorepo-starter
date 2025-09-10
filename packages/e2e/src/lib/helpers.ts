import type { Page } from '@playwright/test';

/**
 * 콘솔 에러를 수집하는 헬퍼 함수
 */
export async function checkConsoleErrors(page: Page) {
  const errors: string[] = [];
  const warnings: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    } else if (msg.type() === 'warning') {
      warnings.push(msg.text());
    }
  });

  return { errors, warnings };
}
