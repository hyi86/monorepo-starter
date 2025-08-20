# 스프레드시트/데이터그리드 라이브러리

리액트 환경에서 "구글시트/Handsontable급"의 빠르고 접근성 준수하는 데이터 그리드 라이브러리입니다.

## 구현 상태

### ✅ Phase 0.1 - Core 데이터 모델 (완료)
- [x] 단일 시트 데이터 구조 설계
- [x] 셀/행/열 상태 관리 기본
- [x] 불변성 유지 및 스냅샷 저장
- [x] 이벤트 시스템 (EventBus)

### ✅ Phase 0.2 - 가상화 엔진 (완료)
- [x] tanstack/react-virtual 기반 행/열 가상 스크롤 구현
- [x] 가상화 범위 계산 및 업데이트
- [x] 동적 컬럼 너비 지원
- [x] 오버스캔 설정 (성능 최적화)
- [x] 스크롤 위치 계산 및 제어

### 🔄 Phase 0.3 - 렌더링 기초 (진행 예정)
- [ ] 셀 렌더링 기본 구조
- [ ] 컬럼 정의(열 폭, 고정 열, 셀 렌더러) 지원
- [ ] 스티키 헤더 및 인덱스 구현
- [ ] 컬럼 리사이즈(마우스 드래그) 기능

## 사용법

### 기본 가상화 그리드

```tsx
import { VirtualGrid } from '@/components/spreadsheet';
import { Column } from '@/core/types';

const columns: Column[] = [
  { key: 'id', width: 80, header: 'ID' },
  { key: 'name', width: 150, header: 'Name' },
  { key: 'email', width: 200, header: 'Email' },
];

function App() {
  return (
    <VirtualGrid
      rows={10000}
      columns={columns}
      rowHeight={32}
      containerWidth={800}
      containerHeight={600}
    />
  );
}
```

### 가상화 엔진 직접 사용

```tsx
import { useVirtualization, VirtualizationConfig } from '@/core';
import { SheetModel } from '@/core';

function CustomGrid() {
  const model = new SheetModel({
    rowCount: 10000,
    colCount: 10,
    columns: [...],
  });
  
  const config: VirtualizationConfig = {
    containerWidth: 800,
    containerHeight: 600,
    rowHeight: 32,
    overscan: 5,
  };

  const { rowVirtualizer, colVirtualizer, totalWidth, totalHeight } = useVirtualization(
    config,
    model.getSnapshot()
  );

  const virtualRows = rowVirtualizer.getVirtualItems();
  const virtualCols = colVirtualizer.getVirtualItems();

  // 커스텀 렌더링 로직...
}
```

## 성능 특징

- **가상화**: 100k+ 셀에서도 부드러운 스크롤 (60fps)
- **메모리 효율**: 실제 보이는 셀만 렌더링
- **오버스캔**: 스크롤 중 끊김 없는 경험
- **동적 크기**: 컬럼 너비 변경 시 자동 재계산

## 아키텍처

```
packages/ui/src/blocks/spreadsheet/
├── core/                    # 핵심 로직
│   ├── types.ts            # 타입 정의
│   ├── sheet-model.ts      # 데이터 모델
│   ├── event-bus.ts        # 이벤트 시스템
│   ├── virtualization.ts   # 가상화 엔진 ⭐
│   └── index.ts            # 모듈 export
├── components/             # React 컴포넌트
│   └── virtual-grid.tsx    # 가상화 그리드
├── demo.tsx               # 데모 페이지
└── spec.md                # 기능 정의서
```

## 다음 단계

Phase 0.3에서는 다음 기능들을 구현할 예정입니다:
- 셀 렌더링 기본 구조
- 스티키 헤더 및 인덱스
- 컬럼 리사이즈 기능
- 접근성 기본 지원
