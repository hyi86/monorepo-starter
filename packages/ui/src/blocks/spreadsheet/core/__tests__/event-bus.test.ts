/**
 * EventBus 테스트
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EventBus, GRID_EVENTS } from '../event-bus';

describe('EventBus', () => {
  let eventBus: EventBus;

  beforeEach(() => {
    eventBus = new EventBus();
  });

  describe('이벤트 발생', () => {
    it('이벤트를 발생시킬 수 있어야 한다', () => {
      const listener = vi.fn();
      eventBus.on('test:event', listener);

      eventBus.emit('test:event', { data: 'test' });

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith({
        type: 'test:event',
        payload: { data: 'test' },
        timestamp: expect.any(Number),
      });
    });

    it('페이로드 없이 이벤트를 발생시킬 수 있어야 한다', () => {
      const listener = vi.fn();
      eventBus.on('test:event', listener);

      eventBus.emit('test:event');

      expect(listener).toHaveBeenCalledWith({
        type: 'test:event',
        payload: undefined,
        timestamp: expect.any(Number),
      });
    });

    it('여러 리스너가 모두 호출되어야 한다', () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();

      eventBus.on('test:event', listener1);
      eventBus.on('test:event', listener2);

      eventBus.emit('test:event', { data: 'test' });

      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);
    });
  });

  describe('리스너 등록', () => {
    it('특정 이벤트 타입에 리스너를 등록할 수 있어야 한다', () => {
      const listener = vi.fn();
      const unsubscribe = eventBus.on('test:event', listener);

      expect(typeof unsubscribe).toBe('function');

      eventBus.emit('test:event');
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('전역 리스너를 등록할 수 있어야 한다', () => {
      const listener = vi.fn();
      const unsubscribe = eventBus.onAll(listener);

      eventBus.emit('event1');
      eventBus.emit('event2');

      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener).toHaveBeenNthCalledWith(1, {
        type: 'event1',
        payload: undefined,
        timestamp: expect.any(Number),
      });
      expect(listener).toHaveBeenNthCalledWith(2, {
        type: 'event2',
        payload: undefined,
        timestamp: expect.any(Number),
      });

      unsubscribe();
    });

    it('필터링된 리스너를 등록할 수 있어야 한다', () => {
      const listener = vi.fn();
      const unsubscribe = eventBus.onFilter((event) => event.type.startsWith('cell:'), listener);

      eventBus.emit('cell:changed');
      eventBus.emit('selection:changed');
      eventBus.emit('cell:selected');

      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener).toHaveBeenNthCalledWith(1, {
        type: 'cell:changed',
        payload: undefined,
        timestamp: expect.any(Number),
      });
      expect(listener).toHaveBeenNthCalledWith(2, {
        type: 'cell:selected',
        payload: undefined,
        timestamp: expect.any(Number),
      });

      unsubscribe();
    });
  });

  describe('리스너 제거', () => {
    it('구독 해제 함수로 리스너를 제거할 수 있어야 한다', () => {
      const listener = vi.fn();
      const unsubscribe = eventBus.on('test:event', listener);

      eventBus.emit('test:event');
      expect(listener).toHaveBeenCalledTimes(1);

      unsubscribe();
      eventBus.emit('test:event');
      expect(listener).toHaveBeenCalledTimes(1); // 추가 호출되지 않음
    });

    it('off 메서드로 리스너를 제거할 수 있어야 한다', () => {
      const listener = vi.fn();
      eventBus.on('test:event', listener);

      eventBus.emit('test:event');
      expect(listener).toHaveBeenCalledTimes(1);

      eventBus.off('test:event', listener);
      eventBus.emit('test:event');
      expect(listener).toHaveBeenCalledTimes(1); // 추가 호출되지 않음
    });

    it('offAll 메서드로 전역 리스너를 제거할 수 있어야 한다', () => {
      const listener = vi.fn();
      eventBus.onAll(listener);

      eventBus.emit('event1');
      expect(listener).toHaveBeenCalledTimes(1);

      eventBus.offAll(listener);
      eventBus.emit('event2');
      expect(listener).toHaveBeenCalledTimes(1); // 추가 호출되지 않음
    });
  });

  describe('오류 처리', () => {
    it('리스너에서 오류가 발생해도 다른 리스너에 영향을 주지 않아야 한다', () => {
      const errorListener = vi.fn().mockImplementation(() => {
        throw new Error('Test error');
      });
      const normalListener = vi.fn();

      eventBus.on('test:event', errorListener);
      eventBus.on('test:event', normalListener);

      // 오류가 발생해도 정상 리스너는 호출되어야 함
      eventBus.emit('test:event');

      expect(errorListener).toHaveBeenCalledTimes(1);
      expect(normalListener).toHaveBeenCalledTimes(1);
    });

    it('전역 리스너에서 오류가 발생해도 다른 리스너에 영향을 주지 않아야 한다', () => {
      const errorListener = vi.fn().mockImplementation(() => {
        throw new Error('Test error');
      });
      const normalListener = vi.fn();

      eventBus.onAll(errorListener);
      eventBus.on('test:event', normalListener);

      eventBus.emit('test:event');

      expect(errorListener).toHaveBeenCalledTimes(1);
      expect(normalListener).toHaveBeenCalledTimes(1);
    });
  });

  describe('정리', () => {
    it('clear 메서드로 모든 리스너를 제거할 수 있어야 한다', () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();
      const globalListener = vi.fn();

      eventBus.on('event1', listener1);
      eventBus.on('event2', listener2);
      eventBus.onAll(globalListener);

      eventBus.clear();

      eventBus.emit('event1');
      eventBus.emit('event2');

      expect(listener1).not.toHaveBeenCalled();
      expect(listener2).not.toHaveBeenCalled();
      expect(globalListener).not.toHaveBeenCalled();
    });
  });

  describe('정보 조회', () => {
    it('리스너 수를 조회할 수 있어야 한다', () => {
      expect(eventBus.getListenerCount()).toBe(0);

      eventBus.on('event1', vi.fn());
      eventBus.on('event1', vi.fn());
      eventBus.on('event2', vi.fn());
      eventBus.onAll(vi.fn());

      expect(eventBus.getListenerCount()).toBe(4);
      expect(eventBus.getListenerCount('event1')).toBe(2);
      expect(eventBus.getListenerCount('event2')).toBe(1);
      expect(eventBus.getListenerCount('nonexistent')).toBe(0);
    });

    it('등록된 이벤트 타입 목록을 조회할 수 있어야 한다', () => {
      expect(eventBus.getEventTypes()).toEqual([]);

      eventBus.on('event1', vi.fn());
      eventBus.on('event2', vi.fn());

      const eventTypes = eventBus.getEventTypes();
      expect(eventTypes).toContain('event1');
      expect(eventTypes).toContain('event2');
      expect(eventTypes).toHaveLength(2);
    });
  });

  describe('미리 정의된 이벤트 타입', () => {
    it('GRID_EVENTS 상수가 올바르게 정의되어야 한다', () => {
      expect(GRID_EVENTS.CELL_CHANGED).toBe('cell:changed');
      expect(GRID_EVENTS.CELL_SELECTED).toBe('cell:selected');
      expect(GRID_EVENTS.SELECTION_CHANGED).toBe('selection:changed');
      expect(GRID_EVENTS.UNDO_EXECUTED).toBe('undo:executed');
      expect(GRID_EVENTS.REDO_EXECUTED).toBe('redo:executed');
    });

    it('미리 정의된 이벤트 타입으로 이벤트를 발생시킬 수 있어야 한다', () => {
      const listener = vi.fn();
      eventBus.on(GRID_EVENTS.CELL_CHANGED, listener);

      eventBus.emit(GRID_EVENTS.CELL_CHANGED, { row: 0, col: 0, value: 'test' });

      expect(listener).toHaveBeenCalledWith({
        type: GRID_EVENTS.CELL_CHANGED,
        payload: { row: 0, col: 0, value: 'test' },
        timestamp: expect.any(Number),
      });
    });
  });

  describe('타임스탬프', () => {
    it('이벤트에 타임스탬프가 포함되어야 한다', () => {
      const listener = vi.fn();
      eventBus.on('test:event', listener);

      const beforeEmit = Date.now();
      eventBus.emit('test:event');
      const afterEmit = Date.now();

      expect(listener).toHaveBeenCalledWith({
        type: 'test:event',
        payload: undefined,
        timestamp: expect.any(Number),
      });

      const emittedTimestamp = listener.mock.calls[0]?.[0]?.timestamp;
      expect(emittedTimestamp).toBeGreaterThanOrEqual(beforeEmit);
      expect(emittedTimestamp).toBeLessThanOrEqual(afterEmit);
    });
  });
});
