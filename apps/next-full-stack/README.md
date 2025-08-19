## Getting Started

### Install Dependencies

```bash
pnpm i
```

### Create `.env` File

```bash
cp .env.example .env
```

After creating the file, refer to `.env.example` and fill in the required values.

### Set Up Local SQLite Database

```bash
pnpm db:generate # Generate SQL files in the `drizzle/` folder
pnpm db:migrate  # Run SQL files in the `drizzle/` folder
```

## Run Development Server

```bash
pnpm dev
```

## Build & Run Locally

```bash
pnpm build
pnpm start
```

## Folder Structure & Rules

### `src/app` Directory

`src/app` 디렉토리에 포함될 수 있는 파일 목록 

__`next.js` 기본 제공__
- `layout.tsx`: 레이아웃 컴포넌트
- `page.tsx`(`pager.mdx`): 기본 페이지 컴포넌트
- `loading.tsx`: 로딩 컴포넌트
- `not-found.tsx`: 404 페이지 컴포넌트
- `error.tsx`: 에러 페이지 컴포넌트
- `layout.tsx`: 레이아웃 컴포넌트
- `route.ts`: API 라우트 컴포넌트
- `template.tsx`: 템플릿 컴포넌트
- `default.tsx`: 병렬 라우트 default 컴포넌트

__커스텀 컴포넌트__
- `actions.ts`: 서버 액션 컴포넌트
- `schema.ts`: 스키마 컴포넌트 - 타입정의도 포함 (zod)
- `searchParams.tsx`: 타입 정의된 searchParams 컴포넌트(nuqs)
- `columns.tsx`: 테이블 컬럼 정의 컴포넌트(tanstack-table)
- `form.tsx`: 폼 컴포넌트(react-hook-form)

__Features__


사전 정의된 컴포넌트만 찾기
```bash
cd src/app
fd -t f -E '{layout,page,loading,not-found,error,layout,route,template,default}.{ts,tsx}' \
  -E '{actions,schema,columns,searchParams,form}.{ts,tsx}' -E 'page.mdx'
```