# `@monorepo-starter/ui`

전역적으로 사용가능한 `shadcn/ui` 기반의 컴포넌트 라이브러리.

## 🚀 Getting Started

### In `Next.js` Project

```bash
pnpm add --workspace @monorepo-starter/ui
```

Update `tsconfig.json`.

```diff
{
  "compilerOptions": {
    ...
    "paths": {
      "~/*": ["./src/*"],
+     "@monorepo-starter/ui/*": ["../../packages/ui/src/*"]
    }
  },
  ...
}
```

Update `next.config.ts`

```diff
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  ...
+ transpilePackages: ['@monorepo-starter/ui'],
};

export default nextConfig;
```

Update `src/app/globals.css`

```css
@import '@monorepo-starter/ui/globals.css';
```

### In `React Router` Project

```bash
pnpm add --workspace @monorepo-starter/ui
```

Update `tsconfig.json` or `tsconfig.app.json`

```diff
{
  "compilerOptions": {
    ...
    "paths": {
      "~/*": ["./src/*"],
+     "@monorepo-starter/ui/*": ["../../packages/ui/src/*"]
    }
  },
  ...
}
```

Update `src/index.css`

```css
@import '@monorepo-starter/ui/globals.css';
/* ... */
```

<br />

## 🔄 Update `shadcn/ui` Components

`shadcn/ui` 를 최신 버전으로 업데이트하는 방법

> 최근 업데이트 날짜: 2025-12-21

```bash
cd packages/ui
# Shadcn UI 최신 버전 설치(덮어쓰기)
pnpm dlx shadcn@latest add -a -o -y
# 직접 수정한 컴포넌트는 복구
git restore src/components/checkbox.tsx
# 코드 포맷팅
pnpm -w run format "packages/ui/src/**/*.*"
# registry directory 추가
pnpm dlx shadcn@latest add @shadcn-editor/editor
pnpm dlx shadcn@latest add @coss/number-field
pnpm dlx shadcn@latest add @kibo-ui/tags
pnpm dlx shadcn@latest add @kibo-ui/choicebox
```

의존성 설치

```bash
pnpm install

# 워크스페이스 의존성
pnpm add --workspace -D @monorepo-starter/eslint-config @monorepo-starter/typescript-config
# 기본 의존성
pnpm add react react-dom
# 기본 개발 의존성
pnpm add -D @types/node @types/react @types/react-dom
```
