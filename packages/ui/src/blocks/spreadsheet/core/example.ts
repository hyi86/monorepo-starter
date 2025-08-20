/**
 * 스프레드시트 Core 모듈 사용 예제
 */

import { EventBus, GRID_EVENTS, SheetModel } from './index';

// 예제 1: 기본 사용법
export function basicExample() {
  console.log('=== 기본 사용법 예제 ===');

  // 모델 생성
  const model = new SheetModel({
    rows: [
      ['이름', '나이', '직업'],
      ['김철수', 25, '개발자'],
      ['이영희', 30, '디자이너'],
      ['박민수', 28, '기획자'],
    ],
    columns: [
      { key: 'name', width: 120, header: '이름' },
      { key: 'age', width: 80, header: '나이' },
      { key: 'job', width: 150, header: '직업' },
    ],
  });

  // 셀 값 조회
  console.log('A1 셀 값:', model.getCell(0, 0)?.value); // '이름'
  console.log('B2 셀 값:', model.getCell(1, 1)?.value); // 25

  // 셀 값 설정
  model.setCell(1, 0, '김철수 (수정됨)');
  console.log('수정된 A2 셀 값:', model.getCell(1, 0)?.value);

  // 상태 구독
  const unsubscribe = model.subscribe((state) => {
    console.log('상태 변경됨 - 활성 셀:', state.selection.activeCell);
  });

  // 활성 셀 변경
  model.setActiveCell({ row: 2, col: 1 });

  // 구독 해제
  unsubscribe();
}

// 예제 2: Undo/Redo 기능
export function undoRedoExample() {
  console.log('\n=== Undo/Redo 예제 ===');

  const model = new SheetModel();

  // 여러 셀 값 설정
  model.setCell(0, 0, '첫 번째 값');
  model.setCell(0, 1, '두 번째 값');
  model.setCell(0, 2, '세 번째 값');

  console.log('초기 상태:');
  console.log('A1:', model.getCell(0, 0)?.value);
  console.log('B1:', model.getCell(0, 1)?.value);
  console.log('C1:', model.getCell(0, 2)?.value);

  // Undo 실행
  console.log('\nUndo 실행...');
  model.undo();
  console.log('A1:', model.getCell(0, 0)?.value);
  console.log('B1:', model.getCell(0, 1)?.value);
  console.log('C1:', model.getCell(0, 2)?.value);

  // 다시 Undo
  console.log('\n다시 Undo 실행...');
  model.undo();
  console.log('A1:', model.getCell(0, 0)?.value);
  console.log('B1:', model.getCell(0, 1)?.value);
  console.log('C1:', model.getCell(0, 2)?.value);

  // Redo 실행
  console.log('\nRedo 실행...');
  model.redo();
  console.log('A1:', model.getCell(0, 0)?.value);
  console.log('B1:', model.getCell(0, 1)?.value);
  console.log('C1:', model.getCell(0, 2)?.value);
}

// 예제 3: 이벤트 시스템
export function eventSystemExample() {
  console.log('\n=== 이벤트 시스템 예제 ===');

  const model = new SheetModel();
  const eventBus = new EventBus();

  // 셀 변경 이벤트 리스너
  eventBus.on(GRID_EVENTS.CELL_CHANGED, (event) => {
    console.log('셀 변경됨:', event.payload);
  });

  // 선택 변경 이벤트 리스너
  eventBus.on(GRID_EVENTS.SELECTION_CHANGED, (event) => {
    console.log('선택 변경됨:', event.payload);
  });

  // 필터링된 이벤트 리스너 (셀 관련 이벤트만)
  eventBus.onFilter(
    (event) => event.type.startsWith('cell:'),
    (event) => {
      console.log('셀 관련 이벤트:', event.type, event.payload);
    },
  );

  // 이벤트 발생 (실제로는 모델에서 발생)
  eventBus.emit(GRID_EVENTS.CELL_CHANGED, { row: 0, col: 0, value: '테스트' });
  eventBus.emit(GRID_EVENTS.SELECTION_CHANGED, {
    ranges: [{ r0: 0, c0: 0, r1: 0, c1: 0 }],
    activeCell: { row: 0, col: 0 },
  });
}

// 예제 4: 직렬화/복원
export function serializationExample() {
  console.log('\n=== 직렬화/복원 예제 ===');

  const model = new SheetModel({
    rows: [
      ['제품명', '가격', '수량'],
      ['노트북', 1200000, 5],
      ['마우스', 50000, 20],
    ],
  });

  // 셀 값 설정
  model.setCell(1, 1, 1300000); // 노트북 가격 수정
  model.setActiveCell({ row: 2, col: 1 }); // 마우스 가격 셀 선택

  // JSON으로 직렬화
  const json = model.toJSON();
  console.log('직렬화된 데이터:', JSON.stringify(json, null, 2));

  // JSON에서 복원
  const restoredModel = SheetModel.fromJSON(json);
  console.log('복원된 모델의 A2 셀:', restoredModel.getCell(1, 0)?.value);
  console.log('복원된 모델의 B2 셀:', restoredModel.getCell(1, 1)?.value);
  console.log('복원된 모델의 활성 셀:', restoredModel.getState().selection.activeCell);
}

// 예제 5: 대용량 데이터 처리
export function largeDataExample() {
  console.log('\n=== 대용량 데이터 예제 ===');

  const startTime = performance.now();

  // 1000행 x 10열 데이터 생성
  const rows: Array<Array<string | number>> = [];
  for (let i = 0; i < 1000; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push(`R${i}C${j}`);
    }
    rows.push(row);
  }

  const model = new SheetModel({ rows });

  const creationTime = performance.now() - startTime;
  console.log(`1000x10 데이터 생성 시간: ${creationTime.toFixed(2)}ms`);

  // 랜덤 셀 값 변경
  const updateStartTime = performance.now();
  for (let i = 0; i < 100; i++) {
    const row = Math.floor(Math.random() * 1000);
    const col = Math.floor(Math.random() * 10);
    model.setCell(row, col, `수정됨_${i}`);
  }

  const updateTime = performance.now() - updateStartTime;
  console.log(`100개 셀 수정 시간: ${updateTime.toFixed(2)}ms`);

  // 상태 조회
  const state = model.getState();
  console.log(`총 행 수: ${state.snapshot.rowCount}`);
  console.log(`총 열 수: ${state.snapshot.colCount}`);
  console.log(`실제 데이터가 있는 행 수: ${state.snapshot.rows.size}`);
}

// 모든 예제 실행
export function runAllExamples() {
  try {
    basicExample();
    undoRedoExample();
    eventSystemExample();
    serializationExample();
    largeDataExample();

    console.log('\n=== 모든 예제 완료 ===');
    console.log('✅ Core 데이터 모델이 정상적으로 작동합니다!');
  } catch (error) {
    console.error('❌ 예제 실행 중 오류 발생:', error);
  }
}

// Node.js 환경에서 직접 실행할 때
if (typeof window === 'undefined') {
  runAllExamples();
}
