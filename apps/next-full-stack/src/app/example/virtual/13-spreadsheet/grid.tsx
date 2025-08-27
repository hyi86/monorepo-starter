'use client';

import { format } from '@henry-hong/common-utils/number';
import { Button } from '@monorepo-starter/ui/components/button';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { useColumnResize } from './hooks/use-column-resize';
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

export default function SpreadsheetGrid({ rows, columns }: { rows: Data[]; columns: Column[] }) {
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
    handleClickAll,
    handleClickHeaderCell,
    handleClickRowCell,
    handleClickCell,
  } = useSelection(rowCount, columnsState.length, isResizing);

  return (
    <div className={cn(isResizing && 'cursor-col-resize select-none')}>
      <div className="mb-2">
        Total Content Size: {format(rowCount)} x {format(columnsState.length)} ={' '}
        {format(rowCount * columnsState.length)} Rows
      </div>
      <div className="mb-2 text-sm text-gray-600">
        {selectionMode}
        {selectionMode === 'column' && selectedColumn !== null && `열 ${indexToColumnLabel(selectedColumn)} 선택됨`}
        {selectionMode === 'row' && selectedRow !== null && `행 ${selectedRow + 1} 선택됨`}
        {selectionMode === 'none' && selectedCells.size > 0 && `${selectedCells.size}개 셀 선택됨`}
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
      <div className="mb-2 flex gap-2">
        <Button variant="outline" onClick={() => rowVirtualizer.scrollToIndex(0)}>
          Scroll to Start
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

                  return (
                    <div
                      key={virtualColumn.key}
                      style={getCellStyle(virtualRow.size, virtualColumn.size, virtualColumn.start, virtualRow.start)}
                      onClick={handleClickCell(virtualRow.index, virtualColumn.index)}
                      className={cn(
                        'select-none border-b border-r p-2 text-sm',
                        selectedCells.has(`${virtualRow.index}-${virtualColumn.index}`) &&
                          'bg-blue-100 ring-1 ring-blue-300',
                      )}
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
