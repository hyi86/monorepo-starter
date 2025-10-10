import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Home from './page';

describe('Home', () => {
  afterEach(() => {
    cleanup();
  });

  it('함수 컴포넌트이면서 기본 내보내기여야 함', () => {
    // Home이 함수 컴포넌트인지 확인
    expect(typeof Home).toBe('function');
    // Home이 default export인지 확인
    expect(Home).toBeDefined();
  });

  it('Home 텍스트가 렌더링되어야 함', () => {
    render(<Home />);
    expect(screen.getByText('Home')).toBeDefined();
  });

  it('Example Page 카드가 렌더링되어야 함', () => {
    render(<Home />);
    // 첫 번째 요소만 확인
    expect(screen.getAllByText('Example Page')[0]).toBeDefined();
    expect(screen.getAllByText('Go Example')[0]).toBeDefined();
  });

  it('Blocks Page 카드가 렌더링되어야 함', () => {
    render(<Home />);
    // 첫 번째 요소만 확인
    expect(screen.getAllByText('Blocks Page')[0]).toBeDefined();
    expect(screen.getAllByText('Go Blocks')[0]).toBeDefined();
  });

  it('올바른 링크들이 렌더링되어야 함', () => {
    render(<Home />);

    // 모든 링크를 가져와서 첫 번째 것만 확인
    const exampleLinks = screen.getAllByRole('link', { name: 'Go Example' });
    expect(exampleLinks[0]?.getAttribute('href')).toBe('/example');

    const blocksLinks = screen.getAllByRole('link', { name: 'Go Blocks' });
    expect(blocksLinks[0]?.getAttribute('href')).toBe('/blocks');
  });

  it('링크들이 올바르게 렌더링되어야 함', () => {
    render(<Home />);

    // 링크 개수 확인 (중복 제거)
    const allLinks = screen.getAllByRole('link');
    expect(allLinks.length).toBeGreaterThanOrEqual(2);

    // 각 링크가 올바른 href를 가지는지 확인
    const exampleLinks = screen.getAllByRole('link', { name: 'Go Example' });
    const blocksLinks = screen.getAllByRole('link', { name: 'Go Blocks' });

    expect(exampleLinks.length).toBeGreaterThan(0);
    expect(blocksLinks.length).toBeGreaterThan(0);
  });
});
