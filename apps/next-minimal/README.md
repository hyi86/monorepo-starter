
## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

```bash
pnpm build
pnpm start
```

## Docker

```bash
# colima start --memory 4
cd ../..
DOCKER_BUILDKIT=1 docker build -t next-minimal -f apps/next-minimal/Dockerfile .
docker run -p 3000:3000 next-minimal
```

## Whats Included?

이 프로젝트는 Next.js 16을 기반으로 한 최소한의 설정을 가진 스타터 템플릿입니다.

### 핵심 기능

- **Next.js 16** - App Router 기반의 최신 Next.js
- **TypeScript** - 타입 안전성을 위한 TypeScript 설정
- **React Compiler** - React 19의 컴파일러 최적화
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **shadcn/ui** - Radix UI 기반의 재사용 가능한 컴포넌트 라이브러리

### 개발 도구

- **Vitest** - 빠른 단위 테스트 프레임워크
- **ESLint** - 코드 품질 검사
- **TypeScript Strict Mode** - 엄격한 타입 체크
- **Prettier** - 코드 포맷팅 (프로젝트 전역 설정)

### 런타임 기능

- **Proxy/Middleware** - 요청 전처리 및 쿠키 관리
- **i18n (다국어 지원)** - 한국어, 영어, 일본어 지원 (`@formatjs/intl-localematcher` 사용)
- **Instrumentation** - 서버 시작 시 초기화 및 에러 핸들링
- **쿠키 관리** - 안전한 쿠키 설정 (httpOnly, secure)
- **Google Fonts** - Geist Sans & Geist Mono 폰트

### 배포

- **Docker** - 컨테이너화 지원
- **Standalone Output** - 독립 실행 가능한 빌드 옵션

### 모노레포 통합

- `@monorepo-starter/ui` - 공유 UI 컴포넌트 패키지
- `@monorepo-starter/utils` - 공유 유틸리티 함수
- `@monorepo-starter/eslint-config` - 공유 ESLint 설정
- `@monorepo-starter/typescript-config` - 공유 TypeScript 설정
