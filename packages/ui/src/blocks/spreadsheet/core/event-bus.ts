/**
 * 이벤트 버스 - 플러그인과 컴포넌트 간 통신
 */

import { GridEvent } from './types';

export type EventListener = (event: GridEvent) => void;
export type EventFilter = (event: GridEvent) => boolean;

export class EventBus {
  private listeners: Map<string, Set<EventListener>> = new Map();
  private globalListeners: Set<EventListener> = new Set();

  /**
   * 이벤트 발생
   */
  emit(type: string, payload?: any): void {
    const event: GridEvent = {
      type,
      payload,
      timestamp: Date.now(),
    };

    // 특정 타입 리스너들에게 알림
    const typeListeners = this.listeners.get(type);
    if (typeListeners) {
      typeListeners.forEach((listener) => {
        try {
          listener(event);
        } catch (error) {
          console.error(`EventBus error in listener for ${type}:`, error);
        }
      });
    }

    // 전역 리스너들에게 알림
    this.globalListeners.forEach((listener) => {
      try {
        listener(event);
      } catch (error) {
        console.error('EventBus error in global listener:', error);
      }
    });
  }

  /**
   * 특정 이벤트 타입 리스너 등록
   */
  on(type: string, listener: EventListener): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }

    this.listeners.get(type)!.add(listener);

    // 구독 해제 함수 반환
    return () => {
      const typeListeners = this.listeners.get(type);
      if (typeListeners) {
        typeListeners.delete(listener);
        if (typeListeners.size === 0) {
          this.listeners.delete(type);
        }
      }
    };
  }

  /**
   * 전역 리스너 등록 (모든 이벤트 수신)
   */
  onAll(listener: EventListener): () => void {
    this.globalListeners.add(listener);

    return () => {
      this.globalListeners.delete(listener);
    };
  }

  /**
   * 이벤트 타입별 리스너 등록 (필터링 가능)
   */
  onFilter(filter: EventFilter, listener: EventListener): () => void {
    const wrappedListener = (event: GridEvent) => {
      if (filter(event)) {
        listener(event);
      }
    };

    return this.onAll(wrappedListener);
  }

  /**
   * 특정 이벤트 타입 리스너 제거
   */
  off(type: string, listener: EventListener): void {
    const typeListeners = this.listeners.get(type);
    if (typeListeners) {
      typeListeners.delete(listener);
      if (typeListeners.size === 0) {
        this.listeners.delete(type);
      }
    }
  }

  /**
   * 전역 리스너 제거
   */
  offAll(listener: EventListener): void {
    this.globalListeners.delete(listener);
  }

  /**
   * 모든 리스너 제거
   */
  clear(): void {
    this.listeners.clear();
    this.globalListeners.clear();
  }

  /**
   * 현재 등록된 리스너 수 반환
   */
  getListenerCount(type?: string): number {
    if (type) {
      return this.listeners.get(type)?.size || 0;
    }

    let total = this.globalListeners.size;
    this.listeners.forEach((listeners) => {
      total += listeners.size;
    });

    return total;
  }

  /**
   * 등록된 이벤트 타입 목록 반환
   */
  getEventTypes(): string[] {
    return Array.from(this.listeners.keys());
  }
}

// 미리 정의된 이벤트 타입들
export const GRID_EVENTS = {
  // 셀 관련
  CELL_CHANGED: 'cell:changed',
  CELL_SELECTED: 'cell:selected',
  CELL_EDIT_START: 'cell:edit:start',
  CELL_EDIT_COMMIT: 'cell:edit:commit',
  CELL_EDIT_CANCEL: 'cell:edit:cancel',

  // 선택 관련
  SELECTION_CHANGED: 'selection:changed',
  SELECTION_RANGE_CHANGED: 'selection:range:changed',

  // 행/열 관련
  ROW_INSERTED: 'row:inserted',
  ROW_DELETED: 'row:deleted',
  COLUMN_INSERTED: 'column:inserted',
  COLUMN_DELETED: 'column:deleted',
  COLUMN_RESIZED: 'column:resized',

  // 명령 관련
  COMMAND_EXECUTED: 'command:executed',
  UNDO_EXECUTED: 'undo:executed',
  REDO_EXECUTED: 'redo:executed',

  // 키보드 관련
  KEY_DOWN: 'key:down',
  KEY_UP: 'key:up',

  // 마우스 관련
  MOUSE_DOWN: 'mouse:down',
  MOUSE_UP: 'mouse:up',
  MOUSE_MOVE: 'mouse:move',
  MOUSE_ENTER: 'mouse:enter',
  MOUSE_LEAVE: 'mouse:leave',

  // 스크롤 관련
  SCROLL_CHANGED: 'scroll:changed',

  // 포커스 관련
  FOCUS_CHANGED: 'focus:changed',
  FOCUS_GAINED: 'focus:gained',
  FOCUS_LOST: 'focus:lost',
} as const;

export type GridEventType = (typeof GRID_EVENTS)[keyof typeof GRID_EVENTS];
