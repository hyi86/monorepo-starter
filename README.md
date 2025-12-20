# 📦 Monorepo Starter

<p align="left">
  <img alt="Turborepo" src="https://img.shields.io/badge/Turborepo-monorepo-3178C6?logo=turbo" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript" />
  <img alt="pnpm" src="https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm" />
  <img alt="Next.js" src="https://img.shields.io/badge/next.js-15-black?logo=nextdotjs" />
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
  <img alt="Code Style" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" />
  <img alt="Linting" src="https://img.shields.io/badge/eslint-9-3178C6?logo=eslint" />
  <br />
  <img alt="License" src="https://img.shields.io/github/license/hyi86/monorepo-starter" />
  <img alt="Last Commit" src="https://img.shields.io/github/last-commit/hyi86/monorepo-starter" />
</p>

최신 프론트엔드 개발을 위해 `pnpm`과 `Turborepo`를 사용하는 **모노레포 템플릿**입니다.

이 프로젝트는 `Next.js`, `React SPA`, `Hono API`, `Vanilla JS` 등 다양한 스택을  
하나의 환경에서 실험하고 운영할 수 있도록 구성되어 있으며,  
개발 생산성을 위한 스크립트 및 `CLI`가 포함되어 있습니다.

<br />

## 🛠️ Features

### In-house Implementations

- [`Hybrid API Cache`](apps/next-full-stack/src/app/example/experimental/api-cache/page.tsx): 
  `File System`과 `Local SQLite DB`를 기반으로 하는 **Custom API Data Cache** 구현.
- [`Large File Uploader`](./apps/next-full-stack/src/app/example/experimental/file-upload/page.tsx): 
  자체 **Large Multi-Chunk Streaming File Uploader** 구현.
- [`Authentication`](./apps/next-full-stack/src/app/example/auth/page.mdx): 
  `JWT Access/Refresh Token` 기반의 **Server-only Authentication System** 구축.
- [`Internationalization`](./apps/next-full-stack/src/app/example/[lang]/page.tsx)
  선택적 페이지의 쉬운 국제화를 위해 별도로 구축.

### Third-Party Dependencies

