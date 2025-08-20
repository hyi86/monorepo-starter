/**
 * 스프레드시트 Core 모듈 - Phase 0.1 + 0.2
 */

// Phase 0.1 - 타입 정의
export * from './types';

// Phase 0.1 - 데이터 모델
export { SheetModel } from './sheet-model';

// Phase 0.1 - 이벤트 시스템
export { EventBus, GRID_EVENTS } from './event-bus';
export type { EventFilter, EventListener, GridEventType } from './event-bus';

// Phase 0.2 - 가상화 엔진
export { VirtualizationEngine, getVirtualCellPosition, useVirtualization } from './virtualization';
export type { VirtualizationConfig, VirtualizationState } from './virtualization';

// Phase 0.3 - 셀 렌더링 기본 구조
export { CellRendererEngine, defaultCellRendererEngine, defaultCellRenderers } from './cell-renderer';
export type { CellRenderer } from './cell-renderer';
