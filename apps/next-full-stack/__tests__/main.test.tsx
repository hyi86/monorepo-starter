import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import Page from '~/app/page';

test('메인 페이지 로딩', () => {
  render(<Page />);
  expect(document.body).not.toBeNull();
});
