/**
 * 가상화 엔진 단위 테스트
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { SheetModel } from '../sheet-model';
import { Column } from '../types';
import { VirtualizationEngine } from '../virtualization';

describe('VirtualizationEngine', () => {
  let engine: VirtualizationEngine;
  let model: SheetModel;
  let columns: Column[];

  beforeEach(() => {
    columns = [
      { key: 'id', width: 80, header: 'ID' },
      { key: 'name', width: 150, header: 'Name' },
      { key: 'email', width: 200, header: 'Email' },
    ];

    model = new SheetModel({
      rowCount: 1000,
      colCount: 3,
      columns,
    });

    engine = new VirtualizationEngine(
      {
        containerWidth: 800,
        containerHeight: 600,
        rowHeight: 32,
        overscan: 5,
      },
      model.getSnapshot(),
    );
  });

  describe('getTotalWidth', () => {
    it('모든 컬럼의 너비 합계를 계산해야 함', () => {
      const totalWidth = engine.getTotalWidth();
      expect(totalWidth).toBe(80 + 150 + 200); // 430
    });

    it('빈 컬럼 배열일 때 0을 반환해야 함', () => {
      const emptyModel = new SheetModel({
        rowCount: 100,
        colCount: 0,
        columns: [],
      });

      const emptyEngine = new VirtualizationEngine(
        {
          containerWidth: 800,
          containerHeight: 600,
          rowHeight: 32,
        },
        emptyModel.getSnapshot(),
      );

      expect(emptyEngine.getTotalWidth()).toBe(0);
    });
  });

  describe('getTotalHeight', () => {
    it('행 수와 행 높이를 곱한 값을 반환해야 함', () => {
      const totalHeight = engine.getTotalHeight();
      expect(totalHeight).toBe(1000 * 32); // 32000
    });

    it('다른 행 높이에 대해 올바르게 계산해야 함', () => {
      const customEngine = new VirtualizationEngine(
        {
          containerWidth: 800,
          containerHeight: 600,
          rowHeight: 48,
        },
        model.getSnapshot(),
      );

      expect(customEngine.getTotalHeight()).toBe(1000 * 48); // 48000
    });
  });

  describe('createVirtualizerConfig', () => {
    it('행 가상화 설정을 올바르게 생성해야 함', () => {
      const config = engine.createVirtualizerConfig();

      expect(config.rowConfig.count).toBe(1000);
      expect(config.rowConfig.estimateSize()).toBe(32);
      expect(config.rowConfig.overscan).toBe(5);
    });

    it('열 가상화 설정을 올바르게 생성해야 함', () => {
      const config = engine.createVirtualizerConfig();

      expect(config.colConfig.count).toBe(3);
      expect(config.colConfig.horizontal).toBe(true);
      expect(config.colConfig.overscan).toBe(5);
      expect(config.colConfig.estimateSize(0)).toBe(80);
      expect(config.colConfig.estimateSize(1)).toBe(150);
      expect(config.colConfig.estimateSize(2)).toBe(200);
    });

    it('전체 크기를 올바르게 계산해야 함', () => {
      const config = engine.createVirtualizerConfig();

      expect(config.totalWidth).toBe(430);
      expect(config.totalHeight).toBe(32000);
    });

    it('기본 overscan 값을 사용해야 함', () => {
      const engineWithoutOverscan = new VirtualizationEngine(
        {
          containerWidth: 800,
          containerHeight: 600,
          rowHeight: 32,
        },
        model.getSnapshot(),
      );

      const config = engineWithoutOverscan.createVirtualizerConfig();
      expect(config.rowConfig.overscan).toBe(5);
      expect(config.colConfig.overscan).toBe(3);
    });
  });
});
