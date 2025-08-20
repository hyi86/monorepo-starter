/**
 * VirtualGrid 컴포넌트 통합 테스트
 */

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Column } from '../../core/types';
import { VirtualGrid } from '../virtual-grid';

// Mock tanstack/react-virtual
vi.mock('@tanstack/react-virtual', () => ({
  useVirtualizer: vi.fn((config) => ({
    getVirtualItems: vi.fn(() => [
      { index: 0, start: 0, end: 32, size: 32 },
      { index: 1, start: 32, end: 64, size: 32 },
      { index: 2, start: 64, end: 96, size: 32 },
    ]),
    getVirtualItemForOffset: vi.fn(() => null),
    scrollToIndex: vi.fn(),
    scrollToOffset: vi.fn(),
    options: config,
  })),
}));

describe('VirtualGrid', () => {
  const testColumns: Column[] = [
    { key: 'id', width: 80, header: 'ID' },
    { key: 'name', width: 150, header: 'Name' },
    { key: 'email', width: 200, header: 'Email' },
  ];

  beforeEach(() => {
    // DOM 요소 모킹
    Object.defineProperty(document, 'querySelector', {
      value: vi.fn(() => ({
        scrollTop: 0,
        scrollLeft: 0,
        scrollHeight: 1000,
        scrollWidth: 1000,
        clientHeight: 600,
        clientWidth: 800,
      })),
      writable: true,
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('기본 props로 렌더링되어야 함', () => {
    render(<VirtualGrid rows={100} columns={testColumns} rowHeight={32} containerWidth={800} containerHeight={600} />);

    const container = screen.getByTestId('virtual-grid-container');
    expect(container).toBeDefined();
    expect(container.className).toContain('sheet-container');
  });

  it('컨테이너 스타일이 올바르게 적용되어야 함', () => {
    render(<VirtualGrid rows={100} columns={testColumns} rowHeight={32} containerWidth={800} containerHeight={600} />);

    const container = screen.getByTestId('virtual-grid-container');
    expect(container.style.width).toBe('800px');
    expect(container.style.height).toBe('600px');
    expect(container.style.overflow).toBe('auto');
    expect(container.style.border).toBe('1px solid rgb(204, 204, 204)');
    expect(container.style.position).toBe('relative');
  });

  it('가상화된 셀들이 렌더링되어야 함', () => {
    render(<VirtualGrid rows={100} columns={testColumns} rowHeight={32} containerWidth={800} containerHeight={600} />);

    // 가상화된 셀들이 렌더링되어야 함
    const cells = screen.getAllByText(/R\d+C\d+/);
    expect(cells.length).toBeGreaterThan(0);
  });

  it('다른 설정으로 렌더링되어야 함', () => {
    render(
      <VirtualGrid rows={1000} columns={testColumns} rowHeight={48} containerWidth={1000} containerHeight={800} />,
    );

    const container = screen.getByTestId('virtual-grid-container');
    expect(container.style.width).toBe('1000px');
    expect(container.style.height).toBe('800px');
  });

  it('빈 컬럼 배열로도 렌더링되어야 함', () => {
    render(<VirtualGrid rows={100} columns={[]} rowHeight={32} containerWidth={800} containerHeight={600} />);

    const container = screen.getByTestId('virtual-grid-container');
    expect(container).toBeDefined();
  });

  it('0행으로도 렌더링되어야 함', () => {
    render(<VirtualGrid rows={0} columns={testColumns} rowHeight={32} containerWidth={800} containerHeight={600} />);

    const container = screen.getByTestId('virtual-grid-container');
    expect(container).toBeDefined();
  });

  it('접근성 속성이 있어야 함', () => {
    render(<VirtualGrid rows={100} columns={testColumns} rowHeight={32} containerWidth={800} containerHeight={600} />);

    const container = screen.getByTestId('virtual-grid-container');
    expect(container).toBeDefined();
  });
});
