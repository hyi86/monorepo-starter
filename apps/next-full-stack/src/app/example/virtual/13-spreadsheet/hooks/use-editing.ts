'use client';

import { Virtualizer } from '@tanstack/react-virtual';
import { useCallback, useState } from 'react';
import type { Cell } from '../types';

interface UseEditingProps {
  rows: any[];
  columnsCount: number;
  rowCount: number;
  onCellEdit: (rowIndex: number, colIndex: number, newValue: string) => void;
  rowVirtualizer: Virtualizer<HTMLDivElement, any>;
  columnVirtualizer: Virtualizer<HTMLDivElement, any>;
}

export function useEditing({
  rows,
  columnsCount,
  rowCount,
  onCellEdit,
  rowVirtualizer,
  columnVirtualizer,
}: UseEditingProps) {
  // 편집 상태 관리
  const [editingCell, setEditingCell] = useState<Cell | null>(null);
  const [editValue, setEditValue] = useState('');

  // 편집 모드 시작
  const startEditing = useCallback(
    (rowIndex: number, colIndex: number) => {
      const index = rowIndex * columnsCount + colIndex;
      const currentValue = rows[index]?.value || '';
      setEditingCell({ row: rowIndex, col: colIndex });
      setEditValue(currentValue);
    },
    [rows, columnsCount],
  );

  // 편집 모드 종료
  const finishEditing = useCallback(
    (save: boolean = true) => {
      if (editingCell && save) {
        const index = editingCell.row * columnsCount + editingCell.col;
        if (index < rows.length) {
          onCellEdit(editingCell.row, editingCell.col, editValue);
        }
      }
      setEditingCell(null);
      setEditValue('');
    },
    [editingCell, editValue, rows.length, columnsCount, onCellEdit],
  );

  // 편집 중인지 확인
  const isEditing = !!editingCell;

  // 편집 중인 셀인지 확인
  const isEditingCell = useCallback(
    (rowIndex: number, colIndex: number) => {
      return editingCell?.row === rowIndex && editingCell?.col === colIndex;
    },
    [editingCell],
  );

  // 다음 셀로 이동 (Tab)
  const moveToNextCell = useCallback(() => {
    if (!editingCell) return;

    const { row, col } = editingCell;
    let nextRow = row;
    let nextCol = col + 1;

    // 다음 열로 이동
    if (nextCol >= columnsCount) {
      nextCol = 0;
      nextRow = row + 1;
    }

    // 다음 행으로 이동
    if (nextRow >= rowCount) {
      nextRow = 0; // 첫 번째 행으로 순환
    }

    // 현재 셀 저장 후 다음 셀로 이동
    finishEditing(true);
    startEditing(nextRow, nextCol);

    // 스크롤을 새로운 셀 위치로 이동
    rowVirtualizer.scrollToIndex(nextRow, { align: 'auto' });
    columnVirtualizer.scrollToIndex(nextCol, { align: 'auto' });
  }, [editingCell, columnsCount, rowCount, finishEditing, startEditing, rowVirtualizer, columnVirtualizer]);

  // 이전 셀로 이동 (Shift + Tab)
  const moveToPreviousCell = useCallback(() => {
    if (!editingCell) return;

    const { row, col } = editingCell;
    let prevRow = row;
    let prevCol = col - 1;

    // 이전 열로 이동
    if (prevCol < 0) {
      prevCol = columnsCount - 1;
      prevRow = row - 1;
    }

    // 이전 행으로 이동
    if (prevRow < 0) {
      prevRow = rowCount - 1; // 마지막 행으로 순환
    }

    // 현재 셀 저장 후 이전 셀로 이동
    finishEditing(true);
    startEditing(prevRow, prevCol);

    // 스크롤을 새로운 셀 위치로 이동
    rowVirtualizer.scrollToIndex(prevRow, { align: 'auto' });
    columnVirtualizer.scrollToIndex(prevCol, { align: 'auto' });
  }, [editingCell, columnsCount, rowCount, finishEditing, startEditing, rowVirtualizer, columnVirtualizer]);

  // Input 이벤트 핸들러들
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  }, []);

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        finishEditing(true);
      } else if (e.key === 'Tab') {
        e.preventDefault();
        if (e.shiftKey) {
          moveToPreviousCell();
        } else {
          moveToNextCell();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        finishEditing(false);
      }
    },
    [finishEditing, moveToNextCell, moveToPreviousCell],
  );

  const handleInputBlur = useCallback(() => {
    finishEditing(true);
  }, [finishEditing]);

  return {
    editingCell,
    editValue,
    setEditValue,
    startEditing,
    finishEditing,
    isEditing,
    isEditingCell,
    moveToNextCell,
    moveToPreviousCell,
    handleInputChange,
    handleInputKeyDown,
    handleInputBlur,
  };
}
