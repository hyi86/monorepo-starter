'use client';

import { cn } from '@monorepo-starter/ui/lib/utils';
import { useCallback } from 'react';
import { useImmer } from 'use-immer';
import { useColumnResize } from './hooks/use-column-resize';
import { useCopyPaste } from './hooks/use-copy-paste';
import { useEditing } from './hooks/use-editing';
import { useHistory } from './hooks/use-history';
import { useKeyboardNavigation } from './hooks/use-keyboard-navigation';
import { useSelection } from './hooks/use-selection';
import { useVirtualization } from './hooks/use-virtualization';
import { SheetStatus } from './status';
import {
  contentHeight,
  contentWidth,
  defaultColumnHeight,
  defaultColumnWidth,
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
import type { Column, Data } from './types';
import { indexToColumnLabel } from './utils';

export function Sheet({ rows: initialRows, columns }: { rows: Data[]; columns: Column[] }) {
  // 내부 상태로 데이터 관리
  const [rows, setRows] = useImmer<Data[]>(initialRows);

  // 히스토리 훅
  const { history, undo, redo, canUndo, canRedo } = useHistory({ rows, setRows });

  // 컬럼 리사이징 훅
  const { isResizing, columnsState, handleResizeStart } = useColumnResize(columns);

  // 가상화 훅
  const { parentRef, scrollTop, rowCount, rowVirtualizer, columnVirtualizer, handleScrollMove } = useVirtualization({
    rows,
    columns: columnsState,
  });

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
  } = useSelection({ rowCount, columnCount: columnsState.length, isResizing });

  // 배치 업데이트 함수
  // React Compiler가 자동으로 최적화하므로 useCallback 제거
  const handleBatchCellEdit = (updates: Array<{ rowIndex: number; colIndex: number; newValue: string }>) => {
    setRows((draft) => {
      updates.forEach(({ rowIndex, colIndex, newValue }) => {
        const index = rowIndex * columnsState.length + colIndex;
        if (index < rows.length) {
          const currentItem = draft[index];
          if (currentItem && currentItem.value !== newValue) {
            draft[index] = { ...currentItem, value: newValue };
          }
        }
      });
    });
  };

  // 편집 훅
  const {
    editingCell,
    editValue,
    startEditing,
    finishEditing,
    isEditingCell,
    handleInputChange,
    handleInputKeyDown,
    handleInputBlur,
  } = useEditing({
    rows,
    columnsCount: columnsState.length,
    rowCount,
    rowVirtualizer,
    columnVirtualizer,
    onCellEdit: (rowIndex: number, colIndex: number, newValue: string) => {
      const index = rowIndex * columnsState.length + colIndex;
      if (index < rows.length) {
        setRows((draft) => {
          const currentItem = draft[index];
          if (currentItem && currentItem.value !== newValue) {
            draft[index] = { ...currentItem, value: newValue };
          }
        });
      }
    },
  });

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
        setRows((draft) => {
          const currentItem = draft[index];
          if (currentItem && currentItem.value !== newValue) {
            draft[index] = { ...currentItem, value: newValue };
          }
        });
      }
    },
    onBatchCellEdit: handleBatchCellEdit,
  });

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
    undo,
    redo,
  });

  return (
    <div className={cn(isResizing && 'cursor-col-resize select-none')}>
      <div style={getRootStyle()}>
        {/* 고정 코너 */}
        <div
          onClick={isResizing ? undefined : handleClickAll}
          style={getCornerStyle()}
          className={cn(
            'bg-muted text-muted-foreground border-accent-foreground/15 border p-1 text-center',
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
                  title={`${index + 1}`}
                  className={cn(
                    'bg-muted text-muted-foreground border-accent-foreground/15 truncate border border-b-0 p-1 text-center text-sm first:border-t-0 last:border-b',
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
                    'text-muted-foreground bg-muted border-accent-foreground/15 border border-l-0 p-2 text-sm select-none',
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

                  const isEditing = isEditingCell(virtualRow.index, virtualColumn.index);

                  return (
                    <div
                      key={virtualColumn.key}
                      style={getCellStyle(virtualRow.size, virtualColumn.size, virtualColumn.start, virtualRow.start)}
                      onClick={handleCellClick(virtualRow.index, virtualColumn.index)}
                      onDoubleClick={handleCellDoubleClick(virtualRow.index, virtualColumn.index)}
                      className={cn(
                        'relative border-r border-b p-2 text-sm select-none',
                        selectedCells.has(`${virtualRow.index}-${virtualColumn.index}`) &&
                          'bg-blue-100 ring-1 ring-blue-300',
                        isEditing && 'bg-white ring-2 ring-blue-500',
                      )}
                    >
                      {isEditing ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={handleInputChange}
                          onKeyDown={handleInputKeyDown}
                          onBlur={handleInputBlur}
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
      <SheetStatus
        undo={undo}
        redo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        history={history}
        width={Number(defaultColumnWidth) + Number(contentWidth)}
        selectionMode={selectionMode}
        selectedColumn={selectedColumn}
        selectedRow={selectedRow}
        selectedCells={selectedCells}
        lastSelectedCell={lastSelectedCell}
        editingCell={editingCell}
        onScrollMove={handleScrollMove}
        copySelectedCells={copySelectedCells}
        pasteToSelectedCell={pasteToSelectedCell}
      />

      {/* 리사이징 중 오버레이 */}
      {isResizing && (
        <div className="pointer-events-none fixed inset-0 z-50">
          <div className="absolute top-0 right-0 left-0 h-1 bg-blue-500 opacity-50" />
        </div>
      )}
    </div>
  );
}
