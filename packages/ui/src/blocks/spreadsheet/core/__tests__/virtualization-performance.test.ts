/**
 * 가상화 엔진 성능 테스트
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { SheetModel } from '../sheet-model';
import { Column } from '../types';
import { VirtualizationEngine } from '../virtualization';

describe('VirtualizationEngine Performance', () => {
  let largeColumns: Column[];
  let largeModel: SheetModel;

  beforeEach(() => {
    // 대용량 테스트 데이터 생성
    largeColumns = Array.from({ length: 100 }, (_, i) => ({
      key: `col_${i}`,
      width: 100 + (i % 50) * 10, // 100~590px 다양한 너비
      header: `Column ${i}`,
    }));

    largeModel = new SheetModel({
      rowCount: 100000, // 10만 행
      colCount: 100,
      columns: largeColumns,
    });
  });

  describe('대용량 데이터 처리 성능', () => {
    it('10만 행 × 100열 데이터에서 전체 너비 계산이 10ms 이내에 완료되어야 함', () => {
      const engine = new VirtualizationEngine(
        {
          containerWidth: 1200,
          containerHeight: 800,
          rowHeight: 32,
        },
        largeModel.getSnapshot(),
      );

      const startTime = performance.now();
      const totalWidth = engine.getTotalWidth();
      const endTime = performance.now();

      const executionTime = endTime - startTime;
      expect(executionTime).toBeLessThan(10); // 10ms 이내
      expect(totalWidth).toBeGreaterThan(0);
    });

    it('10만 행 × 100열 데이터에서 전체 높이 계산이 1ms 이내에 완료되어야 함', () => {
      const engine = new VirtualizationEngine(
        {
          containerWidth: 1200,
          containerHeight: 800,
          rowHeight: 32,
        },
        largeModel.getSnapshot(),
      );

      const startTime = performance.now();
      const totalHeight = engine.getTotalHeight();
      const endTime = performance.now();

      const executionTime = endTime - startTime;
      expect(executionTime).toBeLessThan(1); // 1ms 이내
      expect(totalHeight).toBe(100000 * 32); // 3,200,000
    });

    it('가상화 설정 생성이 5ms 이내에 완료되어야 함', () => {
      const engine = new VirtualizationEngine(
        {
          containerWidth: 1200,
          containerHeight: 800,
          rowHeight: 32,
          overscan: 10,
        },
        largeModel.getSnapshot(),
      );

      const startTime = performance.now();
      const config = engine.createVirtualizerConfig();
      const endTime = performance.now();

      const executionTime = endTime - startTime;
      expect(executionTime).toBeLessThan(5); // 5ms 이내
      expect(config.rowConfig.count).toBe(100000);
      expect(config.colConfig.count).toBe(100);
    });
  });

  describe('메모리 사용량', () => {
    it('대용량 데이터에서도 메모리 사용량이 안정적이어야 함', () => {
      const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;

      // 여러 엔진 인스턴스 생성
      const engines = Array.from({ length: 10 }, () => {
        return new VirtualizationEngine(
          {
            containerWidth: 1200,
            containerHeight: 800,
            rowHeight: 32,
          },
          largeModel.getSnapshot(),
        );
      });

      // 각 엔진에서 계산 수행
      engines.forEach((engine) => {
        engine.getTotalWidth();
        engine.getTotalHeight();
        engine.createVirtualizerConfig();
      });

      const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
      const memoryIncrease = finalMemory - initialMemory;

      // 메모리 증가량이 합리적인 범위 내에 있어야 함 (1MB 이내)
      if (initialMemory > 0 && finalMemory > 0) {
        expect(memoryIncrease).toBeLessThan(1024 * 1024); // 1MB
      }
    });
  });

  describe('반복 연산 성능', () => {
    it('동일한 연산을 1000번 반복해도 성능이 안정적이어야 함', () => {
      const engine = new VirtualizationEngine(
        {
          containerWidth: 1200,
          containerHeight: 800,
          rowHeight: 32,
        },
        largeModel.getSnapshot(),
      );

      const startTime = performance.now();

      // 1000번 반복 연산
      for (let i = 0; i < 1000; i++) {
        engine.getTotalWidth();
        engine.getTotalHeight();
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;
      const averageTime = totalTime / 1000;

      // 평균 연산 시간이 0.1ms 이내여야 함
      expect(averageTime).toBeLessThan(0.1);
    });
  });

  describe('다양한 크기 데이터 처리', () => {
    const testCases = [
      { rows: 1000, cols: 10, name: '소형 데이터' },
      { rows: 10000, cols: 50, name: '중형 데이터' },
      { rows: 100000, cols: 100, name: '대형 데이터' },
    ];

    testCases.forEach(({ rows, cols, name }) => {
      it(`${name}에서 안정적으로 동작해야 함`, () => {
        const testColumns = Array.from({ length: cols }, (_, i) => ({
          key: `col_${i}`,
          width: 100,
          header: `Column ${i}`,
        }));

        const testModel = new SheetModel({
          rowCount: rows,
          colCount: cols,
          columns: testColumns,
        });

        const engine = new VirtualizationEngine(
          {
            containerWidth: 1200,
            containerHeight: 800,
            rowHeight: 32,
          },
          testModel.getSnapshot(),
        );

        const startTime = performance.now();
        const totalWidth = engine.getTotalWidth();
        const totalHeight = engine.getTotalHeight();
        const config = engine.createVirtualizerConfig();
        const endTime = performance.now();

        const executionTime = endTime - startTime;
        expect(executionTime).toBeLessThan(5); // 5ms 이내
        expect(totalWidth).toBe(cols * 100);
        expect(totalHeight).toBe(rows * 32);
        expect(config.rowConfig.count).toBe(rows);
        expect(config.colConfig.count).toBe(cols);
      });
    });
  });
});
