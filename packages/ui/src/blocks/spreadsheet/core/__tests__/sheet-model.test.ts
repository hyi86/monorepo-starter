/**
 * SheetModel 테스트
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SheetModel } from '../sheet-model';
import { CellValue } from '../types';

describe('SheetModel', () => {
  let model: SheetModel;

  beforeEach(() => {
    model = new SheetModel();
  });

  describe('생성자', () => {
    it('기본 모델을 생성할 수 있어야 한다', () => {
      expect(model).toBeInstanceOf(SheetModel);

      const state = model.getState();
      expect(state.snapshot.rowCount).toBe(0);
      expect(state.snapshot.colCount).toBe(0);
      expect(state.snapshot.rows.size).toBe(0);
      expect(state.snapshot.columns).toEqual([]);
    });

    it('초기 데이터로 모델을 생성할 수 있어야 한다', () => {
      const initialData = {
        rows: [
          ['A1', 'B1', 'C1'],
          ['A2', 'B2', 'C2'],
        ],
        columns: [
          { key: 'col1', width: 100, header: '열1' },
          { key: 'col2', width: 120, header: '열2' },
          { key: 'col3', width: 80, header: '열3' },
        ],
        rowCount: 2,
        colCount: 3,
      };

      const modelWithData = new SheetModel(initialData);
      const state = modelWithData.getState();

      expect(state.snapshot.rowCount).toBe(2);
      expect(state.snapshot.colCount).toBe(3);
      expect(state.snapshot.columns).toHaveLength(3);
      expect(state.snapshot.columns[0]?.header).toBe('열1');
    });

    it('기본 열을 자동으로 생성해야 한다', () => {
      const modelWithCols = new SheetModel({ colCount: 3 });
      const state = modelWithCols.getState();

      expect(state.snapshot.columns).toHaveLength(3);
      expect(state.snapshot.columns[0]?.key).toBe('col_0');
      expect(state.snapshot.columns[0]?.header).toBe('A');
      expect(state.snapshot.columns[1]?.header).toBe('B');
      expect(state.snapshot.columns[2]?.header).toBe('C');
    });
  });

  describe('셀 조작', () => {
    it('셀 값을 가져올 수 있어야 한다', () => {
      const cell = model.getCell(0, 0);
      expect(cell).toBeNull(); // 초기에는 셀이 없음
    });

    it('셀 값을 설정할 수 있어야 한다', () => {
      model.setCell(0, 0, '테스트');

      const cell = model.getCell(0, 0);
      expect(cell).not.toBeNull();
      expect(cell!.value).toBe('테스트');
    });

    it('다양한 타입의 셀 값을 설정할 수 있어야 한다', () => {
      const testValues: Array<{ value: CellValue; expected: CellValue }> = [
        { value: '텍스트', expected: '텍스트' },
        { value: 123, expected: 123 },
        { value: true, expected: true },
      ];

      testValues.forEach(({ value, expected }, index) => {
        model.setCell(0, index, value);
        const cell = model.getCell(0, index);
        expect(cell!.value).toBe(expected);
      });
    });

    it('셀 값을 null로 설정하면 셀이 제거되어야 한다', () => {
      model.setCell(0, 0, '테스트');
      expect(model.getCell(0, 0)).not.toBeNull();

      model.setCell(0, 0, null);
      expect(model.getCell(0, 0)).toBeNull();
    });
  });

  describe('불변성', () => {
    it('셀 설정 시 불변성을 유지해야 한다', () => {
      const initialState = model.getState();

      model.setCell(0, 0, '테스트');

      const newState = model.getState();

      // 스냅샷이 변경되어야 함
      expect(newState.snapshot).not.toBe(initialState.snapshot);
      expect(newState.snapshot.rows).not.toBe(initialState.snapshot.rows);

      // 셀 값이 올바르게 설정되어야 함
      const cell = newState.snapshot.rows.get(0)?.cells.get(0);
      expect(cell?.value).toBe('테스트');
    });

    it('여러 셀 설정 시 각각 불변성을 유지해야 한다', () => {
      model.setCell(0, 0, 'A1');
      const state1 = model.getState();

      model.setCell(0, 1, 'B1');
      const state2 = model.getState();

      model.setCell(1, 0, 'A2');
      const state3 = model.getState();

      // 각 상태가 서로 다른 객체여야 함
      expect(state1.snapshot).not.toBe(state2.snapshot);
      expect(state2.snapshot).not.toBe(state3.snapshot);

      // 이전 값들이 유지되어야 함
      expect(state3.snapshot.rows.get(0)?.cells.get(0)?.value).toBe('A1');
      expect(state3.snapshot.rows.get(0)?.cells.get(1)?.value).toBe('B1');
      expect(state3.snapshot.rows.get(1)?.cells.get(0)?.value).toBe('A2');
    });
  });

  describe('Undo/Redo', () => {
    it('셀 설정 후 undo가 작동해야 한다', () => {
      model.setCell(0, 0, '테스트');
      expect(model.getCell(0, 0)?.value).toBe('테스트');

      const result = model.undo();
      expect(result).toBe(true);
      expect(model.getCell(0, 0)).toBeNull();
    });

    it('undo 후 redo가 작동해야 한다', () => {
      model.setCell(0, 0, '테스트');
      model.undo();
      expect(model.getCell(0, 0)).toBeNull();

      const result = model.redo();
      expect(result).toBe(true);
      expect(model.getCell(0, 0)?.value).toBe('테스트');
    });

    it('명령이 없을 때 undo는 false를 반환해야 한다', () => {
      const result = model.undo();
      expect(result).toBe(false);
    });

    it('redo할 명령이 없을 때 redo는 false를 반환해야 한다', () => {
      const result = model.redo();
      expect(result).toBe(false);
    });

    it('새 명령 실행 후 redo 스택이 초기화되어야 한다', () => {
      model.setCell(0, 0, 'A');
      model.setCell(0, 1, 'B');
      model.undo(); // B 제거
      model.undo(); // A 제거

      // 이제 redo로 A와 B를 복원할 수 있어야 함
      expect(model.redo()).toBe(true);
      expect(model.getCell(0, 0)?.value).toBe('A');

      expect(model.redo()).toBe(true);
      expect(model.getCell(0, 1)?.value).toBe('B');

      // 더 이상 redo할 명령이 없음
      expect(model.redo()).toBe(false);
    });

    it('새 명령 실행 시 redo 스택이 초기화되어야 한다', () => {
      model.setCell(0, 0, 'A');
      model.setCell(0, 1, 'B');
      model.undo(); // B 제거

      // 새 명령 실행
      model.setCell(0, 2, 'C');

      // 이제 redo로 B를 복원할 수 없어야 함
      expect(model.redo()).toBe(false);

      // undo로 C를 제거할 수 있어야 함
      expect(model.undo()).toBe(true);
      expect(model.getCell(0, 2)).toBeNull();
    });
  });

  describe('선택 상태', () => {
    it('기본 선택 상태를 가져올 수 있어야 한다', () => {
      const state = model.getState();
      expect(state.selection.ranges).toHaveLength(1);
      expect(state.selection.activeCell).toEqual({ row: 0, col: 0 });
      expect(state.selection.anchor).toEqual({ row: 0, col: 0 });
    });

    it('활성 셀을 설정할 수 있어야 한다', () => {
      model.setActiveCell({ row: 5, col: 3 });

      const state = model.getState();
      expect(state.selection.activeCell).toEqual({ row: 5, col: 3 });
      expect(state.selection.anchor).toEqual({ row: 5, col: 3 });
      expect(state.selection.ranges).toEqual([{ r0: 5, c0: 3, r1: 5, c1: 3 }]);
    });

    it('선택 범위를 설정할 수 있어야 한다', () => {
      const range = { r0: 1, c0: 1, r1: 3, c1: 3 };
      model.setSelectionRange(range);

      const state = model.getState();
      expect(state.selection.ranges).toEqual([range]);
      expect(state.selection.activeCell).toEqual({ row: 3, col: 3 });
    });
  });

  describe('구독 시스템', () => {
    it('상태 변경 시 리스너가 호출되어야 한다', () => {
      const listener = vi.fn();
      const unsubscribe = model.subscribe(listener);

      model.setCell(0, 0, '테스트');

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(model.getState());

      unsubscribe();
    });

    it('구독 해제 후 리스너가 호출되지 않아야 한다', () => {
      const listener = vi.fn();
      const unsubscribe = model.subscribe(listener);

      unsubscribe();
      model.setCell(0, 0, '테스트');

      expect(listener).not.toHaveBeenCalled();
    });

    it('여러 리스너가 모두 호출되어야 한다', () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();

      const unsubscribe1 = model.subscribe(listener1);
      const unsubscribe2 = model.subscribe(listener2);

      model.setCell(0, 0, '테스트');

      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);

      unsubscribe1();
      unsubscribe2();
    });
  });

  describe('직렬화', () => {
    it('상태를 JSON으로 직렬화할 수 있어야 한다', () => {
      model.setCell(0, 0, 'A1');
      model.setCell(0, 1, 'B1');

      const json = model.toJSON();

      expect(json.snapshot).toBeDefined();
      expect(json.selection).toBeDefined();
      expect(json.commands).toBeDefined();
      expect(json.commandIndex).toBeDefined();

      // 셀 데이터가 올바르게 직렬화되어야 함
      const rowData = json.snapshot.rows.find((r: any) => r.rowIndex === 0);
      expect(rowData).toBeDefined();

      const cellA1 = rowData.cells.find(([col]: [number, any]) => col === 0);
      expect(cellA1[1].value).toBe('A1');

      const cellB1 = rowData.cells.find(([col]: [number, any]) => col === 1);
      expect(cellB1[1].value).toBe('B1');
    });

    it('JSON에서 모델을 복원할 수 있어야 한다', () => {
      model.setCell(0, 0, 'A1');
      model.setCell(0, 1, 'B1');

      const json = model.toJSON();
      const restoredModel = SheetModel.fromJSON(json);

      expect(restoredModel.getCell(0, 0)?.value).toBe('A1');
      expect(restoredModel.getCell(0, 1)?.value).toBe('B1');
    });
  });
});
