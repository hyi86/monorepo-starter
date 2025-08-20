/**
 * 스프레드시트 핵심 타입 정의
 */

// 셀 위치 (0-based)
export interface CellPosition {
  row: number;
  col: number;
}

// 셀 값 타입
export type CellValue = string | number | boolean | null | undefined;

// 셀 데이터
export interface Cell {
  value: CellValue;
  formattedValue?: string; // 포맷된 표시 값
  type?: 'text' | 'number' | 'boolean' | 'date';
  isDirty?: boolean; // 수식 재계산 필요 여부
  error?: string; // 오류 메시지
}

// 행 데이터
export interface Row {
  id: string | number;
  cells: Map<number, Cell>; // col -> Cell
  height?: number;
  isHidden?: boolean;
}

// 열 정의
export interface Column {
  key: string;
  width: number;
  isFixed?: boolean; // 고정 열 여부
  isHidden?: boolean;
  header?: string;
  type?: 'text' | 'number' | 'boolean' | 'date';
}

// 시트 데이터 스냅샷
export interface SheetSnapshot {
  id: string;
  rows: Map<number, Row>; // row -> Row
  columns: Column[];
  rowCount: number;
  colCount: number;
  createdAt: number;
}

// 명령 타입
export interface GridCommand {
  id: string;
  type: 'setCell' | 'setRow' | 'setColumn' | 'insertRow' | 'insertColumn' | 'deleteRow' | 'deleteColumn';
  payload: any;
  timestamp: number;
}

// 이벤트 타입
export interface GridEvent {
  type: string;
  payload?: any;
  timestamp: number;
}

// 선택 범위
export interface SelectionRange {
  r0: number; // 시작 행
  c0: number; // 시작 열
  r1: number; // 끝 행
  c1: number; // 끝 열
}

// 선택 모델
export interface Selection {
  ranges: SelectionRange[];
  activeCell: CellPosition;
  anchor: CellPosition;
}

// 시트 상태
export interface SheetState {
  snapshot: SheetSnapshot;
  selection: Selection;
  commands: GridCommand[];
  commandIndex: number; // 현재 명령 인덱스 (undo/redo용)
}

// 유틸리티 타입
export type CellGetter = (row: number, col: number) => CellValue;
export type CellSetter = (row: number, col: number, value: CellValue) => void;
