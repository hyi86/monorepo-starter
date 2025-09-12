![](./fsd-arch.jpg)

# Custom FSD (Feature-Sliced Design) 가이드

`next.js` 프로젝트에서 최적화된 `Custom FSD` 아키텍처를 가집니다.  
`next.js`의 기본 라우팅 시스템을 훼손하지 않기 위해 `app router`를 중심으로 설계되었습니다.

## 🏗️ FSD란 무엇인가?

FSD는 **Feature-Sliced Design**의 줄임말로, 대규모 프론트엔드 프로젝트를 체계적으로 구성하는 아키텍처 방법론입니다.

### 🏢 건물로 비유하면...
FSD는 **아파트 단지**와 같습니다:
- **shared**: 모든 세대가 공용으로 사용하는 **엘리베이터, 경비실, 주차장**
- **entities**: 각 세대의 **기본 구조** (방, 화장실, 주방)
- **features**: 세대 내 **기능들** (에어컨, 난방, 인터넷)
- **widgets**: **가구 조합** (거실 세트, 침실 세트)
- **app**: **실제 거주하는 집** (모든 것을 조합한 완성된 공간)

### 🎯 FSD의 핵심 원칙
1. **단방향 의존성**: 위층은 아래층만 사용 가능 (아래층은 위층을 모름)
2. **기능별 분리**: 각 기능은 독립적으로 관리
3. **재사용성**: 공통 요소는 shared에서 관리
4. **확장성**: 새로운 기능 추가가 용이

<br/>

## 📚 레이어 (Layers)
레이어는 프로젝트를 구성하는 가장 큰 단위로, 프로젝트의 구조를 결정합니다.  
구조는 고정이며, 수정이 불가능합니다.

```
# 기본 FSD 모델
shared → entities → features → widgets → pages(x) → app
```

> **💡 기존 FSD와의 차이점**: `pages` 레이어를 제거하고 `next.js`의 `app router`를 활용합니다.

### 1. 🏢 `shared` - 공용 시설

**비유**: 아파트 단지의 **엘리베이터, 경비실, 주차장** 같은 공용 시설

- 공통 유틸리티 함수, 훅, 컴포넌트
- 모든 레이어에서 사용 가능 (가장 기본적인 인프라)
- 다른 레이어와 다르게, `Slice` 없이 `Segment`로만 구성
- 비즈니스 도메인이 없으므로 `shared` 안의 파일끼리는 자유롭게 `import` 가능

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

### 2. 🏠 `entities` - 기본 구조

**비유**: 각 세대의 **방, 화장실, 주방** 같은 기본 구조

- 비즈니스 도메인의 핵심 데이터 모델
- User, Product, Order 같은 **엔티티**들을 정의
- 데이터의 구조와 기본적인 CRUD 작업을 담당
- 다른 레이어에서 재사용되는 **순수한 데이터 레이어**

```
entities/
├── user/             # 사용자 엔티티
│   ├── api/          # 사용자 API (CRUD)
│   ├── model/        # 사용자 타입, 스키마
│   └── ui/           # 사용자 기본 UI (UserCard, UserAvatar)
├── product/          # 상품 엔티티
│   ├── api/          # 상품 API
│   ├── model/        # 상품 타입, 스키마
│   └── ui/           # 상품 기본 UI (ProductCard, ProductImage)
└── order/            # 주문 엔티티
    ├── api/          # 주문 API
    ├── model/        # 주문 타입, 스키마
    └── ui/           # 주문 기본 UI (OrderItem, OrderStatus)
```

### 3. ⚡ `features` - 기능들

**비유**: 세대 내 **에어컨, 난방, 인터넷** 같은 기능들

- 사용자가 수행하는 **구체적인 액션**들을 담당
- 로그인, 좋아요, 장바구니 추가 등 **비즈니스 로직**
- 여러 페이지에서 재사용되는 기능들
- 새로운 팀원이 Feature만 봐도 앱 기능 구조를 파악 가능

