'use client';

import { format } from '@henry-hong/common-utils/number';
import { Button } from '@monorepo-starter/ui/components/button';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { useCallback, useState } from 'react';
import { useColumnResize } from './hooks/use-column-resize';
import { useCopyPaste } from './hooks/use-copy-paste';
import { useKeyboardNavigation } from './hooks/use-keyboard-navigation';
import { useSelection } from './hooks/use-selection';
import { useVirtualization } from './hooks/use-virtualization';
import {
  contentHeight,
  defaultColumnHeight,
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
};

export default function SpreadsheetGrid({ rows: initialRows, columns }: { rows: Data[]; columns: Column[] }) {
  // 내부 상태로 데이터 관리
  const [rows, setRows] = useState<Data[]>(initialRows);

  // 편집 상태 관리
  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null);
  const [editValue, setEditValue] = useState('');

  // 컬럼 리사이징 훅
  const { isResizing, columnsState, handleResizeStart } = useColumnResize(columns);

  // 가상화 훅
  const { parentRef, scrollTop, rowCount, rowVirtualizer, columnVirtualizer } = useVirtualization(rows, columnsState);

  // 선택 관리 훅
  const {
    selectedCells,
    selectionMode,
    selectedColumn,
    selectedRow,
    lastSelectedCell,
    selectCell,
    selectRow,
    selectColumn,
    extendRange,
    handleClickAll,
    handleClickHeaderCell,
    handleClickRowCell,
    handleClickCell,
  } = useSelection(rowCount, columnsState.length, isResizing);

  // 복사/붙여넣기 훅
  const { copySelectedCells, pasteToSelectedCell } = useCopyPaste({
    rows,
    rowCount,
    columnCount: columnsState.length,
    selectedCells,
    selectionMode,
    selectedColumn,
    selectedRow,
    lastSelectedCell,
    onCellEdit: (rowIndex: number, colIndex: number, newValue: string) => {
      const index = rowIndex * columnsState.length + colIndex;
      if (index < rows.length) {
        setRows((prevRows) => {
          const newRows = [...prevRows];
          const currentItem = newRows[index];
          if (currentItem && currentItem.value !== newValue) {
            newRows[index] = { ...currentItem, value: newValue };
          }
          return newRows;
        });
      }
    },
  });

  // 편집 모드 시작
  const startEditing = useCallback(
    (rowIndex: number, colIndex: number) => {
      const index = rowIndex * columnsState.length + colIndex;
      const currentValue = rows[index]?.value || '';
      setEditingCell({ row: rowIndex, col: colIndex });
      setEditValue(currentValue);
    },
    [rows, columnsState.length],
  );

  // 편집 모드 종료
  const finishEditing = useCallback(
    (save: boolean = true) => {
      if (editingCell && save) {
        const index = editingCell.row * columnsState.length + editingCell.col;
        if (index < rows.length) {
          setRows((prevRows) => {
            const newRows = [...prevRows];
            const currentItem = newRows[index];
            if (currentItem && currentItem.value !== editValue) {
              newRows[index] = { ...currentItem, value: editValue };
            }
            return newRows;
          });
        }
      }
      setEditingCell(null);
      setEditValue('');
    },
    [editingCell, editValue, rows.length, columnsState.length],
  );

  // 셀 클릭 핸들러 (더블클릭 감지)
  const handleCellClick = useCallback(
    (rowIndex: number, colIndex: number) => (e: React.MouseEvent) => {
      handleClickCell(rowIndex, colIndex)(e);
    },
    [handleClickCell],
  );

  // 셀 더블클릭 핸들러
  const handleCellDoubleClick = useCallback(
    (rowIndex: number, colIndex: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      startEditing(rowIndex, colIndex);
    },
    [startEditing],
  );

  // 키보드 내비게이션 훅 (편집 모드 고려)
  useKeyboardNavigation({
    rowCount,
    columnCount: columnsState.length,
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
    isEditing: !!editingCell,
    copySelectedCells,
    pasteToSelectedCell,
  });

  return (
    <div className={cn(isResizing && 'cursor-col-resize select-none')}>
      <div className="mb-2">
        Total Content Size: {format(rowCount)} x {format(columnsState.length)} ={' '}
        {format(rowCount * columnsState.length)} Rows
      </div>
      <div className="mb-2 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">상태:</span>
          {selectionMode === 'column' && selectedColumn !== null && (
            <span className="font-medium text-blue-600">열 {indexToColumnLabel(selectedColumn)} 선택됨</span>
          )}
          {selectionMode === 'row' && selectedRow !== null && (
            <span className="font-medium text-blue-600">행 {selectedRow + 1} 선택됨</span>
          )}
          {selectionMode === 'none' && selectedCells.size > 0 && (
            <span className="font-medium text-blue-600">{selectedCells.size}개 셀 선택됨</span>
          )}
          {selectionMode === 'none' && selectedCells.size === 0 && lastSelectedCell && (
            <span className="font-medium text-blue-600">
              셀 {indexToColumnLabel(lastSelectedCell.col)}
              {lastSelectedCell.row + 1} 선택됨
            </span>
          )}
        </div>

        {editingCell && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500">편집:</span>
            <span className="font-medium text-orange-600">
              {indexToColumnLabel(editingCell.col)}
              {editingCell.row + 1}
            </span>
          </div>
        )}
      </div>

      <div className="mb-2 text-xs text-gray-500">
        💡 <strong>사용법:</strong> 클릭으로 선택, Shift+클릭으로 범위 선택, Cmd/Ctrl+클릭으로 다중 선택, 선택된 항목
        재클릭으로 해제
      </div>
      <div className="mb-2 text-xs text-gray-500">
        ✏️ <strong>편집:</strong> 더블클릭 또는 선택 후 엔터키로 편집 모드, 편집 중 엔터키로 저장, ESC키로 취소
      </div>
      <div className="mb-2 text-xs text-gray-500">
        📋 <strong>복사/붙여넣기:</strong> Cmd/Ctrl+C로 복사, Cmd/Ctrl+V로 붙여넣기 (CSV 형식)
      </div>

      <div className="mb-2 text-xs text-gray-500">
        ⌨️ <strong>키보드:</strong> 화살표키로 셀 이동 (↑↓←→), Shift+화살표키로 범위 선택, Shift+Space로 행 전체 선택,
        Ctrl+Space로 열 전체 선택
      </div>
      <div className="mb-2 flex gap-2">
        <Button
          variant="outline"
          onClick={() => {
            rowVirtualizer.scrollToIndex(0);
            columnVirtualizer.scrollToIndex(0);
          }}
        >
          Scroll to Start
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            rowVirtualizer.scrollToIndex(rowCount - 1);
            columnVirtualizer.scrollToIndex(columns.length - 1);
          }}
        >
          Scroll to end
        </Button>

        <Button variant="outline" onClick={copySelectedCells} disabled={selectedCells.size === 0 && !lastSelectedCell}>
          복사 (Ctrl+C)
        </Button>
        <Button variant="outline" onClick={pasteToSelectedCell} disabled={!lastSelectedCell}>
          붙여넣기 (Ctrl+V)
        </Button>
      </div>

      <div style={getRootStyle()}>
        {/* 고정 코너 */}
        <div
          onClick={isResizing ? undefined : handleClickAll}
          style={getCornerStyle()}
          className={cn(
            'bg-muted text-muted-foreground border-accent-foreground/15 border text-center',
            selectionMode === 'all' && 'bg-blue-100',
            (scrollTop > 0 || (columnVirtualizer.scrollOffset || 0) > 0) && 'shadow',
          )}
        >
          #
        </div>

        {/* 고정 행(Row) 헤더 */}
        <div style={getRowHeaderStyle(contentHeight, defaultColumnHeight)}>
          <div style={getRowHeaderContentStyle(rowVirtualizer.getTotalSize())}>
            <div style={getRowHeaderContentScrollStyle(scrollTop)}>
              {Array.from({ length: rowCount }, (_, index) => (
                <div
                  key={index}
                  style={getRowHeaderContentItemStyle()}
                  className={cn(
                    'bg-muted text-muted-foreground border-accent-foreground/15 border border-b-0 p-2 text-center text-sm first:border-t-0 last:border-b',
                    selectionMode === 'row' && selectedRow === index && 'bg-blue-200',
                  )}
                  onClick={handleClickRowCell(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 데이터 컨테이너 */}
        <div ref={parentRef} style={getRootContainerStyle()}>
          {/* 고정 열(Column) 헤더 */}
          <div style={getColumnHeaderStyle()}>
            <div style={getColumnHeaderContentStyle(columnVirtualizer.getTotalSize())}>
              {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
                <div
                  key={virtualColumn.key}
                  style={getColumnHeaderItemStyle(defaultColumnHeight, virtualColumn.size, virtualColumn.start)}
                  onClick={handleClickHeaderCell(virtualColumn.index)}
                  className={cn(
                    'text-muted-foreground bg-muted border-accent-foreground/15 select-none border border-l-0 p-2 text-sm',
                    selectionMode === 'column' && selectedColumn === virtualColumn.index && 'bg-blue-200',
                    scrollTop > 0 && 'shadow',
                  )}
                >
                  {indexToColumnLabel(virtualColumn.index)}

                  {/* 리사이징 핸들 */}
                  <div
                    style={getResizeHandleStyle()}
                    className={cn('hover:bg-blue-500')}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleResizeStart(virtualColumn.index, e);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
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

                  const isEditing = editingCell?.row === virtualRow.index && editingCell?.col === virtualColumn.index;

                  return (
                    <div
                      key={virtualColumn.key}
                      style={getCellStyle(virtualRow.size, virtualColumn.size, virtualColumn.start, virtualRow.start)}
                      onClick={handleCellClick(virtualRow.index, virtualColumn.index)}
                      onDoubleClick={handleCellDoubleClick(virtualRow.index, virtualColumn.index)}
                      className={cn(
                        'relative select-none border-b border-r p-2 text-sm',
                        selectedCells.has(`${virtualRow.index}-${virtualColumn.index}`) &&
                          'bg-blue-100 ring-1 ring-blue-300',
                        isEditing && 'bg-white ring-2 ring-blue-500',
                      )}
                    >
                      {isEditing ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              finishEditing(true);
                            } else if (e.key === 'Escape') {
                              e.preventDefault();
                              finishEditing(false);
                            }
                          }}
                          onBlur={() => finishEditing(true)}
                          className="h-full w-full border-none bg-transparent text-sm outline-none"
                          autoFocus
                        />
                      ) : (
                        rows[index]?.value
                      )}
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
