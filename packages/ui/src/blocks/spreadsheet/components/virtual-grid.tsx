/**
 * 가상화 그리드 컴포넌트 - Phase 0.2 가상화 엔진 테스트용
 */

import { useRef, useState } from 'react';
import { defaultCellRendererEngine } from '../core/cell-renderer';
import { SheetModel } from '../core/sheet-model';
import { Column } from '../core/types';
import { useVirtualization, VirtualizationConfig } from '../core/virtualization';
import { CellComponent } from './cell';

interface VirtualGridProps {
  rows: number;
  columns: Column[];
  rowHeight?: number;
  containerWidth?: number;
  containerHeight?: number;
}

export function VirtualGrid({
  rows,
  columns,
  rowHeight = 32,
  containerWidth = 800,
  containerHeight = 600,
}: VirtualGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [snapshot] = useState(() => {
    const model = new SheetModel({
      rowCount: rows,
      colCount: columns.length,
      columns,
    });
    return model.getSnapshot();
  });

  const config: VirtualizationConfig = {
    containerWidth,
    containerHeight,
    rowHeight,
    overscan: 5,
  };

  const { rowVirtualizer, colVirtualizer, totalWidth, totalHeight } = useVirtualization(config, snapshot);

  const virtualRows = rowVirtualizer.getVirtualItems();
  const virtualCols = colVirtualizer.getVirtualItems();

  return (
    <div
      ref={containerRef}
      className="sheet-container"
      data-testid="virtual-grid-container"
      style={{
        width: containerWidth,
        height: containerHeight,
        overflow: 'auto',
        border: '1px solid #ccc',
        position: 'relative',
      }}
    >
      {/* 가상화 컨테이너 */}
      <div
        style={{
          height: `${totalHeight}px`,
          width: `${totalWidth}px`,
          position: 'relative',
        }}
      >
        {/* 가상화된 셀들 렌더링 */}
        {virtualRows.map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
              display: 'flex',
            }}
          >
            {virtualCols.map((virtualCol) => {
              const col = columns[virtualCol.index];

              // 컬럼 타입에 따른 실제 데이터 생성
              let cellValue: any;
              let formattedValue: string;

              switch (col?.type) {
                case 'number':
                  cellValue = virtualRow.index * 100 + virtualCol.index;
                  formattedValue = cellValue.toLocaleString();
                  break;
                case 'boolean':
                  cellValue = virtualRow.index % 2 === 0;
                  formattedValue = cellValue ? 'Yes' : 'No';
                  break;
                case 'date':
                  const date = new Date(2024, 0, 1);
                  date.setDate(date.getDate() + virtualRow.index);
                  cellValue = date;
                  formattedValue = date.toLocaleDateString();
                  break;
                default:
                  cellValue = `${col?.header || 'Col'} ${virtualRow.index + 1}`;
                  formattedValue = cellValue;
              }

              const cell = {
                value: cellValue,
                formattedValue,
                type: col?.type || 'text',
              };

              return (
                <CellComponent
                  key={virtualCol.index}
                  value={cellValue}
                  cell={cell}
                  column={col || { key: `col_${virtualCol.index}`, width: virtualCol.size }}
                  rowIndex={virtualRow.index}
                  colIndex={virtualCol.index}
                  width={virtualCol.size}
                  height={virtualRow.size}
                  rendererEngine={defaultCellRendererEngine}
                  onClick={(row, col) => console.log(`Clicked: ${row}, ${col}`)}
                  onDoubleClick={(row, col) => console.log(`Double clicked: ${row}, ${col}`)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