```
features/
├── auth/             # 인증 기능
│   ├── api/          # 로그인/로그아웃 API
│   ├── model/        # 인증 상태, 토큰 관리
│   └── ui/           # 로그인 폼, 로그아웃 버튼
├── product-search/   # 상품 검색 기능
│   ├── api/          # 검색 API
│   ├── model/        # 검색 상태, 필터
│   └── ui/           # 검색바, 필터 UI
└── cart/             # 장바구니 기능
    ├── api/          # 장바구니 API
    ├── model/        # 장바구니 상태
    └── ui/           # 장바구니 버튼, 수량 조절
```

### 4. 🛋️ `widgets` - 가구 조합

**비유**: **거실 세트, 침실 세트** 같은 가구 조합

- 여러 entities와 features를 조합한 **복합 UI 컴포넌트**
- 페이지의 특정 영역을 담당하는 **독립적인 블록**
- 재사용 가능한 **페이지 섹션**들

```
widgets/
├── header/           # 헤더 위젯
│   ├── api/          # 헤더 관련 API
│   ├── model/        # 헤더 상태
│   └── ui/           # 헤더 컴포넌트 (로고, 네비게이션, 사용자 메뉴)
├── product-list/     # 상품 목록 위젯
│   ├── api/          # 상품 목록 API
│   ├── model/        # 목록 상태, 페이지네이션
│   └── ui/           # 상품 그리드, 필터, 정렬
└── footer/           # 푸터 위젯
    ├── api/          # 푸터 관련 API
    ├── model/        # 푸터 상태
    └── ui/           # 푸터 컴포넌트 (링크, 연락처)
```

### 5. 🏡 `app` - 실제 거주 공간

**비유**: **실제 거주하는 집** (모든 것을 조합한 완성된 공간)

- `next.js`의 `app router`를 활용한 **페이지 레이어**
- 모든 레이어를 조합하여 **완성된 페이지**를 구성
- 전역 설정과 프로바이더들
- 라우팅과 페이지별 레이아웃 담당

```
app/
├── layout.tsx        # 전역 레이아웃
├── page.tsx          # 홈페이지
├── products/         # 상품 페이지
│   ├── page.tsx      # 상품 목록
│   └── [id]/         # 상품 상세
│       └── page.tsx
└── cart/             # 장바구니 페이지
    └── page.tsx
```

### 🔄 레이어 의존성 규칙

**비유**: 아파트에서 **아래층은 위층을 모르지만, 위층은 아래층을 사용할 수 있다**

| Layers        | shared | entities | features | widgets | app  |
|---------------|:------:|:--------:|:--------:|:-------:|:----:|
| **shared**    | ✅     | ❌       | ❌       | ❌      | ❌   |
| **entities**  | ✅     | ✅       | ❌       | ❌      | ❌   |
| **features**  | ✅     | ✅       | ✅       | ❌      | ❌   |
| **widgets**   | ✅     | ✅       | ✅       | ✅      | ❌   |
| **app**       | ✅     | ✅       | ✅       | ✅      | ✅   |

**핵심 원칙:**
- 🔽 **단방향 의존성**: 아래층은 위층을 모름 (순환 의존성 방지)
- 🔼 **상향 참조만 허용**: 위층은 아래층만 사용 가능
- 🏢 **shared는 특별**: 모든 레이어에서 사용 가능하지만 다른 레이어에 의존하지 않음

**예시:**
```typescript
// ✅ 올바른 import
// features/auth에서 entities/user 사용
import { User } from '@/entities/user'

// ✅ 올바른 import  
// widgets/header에서 features/auth 사용
import { AuthButton } from '@/features/auth'

// ❌ 잘못된 import (순환 의존성)
// entities/user에서 features/auth 사용 불가
import { useAuth } from '@/features/auth' // 에러!
```

<br />

## 🧩 슬라이스 (Slices)

**비유**: 각 층(레이어) 안의 **개별 방들** (거실, 침실, 주방 등)

