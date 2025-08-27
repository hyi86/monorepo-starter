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
      if (isResizing || !lastSelectedCell) return;

      // 편집 중일 때는 내비게이션 키를 무시
      if (isEditing) {
        return;
      }

      const { row, col } = lastSelectedCell;
      let newRow = row;
      let newCol = col;

      switch (e.key) {
        case 'c':
          if ((e.ctrlKey || e.metaKey) && copySelectedCells) {
            e.preventDefault();
            copySelectedCells();
            return;
          }
          break;
        case 'v':
          if ((e.ctrlKey || e.metaKey) && pasteToSelectedCell) {
            e.preventDefault();
            pasteToSelectedCell();
            return;
          }
          break;

        case 'Enter':
          e.preventDefault();
          if (startEditing) {
            startEditing(row, col);
          }
          return;
        case 'ArrowUp':
          e.preventDefault();
          newRow = Math.max(0, row - 1);
          if (e.shiftKey) {
            // Shift + ArrowUp: 범위 선택
            extendRange(newRow, col);
            return;
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          newRow = Math.min(rowCount - 1, row + 1);
          if (e.shiftKey) {
            // Shift + ArrowDown: 범위 선택
            extendRange(newRow, col);
            return;
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          newCol = Math.max(0, col - 1);
          if (e.shiftKey) {
            // Shift + ArrowLeft: 범위 선택
            extendRange(row, newCol);
            return;
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          newCol = Math.min(columnCount - 1, col + 1);
          if (e.shiftKey) {
            // Shift + ArrowRight: 범위 선택
            extendRange(row, newCol);
            return;
          }
          break;
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
