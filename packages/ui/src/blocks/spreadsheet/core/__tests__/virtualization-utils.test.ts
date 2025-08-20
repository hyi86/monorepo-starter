/**
 * 가상화 유틸리티 함수 테스트
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Column } from '../types';
import { getVirtualCellPosition } from '../virtualization';

// Mock Virtualizer
const mockVirtualizer = {
  getVirtualItemForOffset: vi.fn(),
  getVirtualItems: vi.fn(),
  scrollToIndex: vi.fn(),
  scrollToOffset: vi.fn(),
  options: {},
};

describe('getVirtualCellPosition', () => {
  const columns: Column[] = [
    { key: 'id', width: 100, header: 'ID' },
    { key: 'name', width: 200, header: 'Name' },
    { key: 'email', width: 300, header: 'Email' },
  ];

  const rowHeight = 32;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('셀 위치를 올바르게 계산해야 함', () => {
    // Mock 행 가상화 아이템
    mockVirtualizer.getVirtualItemForOffset
      .mockReturnValueOnce({ start: 64, end: 96, size: 32 }) // 행 2
      .mockReturnValueOnce({ start: 300, end: 500, size: 200 }); // 열 2

    const position = getVirtualCellPosition(
      2, // rowIndex
      2, // colIndex
      mockVirtualizer as any,
      mockVirtualizer as any,
      rowHeight,
      columns,
    );

    expect(position.row).toEqual({
      index: 2,
      start: 64,
      end: 96,
    });

    expect(position.col).toEqual({
      index: 2,
      start: 300,
      end: 800, // colVirtualItem.end(500) + columns[2].width(300) = 800
    });
  });

  it('가상화 아이템이 없을 때 기본값을 사용해야 함', () => {
    mockVirtualizer.getVirtualItemForOffset.mockReturnValue(null);

    const position = getVirtualCellPosition(
      1, // rowIndex
      1, // colIndex
      mockVirtualizer as any,
      mockVirtualizer as any,
      rowHeight,
      columns,
    );

    expect(position.row).toEqual({
      index: 1,
      start: 0, // getVirtualItemForOffset이 null을 반환하므로 0
      end: 32,
    });

    expect(position.col).toEqual({
      index: 1,
      start: 100, // 첫 번째 컬럼 너비
      end: 300, // 첫 번째 + 두 번째 컬럼 너비
    });
  });

  it('첫 번째 셀(0,0)의 위치를 올바르게 계산해야 함', () => {
    mockVirtualizer.getVirtualItemForOffset
      .mockReturnValueOnce({ start: 0, end: 32, size: 32 })
      .mockReturnValueOnce({ start: 0, end: 100, size: 100 });

    const position = getVirtualCellPosition(
      0, // rowIndex
      0, // colIndex
      mockVirtualizer as any,
      mockVirtualizer as any,
      rowHeight,
      columns,
    );

    expect(position.row).toEqual({
      index: 0,
      start: 0,
      end: 32,
    });

    expect(position.col).toEqual({
      index: 0,
      start: 0,
      end: 200, // colVirtualItem.end(100) + columns[0].width(100) = 200
    });
  });

  it('마지막 셀의 위치를 올바르게 계산해야 함', () => {
    mockVirtualizer.getVirtualItemForOffset
      .mockReturnValueOnce({ start: 96, end: 128, size: 32 })
      .mockReturnValueOnce({ start: 300, end: 600, size: 300 });

    const position = getVirtualCellPosition(
      3, // rowIndex
      2, // colIndex (마지막 컬럼)
      mockVirtualizer as any,
      mockVirtualizer as any,
      rowHeight,
      columns,
    );

    expect(position.row).toEqual({
      index: 3,
      start: 96,
      end: 128,
    });

    expect(position.col).toEqual({
      index: 2,
      start: 300,
      end: 900, // colVirtualItem.end(600) + columns[2].width(300) = 900
    });
  });

  it('빈 컬럼 배열에 대해 안전하게 처리해야 함', () => {
    mockVirtualizer.getVirtualItemForOffset.mockReturnValue(null);

    const position = getVirtualCellPosition(
      0, // rowIndex
      0, // colIndex
      mockVirtualizer as any,
      mockVirtualizer as any,
      rowHeight,
      [], // 빈 컬럼 배열
    );

    expect(position.row).toEqual({
      index: 0,
      start: 0,
      end: 32,
    });

    expect(position.col).toEqual({
      index: 0,
      start: 0,
      end: 120, // 기본 너비
    });
  });

  it('존재하지 않는 컬럼 인덱스에 대해 안전하게 처리해야 함', () => {
    mockVirtualizer.getVirtualItemForOffset.mockReturnValue(null);

    const position = getVirtualCellPosition(
      0, // rowIndex
      5, // 존재하지 않는 컬럼 인덱스
      mockVirtualizer as any,
      mockVirtualizer as any,
      rowHeight,
      columns,
    );

    expect(position.col).toEqual({
      index: 5,
      start: 600, // 모든 컬럼 너비 합계
      end: 720, // 기본 너비 120 추가
    });
  });
});
