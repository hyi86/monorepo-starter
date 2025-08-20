# 스프레드시트 Core 모듈 - Phase 0.1

## 개요

스프레드시트의 핵심 데이터 모델과 이벤트 시스템을 구현한 모듈입니다. 이 모듈은 Phase 0.1의 요구사항을 충족하며, 불변성 유지와 스냅샷 저장 기능을 제공합니다.

## 구현된 기능

### 1. 타입 정의 (`types.ts`)

- **CellPosition**: 셀 위치 (row, col)
- **CellValue**: 셀 값 타입 (string, number, boolean, null, undefined)
- **Cell**: 셀 데이터 (값, 포맷된 값, 타입, 오류 등)
- **Row**: 행 데이터 (ID, 셀 맵, 높이, 숨김 여부)
- **Column**: 열 정의 (키, 폭, 고정 여부, 헤더 등)
- **SheetSnapshot**: 시트 데이터 스냅샷
- **GridCommand**: 명령 패턴을 위한 명령 타입
- **Selection**: 선택 모델 (범위, 활성 셀, 앵커)
- **SheetState**: 전체 시트 상태

### 2. 데이터 모델 (`sheet-model.ts`)

#### 핵심 기능
- **불변성 유지**: 모든 상태 변경은 새로운 객체를 생성
- **스냅샷 저장**: 시트 상태의 스냅샷을 저장하고 관리
- **Undo/Redo**: 명령 기반의 실행 취소/재실행
- **구독 시스템**: 상태 변경 시 리스너에게 알림

#### 주요 메서드
```typescript
// 셀 조작
getCell(row: number, col: number): Cell | null
setCell(row: number, col: number, value: CellValue): void

// 선택 상태
setActiveCell(position: CellPosition): void
setSelectionRange(range: SelectionRange): void

// Undo/Redo
undo(): boolean
redo(): boolean

// 구독
subscribe(listener: (state: SheetState) => void): () => void

// 직렬화
toJSON(): any
static fromJSON(data: any): SheetModel
```

### 3. 이벤트 시스템 (`event-bus.ts`)

#### 핵심 기능
- **이벤트 발생**: `emit(type, payload)`
- **리스너 등록**: 특정 타입, 전역, 필터링된 리스너
- **오류 처리**: 리스너 오류가 다른 리스너에 영향을 주지 않음
- **메모리 관리**: 구독 해제 및 정리 기능

#### 미리 정의된 이벤트 타입
```typescript
GRID_EVENTS = {
  // 셀 관련
  CELL_CHANGED: 'cell:changed',
  CELL_SELECTED: 'cell:selected',
  CELL_EDIT_START: 'cell:edit:start',
  CELL_EDIT_COMMIT: 'cell:edit:commit',
  CELL_EDIT_CANCEL: 'cell:edit:cancel',
  
  // 선택 관련
  SELECTION_CHANGED: 'selection:changed',
  SELECTION_RANGE_CHANGED: 'selection:range:changed',
  
  // 명령 관련
  COMMAND_EXECUTED: 'command:executed',
  UNDO_EXECUTED: 'undo:executed',
  REDO_EXECUTED: 'redo:executed',
  
  // 기타
  KEY_DOWN: 'key:down',
  MOUSE_DOWN: 'mouse:down',
  SCROLL_CHANGED: 'scroll:changed',
  // ... 등
}
```

## 사용 예시

### 기본 사용법

```typescript
import { SheetModel, EventBus, GRID_EVENTS } from './core';

// 모델 생성
const model = new SheetModel({
  rows: [
    ['A1', 'B1', 'C1'],
    ['A2', 'B2', 'C2'],
  ],
  columns: [
    { key: 'col1', width: 100, header: '열1' },
    { key: 'col2', width: 120, header: '열2' },
    { key: 'col3', width: 80, header: '열3' },
  ],
});

// 셀 값 설정
model.setCell(0, 0, '새로운 값');

// 상태 구독
const unsubscribe = model.subscribe((state) => {
  console.log('상태 변경:', state);
});

// 이벤트 버스 사용
const eventBus = new EventBus();
eventBus.on(GRID_EVENTS.CELL_CHANGED, (event) => {
  console.log('셀 변경:', event.payload);
});

// Undo/Redo
model.setCell(0, 1, '값1');
model.setCell(0, 2, '값2');
model.undo(); // 값2 제거
model.redo(); // 값2 복원
```

### 고급 사용법

```typescript
// 필터링된 이벤트 리스너
eventBus.onFilter(
  (event) => event.type.startsWith('cell:'),
  (event) => console.log('셀 관련 이벤트:', event)
);

// 상태 직렬화/복원
const json = model.toJSON();
const restoredModel = SheetModel.fromJSON(json);

// 선택 상태 관리
model.setActiveCell({ row: 5, col: 3 });
model.setSelectionRange({ r0: 1, c0: 1, r1: 3, c1: 3 });
```

## 테스트

모든 기능에 대한 포괄적인 테스트가 포함되어 있습니다:

- **타입 정의 테스트**: 모든 타입의 올바른 동작 확인
- **데이터 모델 테스트**: 셀 조작, 불변성, Undo/Redo, 구독 시스템
- **이벤트 시스템 테스트**: 이벤트 발생, 리스너 등록/제거, 오류 처리

테스트 실행:
```bash
npm test src/blocks/spreadsheet/core
```

## 설계 원칙

### 1. 불변성 (Immutability)
- 모든 상태 변경은 새로운 객체를 생성
- 참조 동등성을 통한 변경 감지
- 예측 가능한 상태 관리

### 2. 명령 패턴 (Command Pattern)
- 모든 변경사항을 명령으로 캡슐화
- Undo/Redo 기능의 안정적인 구현
- 명령 히스토리 관리

### 3. 이벤트 기반 아키텍처
- 느슨한 결합을 위한 이벤트 시스템
- 플러그인 확장성을 위한 기반 제공
- 성능 최적화를 위한 이벤트 필터링

### 4. 타입 안정성
- TypeScript를 통한 완전한 타입 정의
- 컴파일 타임 오류 검출
- IDE 지원 및 자동완성

## 다음 단계 (Phase 0.2)

이 모듈은 다음 단계의 기반이 됩니다:

1. **가상화 엔진**: 대용량 데이터의 효율적인 렌더링
2. **렌더링 기초**: 셀 렌더링 및 레이아웃 관리
3. **접근성 골격**: ARIA 속성 및 키보드 네비게이션

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
