'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useState } from 'react';
import { type Row } from './page';

export default function FixedRowPage({ rows }: { rows: Row[] }) {
  const virtualContainerRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(true);
  const count = rows.length;
  const scrollbarStyle = cn(
    `
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
    `,
  );

  const rowVirtualizer = useVirtualizer({
    count,
    getScrollElement: () => virtualContainerRef.current,
    estimateSize: (i) => rows[i]?.height || 10, // 각 요소별 높이
    overscan: 5,
    enabled,
  });

  return (
    <div className="">
      <div className="mb-2 flex gap-2">
        <Button
          onClick={(e) => {
            e.preventDefault();
            rowVirtualizer.scrollToIndex(0);
          }}
        >
          scroll to the top
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            rowVirtualizer.scrollToIndex(rows.length / 2);
          }}
        >
          scroll to the middle
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            rowVirtualizer.scrollToIndex(rows.length - 1);
          }}
        >
          scroll to the end
        </Button>
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            setEnabled((prev) => !prev);
          }}
        >
          turn {enabled ? 'off' : 'on'} virtualizer
        </Button>
      </div>
      <div
        className={cn('h-[60dvh] min-h-[200px] w-1/2 overflow-y-auto border', scrollbarStyle)}
        ref={virtualContainerRef}
      >
        <div className="relative w-full" style={{ height: rowVirtualizer.getTotalSize() }}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            if (!rows[virtualRow.index]) return null;

            return (
              <div
                key={virtualRow.key}
                className="absolute left-0 top-0 w-full border-b px-2"
                style={{
                  height: virtualRow.size,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {rows[virtualRow.index]?.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
