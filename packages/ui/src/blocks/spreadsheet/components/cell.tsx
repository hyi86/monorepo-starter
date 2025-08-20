/**
 * 셀 렌더링 컴포넌트 - Phase 0.3
 */

import { CellRendererEngine } from '../core/cell-renderer';
import { Cell, Column } from '../core/types';

interface CellComponentProps {
  value: any;
  cell: Cell;
  column: Column;
  rowIndex: number;
  colIndex: number;
  width: number;
  height: number;
  isSelected?: boolean;
  isFocused?: boolean;
  rendererEngine?: CellRendererEngine;
  onClick?: (rowIndex: number, colIndex: number) => void;
  onDoubleClick?: (rowIndex: number, colIndex: number) => void;
}

export function CellComponent({
  value,
  cell,
  column,
  rowIndex,
  colIndex,
  width,
  height,
  isSelected = false,
  isFocused = false,
  rendererEngine,
  onClick,
  onDoubleClick,
}: CellComponentProps) {
  const engine = rendererEngine || new CellRendererEngine();

  const handleClick = () => {
    onClick?.(rowIndex, colIndex);
  };

  const handleDoubleClick = () => {
    onDoubleClick?.(rowIndex, colIndex);
  };

  const className = engine.getCellClassName({
    cell,
    column,
    rowIndex,
    colIndex,
    isSelected,
    isFocused,
  });

  const style = engine.getCellStyle({
    cell,
    column,
    rowIndex,
    colIndex,
    width,
    height,
  });

  const cellContent = engine.renderCell({
    value,
    cell,
    column,
    rowIndex,
    colIndex,
    isSelected,
    isFocused,
  });

  return (
    <div
      className={className}
      style={style}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      data-row={rowIndex}
      data-col={colIndex}
      role="gridcell"
      tabIndex={isFocused ? 0 : -1}
    >
      {cellContent}
    </div>
  );
}
