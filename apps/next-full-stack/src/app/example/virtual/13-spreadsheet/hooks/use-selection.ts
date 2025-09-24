'use client';

import { useState } from 'react';
import { type SelectionMode } from '../types';

type UseSelectionParams = {
  rowCount: number;
  columnCount: number;
  isResizing: boolean;
};

export function useSelection({ rowCount, columnCount, isResizing }: UseSelectionParams) {
  // 셀 선택 관련 상태
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('none');
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [lastSelectedCell, setLastSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [rangeStartCell, setRangeStartCell] = useState<{ row: number; col: number } | null>(null);

  // Cmd/Ctrl 키 감지 유틸리티
  const isCmdOrCtrlPressed = (e: React.MouseEvent | MouseEvent) => {
    return e.metaKey || e.ctrlKey;
  };

  // 선택 관련 함수들
  const clearSelection = () => {
    setSelectedCells(new Set());
    setSelectionMode('none');
    setSelectedColumn(null);
    setSelectedRow(null);
    setRangeStartCell(null);
  };

  // 전체 선택
  const selectAll = () => {
    const allCells = new Set<string>();
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < columnCount; col++) {
        allCells.add(`${row}-${col}`);
      }
    }
    setSelectedCells(allCells);
    setSelectionMode('all');
    setSelectedColumn(null);
    setSelectedRow(null);
  };

  // 열 선택
  const selectColumn = (columnIndex: number) => {
    const columnCells = new Set<string>();
    for (let row = 0; row < rowCount; row++) {
      columnCells.add(`${row}-${columnIndex}`);
    }
    setSelectedCells(columnCells);
    setSelectionMode('column');
    setSelectedColumn(columnIndex);
    setSelectedRow(null);
  };

  // 열 선택 토글
  const toggleColumnSelection = (columnIndex: number) => {
    const columnCells = new Set<string>();
    for (let row = 0; row < rowCount; row++) {
      columnCells.add(`${row}-${columnIndex}`);
    }

    const newSelectedCells = new Set(selectedCells);
    const isColumnSelected = Array.from(columnCells).every((cell) => newSelectedCells.has(cell));

    if (isColumnSelected) {
      // 열이 이미 선택되어 있으면 제거
      columnCells.forEach((cell) => newSelectedCells.delete(cell));
    } else {
      // 열이 선택되어 있지 않으면 추가
      columnCells.forEach((cell) => newSelectedCells.add(cell));
    }

    setSelectedCells(newSelectedCells);
    setSelectionMode('none');
    setSelectedColumn(null);
    setSelectedRow(null);
  };

  // 행 선택
  const selectRow = (rowIndex: number) => {
    const rowCells = new Set<string>();
    for (let col = 0; col < columnCount; col++) {
      rowCells.add(`${rowIndex}-${col}`);
    }
    setSelectedCells(rowCells);
    setSelectionMode('row');
    setSelectedRow(rowIndex);
    setSelectedColumn(null);
  };

  const toggleRowSelection = (rowIndex: number) => {
    const rowCells = new Set<string>();
    for (let col = 0; col < columnCount; col++) {
      rowCells.add(`${rowIndex}-${col}`);
    }

    const newSelectedCells = new Set(selectedCells);
    const isRowSelected = Array.from(rowCells).every((cell) => newSelectedCells.has(cell));

    if (isRowSelected) {
      // 행이 이미 선택되어 있으면 제거
      rowCells.forEach((cell) => newSelectedCells.delete(cell));
    } else {
      // 행이 선택되어 있지 않으면 추가
      rowCells.forEach((cell) => newSelectedCells.add(cell));
    }

    setSelectedCells(newSelectedCells);
    setSelectionMode('none');
    setSelectedColumn(null);
    setSelectedRow(null);
  };

  // 셀 선택
  const selectCell = (rowIndex: number, columnIndex: number) => {
    const cellKey = `${rowIndex}-${columnIndex}`;
    setSelectedCells(new Set([cellKey]));
    setSelectionMode('none');
    setSelectedColumn(null);
    setSelectedRow(null);
    const newLastSelectedCell = { row: rowIndex, col: columnIndex };
    setLastSelectedCell(newLastSelectedCell);
    setRangeStartCell({ row: rowIndex, col: columnIndex });
  };

  // 셀 선택 토글
  const toggleCellSelection = (rowIndex: number, columnIndex: number) => {
    const cellKey = `${rowIndex}-${columnIndex}`;
    const newSelectedCells = new Set(selectedCells);

    if (newSelectedCells.has(cellKey)) {
      newSelectedCells.delete(cellKey);
    } else {
      newSelectedCells.add(cellKey);
    }

    setSelectedCells(newSelectedCells);
    setSelectionMode('none');
    setSelectedColumn(null);
    setSelectedRow(null);
    const newLastSelectedCell = { row: rowIndex, col: columnIndex };
    setLastSelectedCell(newLastSelectedCell);
  };

  // 셀 선택 해제
  const deselectCell = () => {
    setSelectedCells(new Set());
    setSelectionMode('none');
    setSelectedColumn(null);
    setSelectedRow(null);
    setLastSelectedCell(null);
    // deselectCell에서는 콜백을 호출하지 않음 (포커스 유지)
  };

  // 범위 선택
  const selectRange = (startRow: number, startCol: number, endRow: number, endCol: number) => {
    const rangeCells = new Set<string>();
    const minRow = Math.min(startRow, endRow);
    const maxRow = Math.max(startRow, endRow);
    const minCol = Math.min(startCol, endCol);
    const maxCol = Math.max(startCol, endCol);

    for (let row = minRow; row <= maxRow; row++) {
      for (let col = minCol; col <= maxCol; col++) {
        rangeCells.add(`${row}-${col}`);
      }
    }

    setSelectedCells(rangeCells);
    setSelectionMode('none');
    setSelectedColumn(null);
    setSelectedRow(null);
    const newLastSelectedCell = { row: endRow, col: endCol };
    setLastSelectedCell(newLastSelectedCell);
  };

  // 범위 확장
  const extendRange = (endRow: number, endCol: number) => {
    if (!rangeStartCell) return;

    const { row: startRow, col: startCol } = rangeStartCell;
    const rangeCells = new Set<string>();
    const minRow = Math.min(startRow, endRow);
    const maxRow = Math.max(startRow, endRow);
    const minCol = Math.min(startCol, endCol);
    const maxCol = Math.max(startCol, endCol);

    for (let row = minRow; row <= maxRow; row++) {
      for (let col = minCol; col <= maxCol; col++) {
        rangeCells.add(`${row}-${col}`);
      }
    }

    setSelectedCells(rangeCells);
    setSelectionMode('none');
    setSelectedColumn(null);
    setSelectedRow(null);
    const newLastSelectedCell = { row: endRow, col: endCol };
    setLastSelectedCell(newLastSelectedCell);
  };

  // 클릭 이벤트 핸들러들
  const handleClickAll = () => {
    if (selectionMode === 'all') {
      // 이미 전체 선택된 상태에서 다시 클릭: 선택 해제
      clearSelection();
    } else {
      selectAll();
    }
  };

  // 열(Column) 헤더 클릭 이벤트 핸들러
  const handleClickHeaderCell = (index: number) => (e: React.MouseEvent) => {
    if (isResizing) return;

    if (e.shiftKey && selectedColumn !== null) {
      // Shift + Click: 열 범위 선택
      const minCol = Math.min(selectedColumn, index);
      const maxCol = Math.max(selectedColumn, index);
      const columnRangeCells = new Set<string>();

      for (let row = 0; row < rowCount; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          columnRangeCells.add(`${row}-${col}`);
        }
      }

      setSelectedCells(columnRangeCells);
      setSelectionMode('none');
      setSelectedColumn(null);
      setSelectedRow(null);
    } else if (isCmdOrCtrlPressed(e)) {
      // Cmd/Ctrl + Click: 열 다중 선택 토글
      toggleColumnSelection(index);
    } else if (selectedColumn === index && selectionMode === 'column') {
      // 이미 선택된 열을 다시 클릭: 선택 해제
      clearSelection();
    } else {
      selectColumn(index);
    }
  };

  // 행 셀 클릭 이벤트 핸들러
  const handleClickRowCell = (index: number) => (e: React.MouseEvent) => {
    if (isResizing) return;

    if (e.shiftKey && selectedRow !== null) {
      // Shift + Click: 행 범위 선택
      const minRow = Math.min(selectedRow, index);
      const maxRow = Math.max(selectedRow, index);
      const rowRangeCells = new Set<string>();

      for (let row = minRow; row <= maxRow; row++) {
        for (let col = 0; col < columnCount; col++) {
          rowRangeCells.add(`${row}-${col}`);
        }
      }

      setSelectedCells(rowRangeCells);
      setSelectionMode('none');
      setSelectedColumn(null);
      setSelectedRow(null);
    } else if (isCmdOrCtrlPressed(e)) {
      // Cmd/Ctrl + Click: 행 다중 선택 토글
      toggleRowSelection(index);
    } else if (selectedRow === index && selectionMode === 'row') {
      // 이미 선택된 행을 다시 클릭: 선택 해제
      clearSelection();
    } else {
      selectRow(index);
    }
  };

  // 셀 클릭 이벤트 핸들러
  const handleClickCell = (rowIndex: number, columnIndex: number) => (e: React.MouseEvent) => {
    const cellKey = `${rowIndex}-${columnIndex}`;
    const isCurrentlySelected = selectedCells.has(cellKey);

    if (e.shiftKey && lastSelectedCell) {
      // Shift + Click: 범위 선택
      selectRange(lastSelectedCell.row, lastSelectedCell.col, rowIndex, columnIndex);
      setRangeStartCell({ row: lastSelectedCell.row, col: lastSelectedCell.col });
    } else if (isCmdOrCtrlPressed(e)) {
      // Cmd/Ctrl + Click: 다중 선택 토글
      toggleCellSelection(rowIndex, columnIndex);
    } else if (isCurrentlySelected && selectedCells.size === 1) {
      // 이미 선택된 단일 셀을 다시 클릭: 선택 해제
      deselectCell();
    } else {
      // 일반 클릭: 단일 셀 선택
      selectCell(rowIndex, columnIndex);
      setRangeStartCell({ row: rowIndex, col: columnIndex });
    }
  };

  return {
    // 상태
    selectedCells,
    selectionMode,
    selectedColumn,
    selectedRow,
    lastSelectedCell,

    // 유틸리티
    isCmdOrCtrlPressed,

    // 선택 함수들
    clearSelection,
    selectAll,
    selectColumn,
    toggleColumnSelection,
    selectRow,
    toggleRowSelection,
    selectCell,
    toggleCellSelection,
    deselectCell,
    selectRange,
    extendRange,

    // 이벤트 핸들러들
    handleClickAll,
    handleClickHeaderCell,
    handleClickRowCell,
    handleClickCell,
  };
}
