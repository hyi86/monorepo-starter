'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { type Column } from '../types';

export function useColumnResize(initialColumns: Column[]) {
  // 컬럼 리사이징 관련 상태
  const [isResizing, setIsResizing] = useState(false);
  const [resizeColumnIndex, setResizeColumnIndex] = useState<number | null>(null);
  const [columnsState, setColumnsState] = useState<Column[]>(initialColumns);

  // 리사이징 Ref
  const resizeRef = useRef<{
    startX: number;
    startWidth: number;
    columnIndex: number;
  } | null>(null);

  // 컬럼 리사이징 시작(마우스 버튼 누르고 움직일 때)
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

  // 리사이징 중(마우스 버튼 누르고 움직일 때)
  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!resizeRef.current) return;

    const { startX, startWidth, columnIndex } = resizeRef.current;
    const deltaX = e.clientX - startX;
    const newWidth = Math.max(50, startWidth + deltaX); // 최소 너비 50px

    setColumnsState((prev) => {
      const newState = prev.map((col, index) => (index === columnIndex ? { ...col, width: newWidth } : col));
      return newState;
    });
  }, []);

  // 리사이징 종료(마우스 버튼 놓을 때)
  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
    setResizeColumnIndex(null);
    resizeRef.current = null;
  }, []);

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
  }, [isResizing, handleResizeMove, handleResizeEnd]);

  // 컬럼 상태 업데이트 함수 (외부에서 호출 가능)
  const updateColumns = (newColumns: Column[]) => {
    setColumnsState(newColumns);
  };

  return {
    // 상태
    isResizing,
    resizeColumnIndex,
    columnsState,

    // 이벤트 핸들러들
    handleResizeStart,

    // 유틸리티 함수들
    updateColumns,
  };
}
