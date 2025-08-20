/**
 * 시트 데이터 모델 - 불변성 유지 및 스냅샷 저장
 */

import {
  Cell,
  CellPosition,
  CellValue,
  Column,
  GridCommand,
  Row,
  Selection,
  SelectionRange,
  SheetSnapshot,
  SheetState,
} from './types';

export class SheetModel {
  private state: SheetState;
  private listeners: Set<(state: SheetState) => void> = new Set();

  constructor(
    initialData: {
      rows?: Array<Array<CellValue>>;
      columns?: Column[];
      rowCount?: number;
      colCount?: number;
    } = {},
  ) {
    const { rows = [], columns = [], rowCount = 0, colCount = 0 } = initialData;

    // 초기 스냅샷 생성
    const snapshot = this.createSnapshot(rows, columns, rowCount, colCount);

    // 초기 선택 상태
    const selection: Selection = {
      ranges: [{ r0: 0, c0: 0, r1: 0, c1: 0 }],
      activeCell: { row: 0, col: 0 },
      anchor: { row: 0, col: 0 },
    };

    this.state = {
      snapshot,
      selection,
      commands: [],
      commandIndex: -1,
    };
  }

  /**
   * 초기 스냅샷 생성
   */
  private createSnapshot(
    rows: Array<Array<CellValue>>,
    columns: Column[],
    rowCount: number,
    colCount: number,
  ): SheetSnapshot {
    const rowsMap = new Map<number, Row>();

    // 데이터가 있는 경우 처리
    if (rows.length > 0) {
      rows.forEach((rowData, rowIndex) => {
        const cells = new Map<number, Cell>();
        rowData.forEach((value, colIndex) => {
          if (value !== null && value !== undefined) {
            cells.set(colIndex, { value });
          }
        });

        rowsMap.set(rowIndex, {
          id: rowIndex,
          cells,
        });
      });
    }

    return {
      id: this.generateId(),
      rows: rowsMap,
      columns: columns.length > 0 ? columns : this.createDefaultColumns(colCount),
      rowCount: Math.max(rowCount, rows.length),
      colCount: Math.max(colCount, columns.length, rows.length > 0 ? Math.max(...rows.map((r) => r.length)) : 0),
      createdAt: Date.now(),
    };
  }

  /**
   * 기본 열 생성
   */
  private createDefaultColumns(colCount: number): Column[] {
    const columns: Column[] = [];
    for (let i = 0; i < colCount; i++) {
      columns.push({
        key: `col_${i}`,
        width: 120,
        header: this.getColumnHeader(i),
      });
    }
    return columns;
  }

  /**
   * 열 헤더 생성 (A, B, C, ..., Z, AA, AB, ...)
   */
  private getColumnHeader(colIndex: number): string {
    let header = '';
    while (colIndex >= 0) {
      header = String.fromCharCode(65 + (colIndex % 26)) + header;
      colIndex = Math.floor(colIndex / 26) - 1;
    }
    return header;
  }

