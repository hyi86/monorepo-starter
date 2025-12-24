'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useCallback, useEffect, useRef, useState } from 'react';
import { defaultColumnHeight } from '../styles';
import { type Column, type Data } from '../types';

type UseVirtualizationParams = {
  rows: Data[];
  columns: Column[];
};

export function useVirtualization({ rows, columns }: UseVirtualizationParams) {
  // 컨테이너 Ref
  const parentRef = useRef<HTMLDivElement>(null);

  // 스크롤 위치 상태
  const [scrollTop, setScrollTop] = useState(0);

  // 행 개수(전체 데이터 개수 / 열 개수)
  const rowCount = Math.floor(rows.length / columns.length);

  // 행 가상화
  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => defaultColumnHeight as number,
    overscan: 20,
    paddingStart: defaultColumnHeight as number,
    enabled: true,
  });

  // 열 가상화
  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: columns.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => columns[index]?.width || 10,
    overscan: 20,
    enabled: true,
  });

  // 스크롤 이동 함수
  const handleScrollMove = useCallback(
    (direction: 'top' | 'bottom') => {
      if (direction === 'top') {
        rowVirtualizer.scrollToOffset(0); // 패딩이 잡혀있어서 Offset으로 해야 함
        columnVirtualizer.scrollToIndex(0);
      } else {
        rowVirtualizer.scrollToIndex(rowCount - 1);
        columnVirtualizer.scrollToIndex(columns.length - 1);
      }
    },
    [rowCount, rowVirtualizer, columnVirtualizer, columns],
  );

  // 컬럼 변경 시 virtualizer 업데이트
  useEffect(() => {
    columnVirtualizer.measure();
  }, [columns, columnVirtualizer]);

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

  return {
    // Refs
    parentRef,

    // 상태
    scrollTop,
    rowCount,

    // Virtualizers
    rowVirtualizer,
    columnVirtualizer,

    // 함수
    handleScrollMove,
  };
}
