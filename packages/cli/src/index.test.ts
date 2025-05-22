import { expect, test } from 'vitest';

test('devLog 호출', async () => {
  const result = await import('./index');
  expect(result.run).not.toThrow();
});

test('devLog 비동기 호출', async () => {
  const result = await import('./index');
  expect(result.runAsync).not.toThrow();
});
