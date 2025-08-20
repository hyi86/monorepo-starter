'use client';

/**
 * 셀 렌더링 기본 구조 - Phase 0.3
 */

import React from 'react';
import { Cell, CellValue, Column } from './types';

// 셀 렌더러 타입
export type CellRenderer<T = any> = (props: {
  value: CellValue;
  cell: Cell;
  column: Column;
  rowIndex: number;
  colIndex: number;
  isSelected?: boolean;
  isFocused?: boolean;
}) => React.ReactNode;

// 기본 셀 렌더러들
export const defaultCellRenderers: Record<string, CellRenderer> = {
  // 텍스트 렌더러
  text: ({ value, cell }) => {
    const displayValue = cell.formattedValue || String(value || '');
    return <div className="cell-content text-cell">{displayValue}</div>;
  },

  // 숫자 렌더러
  number: ({ value, cell }) => {
    const displayValue = cell.formattedValue || (value != null ? String(value) : '');
    return <div className="cell-content number-cell">{displayValue}</div>;
  },

  // 불린 렌더러 (체크박스)
  boolean: ({ value, cell }) => {
    const isChecked = Boolean(value);
    return (
      <div className="cell-content boolean-cell">
        <input type="checkbox" checked={isChecked} readOnly className="cell-checkbox" />
      </div>
    );
  },

  // 날짜 렌더러
  date: ({ value, cell }) => {
    const displayValue = cell.formattedValue || (value ? String(value) : '');
    return <div className="cell-content date-cell">{displayValue}</div>;
  },
};

// 셀 렌더링 엔진
export class CellRendererEngine {
  private renderers: Map<string, CellRenderer> = new Map();

  constructor() {
    // 기본 렌더러 등록
    Object.entries(defaultCellRenderers).forEach(([type, renderer]) => {
      this.registerRenderer(type, renderer);
    });
  }

  /**
   * 렌더러 등록
   */
  registerRenderer(type: string, renderer: CellRenderer): void {
    this.renderers.set(type, renderer);
  }

  /**
   * 렌더러 제거
   */
  unregisterRenderer(type: string): void {
    this.renderers.delete(type);
  }

  /**
   * 셀 렌더링
   */
  renderCell(props: {
    value: CellValue;
    cell: Cell;
    column: Column;
    rowIndex: number;
    colIndex: number;
    isSelected?: boolean;
    isFocused?: boolean;
  }): React.ReactNode {
    const { cell, column } = props;

    // 셀 타입 결정 (우선순위: cell.type > column.type > 'text')
    const cellType = cell.type || column.type || 'text';

    // 해당 타입의 렌더러 가져오기
    const renderer = this.renderers.get(cellType);

    if (renderer) {
      return renderer(props);
    }

    // 기본 텍스트 렌더러 사용
    return defaultCellRenderers.text!(props);
  }

  /**
   * 셀 클래스명 생성
   */
  getCellClassName(props: {
    cell: Cell;
    column: Column;
    rowIndex: number;
    colIndex: number;
    isSelected?: boolean;
    isFocused?: boolean;
  }): string {
    const { cell, column, isSelected, isFocused } = props;
    const cellType = cell.type || column.type || 'text';

    const classes = ['spreadsheet-cell', `cell-type-${cellType}`, `cell-${props.rowIndex}-${props.colIndex}`];

    if (isSelected) classes.push('cell-selected');
    if (isFocused) classes.push('cell-focused');
    if (cell.error) classes.push('cell-error');
    if (cell.isDirty) classes.push('cell-dirty');

    return classes.join(' ');
  }

  /**
   * 셀 스타일 생성
   */
  getCellStyle(props: {
    cell: Cell;
    column: Column;
    rowIndex: number;
    colIndex: number;
    width: number;
    height: number;
  }): React.CSSProperties {
    const { width, height } = props;

    return {
      width: `${width}px`,
      height: `${height}px`,
      display: 'flex',
      alignItems: 'center',
      padding: '4px 8px',
      border: '1px solid #e0e0e0',
      boxSizing: 'border-box',
      fontSize: '14px',
      fontFamily: 'inherit',
      backgroundColor: '#ffffff',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };
  }

  /**
   * 등록된 렌더러 목록 가져오기
   */
  getRegisteredRenderers(): string[] {
    return Array.from(this.renderers.keys());
  }

  /**
   * 렌더러 존재 여부 확인
   */
  hasRenderer(type: string): boolean {
    return this.renderers.has(type);
  }
}

// 기본 렌더링 엔진 인스턴스
export const defaultCellRendererEngine = new CellRendererEngine();