각 레이어 내에서 기능별로 분리된 독립적인 모듈입니다.  
레이어 내에서 공통적으로 사용되는 기능들을 모아두는 공간입니다.  
`shared`, `app` 레이어에는 슬라이스가 없습니다.

### 슬라이스 구조 예시

```
entities/
├── user/           # 사용자 슬라이스
│   ├── api/        # 사용자 API
│   ├── model/      # 사용자 타입, 스키마
│   └── ui/         # 사용자 기본 UI
├── product/        # 상품 슬라이스
│   ├── api/        # 상품 API
│   ├── model/      # 상품 타입, 스키마
│   └── ui/         # 상품 기본 UI
└── order/          # 주문 슬라이스
    ├── api/        # 주문 API
    ├── model/      # 주문 타입, 스키마
    └── ui/         # 주문 기본 UI

features/
├── auth/           # 인증 슬라이스
│   ├── api/        # 로그인/로그아웃 API
│   ├── model/      # 인증 상태 관리
│   └── ui/         # 로그인 폼, 버튼
├── product-search/ # 상품 검색 슬라이스
│   ├── api/        # 검색 API
│   ├── model/      # 검색 상태, 필터
│   └── ui/         # 검색바, 필터 UI
└── cart/           # 장바구니 슬라이스
    ├── api/        # 장바구니 API
    ├── model/      # 장바구니 상태
    └── ui/         # 장바구니 버튼, 수량 조절

widgets/
├── header/         # 헤더 슬라이스
│   ├── api/        # 헤더 관련 API
│   ├── model/      # 헤더 상태
│   └── ui/         # 헤더 컴포넌트
├── product-list/   # 상품 목록 슬라이스
│   ├── api/        # 목록 API
│   ├── model/      # 목록 상태, 페이지네이션
│   └── ui/         # 상품 그리드, 필터
└── footer/         # 푸터 슬라이스
    ├── api/        # 푸터 관련 API
    ├── model/      # 푸터 상태
    └── ui/         # 푸터 컴포넌트
```

### 📝 슬라이스 네이밍 규칙

- **kebab-case** 사용: `user-profile`, `product-detail`
- **도메인 중심** 네이밍: `auth`, `cart`, `checkout`
- **기능 중심** 네이밍: `product-filter`, `search-suggestions`
- **명확하고 간결하게**: `user` (O), `user-management-system` (X)

<br />

## 📁 세그먼트 (Segments)

**비유**: 각 방(슬라이스) 안의 **가구 배치** (책상, 침대, 옷장 등)

각 슬라이스 내에서 역할별로 분리된 폴더입니다.  
`shared`, `app` 레이어에는 별도의 세그먼트 규칙이 없습니다.

### 세그먼트 종류

| 세그먼트 | 역할 | 비유 |
|---------|------|------|
| `api` | API 함수들 | **전화기** (외부와 소통) |
| `config` | 환경변수 및 상수 | **설정판** (온도, 밝기 조절) |
| `lib` | 라이브러리 함수들 | **도구상자** (다양한 도구들) |
| `model` | 모델 함수들 | **설계도** (구조와 규칙) |
| `ui` | UI 컴포넌트들 | **가구** (보이는 것들) |

### 세그먼트 구조 예시

```
features/auth/
├── api/              # 전화기 (외부와 소통)
│   ├── login.api.ts
│   ├── logout.api.ts
│   └── refresh-token.api.ts
├── config/           # 설정판 (온도, 밝기 조절)
│   ├── auth.config.ts
│   └── auth.constants.ts
├── lib/              # 도구상자 (다양한 도구들)
│   ├── token.utils.ts
│   ├── validation.utils.ts
│   └── encryption.utils.ts
├── model/            # 설계도 (구조와 규칙)
│   ├── auth.types.ts
│   ├── auth.store.ts
│   ├── auth.schema.ts
│   └── use-auth.ts
└── ui/               # 가구 (보이는 것들)
    ├── LoginForm.tsx
    ├── LogoutButton.tsx
    └── AuthGuard.tsx
```

