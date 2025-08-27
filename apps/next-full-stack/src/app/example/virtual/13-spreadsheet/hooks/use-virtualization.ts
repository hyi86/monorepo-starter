import { useVirtualizer, type Virtualizer } from '@tanstack/react-virtual';
import { useCallback, useEffect, useRef, useState } from 'react';
import { defaultColumnHeight } from '../styles';

type Data = {
  id: string;
  value: string;
  height?: number;
};

type Column = {
  id: string;
  width: number;
};

export function useVirtualization(
  rows: Data[],
  columns: Column[],
): {
  parentRef: React.RefObject<HTMLDivElement | null>;
  scrollTop: number;
  rowCount: number;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  columnVirtualizer: Virtualizer<HTMLDivElement, Element>;
} {
  // 컨테이너 Ref
  const parentRef = useRef<HTMLDivElement>(null);

  // 스크롤 위치 상태
  const [scrollTop, setScrollTop] = useState(0);

  const rowCount = Math.floor(rows.length / columns.length);

  // 행 가상화
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
  };
}
