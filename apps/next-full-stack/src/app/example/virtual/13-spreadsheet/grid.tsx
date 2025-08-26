'use client';

import { format } from '@henry-hong/common-utils/number';
import { Button } from '@monorepo-starter/ui/components/button';
import { Input } from '@monorepo-starter/ui/components/input';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef, useState } from 'react';
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
  const parentRef = useRef<HTMLDivElement>(null);
  const rowCount = Math.floor(rows.length / columns.length);
  const indexColumnWidth = 60; // 인덱스 컬럼 너비
  const defaultColumnHeight = 32; // 기본 컬럼 높이
  const bodyHeight = 380; // 본문 높이
  const [scrollTop, setScrollTop] = useState(0); // 스크롤 위치

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => rows[index]?.height || defaultColumnHeight,
    overscan: 5,
    paddingStart: 32,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: columns.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => columns[index]?.width || 10,
    overscan: 5,
  });

  // 전체 클릭 이벤트
  const handleClickAll = () => {
    console.log('all');
  };

  // Column 클릭 이벤트
  const handleClickHeaderCell = (index: number) => () => {
    console.log(index);
  };

  // Row 클릭 이벤트
  const handleClickRowCell = (index: number) => () => {
    console.log(index);
  };

  // 개별 셀 클릭 이벤트
  const handleClickCell = (row: Data | undefined) => () => {
    if (!row) return;
    console.log(row);
  };

  // 스크롤 이벤트 감지
  useEffect(() => {
    const handleScroll = () => {
      if (parentRef.current) {
        setScrollTop(parentRef.current.scrollTop);
      }
    };

    const scrollElement = parentRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div>
      <div className="mb-2">
        Total Content Size: {format(rowCount)} * {format(columns.length)} = {format(rowCount * columns.length)} Rows
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
      <div className="relative flex border">
        {/* 고정된 인덱스 컬럼 */}
        <div className="flex flex-shrink-0 flex-col" style={{ height: `${bodyHeight}px` }}>
          {/* 인덱스 컬럼 헤더 */}
          <div
            className="block border-b bg-gray-100 pt-1.5 text-center text-sm"
            style={{ height: `${defaultColumnHeight + 5}px` }}
            onClick={handleClickAll}
          >
            &nbsp;
          </div>

          {/* 인덱스 컬럼 데이터 - 스크롤 위치에 따라 동기화 */}
          <div className="relative h-full overflow-hidden">
            <div style={{ transform: `translateY(-${scrollTop}px)` }}>
              {Array.from({ length: rowCount }, (_, index) => (
                <div
                  key={`index-${index}`}
                  className="border-b border-r bg-gray-50 p-1 text-center text-sm font-medium"
                  style={{
                    width: `${indexColumnWidth}px`,
                    height: `${rows[index]?.height || defaultColumnHeight}px`,
                  }}
                  onClick={handleClickRowCell(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 스크롤 가능한 데이터 영역 */}
        <div ref={parentRef} className="w-200 overflow-auto border" style={{ height: `${bodyHeight}px` }}>
          {/* 고정된 헤더 */}
          <div className="sticky top-0 z-20 border-b bg-gray-100">
            <div
              className="relative"
              style={{
                width: `${columnVirtualizer.getTotalSize()}px`,
              }}
            >
              {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
                <div
                  key={`header-${virtualColumn.key}`}
                  className="absolute left-0 top-0 z-0 border-b border-r bg-gray-100 p-1 text-center text-sm font-semibold"
                  style={{
                    height: `${defaultColumnHeight}px`,
                    width: `${virtualColumn.size}px`,
                    transform: `translateX(${virtualColumn.start}px)`,
                  }}
                  onClick={handleClickHeaderCell(virtualColumn.index)}
                >
                  {indexToColumnLabel(virtualColumn.index)}
                </div>
              ))}
            </div>
          </div>

          {/* 스크롤 가능한 데이터 영역 */}
          <div
            className={cn('relative')}
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: `${columnVirtualizer.getTotalSize()}px`,
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => (
              <div key={virtualRow.key} data-index={virtualRow.index}>
                {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
                  const index = virtualRow.index * columns.length + virtualColumn.index;
                  if (index >= rows.length) return null;

                  return (
                    <div
                      key={virtualColumn.key}
                      className={cn('truncate whitespace-nowrap border-b border-r bg-white text-sm')}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: `${virtualColumn.size}px`,
                        height: `${virtualRow.size}px`,
                        transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                      }}
                      onClick={handleClickCell(rows[index])}
                    >
                      <Input value={rows[index]?.value} className="h-full w-full rounded-none border-none" readOnly />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
