`next.js` 프로젝트에서 최적화된 `Custom FSD` 아키텍쳐를 가집니다.  
`next.js`의 기본 라우팅 시스템을 훼손하지 않기위해 app router 를 중심으로 설계되었습니다.

<br/>

## 레이어
레이어는 프로젝트를 구성하는 가장 큰 단위로, 프로젝트의 구조를 결정합니다.  
구조는 고정이며, 수정이 불가능합니다.

```
# 기본 FSD 모델
shared → entities(x) → features → widgets(x) → pages(x) → app
# Custom FSD 모델
shared → features → app
```

### 1. `shared`

- 공통 유틸리티 함수, 훅, 컴포넌트
- 모든 레이어에서 사용 가능
- 모든 레이어에서 `import` 가능
- 다른 레이어와 다르게, Slice 없이 Segment로만 구성합니다
- 비즈니스 도메인이 없으므로 Shared 안의 파일끼리는 자유롭게 Import할 수 있습니다
- 다음의 폴더 구조로 적용합니다
  ```
  shared/
  ├── action/           # next.js 공통 server action 함수들
  ├── config/           # 환경변수, 전역 Feature Flag
  ├── fonts/            # 폰트 파일들
  ├── lib/(feat)        # 공통 라이브러리 함수들
  ├── middleware/       # next.js 공통 미들웨어 함수들
  ├── model/            # 공통 모델 함수들
  ├── provider/         # 공통 프로바이더 함수들
  └── ui/(feat)         # 공통 UI 컴포넌트들
  ```

### 2. `features`

- 사용자가 앱에서 수행하는 주요 기능을 담습니다
- 모든 기능을 Feature로 만들 필요는 없습니다. 여러 페이지에서 재사용되는 경우에만 고려하세요
- 새로운 팀원이 들어왔을 때 Feature만 봐도 앱 기능 구조를 파악할 수 있도록 구성하세요
- 다음의 폴더 구조로 적용합니다
  ```
  features/
  ├── (Slice)/
  │    ├── api/     # API 함수들
  │    ├── config/  # 환경변수 및 상수 등
  │    ├── lib/     # 라이브러리 함수들
  │    ├── model/   # 모델 함수들
  │    └── ui/      # UI 컴포넌트들
  └── (Slice)/
  ```
### 3. `app` (next.js app router)

- 애플리케이션의 진입점
- 전역 설정과 프로바이더들
- 모든 레이어를 포함하는 최상위 레이어
- `shared`, `features` 를 모두 조합합니다


### 레이어 조건 (import 참조 가능한 범위)

| Layers        | shared | features | app  |
|---------------|:------:|:--------:|:----:|
| **shared**    | ✅     | ❌       |  ❌  |
| **features**  | ✅     | ✅       |  ❌  |
| **app**       | ✅     | ✅       |  ✅  |

**의존성 규칙:**
- 각 레이어는 자신과 하위 레이어들만 사용 가능 합니다
- 상위 레이어는 사용할 수 없습니다 (순환 의존성 방지)
- `shared`는 모든 레이어에서 사용 가능하지만 다른 레이어에 의존하지 않습니다

<br />

## 슬라이스
각 레이어 내에서 기능별로 분리된 독립적인 모듈 입니다.  
레이어 내에서 공통적으로 사용되는 기능들을 모아두는 공간입니다.  
`shared`, `app` 레이어에는 슬라이스가 없습니다.

다음과 같은 폴더 구조로 적용합니다.
```
features/
├── user/           # user 슬라이스
│   ├── ui/
│   └── model/
├── product/        # product 슬라이스
│   ├── ui/
│   └── model/
└── order/          # order 슬라이스
    ├── ui/
    └── model/
```

### 슬라이스 네이밍 규칙

- **kebab-case** 사용: `user-profile`, `product-detail`
- **도메인 중심** 네이밍: `auth`, `cart`, `checkout`
- **기능 중심** 네이밍: `product-filter`, `search-suggestions`

<br />

## 세그먼트

각 슬라이스 내에서 역할별로 분리된 폴더 입니다.  
`shared`, `app` 레이어에는 별도의 세그먼트 규칙이 없습니다.

각 슬라이스는 다음과 같은 하위 폴더 구조로 적용합니다.

- `api`: API 함수들
- `config`: 환경변수 및 상수 등
- `lib`: 라이브러리 함수들
- `model`: 모델 함수들
- `ui`: UI 컴포넌트들

### `api` 세그먼트에 포함되는 파일

- `xxx.action.ts`: 서버 액션 API 함수들
- `xxx.api.ts`: API 요청 함수들
- `xxx.query.ts`: tanstack query 클라이언트 쿼리 API 요청 함수들

### `config` 세그먼트에 포함되는 파일

- `xxx.config.ts`: 환경변수 설정 함수들
- `xxx.constants.ts`: 상수 함수들

### `lib` 세그먼트에 포함되는 파일

각종 라이브러리 함수들(네이밍은 자유롭게 합니다)

### `model` 세그먼트에 포함되는 파일

- `types.ts`: 타입 정의 함수들
- `xxx.store.ts`: Zustand 스토어 함수
- `xxx.schema.ts`: Zod 스키마
- `xxx.selector.ts`: 각종 선택자 함수들
- `use-xxx.ts`: 훅 함수들
- `xxx.entity.ts`: 데이터베이스 모델링 엔티티 정의
- `xxx.context.ts`: 컨텍스트 정의(Context API)

### `ui` 세그먼트에 포함되는 파일

각종 UI 컴포넌트들(네이밍은 자유롭게 합니다)

## 점진적 도입 방법

1. `app`, `shared` Layer를 먼저 정리하며 기반을 다집니다. (비즈니스 로직은 제외)
2. 정의된 기능(비즈니스 로직)을 가지고 대략적인 `feature`를 만듭니다.
3. `feature`를 쪼개거나 합치며 최적의 구조를 찾습니다.
4. 세그먼트에서는 애매한 기능을 `lib`로 모아두고, 적절히 분배합니다.


## `app router`(`app`) 가이드

`next.js` 의 `app router` 와 관련된 [next.js 공식 파일 컨벤션](https://nextjs.org/docs/app/getting-started/project-structure)을 그대로 따릅니다.  

기본 라우트 이외에 다음의 파일을 비공식 파일 컨벤션으로 사용합니다.

| 파일명 | 설명 |
|--------|------|
| `search-params.tsx` | 검색 파라미터 컴포넌트(Nuqs) |