### 📞 `api` 세그먼트 - 전화기 (외부와 소통)

- `xxx.action.ts`: **서버 액션** API 함수들 (Next.js Server Actions)
- `xxx.api.ts`: **클라이언트** API 요청 함수들 (fetch, axios)
- `xxx.query.ts`: **TanStack Query** 클라이언트 쿼리 API 요청 함수들

```typescript
// login.api.ts
export const loginApi = async (credentials: LoginCredentials) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  })
  return response.json()
}
```

### ⚙️ `config` 세그먼트 - 설정판 (온도, 밝기 조절)

- `xxx.config.ts`: 환경변수 설정 함수들
- `xxx.constants.ts`: 상수 함수들

```typescript
// auth.config.ts
export const authConfig = {
  tokenExpiry: process.env.TOKEN_EXPIRY || '24h',
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d'
}

// auth.constants.ts
export const AUTH_ROUTES = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  REGISTER: '/register'
} as const
```

### 🔧 `lib` 세그먼트 - 도구상자 (다양한 도구들)

각종 라이브러리 함수들 (네이밍은 자유롭게)

```typescript
// token.utils.ts
export const parseJWT = (token: string) => {
  // JWT 파싱 로직
}

export const isTokenExpired = (token: string) => {
  // 토큰 만료 확인 로직
}
```

### 📋 `model` 세그먼트 - 설계도 (구조와 규칙)

- `types.ts`: 타입 정의 함수들
- `use-xxx.ts`: 훅 함수들
- `xxx.store.ts`: Zustand 스토어 함수
- `xxx.schema.ts`: Zod 스키마
- `xxx.selector.ts`: 각종 선택자 함수들
- `xxx.entity.ts`: 데이터베이스 모델링 엔티티 정의
- `xxx.context.ts`: 컨텍스트 정의(Context API)

```typescript
// auth.types.ts
export interface User {
  id: string
  email: string
  name: string
}

// auth.store.ts
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true })
}))

// use-auth.ts
export const useAuth = () => {
  const { user, isAuthenticated, login, logout } = useAuthStore()
  return { user, isAuthenticated, login, logout }
}
```

### 🪑 `ui` 세그먼트 - 가구 (보이는 것들)

각종 UI 컴포넌트들 (네이밍은 자유롭게)

```typescript
// login-form.tsx
export const LoginForm = () => {
  const { login } = useAuth()
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="이메일" />
      <input type="password" placeholder="비밀번호" />
      <button type="submit">로그인</button>
    </form>
  )
}
```

## 🚀 점진적 도입 방법

### 🏗️ 마이그레이션 (기존 프로젝트 개선)

**비유**: 기존 집을 **리모델링**하는 과정

1. **기반 다지기**: `app`, `shared` 레이어를 먼저 정리 (비즈니스 로직 제외)
2. **기능 파악**: 정의된 기능(비즈니스 로직)을 분석하여 대략적인 `features` 설계
3. **구조 최적화**: `features`를 쪼개거나 합치며 최적의 구조 찾기
4. **세그먼트 정리**: 애매한 기능을 `lib`로 모아두고, 적절히 분배

### 🆕 신규 기능 생성

**비유**: **새 집을 짓는** 과정

1. **임시 배치**: 모든 기능을 `app` 레이어에 임시로 생성
2. **데이터 설계**: `entities` 정의 (User, Product, Order 등 핵심 타입/저장소)
3. **기능 구현**: `features` 작성 (로그인, 좋아요, 장바구니 추가 등)
4. **UI 조합**: `widgets` 생성 (로그인 폼, 댓글 리스트 등)
5. **페이지 완성**: `app`에서 모든 것을 조립

**📋 개발 순서**: `데이터(entities)` → `기능(features)` → `UI 조합(widgets)` → `페이지(app)`

### 💡 실무 팁

