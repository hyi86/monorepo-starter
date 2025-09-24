'use client';

import { Virtualizer } from '@tanstack/react-virtual';
import { useEffect } from 'react';

type UseKeyboardNavigationParams = {
  rowCount: number;
  columnCount: number;
  lastSelectedCell: { row: number; col: number } | null;
  selectCell: (row: number, col: number) => void;
  selectRow: (rowIndex: number) => void;
  selectColumn: (columnIndex: number) => void;
  extendRange: (endRow: number, endCol: number) => void;
  rowVirtualizer: Virtualizer<HTMLDivElement, any>;
  columnVirtualizer: Virtualizer<HTMLDivElement, any>;
  isResizing: boolean;
  startEditing?: (rowIndex: number, colIndex: number) => void;
  finishEditing?: (save: boolean) => void;
  isEditing: boolean;
  copySelectedCells?: () => void;
  pasteToSelectedCell?: () => void;
};

export function useKeyboardNavigation({
  rowCount,
  columnCount,
  lastSelectedCell,
  selectCell,
  selectRow,
  selectColumn,
  extendRange,
  isResizing,
  isEditing,
  copySelectedCells,
  pasteToSelectedCell,
  startEditing,
  finishEditing,
  rowVirtualizer,
  columnVirtualizer,
}: UseKeyboardNavigationParams) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 리사이징 중 Or 선택된 셀이 없으면 무시
      if (isResizing || !lastSelectedCell) return;

      // 편집 중일 때는 내비게이션 키를 무시
      if (isEditing) {
        return;
      }

      const { row, col } = lastSelectedCell;
      let newRow = row;
      let newCol = col;

      switch (e.key) {
        // 복사
        case 'c':
          if ((e.ctrlKey || e.metaKey) && copySelectedCells) {
            e.preventDefault();
            copySelectedCells();
            return;
          }
          break;
        // 붙여넣기
        case 'v':
          if ((e.ctrlKey || e.metaKey) && pasteToSelectedCell) {
            e.preventDefault();
            pasteToSelectedCell();
            return;
          }
          break;

        // 편집 모드 진입
        case 'Enter':
          e.preventDefault();
          if (startEditing) {
            startEditing(row, col);
          }
          return;
        // 위로 이동
        case 'ArrowUp':
          e.preventDefault();
          newRow = Math.max(0, row - 1);
          if (e.shiftKey) {
            // Shift + ArrowUp: 범위 선택
            extendRange(newRow, col);
            return;
          }
          break;
        // 아래로 이동
        case 'ArrowDown':
          e.preventDefault();
          newRow = Math.min(rowCount - 1, row + 1);
          if (e.shiftKey) {
            // Shift + ArrowDown: 범위 선택
            extendRange(newRow, col);
            return;
          }
          break;
        // 왼쪽으로 이동
        case 'ArrowLeft':
          e.preventDefault();
          newCol = Math.max(0, col - 1);
          if (e.shiftKey) {
            // Shift + ArrowLeft: 범위 선택
            extendRange(row, newCol);
            return;
          }
          break;

        // 오른쪽으로 이동
        case 'ArrowRight':
          e.preventDefault();
          newCol = Math.min(columnCount - 1, col + 1);
          if (e.shiftKey) {
            // Shift + ArrowRight: 범위 선택
            extendRange(row, newCol);
            return;
          }
          break;

        // 행 전체 선택(Space)
        case ' ':
          if (e.shiftKey) {
            e.preventDefault();
            selectRow(row);
            return;
          } else if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            selectColumn(col);
            return;
          }
          break;
        default:
          return;
      }

      // 선택된 셀이 변경되었으면 선택 셀 업데이트
      if (newRow !== row || newCol !== col) {
        selectCell(newRow, newCol);

        // 스크롤을 새로운 셀 위치로 이동
        rowVirtualizer.scrollToIndex(newRow, { align: 'auto' });
        columnVirtualizer.scrollToIndex(newCol, { align: 'auto' });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    rowCount,
    columnCount,
    lastSelectedCell,
    selectCell,
    selectRow,
    selectColumn,
    extendRange,
    rowVirtualizer,
    columnVirtualizer,
    isResizing,
    startEditing,
    finishEditing,
    isEditing,
    copySelectedCells,
    pasteToSelectedCell,
  ]);
}
