/**
 * 타입 정의 테스트
 */

import { describe, expect, it } from 'vitest';
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
} from '../types';

describe('타입 정의', () => {
  describe('CellPosition', () => {
    it('올바른 셀 위치를 생성할 수 있어야 한다', () => {
      const position: CellPosition = { row: 0, col: 0 };
      expect(position.row).toBe(0);
      expect(position.col).toBe(0);
    });

    it('음수 인덱스를 허용해야 한다', () => {
      const position: CellPosition = { row: -1, col: -1 };
      expect(position.row).toBe(-1);
      expect(position.col).toBe(-1);
    });
  });

  describe('CellValue', () => {
    it('다양한 타입의 셀 값을 허용해야 한다', () => {
      const values: CellValue[] = ['텍스트', 123, true, null, undefined];

      values.forEach((value) => {
        expect(
          typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'boolean' ||
            value === null ||
            value === undefined,
        ).toBe(true);
      });
    });
  });

  describe('Cell', () => {
    it('기본 셀을 생성할 수 있어야 한다', () => {
      const cell: Cell = { value: '테스트' };
      expect(cell.value).toBe('테스트');
    });

    it('선택적 속성들을 포함할 수 있어야 한다', () => {
      const cell: Cell = {
        value: 123,
        formattedValue: '123.00',
        type: 'number',
        isDirty: true,
        error: '오류 메시지',
      };

      expect(cell.value).toBe(123);
      expect(cell.formattedValue).toBe('123.00');
      expect(cell.type).toBe('number');
      expect(cell.isDirty).toBe(true);
      expect(cell.error).toBe('오류 메시지');
    });
  });

  describe('Row', () => {
    it('기본 행을 생성할 수 있어야 한다', () => {
      const row: Row = {
        id: 1,
        cells: new Map(),
      };

      expect(row.id).toBe(1);
      expect(row.cells).toBeInstanceOf(Map);
    });

    it('선택적 속성들을 포함할 수 있어야 한다', () => {
      const row: Row = {
        id: 'row-1',
        cells: new Map(),
        height: 30,
        isHidden: false,
      };

      expect(row.id).toBe('row-1');
      expect(row.height).toBe(30);
      expect(row.isHidden).toBe(false);
    });
  });

  describe('Column', () => {
    it('기본 열을 생성할 수 있어야 한다', () => {
      const column: Column = {
        key: 'name',
        width: 120,
      };

      expect(column.key).toBe('name');
      expect(column.width).toBe(120);
    });

    it('선택적 속성들을 포함할 수 있어야 한다', () => {
      const column: Column = {
        key: 'price',
        width: 100,
        isFixed: true,
        isHidden: false,
        header: '가격',
        type: 'number',
      };

      expect(column.key).toBe('price');
      expect(column.isFixed).toBe(true);
      expect(column.isHidden).toBe(false);
      expect(column.header).toBe('가격');
      expect(column.type).toBe('number');
    });
  });

  describe('SheetSnapshot', () => {
    it('기본 스냅샷을 생성할 수 있어야 한다', () => {
      const snapshot: SheetSnapshot = {
        id: 'snapshot-1',
        rows: new Map(),
        columns: [],
        rowCount: 0,
        colCount: 0,
        createdAt: Date.now(),
      };

      expect(snapshot.id).toBe('snapshot-1');
      expect(snapshot.rows).toBeInstanceOf(Map);
      expect(snapshot.columns).toEqual([]);
      expect(snapshot.rowCount).toBe(0);
      expect(snapshot.colCount).toBe(0);
      expect(typeof snapshot.createdAt).toBe('number');
    });
  });

  describe('GridCommand', () => {
    it('기본 명령을 생성할 수 있어야 한다', () => {
      const command: GridCommand = {
        id: 'cmd-1',
        type: 'setCell',
        payload: { row: 0, col: 0, value: 'test' },
        timestamp: Date.now(),
      };

      expect(command.id).toBe('cmd-1');
      expect(command.type).toBe('setCell');
      expect(command.payload).toEqual({ row: 0, col: 0, value: 'test' });
      expect(typeof command.timestamp).toBe('number');
    });
  });

  describe('SelectionRange', () => {
    it('기본 선택 범위를 생성할 수 있어야 한다', () => {
      const range: SelectionRange = {
        r0: 0,
        c0: 0,
        r1: 2,
        c1: 2,
      };

      expect(range.r0).toBe(0);
      expect(range.c0).toBe(0);
      expect(range.r1).toBe(2);
      expect(range.c1).toBe(2);
    });
  });

  describe('Selection', () => {
    it('기본 선택을 생성할 수 있어야 한다', () => {
      const selection: Selection = {
        ranges: [{ r0: 0, c0: 0, r1: 0, c1: 0 }],
        activeCell: { row: 0, col: 0 },
        anchor: { row: 0, col: 0 },
      };

      expect(selection.ranges).toHaveLength(1);
      expect(selection.activeCell).toEqual({ row: 0, col: 0 });
      expect(selection.anchor).toEqual({ row: 0, col: 0 });
    });
  });

  describe('SheetState', () => {
    it('기본 시트 상태를 생성할 수 있어야 한다', () => {
      const state: SheetState = {
        snapshot: {
          id: 'snapshot-1',
          rows: new Map(),
          columns: [],
          rowCount: 0,
          colCount: 0,
          createdAt: Date.now(),
        },
        selection: {
          ranges: [{ r0: 0, c0: 0, r1: 0, c1: 0 }],
          activeCell: { row: 0, col: 0 },
          anchor: { row: 0, col: 0 },
        },
        commands: [],
        commandIndex: -1,
      };

      expect(state.snapshot).toBeDefined();
      expect(state.selection).toBeDefined();
      expect(state.commands).toEqual([]);
      expect(state.commandIndex).toBe(-1);
    });
  });
});
