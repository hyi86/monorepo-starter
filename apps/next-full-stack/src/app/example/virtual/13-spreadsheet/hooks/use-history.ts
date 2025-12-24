'use client';

import diff, { Difference } from 'microdiff';
import { useCallback, useEffect, useRef, useState } from 'react';
import { type Updater, useImmer } from 'use-immer';
import type { Data } from '../types';

const MAX_HISTORY_LENGTH = 10;

export function useHistory({ rows, setRows }: { rows: Data[]; setRows: Updater<Data[]> }) {
  const [prevRows, setPrevRows] = useState<Data[]>(rows);
  const [history, setHistory] = useImmer<Difference[][]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const isUndoRedoOperation = useRef(false);

  const undo = useCallback(() => {
    if (currentIndex < 0) return;

    isUndoRedoOperation.current = true;
    const historyItem = history[currentIndex];
    if (!historyItem) return;

    setRows((draft) => {
      historyItem.forEach((diff) => {
        if (diff.type !== 'CHANGE') return;
        const index = diff.path[0] as number;
        const value = diff.oldValue as string;
        if (!draft[index]) return;
        draft[index].value = value;
      });
    });

    setCurrentIndex(currentIndex - 1);
  }, [history, currentIndex, setRows]);

  const redo = useCallback(() => {
    if (currentIndex >= history.length - 1) return;

    isUndoRedoOperation.current = true;
    const nextIndex = currentIndex + 1;
    const historyItem = history[nextIndex];
    if (!historyItem) return;

    setRows((draft) => {
      historyItem.forEach((diff) => {
        if (diff.type !== 'CHANGE') return;
        const index = diff.path[0] as number;
        const value = diff.value as string;
        if (!draft[index]) return;
        draft[index].value = value;
      });
    });

    setCurrentIndex(nextIndex);
  }, [history, currentIndex, setRows]);

  // rows 변경 시 prevRows 업데이트
  useEffect(() => {
    setPrevRows(rows);
  }, [rows]);

  // prevRows와 rows 비교 후 히스토리에 저장
  useEffect(() => {
    // undo/redo 작업 중이면 히스토리에 추가하지 않음
    if (isUndoRedoOperation.current) {
      isUndoRedoOperation.current = false;
      return;
    }

    const diffResult = diff(prevRows, rows);

    // 변경사항이 없으면 히스토리에 추가하지 않음
    if (diffResult.length === 0) return;

    setHistory((draft) => {
      // 현재 인덱스 이후의 히스토리 삭제 (새로운 변경사항이 있으면 redo 히스토리 삭제)
      if (currentIndex < draft.length - 1) {
        draft.splice(currentIndex + 1);
      }

      // 최대 히스토리 길이 확인
      if (draft.length >= MAX_HISTORY_LENGTH) {
        draft.shift();
        setCurrentIndex(currentIndex - 1);
      }

      draft.push(diffResult);
    });

    setCurrentIndex((prev) => prev + 1);
  }, [prevRows, rows, currentIndex, setHistory]);

  return {
    history,
    undo,
    redo,
    canUndo: currentIndex >= 0,
    canRedo: currentIndex < history.length - 1,
  };
}
