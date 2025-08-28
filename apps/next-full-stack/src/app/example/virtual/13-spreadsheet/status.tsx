import { Button } from '@monorepo-starter/ui/components/button';
import { ArrowDownToLineIcon, ArrowUpToLineIcon } from 'lucide-react';
import type { Cell, SelectionMode } from './types';
import { indexToColumnLabel } from './utils';

type Props = {
  width: React.CSSProperties['width'];
  selectionMode: SelectionMode;
  selectedColumn: number | null;
  selectedRow: number | null;
  selectedCells: Set<string>;
  lastSelectedCell: Cell | null;
  editingCell: Cell | null;
  onScrollMove: (direction: 'top' | 'bottom') => void;
  copySelectedCells: () => void | Promise<void>;
  pasteToSelectedCell: () => void | Promise<void>;
};

export function SheetStatus({
  width,
  selectionMode,
  selectedColumn,
  selectedRow,
  selectedCells,
  lastSelectedCell,
  editingCell,
  onScrollMove,
  copySelectedCells,
  pasteToSelectedCell,
}: Props) {
  return (
    <div style={{ width } as React.CSSProperties} className="flex justify-between border px-4 py-2 text-xs">
      <div className="min-h-9">
        {selectionMode === 'all' && <span className="font-medium text-blue-600">전체 선택됨</span>}
        {selectionMode === 'column' && selectedColumn !== null && (
          <span className="font-medium text-blue-600">열 {indexToColumnLabel(selectedColumn)} 선택됨</span>
        )}
        {selectionMode === 'row' && selectedRow !== null && (
          <span className="font-medium text-blue-600">행 {selectedRow + 1} 선택됨</span>
        )}
        {selectionMode === 'none' && selectedCells.size > 0 && (
          <span className="font-medium text-blue-600">{selectedCells.size}개 셀 선택됨</span>
        )}
        {selectionMode === 'none' && selectedCells.size === 0 && lastSelectedCell && (
          <span className="font-medium text-blue-600">
            셀 {indexToColumnLabel(lastSelectedCell.col)}
            {lastSelectedCell.row + 1} 선택됨
          </span>
        )}
        {editingCell && (
          <span className="font-medium text-blue-600">
            편집 중: {indexToColumnLabel(editingCell.col)} {editingCell.row + 1}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="size-7" onClick={() => onScrollMove('top')}>
          <ArrowUpToLineIcon className="size-4" />
        </Button>
        <Button variant="outline" size="sm" className="size-7" onClick={() => onScrollMove('bottom')}>
          <ArrowDownToLineIcon className="size-4" />
        </Button>

        <Button variant="outline" onClick={copySelectedCells} disabled={selectedCells.size === 0 && !lastSelectedCell}>
          복사 (Ctrl+C)
        </Button>
        <Button variant="outline" onClick={pasteToSelectedCell} disabled={!lastSelectedCell}>
          붙여넣기 (Ctrl+V)
        </Button>
      </div>
    </div>
  );
}
