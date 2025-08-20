'use client';

/**
 * 가상화 엔진 - tanstack/react-virtual 기반 행/열 가상 스크롤
 */

import { useVirtualizer, type Virtualizer } from '@tanstack/react-virtual';
import { useMemo } from 'react';
import { Column, SheetSnapshot } from './types';

export interface VirtualizationConfig {
  containerWidth: number;
  containerHeight: number;
  rowHeight: number;
  overscan?: number;
}

export interface VirtualizationState {
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  colVirtualizer: Virtualizer<HTMLDivElement, Element>;
  totalWidth: number;
  totalHeight: number;
}

export class VirtualizationEngine {
  private config: VirtualizationConfig;
  private snapshot: SheetSnapshot;

  constructor(config: VirtualizationConfig, snapshot: SheetSnapshot) {
    this.config = config;
    this.snapshot = snapshot;
  }

  /**
   * 전체 너비 계산
   */
  getTotalWidth(): number {
    return this.snapshot.columns.reduce((total, col) => total + col.width, 0);
  }

  /**
   * 전체 높이 계산
   */
  getTotalHeight(): number {
    return this.snapshot.rowCount * this.config.rowHeight;
  }

  /**
   * 가상화 설정 생성 (Hook에서 사용)
   */
  createVirtualizerConfig() {
    return {
      rowConfig: {
        count: this.snapshot.rowCount,
        getScrollElement: () => document.querySelector('.sheet-container') as HTMLDivElement,
        estimateSize: () => this.config.rowHeight,
        overscan: this.config.overscan || 5,
      },
      colConfig: {
        horizontal: true,
        count: this.snapshot.colCount,
        getScrollElement: () => document.querySelector('.sheet-container') as HTMLDivElement,
        estimateSize: (index: number) => this.snapshot.columns[index]?.width || 120,
        overscan: this.config.overscan || 3,
      },
      totalWidth: this.getTotalWidth(),
      totalHeight: this.getTotalHeight(),
    };
  }

  /**
   * 가상화된 행 범위 가져오기
   */
  getVirtualRows(virtualizer: Virtualizer<HTMLDivElement, Element>) {
    return virtualizer.getVirtualItems();
  }

  /**
   * 가상화된 열 범위 가져오기
   */
  getVirtualCols(virtualizer: Virtualizer<HTMLDivElement, Element>) {
    return virtualizer.getVirtualItems();
  }

  /**
   * 특정 행의 가상화 정보 가져오기
   */
  getRowVirtualInfo(rowIndex: number, virtualizer: Virtualizer<HTMLDivElement, Element>) {
    const virtualItem = virtualizer.getVirtualItemForOffset(rowIndex * this.config.rowHeight);
    if (!virtualItem) {
      return {
        index: rowIndex,
        start: rowIndex * this.config.rowHeight,
        end: (rowIndex + 1) * this.config.rowHeight,
        size: this.config.rowHeight,
      };
    }
    return {
      index: virtualItem.index,
      start: virtualItem.start,
      end: virtualItem.end,
      size: virtualItem.size,
    };
  }

  /**
   * 특정 열의 가상화 정보 가져오기
   */
  getColVirtualInfo(colIndex: number, virtualizer: Virtualizer<HTMLDivElement, Element>) {
    const colStart = this.snapshot.columns.slice(0, colIndex).reduce((total, col) => total + col.width, 0);
    const virtualItem = virtualizer.getVirtualItemForOffset(colStart);
    if (!virtualItem) {
      return {
        index: colIndex,
        start: colStart,
        end: colStart + (this.snapshot.columns[colIndex]?.width || 120),
        size: this.snapshot.columns[colIndex]?.width || 120,
      };
    }
    return {
      index: virtualItem.index,
      start: virtualItem.start,
      end: virtualItem.end,
      size: virtualItem.size,
    };
  }

  /**
   * 스크롤 위치 설정
   */
  scrollToRow(rowIndex: number, virtualizer: Virtualizer<HTMLDivElement, Element>) {
    virtualizer.scrollToIndex(rowIndex, { align: 'start' });
  }

  /**
   * 스크롤 위치 설정 (열)
   */
  scrollToCol(colIndex: number, virtualizer: Virtualizer<HTMLDivElement, Element>) {
    virtualizer.scrollToIndex(colIndex, { align: 'start' });
  }

  /**
   * 스크롤 위치 설정 (픽셀)
   */
  scrollToOffset(offset: { x?: number; y?: number }, virtualizer: Virtualizer<HTMLDivElement, Element>) {
    if (offset.y !== undefined) {
      virtualizer.scrollToOffset(offset.y);
    }
    if (offset.x !== undefined) {
      // 수평 스크롤은 별도로 처리
      const scrollElement = virtualizer.options.getScrollElement?.();
      if (scrollElement) {
        scrollElement.scrollLeft = offset.x;
      }
    }
  }
}

/**
 * React Hook: 가상화 엔진 사용
 */
export function useVirtualization(config: VirtualizationConfig, snapshot: SheetSnapshot): VirtualizationState {
  const engine = useMemo(() => new VirtualizationEngine(config, snapshot), [config, snapshot]);
  const { rowConfig, colConfig, totalWidth, totalHeight } = engine.createVirtualizerConfig();

  const rowVirtualizer = useVirtualizer(rowConfig);
  const colVirtualizer = useVirtualizer(colConfig);

  return {
    rowVirtualizer,
    colVirtualizer,
    totalWidth,
    totalHeight,
  };
}

/**
 * 유틸리티: 가상화된 셀 위치 계산
 */
export function getVirtualCellPosition(
  rowIndex: number,
  colIndex: number,
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>,
  colVirtualizer: Virtualizer<HTMLDivElement, Element>,
  rowHeight: number,
  columns: Column[],
) {
  const rowStart = rowVirtualizer.getVirtualItemForOffset(rowIndex * rowHeight)?.start || 0;
  const colStart = columns.slice(0, colIndex).reduce((total, col) => total + col.width, 0);
  const colVirtualItem = colVirtualizer.getVirtualItemForOffset(colStart);

  return {
    row: {
      index: rowIndex,
      start: rowStart,
      end: rowStart + rowHeight,
    },
    col: {
      index: colIndex,
      start: colVirtualItem?.start || colStart,
      end: (colVirtualItem?.end || colStart) + (columns[colIndex]?.width || 120),
    },
  };
}
