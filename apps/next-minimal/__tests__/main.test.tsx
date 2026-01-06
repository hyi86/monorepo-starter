import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Home from '../src/app/page';

test('Home', () => {
  render(<Home />);
  expect(screen.getByText('Main')).toBeDefined();
});
