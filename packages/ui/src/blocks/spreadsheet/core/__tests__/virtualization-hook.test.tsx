/**
 * 가상화 Hook 테스트
 */

import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SheetModel } from '../sheet-model';
import { Column } from '../types';
import { useVirtualization } from '../virtualization';

// Mock tanstack/react-virtual
vi.mock('@tanstack/react-virtual', () => ({
  useVirtualizer: vi.fn((config) => ({
    getVirtualItems: vi.fn(() => []),
    getVirtualItemForOffset: vi.fn(() => null),
    scrollToIndex: vi.fn(),
    scrollToOffset: vi.fn(),
    options: config,
  })),
}));

describe('useVirtualization', () => {
  let model: SheetModel;
  let columns: Column[];

  beforeEach(() => {
    columns = [
      { key: 'id', width: 100, header: 'ID' },
      { key: 'name', width: 200, header: 'Name' },
      { key: 'email', width: 300, header: 'Email' },
    ];

    model = new SheetModel({
      rowCount: 500,
      colCount: 3,
      columns,
    });
  });

  it('가상화 상태를 올바르게 반환해야 함', () => {
    const config = {
      containerWidth: 800,
      containerHeight: 600,
      rowHeight: 32,
      overscan: 5,
    };

    const { result } = renderHook(() => useVirtualization(config, model.getSnapshot()));

    expect(result.current).toHaveProperty('rowVirtualizer');
    expect(result.current).toHaveProperty('colVirtualizer');
    expect(result.current).toHaveProperty('totalWidth');
    expect(result.current).toHaveProperty('totalHeight');
  });

  it('전체 너비를 올바르게 계산해야 함', () => {
    const config = {
      containerWidth: 800,
      containerHeight: 600,
      rowHeight: 32,
    };

    const { result } = renderHook(() => useVirtualization(config, model.getSnapshot()));

    // 100 + 200 + 300 = 600
    expect(result.current.totalWidth).toBe(600);
  });

  it('전체 높이를 올바르게 계산해야 함', () => {
    const config = {
      containerWidth: 800,
      containerHeight: 600,
      rowHeight: 32,
    };

    const { result } = renderHook(() => useVirtualization(config, model.getSnapshot()));

    // 500 * 32 = 16000
    expect(result.current.totalHeight).toBe(16000);
  });

  it('다른 설정에 대해 올바르게 계산해야 함', () => {
    const config = {
      containerWidth: 1000,
      containerHeight: 800,
      rowHeight: 48,
      overscan: 10,
    };

    const { result } = renderHook(() => useVirtualization(config, model.getSnapshot()));

    expect(result.current.totalWidth).toBe(600);
    expect(result.current.totalHeight).toBe(500 * 48); // 24000
  });

  it('설정이 변경되면 새로운 엔진을 생성해야 함', () => {
    const config1 = {
      containerWidth: 800,
      containerHeight: 600,
      rowHeight: 32,
    };

    const { result: result1 } = renderHook(() => useVirtualization(config1, model.getSnapshot()));

    const config2 = {
      containerWidth: 1000,
      containerHeight: 800,
      rowHeight: 48,
    };

    const { result: result2 } = renderHook(() => useVirtualization(config2, model.getSnapshot()));

    expect(result1.current.totalHeight).toBe(500 * 32);
    expect(result2.current.totalHeight).toBe(500 * 48);
  });

  it('스냅샷이 변경되면 새로운 엔진을 생성해야 함', () => {
    const config = {
      containerWidth: 800,
      containerHeight: 600,
      rowHeight: 32,
    };

    const { result: result1 } = renderHook(() => useVirtualization(config, model.getSnapshot()));

    // 새로운 모델 생성
    const newModel = new SheetModel({
      rowCount: 1000,
      colCount: 3,
      columns,
    });

    const { result: result2 } = renderHook(() => useVirtualization(config, newModel.getSnapshot()));

    expect(result1.current.totalHeight).toBe(500 * 32);
    expect(result2.current.totalHeight).toBe(1000 * 32);
  });
});