폴더는 나누는 기준이 너무 어렵고 난해하다면, 다음과 같이 접근 할 수 있습니다.

- 로그인 페이지(app)에서 로그인 카드(widgets)의 사용자(entities)의 로그인(features) 기능
- 상품관리 페이지(app)의 상품목록 섹션(widgets)의 상품(entities)의 조회(features) 기능
- 상품관리 페이지(app)의 상품목록 섹션(widgets)의 상품(entities)의 등록(features) 기능
- 입고관리 페이지(app)의 입고처리 폼(widgets)의 입고(entities)의 입고처리(features) 기능

#### ✅ 좋은 예시
```typescript
// 1. entities/user 먼저 정의
export interface User {
  id: string
  email: string
  name: string
}

// 2. features/auth에서 entities/user 사용
import { User } from '@/entities/user'

// 3. widgets/header에서 features/auth 사용
import { AuthButton } from '@/features/auth'

// 4. app/page.tsx에서 widgets/header 사용
import { Header } from '@/widgets/header'
```

#### ❌ 피해야 할 예시
```typescript
// 순환 의존성 - 절대 금지!
// entities/user에서 features/auth 사용
import { useAuth } from '@/features/auth' // 에러!

// widgets에서 entities 직접 사용 (features를 거쳐야 함)
import { User } from '@/entities/user' // 권장하지 않음
```

## 🏡 `app router` 가이드

**비유**: **실제 거주하는 집**의 방 배치와 구조

`next.js`의 `app router`와 관련된 [next.js 공식 파일 컨벤션](https://nextjs.org/docs/app/getting-started/project-structure)을 그대로 따릅니다.

### 📁 기본 파일 구조

```
app/
├── layout.tsx          # 전역 레이아웃 (집의 기본 구조)
├── page.tsx            # 홈페이지 (현관)
├── loading.tsx         # 로딩 UI
├── error.tsx           # 에러 UI
├── not-found.tsx       # 404 페이지
├── globals.css         # 전역 스타일
└── [동적 라우트]/      # 동적 라우트
    ├── page.tsx
    ├── loading.tsx
    └── error.tsx
```

### 🎯 비공식 파일 컨벤션

기본 라우트 이외에 다음의 파일을 비공식 파일 컨벤션으로 사용합니다.

| 파일명 | 설명 | 라이브러리 |
|--------|------|-----------|
| `search-params.tsx` | 검색 파라미터 정의 | [Nuqs](https://nuqs.dev) |
| `columns.tsx` | 테이블 컬럼 정의 | [TanStack Table](https://tanstack.com/table/latest/docs/introduction) |

### 💡 실제 사용 예시

```typescript
// app/products/page.tsx
import { ProductList } from '@/widgets/product-list'
import { ProductFilters } from '@/widgets/product-filters'

export default function ProductsPage() {
  return (
    <div>
      <ProductFilters />
      <ProductList />
    </div>
  )
}

// app/products/search-params.tsx (Nuqs 사용)
import { parseAsString, useQueryState } from 'nuqs'

export const useProductSearchParams = () => {
  const [search, setSearch] = useQueryState('search', parseAsString)
  const [category, setCategory] = useQueryState('category', parseAsString)
  
  return { search, setSearch, category, setCategory }
}
```

---

## 🎯 마무리

### 📚 핵심 요약
- **5개 레이어**: `shared` → `entities` → `features` → `widgets` → `app`
- **단방향 의존성**: 아래층은 위층을 모름
- **점진적 도입**: 기존 프로젝트도 단계적으로 개선 가능
- **Next.js 최적화**: `app router`와 완벽 호환

### 🚀 다음 단계
1. 기존 프로젝트에 `shared` 레이어부터 적용
2. 핵심 `entities` 정의 (User, Product 등)
3. 주요 `features` 구현 (auth, search 등)
4. `widgets`로 UI 조합
5. `app`에서 최종 조립

**Happy Coding! 🎉**

