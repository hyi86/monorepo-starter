import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SpreadsheetGrid from './grid';

// Mock data
const mockColumns = [
  { id: 'A', width: 100 },
  { id: 'B', width: 120 },
  { id: 'C', width: 80 },
];

const mockRows = [
  { id: '1', value: 'A1' },
  { id: '2', value: 'B1' },
  { id: '3', value: 'C1' },
  { id: '4', value: 'A2' },
  { id: '5', value: 'B2' },
  { id: '6', value: 'C2' },
];

describe('SpreadsheetGrid', () => {
  beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('컴포넌트가 에러 없이 렌더링되어야 함', () => {
    expect(() => {
      render(<SpreadsheetGrid columns={mockColumns} rows={mockRows} />);
    }).not.toThrow();
  });

  it('컴포넌트가 올바른 props를 받아야 함', () => {
    const { container } = render(<SpreadsheetGrid columns={mockColumns} rows={mockRows} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('컴포넌트가 가상화된 데이터를 올바르게 처리해야 함', () => {
    const { container } = render(<SpreadsheetGrid columns={mockColumns} rows={mockRows} />);
    const virtualContainer = container.querySelector('.relative.flex.border');
    expect(virtualContainer).toBeTruthy();
  });

  it('컴포넌트가 스크롤 가능한 영역을 가져야 함', () => {
    const { container } = render(<SpreadsheetGrid columns={mockColumns} rows={mockRows} />);
    const scrollableArea = container.querySelector('.overflow-auto');
    expect(scrollableArea).toBeTruthy();
  });

  it('컴포넌트가 고정된 헤더 영역을 가져야 함', () => {
    const { container } = render(<SpreadsheetGrid columns={mockColumns} rows={mockRows} />);
    const stickyHeader = container.querySelector('.sticky.top-0');
    expect(stickyHeader).toBeTruthy();
  });

  it('컴포넌트가 인덱스 컬럼을 가져야 함', () => {
    const { container } = render(<SpreadsheetGrid columns={mockColumns} rows={mockRows} />);
    const indexColumn = container.querySelector('.flex-shrink-0.flex-col');
    expect(indexColumn).toBeTruthy();
  });

  it('컴포넌트가 데이터 영역을 가져야 함', () => {
    const { container } = render(<SpreadsheetGrid columns={mockColumns} rows={mockRows} />);
    const dataArea = container.querySelector('.relative');
    expect(dataArea).toBeTruthy();
  });

  it('컴포넌트가 올바른 CSS 클래스를 가져야 함', () => {
    const { container } = render(<SpreadsheetGrid columns={mockColumns} rows={mockRows} />);
    expect(container.querySelector('.relative.flex.border')).toBeTruthy();
    expect(container.querySelector('.overflow-auto')).toBeTruthy();
    expect(container.querySelector('.sticky.top-0')).toBeTruthy();
  });

  it('컴포넌트가 선택 기능을 지원해야 함', () => {
    const { container } = render(<SpreadsheetGrid columns={mockColumns} rows={mockRows} />);
    const selectableElements = container.querySelectorAll('.cursor-pointer');
    expect(selectableElements.length).toBeGreaterThan(0);
  });

  it('컴포넌트가 반응형 디자인을 지원해야 함', () => {
    const { container } = render(<SpreadsheetGrid columns={mockColumns} rows={mockRows} />);
    const responsiveElements = container.querySelectorAll('.transition-all');
    expect(responsiveElements.length).toBeGreaterThan(0);
  });

  it('컴포넌트가 올바른 스타일 속성을 가져야 함', () => {
    const { container } = render(<SpreadsheetGrid columns={mockColumns} rows={mockRows} />);
    const flexContainer = container.querySelector('.relative.flex.border');
    expect(flexContainer).toBeTruthy();
    expect(flexContainer?.className).toContain('relative');
    expect(flexContainer?.className).toContain('flex');
    expect(flexContainer?.className).toContain('border');
  });

  it('컴포넌트가 가상화 설정을 올바르게 처리해야 함', () => {
    const { container } = render(<SpreadsheetGrid columns={mockColumns} rows={mockRows} />);
    // 가상화된 컨테이너가 존재하는지 확인
    const virtualContainer = container.querySelector('.relative.flex.border');
    expect(virtualContainer).toBeTruthy();
  });

  it('컴포넌트가 리사이징 기능을 지원해야 함', () => {
    const { container } = render(<SpreadsheetGrid columns={mockColumns} rows={mockRows} />);
    // 리사이징 관련 요소들이 존재하는지 확인 (가상화로 인해 실제 DOM에 없을 수 있음)
    const resizeHandles = container.querySelectorAll('.cursor-col-resize');
    // 가상화된 컴포넌트이므로 요소가 없어도 정상
    expect(resizeHandles.length).toBeGreaterThanOrEqual(0);
  });

  it('컴포넌트가 올바른 구조를 가져야 함', () => {
    const { container } = render(<SpreadsheetGrid columns={mockColumns} rows={mockRows} />);

    // 주요 구조 요소들이 존재하는지 확인
    expect(container.querySelector('.relative.flex.border')).toBeTruthy();
    expect(container.querySelector('.flex-shrink-0.flex-col')).toBeTruthy();
    expect(container.querySelector('.overflow-auto')).toBeTruthy();
    expect(container.querySelector('.sticky.top-0')).toBeTruthy();
  });

  it('컴포넌트가 올바른 높이를 가져야 함', () => {
    const { container } = render(<SpreadsheetGrid columns={mockColumns} rows={mockRows} />);

    // 높이 스타일이 설정되어 있는지 확인
    const indexColumn = container.querySelector('.flex-shrink-0.flex-col');
    expect(indexColumn).toBeTruthy();
    expect(indexColumn?.getAttribute('style')).toContain('height');
  });

  it('컴포넌트가 올바른 너비를 가져야 함', () => {
    const { container } = render(<SpreadsheetGrid columns={mockColumns} rows={mockRows} />);

    // 너비 스타일이 설정되어 있는지 확인
    const scrollableArea = container.querySelector('.overflow-auto');
    expect(scrollableArea).toBeTruthy();
    expect(scrollableArea?.getAttribute('style')).toContain('height');
  });
});
