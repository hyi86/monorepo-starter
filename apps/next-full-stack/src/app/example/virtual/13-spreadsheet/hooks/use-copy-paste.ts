'use client';

import { useCallback, useState } from 'react';
import type { Cell, Data, SelectionMode } from '../types';

type UseCopyPasteParams = {
  rows: Data[];
  rowCount: number;
  columnCount: number;
  selectedCells: Set<string>;
  selectionMode: SelectionMode;
  selectedColumn: number | null;
  selectedRow: number | null;
  lastSelectedCell: Cell | null;
  onCellEdit?: (rowIndex: number, colIndex: number, newValue: string) => void;
};

export function useCopyPaste({
  rows,
  rowCount,
  columnCount,
  selectedCells,
  selectionMode,
  selectedColumn,
  selectedRow,
  lastSelectedCell,
  onCellEdit,
}: UseCopyPasteParams) {
  // 임시 클립보드 (클립보드 API가 작동하지 않을 때 사용)
  const [tempClipboard, setTempClipboard] = useState<string>('');
  // 복사 기능
  const copySelectedCells = useCallback(async () => {
    if (selectedCells.size === 0 && !lastSelectedCell) return;

    const cellsToCopy: Array<{ row: number; col: number; value: string }> = [];

    if (selectionMode === 'column' && selectedColumn !== null) {
      // 열 전체 복사
      for (let row = 0; row < rowCount; row++) {
        const index = row * columnCount + selectedColumn;
        if (index < rows.length) {
          cellsToCopy.push({
            row,
            col: selectedColumn,
            value: rows[index]?.value || '',
          });
        }
      }
    } else if (selectionMode === 'row' && selectedRow !== null) {
      // 행 전체 복사
      for (let col = 0; col < columnCount; col++) {
        const index = selectedRow * columnCount + col;
        if (index < rows.length) {
          cellsToCopy.push({
            row: selectedRow,
            col,
            value: rows[index]?.value || '',
          });
        }
      }
    } else if (lastSelectedCell) {
      // 개별 셀 또는 범위 복사
      if (selectedCells.size === 1) {
        // 단일 셀 복사
        const index = lastSelectedCell.row * columnCount + lastSelectedCell.col;
        if (index < rows.length) {
          cellsToCopy.push({
            row: lastSelectedCell.row,
            col: lastSelectedCell.col,
            value: rows[index]?.value || '',
          });
        }
      } else {
        // 범위 복사
        const cellKeys = Array.from(selectedCells);
        for (const cellKey of cellKeys) {
          const parts = cellKey.split('-');
          if (parts.length === 2) {
            const rowStr = parts[0];
            const colStr = parts[1];
            if (rowStr && colStr) {
              const row = parseInt(rowStr);
              const col = parseInt(colStr);
              if (!isNaN(row) && !isNaN(col)) {
                const index = row * columnCount + col;
                if (index < rows.length && rows[index]) {
                  cellsToCopy.push({
                    row,
                    col,
                    value: rows[index].value || '',
                  });
                }
              }
            }
          }
        }
        // 행과 열 순서로 정렬
        cellsToCopy.sort((a, b) => {
          if (a.row !== b.row) return a.row - b.row;
          return a.col - b.col;
        });
      }
    }

    if (cellsToCopy.length === 0) return;

    // CSV 형식으로 변환
    const rowsMap = new Map<number, Map<number, string>>();
    let minRow = Infinity;
    let maxRow = -Infinity;
    let minCol = Infinity;
    let maxCol = -Infinity;

    cellsToCopy.forEach(({ row, col, value }) => {
      if (!rowsMap.has(row)) {
        rowsMap.set(row, new Map());
      }
      rowsMap.get(row)!.set(col, value);
      minRow = Math.min(minRow, row);
      maxRow = Math.max(maxRow, row);
      minCol = Math.min(minCol, col);
      maxCol = Math.max(maxCol, col);
    });

    const csvRows: string[] = [];
    for (let row = minRow; row <= maxRow; row++) {
      const csvCols: string[] = [];
      for (let col = minCol; col <= maxCol; col++) {
        const value = rowsMap.get(row)?.get(col) || '';
        // CSV에서 쉼표와 따옴표 처리
        const escapedValue =
          value.includes(',') || value.includes('"') || value.includes('\n') ? `"${value.replace(/"/g, '""')}"` : value;
        csvCols.push(escapedValue);
      }
      csvRows.push(csvCols.join(','));
    }

    const csvData = csvRows.join('\n');

    try {
      await navigator.clipboard.writeText(csvData);
    } catch (error) {
      // 클립보드 API가 실패하면 임시 클립보드에 저장
      console.error(error);
      setTempClipboard(csvData);
    }
  }, [selectedCells, selectionMode, selectedColumn, selectedRow, lastSelectedCell, rows, rowCount, columnCount]);

  // 붙여넣기 기능
  const pasteToSelectedCell = useCallback(async () => {
    if (!lastSelectedCell) return;

    try {
      let clipboardText = '';
      try {
        clipboardText = await navigator.clipboard.readText();
      } catch (error) {
        console.error(error);
        clipboardText = tempClipboard;
      }

      if (!clipboardText.trim()) return;

      // CSV 파싱
      const rows = clipboardText.split('\n').filter((row) => row.trim());
      const parsedData: string[][] = rows.map((row) => {
        const cols: string[] = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < row.length; i++) {
          const char = row[i];
          if (char === '"') {
            if (inQuotes && row[i + 1] === '"') {
              current += '"';
              i++; // 다음 따옴표 건너뛰기
            } else {
              inQuotes = !inQuotes;
            }
          } else if (char === ',' && !inQuotes) {
            cols.push(current);
            current = '';
          } else {
            current += char;
          }
        }
        cols.push(current);
        return cols;
      });

      // 데이터 붙여넣기
      const startRow = lastSelectedCell.row;
      const startCol = lastSelectedCell.col;

      // 단일 값인 경우 (복사된 데이터가 하나의 셀)
      if (parsedData.length === 1 && parsedData[0] && parsedData[0].length === 1) {
        const singleValue = parsedData[0][0];

        // 선택된 모든 셀에 같은 값을 붙여넣기
        if (selectedCells.size > 0 && singleValue !== undefined) {
          for (const cellKey of selectedCells) {
            const parts = cellKey.split('-');
            if (parts.length === 2) {
              const rowStr = parts[0];
              const colStr = parts[1];
              if (rowStr && colStr) {
                const row = parseInt(rowStr);
                const col = parseInt(colStr);
                if (!isNaN(row) && !isNaN(col) && onCellEdit) {
                  onCellEdit(row, col, singleValue);
                }
              }
            }
          }
        } else if (singleValue !== undefined) {
          // 선택된 셀이 없으면 마지막 선택된 셀에만 붙여넣기
          if (onCellEdit) {
            onCellEdit(startRow, startCol, singleValue);
          }
        }
      } else {
        // 여러 값인 경우 (기존 로직)
        for (let rowOffset = 0; rowOffset < parsedData.length; rowOffset++) {
          const rowData = parsedData[rowOffset];
          if (rowData) {
            for (let colOffset = 0; colOffset < rowData.length; colOffset++) {
              const targetRow = startRow + rowOffset;
              const targetCol = startCol + colOffset;
              const cellValue = rowData[colOffset];

              if (targetRow < rowCount && targetCol < columnCount && onCellEdit && cellValue !== undefined) {
                onCellEdit(targetRow, targetCol, cellValue);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [lastSelectedCell, rowCount, columnCount, onCellEdit, tempClipboard]);

  return {
    copySelectedCells,
    pasteToSelectedCell,
  };
}