  /**
   * 고유 ID 생성
   */
  private generateId(): string {
    return `sheet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 현재 상태 반환
   */
  getState(): SheetState {
    return {
      ...this.state,
      snapshot: {
        ...this.state.snapshot,
        rows: new Map(this.state.snapshot.rows),
      },
      commands: [...this.state.commands],
    };
  }

  /**
   * 현재 스냅샷 반환
   */
  getSnapshot(): SheetSnapshot {
    return this.state.snapshot;
  }

  /**
   * 셀 값 가져오기
   */
  getCell(row: number, col: number): Cell | null {
    const rowData = this.state.snapshot.rows.get(row);
    if (!rowData) return null;

    return rowData.cells.get(col) || null;
  }

  /**
   * 셀 값 설정 (불변 업데이트)
   */
  setCell(row: number, col: number, value: CellValue): void {
    const command: GridCommand = {
      id: this.generateId(),
      type: 'setCell',
      payload: { row, col, value, previousValue: this.getCell(row, col)?.value },
      timestamp: Date.now(),
    };

    this.executeCommand(command);
  }

  /**
   * 명령 실행
   */
  private executeCommand(command: GridCommand): void {
    // 기존 명령들 제거 (새 명령이 추가되면 redo 불가)
    this.state.commands = this.state.commands.slice(0, this.state.commandIndex + 1);

    // 새 명령 추가
    this.state.commands.push(command);
    this.state.commandIndex++;

    // 명령 실행
    this.applyCommand(command);

    // 리스너들에게 알림
    this.notifyListeners();
  }

  /**
   * 명령 적용
   */
  private applyCommand(command: GridCommand): void {
    switch (command.type) {
      case 'setCell':
        this.applySetCell(command.payload);
        break;
      // 다른 명령 타입들은 나중에 구현
    }
  }

  /**
   * 셀 설정 명령 적용
   */
  private applySetCell(payload: { row: number; col: number; value: CellValue }): void {
    const { row, col, value } = payload;

    // 새로운 행 맵 생성 (불변성 유지)
    const newRows = new Map(this.state.snapshot.rows);

    // 행 데이터 가져오기 또는 생성
    let rowData = newRows.get(row);
    if (!rowData) {
      rowData = { id: row, cells: new Map() };
    } else {
      // 셀 맵 복사 (불변성 유지)
      rowData = { ...rowData, cells: new Map(rowData.cells) };
    }

    // 셀 값 설정
    if (value === null || value === undefined) {
      rowData.cells.delete(col);
    } else {
      rowData.cells.set(col, { value });
    }

    // 행 맵 업데이트 (새로운 객체로 설정)
    newRows.set(row, rowData);

    // 새 스냅샷 생성 (완전히 새로운 객체)
    this.state.snapshot = {
      ...this.state.snapshot,
      rows: newRows,
    };
  }

  /**
   * Undo 실행
   */
  undo(): boolean {
    if (this.state.commandIndex < 0) return false;

    const command = this.state.commands[this.state.commandIndex];
    if (!command) return false;

    this.state.commandIndex--;

    this.revertCommand(command);
    this.notifyListeners();

    return true;
  }

  /**
   * Redo 실행
   */
  redo(): boolean {
    if (this.state.commandIndex >= this.state.commands.length - 1) return false;

    this.state.commandIndex++;
    const command = this.state.commands[this.state.commandIndex];
    if (!command) return false;

    this.applyCommand(command);
    this.notifyListeners();

    return true;
  }

  /**
   * 명령 되돌리기
   */
  private revertCommand(command: GridCommand): void {
    switch (command.type) {
      case 'setCell':
        this.applySetCell({
          row: command.payload.row,
          col: command.payload.col,
          value: command.payload.previousValue,
        });
        break;
    }
  }

  /**
   * 선택 상태 업데이트
   */
  setSelection(selection: Selection): void {
    this.state.selection = selection;
    this.notifyListeners();
  }

  /**
   * 활성 셀 설정
   */
  setActiveCell(position: CellPosition): void {
    this.state.selection.activeCell = position;
    this.state.selection.anchor = position;
    this.state.selection.ranges = [
      {
        r0: position.row,
        c0: position.col,
        r1: position.row,
        c1: position.col,
      },
    ];
    this.notifyListeners();
  }

  /**
   * 선택 범위 설정
   */
  setSelectionRange(range: SelectionRange): void {
    this.state.selection.ranges = [range];
    this.state.selection.activeCell = { row: range.r1, col: range.c1 };
    this.notifyListeners();
  }

  /**
   * 상태 변경 리스너 등록
   */
  subscribe(listener: (state: SheetState) => void): () => void {
    this.listeners.add(listener);

    // 구독 해제 함수 반환
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * 리스너들에게 알림
   */
  private notifyListeners(): void {
    this.listeners.forEach((listener) => {
      try {
        listener(this.state);
      } catch (error) {
        console.error('SheetModel listener error:', error);
      }
    });
  }

  /**
   * 현재 상태를 JSON으로 직렬화
   */
  toJSON(): any {
    return {
      snapshot: {
        ...this.state.snapshot,
        rows: Array.from(this.state.snapshot.rows.entries()).map(([rowIndex, row]) => ({
          rowIndex,
          id: row.id,
          cells: Array.from(row.cells.entries()),
          height: row.height,
          isHidden: row.isHidden,
        })),
      },
      selection: this.state.selection,
      commands: this.state.commands,
      commandIndex: this.state.commandIndex,
    };
  }

  /**
   * JSON에서 상태 복원
   */
  static fromJSON(data: any): SheetModel {
    const model = new SheetModel();

    // 스냅샷 복원
    const rows = new Map();
    data.snapshot.rows.forEach((rowData: any) => {
      const cells = new Map(rowData.cells);
      rows.set(rowData.rowIndex, {
        id: rowData.id,
        cells,
        height: rowData.height,
        isHidden: rowData.isHidden,
      });
    });

    model.state.snapshot = {
      ...data.snapshot,
      rows,
    };

    // 선택 상태 복원
    model.state.selection = data.selection;
    model.state.commands = data.commands;
    model.state.commandIndex = data.commandIndex;

    return model;
  }
}