- 📦 **Monorepo**:
  [`pnpm`](https://pnpm.io) 기반의 [`Turborepo`](https://turbo.build) 템플릿으로 하나의 저장소에서 여러 프로젝트와 패키지를 효율적으로 관리할 수 있습니다.
- 🧩 **Frameworks**:
  [`Next.js`](https://nextjs.org), [`react-router(Declarative mode)`](https://reactrouter.com/start/declarative/installation), `Vanilla JS`와 같은 프론트엔드 프레임워크와, 
  백엔드 프레임워크로 [`Hono`](https://hono.dev)를 포함합니다.
- 🗄️ **Data Layer/ORM**:
  외부 API 없이도 `SQLite` 기반의 [`Drizzle ORM`](https://orm.drizzle.team)으로 데이터를 쉽고 안전하게 관리할 수 있습니다.
- 🎨 **Styling**:
  디자인 시스템으로 [`Shadcn UI`](https://ui.shadcn.com)와 [`Tailwind CSS v4`](https://tailwindcss.com)가 세팅되어 일관되고 확장성 있는 스타일링을 제공합니다.
- 🧪 **Testing**: 
  단위 테스트([`Vitest`](https://vitest.dev))와 E2E(엔드 투 엔드) 테스트([`Playwright`](https://playwright.dev)) 환경이 구축되어 있습니다.
- 🐳 **Deployment**: 
  즉시 실행 가능한 `Docker` 환경을 제공합니다.
- 📜 **Code Formatting/Linting**: 
  코드 포맷팅과 린팅을 위한 [`Prettier`](https://prettier.io)와 [`ESLint`](https://eslint.org)가 통합되어 있습니다.
- 🔄 **Data Fetching/State Management**: 
  - [`TanStack Query`](https://tanstack.com/query/latest): 서버/클라이언트 데이터 패칭과 캐싱을 위한 라이브러리
  - [`Zustand`](https://zustand-demo.pmnd.rs): 전역 클라이언트 상태 관리를 위한 라이브러리
  - [`Nuqs`](https://nuqs.47ng.com): 쿼리 파라미터 관리를 위한 라이브러리
- 🖍️ **Code Blocks**: 
  [`Shiki`](https://shiki.style)를 이용한 Code highlighting 과 [`Monaco Editor`](https://github.com/microsoft/monaco-editor)를 통한 **Real-time Code Editing** 기능을 제공합니다.
- 📝 **WYSIWYG Editor**: 
  [`Tiptap`](https://tiptap.dev)을 활용한 실시간 에디터를 제공합니다.
- 📦 **Others**:
  - 🛟 **Env**: [`t3-env`](https://env.t3.gg): 환경 변수 관리를 위한 라이브러리
  - 📄 **Logging**: [`pino`](https://getpino.io): 로깅을 위한 라이브러리
  - 📅 **Date & Time**: [`date-fns`](https://date-fns.org): 날짜 및 시간 처리를 위한 라이브러리
  - 📦 **Useful Hooks**: [`@mantine/hooks`](https://mantine.dev/hooks/package): 유용한 훅을 제공하는 라이브러리
  - 🔔 **Notification**: [`web-push`](https://github.com/web-push-libs/web-push): 웹 푸시 알림
  - 📝 **Drag & Drop**: [`Dnd Kit`](https://dndkit.com): 드래그&드롭을 위한 라이브러리
  - 📊 **Table UI**: [`TanStack Table`](https://tanstack.com/table/latest): 테이블 UI를 위한 라이브러리
  - 📦 **Large List/Virtualization**: [`TanStack Virtual`](https://tanstack.com/virtual/latest): 대용량 리스트/그리드 렌더링을 위한 라이브러리
  - 📝 **Data Schema Validation**: [`Zod`](https://zod.dev): 데이터 스키마 검증을 위한 라이브러리
  - 🪄 **Dummy Data Generation**: [`faker.js`](https://fakerjs.dev): 더미 데이터 생성을 위한 라이브러리
  - 📝 **Route Exploration & AST Structure Analysis**: [`ts-morph`](https://ts-morph.com): 라우트 탐색과 AST 구조 분석을 위한 라이브러리
  - 🌳 **Tree Structure Component**: [`headless-tree`](https://github.com/henry-hong/headless-tree): 트리 구조 컴포넌트 구현을 위한 라이브러리

<br />

## 🚀 Getting Started

Run Development Server

```bash
git clone https://github.com/hyi86/monorepo-starter.git
cd monorepo-starter
make init
pnpm dev
```

Commit Message Formatting Rules

```bash
git add .
pnpm commit
```

<br />

## 🚀 Run Docker in Local Environment

다음의 애플리케이션들은 로컬 환경에서 Docker 컨테이너로 실행되도록 설정되어 있습니다.

- [`hono-api`](./apps/hono-api/Dockerfile)
- [`next-full-stack`](./apps/next-full-stack/Dockerfile)
- [`single-page-react`](./apps/single-page-react/Dockerfile)

로컬에서 Docker Compose 실행

```bash
# 만약 MAC OS 환경에서 `colima`를 사용한다면, `colima start --memory 4`로 시작(기본 메모리=2G)
colima start --memory 4

docker network ls | grep base_network # Check network
docker network create base_network # Create network if not exists

COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build # Build all
COMPOSE_BAKE=true docker-compose build # Build all with bake (colima)
docker-compose up -d # Run
docker-compose down # Stop

# 또는 개별적으로 실행시,
docker-compose build ${APP_NAME}
docker-compose up -d ${APP_NAME}

# 컨테이너 내부 접근
docker-compose exec ${APP_NAME} /bin/sh
# 중단된 컨테이너 접근
docker run -it --rm ${APP_NAME} /bin/sh

# 컨테이너 로그
docker-compose logs -f
```

<br />

## 🌍 Goals

- 다양한 스택 조합을 테스트
- 실제 프로젝트에 적용 가능한 모듈형 패턴 구축
- 빠른 프로토타이핑과 검증을 위한 베이스 제공
- 오픈소스 또는 사이드 프로젝트의 시작점 역할
- 최신 웹 개발 트렌드와 기술 스택을 실험 및 검증
- 확장성과 유지보수가 쉬운 아키텍처 설계
