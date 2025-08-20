/**
 * 가상화 그리드 컴포넌트 - Phase 0.2 가상화 엔진 테스트용
 */

import React, { useRef, useState } from 'react';
import { SheetModel } from '../core/sheet-model';
import { Column } from '../core/types';
import { useVirtualization, VirtualizationConfig } from '../core/virtualization';

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
              const cellValue = `R${virtualRow.index}C${virtualCol.index}`;

              return (
                <div
                  key={virtualCol.index}
                  style={{
                    position: 'absolute',
                    left: 0,
                    width: `${virtualCol.size}px`,
                    height: '100%',
                    transform: `translateX(${virtualCol.start}px)`,
                    border: '1px solid #eee',
                    padding: '4px',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                  }}
                >
                  {cellValue}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
