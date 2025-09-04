# Next Full Stack

변형된 FSD 구조를 가집니다.
기존의 FSD 구조에서 편의성을 좀 더 추가한 버전입니다.

<br/>

## 레이어
레이어는 프로젝트를 구성하는 가장 큰 단위로, 프로젝트의 구조를 결정합니다.  
구조는 고정입니다.

```
shared → features → app
```

### 0. `shared` (공통 레이어)
- 공통 유틸리티 함수, 훅, 컴포넌트
- 모든 레이어에서 사용 가능
- `features`, `app` 레이어에 의존하지 않음

### 2. `features` (기능이 포함된 레이어)
- 비즈니스 로직을 담당하는 기능들

### 4. `app` (next.js app router)
- 실제 페이지 컴포넌트들
- 라우팅과 직접 연결
- 애플리케이션의 진입점
- 전역 설정과 프로바이더들
- 모든 레이어를 포함하는 최상위 레이어
- `common`, `features` 를 모두 조합

### 레이어 조건 (import 참조 가능한 범위)

| Layers        | common | features | app  |
|---------------|:------:|:--------:|:----:|
| **shared**    | ✅     | ❌       |  ❌  |
| **features**  | ✅     | ✅       |  ❌  |
| **app**       | ✅     | ✅       |  ✅  |

**의존성 규칙:**
- 각 레이어는 자신과 하위 레이어들만 사용 가능
- 상위 레이어는 사용할 수 없음 (순환 의존성 방지)
- `shared`는 모든 레이어에서 사용 가능하지만 다른 레이어에 의존하지 않음

<br/>

## 슬라이스
각 레이어 내에서 기능별로 분리된 독립적인 모듈

```
entities/
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


<br/>

## 세그먼트
각 슬라이스 내에서 역할별로 분리된 폴더

```
features/auth/              # auth 슬라이스
├── ui/                     # UI 세그먼트
│   ├── login-form.tsx
│   ├── register-form.tsx
│   └── logout-button.tsx
├── model/                  # Model 세그먼트
│   ├── auth-slice.ts
│   ├── auth-api.ts
│   ├── use-auth.ts
│   └── use-login.ts
└── lib/                    # Lib 세그먼트
    └── auth-utils.ts
```

### 세그먼트 종류

| 세그먼트    | 설명                            | Examples |
|-------------|---------------------------------|----------------------------------|
| **ui/**     | 사용자 인터페이스 컴포넌트      | Button, Form, Modal              |
| **model/**  | 비즈니스 로직, 상태 관리, API   | slice, api, hooks                |
| **lib/**    | 유틸리티 함수, 헬퍼             | utils, helpers, constants, hooks |
| **api/**    | API 관련 로직                   | api-client, endpoints            |
| **config/** | 설정 파일                       | config, constants                |
| **types/**  | 타입 정의                       | types, interfaces                |
| **hooks/**  | 훅 함수                         | use-auth, use-cart               |

### 슬라이스 간 의존성 규칙

**✅ 같은 레이어 내 슬라이스 간 의존성 허용:**
```typescript
// features/cart/model/use-cart.ts
import { useAuth } from '~/features/auth'; // ✅ 같은 레이어의 다른 슬라이스
import { Product } from '~/entities/product'; // ✅ 하위 레이어의 슬라이스
```

**❌ 다른 레이어의 슬라이스에 직접 의존 금지:**
```typescript
// entities/user/ui/user-avatar.tsx
import { LoginForm } from '~/features/auth'; // ❌ 상위 레이어 슬라이스
```

<br/>

## 파일 네이밍 규칙

### 컴포넌트 파일
- **PascalCase** 사용: `UserProfile.tsx`, `LoginForm.tsx`
- **기능 + 역할** 조합: `ProductCard.tsx`, `AuthModal.tsx`

### 훅 파일
- **kebab-case** + `use` 접두사: `use-auth.ts`, `use-product-list.ts`
- **기능 + 동작** 조합: `use-user-profile.ts`, `use-cart-items.ts`

### 유틸리티 파일
- **kebab-case** 사용: `auth-utils.ts`, `product-helpers.ts`
- **기능 + 용도** 조합: `date-formatter.ts`, `validation-rules.ts`

### 타입 파일
- **kebab-case** 사용: `user-types.ts`, `api-types.ts`
- **도메인 + types** 조합: `auth-types.ts`, `product-types.ts`

## 상태 관리 규칙

### 레이어별 상태 관리 전략

| 레이어 | 상태 관리 방식 | 예시 |
|--------|---------------|------|
| **entities** | 로컬 상태 (useState) | 컴포넌트 내부 상태 |
| **features** | 커스텀 훅 + Context | useAuth, useCart |
| **widgets** | Context + Provider | ThemeProvider, AuthProvider |
| **app** | 전역 상태 (Zustand) + 서버 상태 (`@tanstack/query`) | 앱 전체 상태, 데이터 페칭 |

### 상태 공유 규칙

**✅ 권장하는 상태 공유 패턴:**
```typescript
// features/auth/model/use-auth.ts
export const useAuth = () => {
  // 인증 관련 상태와 로직
  return { user, login, logout, isAuthenticated };
};

