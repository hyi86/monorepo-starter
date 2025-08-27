'use client';

import { format } from '@henry-hong/common-utils/number';
import { Button } from '@monorepo-starter/ui/components/button';
import { Input } from '@monorepo-starter/ui/components/input';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { useVirtualizer } from '@tanstack/react-virtual';
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import {
  getCellRootStyle,
  getCellStyle,
  getColumnHeaderContentStyle,
  getColumnHeaderItemStyle,
  getColumnHeaderStyle,
  getCornerStyle,
  getResizeHandleStyle,
  getRootContainerStyle,
  getRootStyle,
  getRowHeaderContentItemStyle,
  getRowHeaderContentScrollStyle,
  getRowHeaderContentStyle,
  getRowHeaderStyle,
} from './styles';
import { indexToColumnLabel } from './utils';

type Column = {
  id: string;
  width: number;
};

type Data = {
  id: string;
  value: string;
  height?: number;
};

export default function SpreadsheetGrid({ rows, columns }: { rows: Data[]; columns: Column[] }) {
  // 컨테이너 Ref
  const parentRef = useRef<HTMLDivElement>(null);
  // 리사이징 Ref
  const resizeRef = useRef<{
    startX: number;
    startWidth: number;
    columnIndex: number;
  } | null>(null);

  const rowCount = Math.floor(rows.length / columns.length);
  // 기본 컬럼 높이
  const defaultColumnHeight = 36;
  const contentSize: { width: CSSProperties['width']; height: CSSProperties['height'] } = {
    width: 500,
    height: 380,
  };

  // 스크롤 위치 상태
  const [scrollTop, setScrollTop] = useState(0);

  // 컬럼 리사이징 관련 상태
  const [isResizing, setIsResizing] = useState(false);
  const [resizeColumnIndex, setResizeColumnIndex] = useState<number | null>(null);
  const [columnsState, setColumnsState] = useState<Column[]>(columns);

  // 셀 선택 관련 상태
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [selectionMode, setSelectionMode] = useState<'none' | 'all' | 'column' | 'row'>('none');
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [lastSelectedCell, setLastSelectedCell] = useState<{ row: number; col: number } | null>(null);

  // 키보드 내비게이션 관련 상태
  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number } | null>(null);

  // 행 가상화
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => rows[index]?.height || defaultColumnHeight,
    overscan: 20,
    paddingStart: defaultColumnHeight,
    enabled: true,
  });

  // 열 가상화
  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: columnsState.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => columnsState[index]?.width || 10,
    overscan: 20,
    enabled: true,
  });

  // 셀 선택 관련 함수들
  const clearSelection = () => {
    setSelectedCells(new Set());
    setSelectionMode('none');
    setSelectedColumn(null);
    setSelectedRow(null);
  };

  const selectAll = () => {
    const allCells = new Set<string>();
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < columnsState.length; col++) {
        allCells.add(`${row}-${col}`);
      }
    }
    setSelectedCells(allCells);
    setSelectionMode('all');
    setSelectedColumn(null);
    setSelectedRow(null);
  };

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

  const selectRow = (rowIndex: number) => {
    const rowCells = new Set<string>();
    for (let col = 0; col < columnsState.length; col++) {
      rowCells.add(`${rowIndex}-${col}`);
    }
    setSelectedCells(rowCells);
    setSelectionMode('row');
    setSelectedRow(rowIndex);
    setSelectedColumn(null);
  };

  const toggleRowSelection = (rowIndex: number) => {
    const rowCells = new Set<string>();
    for (let col = 0; col < columnsState.length; col++) {
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

  // Cmd/Ctrl 키 감지 유틸리티
  const isCmdOrCtrlPressed = (e: React.MouseEvent | MouseEvent) => {
    return e.metaKey || e.ctrlKey;
  };

  // 키보드 내비게이션 함수들
  const moveToCell = (row: number, col: number, isRangeSelection = false) => {
    // 범위 체크
    if (row < 0 || row >= rowCount || col < 0 || col >= columnsState.length) {
      return;
    }

    // 스크롤을 먼저 처리하여 가상화된 영역 확장
    rowVirtualizer.scrollToIndex(row, { align: 'auto' });
    columnVirtualizer.scrollToIndex(col, { align: 'auto' });

    // 가상화된 영역이 업데이트된 후 포커스 설정
    requestAnimationFrame(() => {
      setFocusedCell({ row, col });

      if (isRangeSelection && rangeStart) {
        // 범위 선택인 경우
        selectRange(rangeStart.row, rangeStart.col, row, col);
      } else {
        // 일반 선택인 경우
        selectCell(row, col);
      }
    });
  };

  // 범위 선택을 위한 이동 함수
  const moveToCellWithRange = (row: number, col: number, startRow: number, startCol: number) => {
    // 범위 체크
    if (row < 0 || row >= rowCount || col < 0 || col >= columnsState.length) {
      return;
    }

    // 스크롤을 먼저 처리하여 가상화된 영역 확장
    rowVirtualizer.scrollToIndex(row, { align: 'auto' });
    columnVirtualizer.scrollToIndex(col, { align: 'auto' });

    // 가상화된 영역이 업데이트된 후 포커스 설정
    requestAnimationFrame(() => {
      setFocusedCell({ row, col });
      selectRange(startRow, startCol, row, col);
    });
  };

  // 범위 선택을 위한 시작점
  const [rangeStart, setRangeStart] = useState<{ row: number; col: number } | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!focusedCell) return;

    const { row, col } = focusedCell;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (e.shiftKey) {
          // Shift + ArrowUp: 범위 선택
          const startRow = rangeStart ? rangeStart.row : row;
          const startCol = rangeStart ? rangeStart.col : col;
          if (!rangeStart) {
            setRangeStart({ row, col });
          }
          const newRow = Math.max(0, row - 1);
          moveToCellWithRange(newRow, col, startRow, startCol);
        } else if (e.metaKey || e.ctrlKey) {
          // Cmd/Ctrl + ArrowUp: 맨 위로 이동
          setRangeStart(null);
          moveToCell(0, col);
        } else {
          // 일반 ArrowUp: 위로 이동
          setRangeStart(null);
          moveToCell(row - 1, col);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (e.shiftKey) {
          // Shift + ArrowDown: 범위 선택
          const startRow = rangeStart ? rangeStart.row : row;
          const startCol = rangeStart ? rangeStart.col : col;
          if (!rangeStart) {
            setRangeStart({ row, col });
          }
          const newRow = Math.min(rowCount - 1, row + 1);
          moveToCellWithRange(newRow, col, startRow, startCol);
        } else if (e.metaKey || e.ctrlKey) {
          // Cmd/Ctrl + ArrowDown: 맨 아래로 이동
          setRangeStart(null);
          moveToCell(rowCount - 1, col);
        } else {
          // 일반 ArrowDown: 아래로 이동
          setRangeStart(null);
          moveToCell(row + 1, col);
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (e.shiftKey) {
          // Shift + ArrowLeft: 범위 선택
          const startRow = rangeStart ? rangeStart.row : row;
          const startCol = rangeStart ? rangeStart.col : col;
          if (!rangeStart) {
            setRangeStart({ row, col });
          }
          const newCol = Math.max(0, col - 1);
          moveToCellWithRange(row, newCol, startRow, startCol);
        } else if (e.metaKey || e.ctrlKey) {
          // Cmd/Ctrl + ArrowLeft: 맨 왼쪽으로 이동
          setRangeStart(null);
          moveToCell(row, 0);
        } else {
          // 일반 ArrowLeft: 왼쪽으로 이동
          setRangeStart(null);
          moveToCell(row, col - 1);
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (e.shiftKey) {
          // Shift + ArrowRight: 범위 선택
          const startRow = rangeStart ? rangeStart.row : row;
          const startCol = rangeStart ? rangeStart.col : col;
          if (!rangeStart) {
            setRangeStart({ row, col });
          }
          const newCol = Math.min(columnsState.length - 1, col + 1);
          moveToCellWithRange(row, newCol, startRow, startCol);
        } else if (e.metaKey || e.ctrlKey) {
          // Cmd/Ctrl + ArrowRight: 맨 오른쪽으로 이동
          setRangeStart(null);
          moveToCell(row, columnsState.length - 1);
        } else {
          // 일반 ArrowRight: 오른쪽으로 이동
          setRangeStart(null);
          moveToCell(row, col + 1);
        }
        break;
      case 'Enter':
        e.preventDefault();
        setRangeStart(null); // 범위 선택 초기화
        if (e.shiftKey) {
          // Shift + Enter: 위로 이동
          moveToCell(row - 1, col);
        } else {
          // Enter: 아래로 이동
          moveToCell(row + 1, col);
        }
        break;
      case 'Tab':
        e.preventDefault();
        setRangeStart(null); // 범위 선택 초기화
        if (e.shiftKey) {
          // Shift + Tab: 왼쪽으로 이동
          moveToCell(row, col - 1);
        } else {
          // Tab: 오른쪽으로 이동
          moveToCell(row, col + 1);
        }
        break;
      case 'Home':
        e.preventDefault();
        setRangeStart(null); // 범위 선택 초기화
        if (e.ctrlKey) {
          // Ctrl + Home: 첫 번째 셀로 이동
          moveToCell(0, 0);
        } else {
          // Home: 현재 행의 첫 번째 셀로 이동
          moveToCell(row, 0);
        }
        break;
      case 'End':
        e.preventDefault();
        setRangeStart(null); // 범위 선택 초기화
        if (e.ctrlKey) {
          // Ctrl + End: 마지막 셀로 이동
          moveToCell(rowCount - 1, columnsState.length - 1);
        } else {
          // End: 현재 행의 마지막 셀로 이동
          moveToCell(row, columnsState.length - 1);
        }
        break;
      case 'PageUp':
        e.preventDefault();
        setRangeStart(null); // 범위 선택 초기화
        moveToCell(Math.max(0, row - 10), col);
        break;
      case 'PageDown':
        e.preventDefault();
        setRangeStart(null); // 범위 선택 초기화
        moveToCell(Math.min(rowCount - 1, row + 10), col);
        break;
      case 'Escape':
        e.preventDefault();
        setRangeStart(null); // 범위 선택 초기화
        break;
    }
  };

  const selectCell = (rowIndex: number, columnIndex: number) => {
    const cellKey = `${rowIndex}-${columnIndex}`;
    setSelectedCells(new Set([cellKey]));
    setSelectionMode('none');
    setSelectedColumn(null);
    setSelectedRow(null);
    setLastSelectedCell({ row: rowIndex, col: columnIndex });
    setFocusedCell({ row: rowIndex, col: columnIndex });
    setRangeStart(null); // 범위 선택 초기화
  };

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
    setLastSelectedCell({ row: rowIndex, col: columnIndex });
  };

  const deselectCell = () => {
    setSelectedCells(new Set());
    setSelectionMode('none');
    setSelectedColumn(null);
    setSelectedRow(null);
    setLastSelectedCell(null);
  };

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
    setLastSelectedCell({ row: endRow, col: endCol });
  };

  // 전체 클릭 이벤트
  const handleClickAll = () => {
    if (selectionMode === 'all') {
      // 이미 전체 선택된 상태에서 다시 클릭: 선택 해제
      clearSelection();
    } else {
      selectAll();
    }
  };

  // Column 클릭 이벤트
  const handleClickHeaderCell = (index: number) => (e: React.MouseEvent) => {
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

  // Row 클릭 이벤트
  const handleClickRowCell = (index: number) => (e: React.MouseEvent) => {
    if (e.shiftKey && selectedRow !== null) {
      // Shift + Click: 행 범위 선택
      const minRow = Math.min(selectedRow, index);
      const maxRow = Math.max(selectedRow, index);
      const rowRangeCells = new Set<string>();

      for (let row = minRow; row <= maxRow; row++) {
        for (let col = 0; col < columnsState.length; col++) {
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

  // 개별 셀 클릭 이벤트
  const handleClickCell = (rowIndex: number, columnIndex: number) => (e: React.MouseEvent) => {
    const cellKey = `${rowIndex}-${columnIndex}`;
    const isCurrentlySelected = selectedCells.has(cellKey);

    if (e.shiftKey && lastSelectedCell) {
      // Shift + Click: 범위 선택
      selectRange(lastSelectedCell.row, lastSelectedCell.col, rowIndex, columnIndex);
    } else if (isCmdOrCtrlPressed(e)) {
      // Cmd/Ctrl + Click: 다중 선택 토글
      toggleCellSelection(rowIndex, columnIndex);
    } else if (isCurrentlySelected && selectedCells.size === 1) {
      // 이미 선택된 단일 셀을 다시 클릭: 선택 해제
      deselectCell();
    } else {
      // 일반 클릭: 단일 셀 선택
      selectCell(rowIndex, columnIndex);
    }
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    if (parentRef.current) {
      const newScrollTop = parentRef.current.scrollTop;
      setScrollTop(newScrollTop);
    }
  }, []);

  // 스크롤 이벤트 감지
  useEffect(() => {
    const scrollElement = parentRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // 컬럼 리사이징 이벤트 핸들러들
  const handleResizeStart = (columnIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    const column = columnsState[columnIndex];
    if (!column) return;

    setIsResizing(true);
    setResizeColumnIndex(columnIndex);
    resizeRef.current = {
      startX: e.clientX,
      startWidth: column.width,
      columnIndex,
    };
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!resizeRef.current) return;

    const { startX, startWidth, columnIndex } = resizeRef.current;
    const deltaX = e.clientX - startX;
    const newWidth = Math.max(50, startWidth + deltaX); // 최소 너비 50px

    setColumnsState((prev) => {
      const newState = prev.map((col, index) => (index === columnIndex ? { ...col, width: newWidth } : col));
      return newState;
    });

    // 즉시 virtualizer 업데이트
    columnVirtualizer.measure();
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    setResizeColumnIndex(null);
    resizeRef.current = null;
  };

  // 전역 마우스 이벤트 리스너
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);

      return () => {
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [isResizing]);

  return (
    <div className={cn(isResizing && 'cursor-col-resize select-none')} onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="mb-2">
        Total Content Size: {format(rowCount)} x {format(columnsState.length)} ={' '}
        {format(rowCount * columnsState.length)} Rows
      </div>
      <div className="mb-2 text-sm text-gray-600">
        {selectionMode === 'all' && '전체 선택됨'}
        {selectionMode === 'column' && selectedColumn !== null && `열 ${indexToColumnLabel(selectedColumn)} 선택됨`}
        {selectionMode === 'row' && selectedRow !== null && `행 ${selectedRow + 1} 선택됨`}
        {selectionMode === 'none' && selectedCells.size > 0 && `${selectedCells.size}개 셀 선택됨`}
        {selectionMode === 'none' && selectedCells.size === 0 && '선택된 셀 없음'}
        {lastSelectedCell && (
          <span className="ml-2 text-gray-500">
            (마지막 선택: {indexToColumnLabel(lastSelectedCell.col)}
            {lastSelectedCell.row + 1})
          </span>
        )}
      </div>
      <div className="mb-2 text-xs text-gray-500">
        💡 <strong>사용법:</strong> 클릭으로 선택, Shift+클릭으로 범위 선택, Cmd/Ctrl+클릭으로 다중 선택, 선택된 항목
        재클릭으로 해제
      </div>
      <div className="mb-2 text-xs text-gray-500">
        ⌨️ <strong>키보드:</strong> 화살표키로 이동, Enter로 아래 이동, Tab으로 다음 셀, Home/End로 행 이동,
        Ctrl+Home/End로 처음/끝 이동, Cmd/Ctrl+화살표로 맨 끝/처음 이동, Shift+화살표로 범위 선택
      </div>
      <div className="mb-2 flex gap-2">
        <Button variant="outline" onClick={() => rowVirtualizer.scrollToIndex(0)}>
          Scroll to top
        </Button>
        <Button variant="outline" onClick={() => rowVirtualizer.scrollToIndex(rowCount - 1)}>
          Scroll to bottom
        </Button>
        <Button variant="outline" onClick={() => columnVirtualizer.scrollToIndex(0)}>
          Scroll to left
        </Button>
        <Button variant="outline" onClick={() => columnVirtualizer.scrollToIndex(columns.length - 1)}>
          Scroll to right
        </Button>
      </div>

      <div style={getRootStyle()}>
        {/* 고정 코너 */}
        <div onClick={handleClickAll} style={getCornerStyle(defaultColumnHeight)}>
          #
        </div>

        {/* 고정 행(Row) 헤더 */}
        <div style={getRowHeaderStyle(contentSize.height, defaultColumnHeight)}>
          <div style={getRowHeaderContentStyle(rowVirtualizer.getTotalSize())}>
            <div style={getRowHeaderContentScrollStyle(scrollTop)}>
              {Array.from({ length: rowCount }, (_, index) => (
                <div
                  key={index}
                  style={getRowHeaderContentItemStyle(rows[index]?.height || defaultColumnHeight)}
                  onClick={handleClickRowCell(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 데이터 컨테이너 */}
        <div ref={parentRef} style={getRootContainerStyle(contentSize.width, contentSize.height)}>
          {/* 고정 열(Column) 헤더 */}
          <div style={getColumnHeaderStyle()}>
            <div style={getColumnHeaderContentStyle(columnVirtualizer.getTotalSize())}>
              {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
                <div
                  key={virtualColumn.key}
                  style={getColumnHeaderItemStyle(defaultColumnHeight, virtualColumn.size, virtualColumn.start)}
                  onClick={handleClickHeaderCell(virtualColumn.index)}
                >
                  {indexToColumnLabel(virtualColumn.index)}

                  {/* 리사이징 핸들 */}
                  <div style={getResizeHandleStyle()} onMouseDown={(e) => handleResizeStart(virtualColumn.index, e)} />
                </div>
              ))}
            </div>
          </div>

          {/* 데이터 영역 */}
          <div style={getCellRootStyle(rowVirtualizer.getTotalSize(), columnVirtualizer.getTotalSize())}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => (
              <div key={virtualRow.key}>
                {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
                  const index = virtualRow.index * columnsState.length + virtualColumn.index;
                  if (index >= rows.length || rows[index] === undefined) return null;

                  return (
                    <div
                      key={virtualColumn.key}
                      style={getCellStyle(virtualRow.size, virtualColumn.size, virtualColumn.start, virtualRow.start)}
                      onClick={handleClickCell(virtualRow.index, virtualColumn.index)}
                    >
                      {rows[index]?.value}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 리사이징 중 오버레이 */}
      {isResizing && (
        <div className="pointer-events-none fixed inset-0 z-50">
          <div className="absolute left-0 right-0 top-0 h-1 bg-blue-500 opacity-50" />
        </div>
      )}
    </div>
  );
}