// widgets/header/ui/header.tsx
import { useAuth } from '~/features/auth';
// 필요한 기능만 가져와서 사용
```

**❌ 피해야 할 상태 공유 패턴:**
```typescript
// 전역 상태를 모든 곳에서 직접 사용
import { useStore } from '~/app/store';
// 너무 많은 의존성과 결합도 증가
```

## 성능 최적화 가이드

### 컴포넌트 최적화

**✅ 권장하는 패턴:**
```typescript
// entities/user/ui/user-avatar.tsx
import { memo } from 'react';

export const UserAvatar = memo(({ user, size = 'md' }) => {
  return <img src={user.avatar} alt={user.name} className={`avatar-${size}`} />;
});

UserAvatar.displayName = 'UserAvatar';
```

**✅ 동적 임포트 사용:**
```typescript
// app/dashboard/ui/dashboard-page.tsx
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('~/widgets/charts'), {
  loading: () => <div>로딩 중...</div>,
  ssr: false
});
```

### 번들 최적화

**✅ 트리 쉐이킹을 위한 export 방식:**
```typescript
// shared/ui/button/button.tsx
export { Button } from './button';

// shared/ui/input/input.tsx
export { Input } from './input';

// shared/ui/modal/modal.tsx
export { Modal } from './modal';
// 필요한 것만 import 가능
```

## 테스트 전략

### 레이어별 테스트 접근법

| 레이어 | 테스트 유형 | 테스트 도구 | 예시 |
|--------|-------------|-------------|------|
| **entities** | 단위 테스트 | Vitest + Testing Library | 컴포넌트 렌더링 테스트 |
| **features** | 통합 테스트 | Vitest + MSW | API 모킹 테스트 |
| **widgets** | 컴포넌트 테스트 | Storybook | 시각적 테스트 |
| **app** | E2E 테스트 | Playwright | 사용자 시나리오 테스트 |

### 테스트 파일 구조

전역 테스트는 `/e2e` 폴더에 배치

```
features/auth/
├── ui/
│   ├── login-form.tsx
│   └── __tests__/
│       └── login-form.test.tsx
├── model/
│   ├── use-auth.ts
│   └── __tests__/
│       └── use-auth.test.ts
└── lib/
    ├── auth-utils.ts
    └── __tests__/
        └── auth-utils.test.ts
```

## FAQ

### Q: 레이어 간 순환 의존성이 발생하면 어떻게 해야 하나요?
A: 공통 로직을 `common` 레이어로 이동하거나, 의존성 방향을 재설계해야 합니다.

### Q: 너무 많은 슬라이스가 생기면 어떻게 관리하나요?
A: 관련된 슬라이스들을 그룹화하거나, 상위 레벨에서 통합 관리하는 방법을 고려하세요.

### Q: 외부 라이브러리는 어느 레이어에 배치해야 하나요?
A: UI 라이브러리는 `common/ui`, 비즈니스 로직 라이브러리는 해당 `features` 레이어에 배치하세요.

### Q: API 호출은 어느 레이어에서 해야 하나요?
A: `features` 레이어의 `model` 세그먼트에서 API 호출을 관리하고, `app` 레이어에서 데이터 페칭을 조율하세요.

## 참고 자료

- [Feature-Sliced Design Methodology](https://feature-sliced.design/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Best Practices](https://react.dev/learn)
- [TypeScript Guidelines](https://www.typescriptlang.org/docs/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [MSW (Mock Service Worker)](https://mswjs.io/)
