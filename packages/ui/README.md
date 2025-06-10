## Usage

각 프로젝트에서 사용하는 방법

<br />

### Add to a Next.js Project

> Tailwind CSS는 미리 설정되어 있어야 합니다.

워크스페이스 내에서 패키지를 설치

```bash
pnpm add --workspace @monorepo-starter/ui
```

Update `tsconfig.json`.

```diff
{
  "compilerOptions": {
    ...
    "paths": {
-     "~/*": ["./src/*"]
+     "~/*": ["./src/*"],
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
  /* config options here */
+ transpilePackages: ['@monorepo-starter/ui'],
};

export default nextConfig;
```

Update `src/app/globals.css`

```css
@import '@monorepo-starter/ui/globals.css';
/* ... */
```

<br />

### Add to a React Router Project

> Tailwind CSS는 미리 설정되어 있어야 합니다.

워크스페이스 내에서 패키지를 설치

```bash
pnpm add --workspace @monorepo-starter/ui
```

Update `tsconfig.json` or `tsconfig.app.json`

```diff
{
  "compilerOptions": {
    ...
    "paths": {
-     "~/*": ["./src/*"]
+     "~/*": ["./src/*"],
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
<br />

## Update

`shadcn/ui` 컴포넌트를 최신 버전으로 업데이트

```bash
cd packages/ui

# 최신 버전 설치
pnpm dlx shadcn@canary add -a -o -y

# calendar 컴포넌트는 별도로 처리함
git restore src/components/calendar.tsx

# cmdk와 react-day-picker를 최신 버전으로 업데이트
pnpm rm react-day-picker
pnpm add react-day-picker

# 포맷팅
pnpm -w run format "packages/ui/src/**/*.*"
```

## Re-initialize

`package.json`을 재초기화하려면:

```bash
cat <<'EOF' > package.json
{
  "name": "@monorepo-starter/ui",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "exports": {
    "./globals.css": "./src/styles/globals.css",
    "./postcss.config": "./postcss.config.mjs",
    "./components/*": "./src/components/*.tsx",
    "./composites/*": "./src/composites/*.tsx",
    "./hooks/*": "./src/hooks/*.ts",
    "./lib/*": "./src/lib/*.ts"
  },
  "scripts": {
    "check-types": "tsc --noEmit",
    "lint": "eslint . --max-warnings 0"
  },
  "dependencies": {},
  "devDependencies": {}
}
EOF
```

### Basic Setup

의존성 설치:

```bash
pnpm install

# 워크스페이스 의존성
pnpm add --workspace -D @monorepo-starter/eslint-config @monorepo-starter/typescript-config
# 기본 의존성
pnpm add react react-dom
# 기본 개발 의존성
pnpm add -D @types/node @types/react @types/react-dom
```

`eslint.config.mjs`, `tsconfig.json`, `tsconfig.lint.json` 파일을 생성하세요:

```bash
cat <<'EOF' > eslint.config.mjs
import { config } from '@monorepo-starter/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config} */
export default config;
EOF

cat <<'EOF' > tsconfig.json
{
  "extends": "@monorepo-starter/typescript-config/react-library.json",
  "compilerOptions": {
    "outDir": "dist",
    "baseUrl": ".",
    "rootDir": "src",
    "paths": {
      "@monorepo-starter/ui/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
EOF

cat <<'EOF' > tsconfig.lint.json
{
  "extends": "@monorepo-starter/typescript-config/react-library.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src", "turbo"],
  "exclude": ["node_modules", "dist"]
}
EOF
```

### Tailwind CSS

> 참고: https://tailwindcss.com/docs/installation/using-postcss

```bash
pnpm add -D tailwindcss @tailwindcss/postcss postcss
```

`postcss.config.mjs` 파일을 생성하세요:

```bash
cat <<'EOF' > postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
EOF
```

`src/styles/globals.css` 파일을 생성하세요:

```bash
mkdir -p src/styles && cat <<'EOF' > src/styles/globals.css
@import 'tailwindcss';
EOF
```

### Shadcn UI

> 참고: https://ui.shadcn.com/docs/installation/manual

```bash
pnpm add class-variance-authority clsx lucide-react
pnpm add -D tailwind-merge tw-animate-css
```

참고 문서의 `src/styles/*.css` 파일 내용을 추가하세요:

```bash
curl -o src/styles/globals.css https://raw.githubusercontent.com/shadcn-ui/ui/refs/heads/main/apps/v4/app/globals.css
curl -o src/styles/themes.css https://raw.githubusercontent.com/shadcn-ui/ui/refs/heads/main/apps/v4/app/themes.css
```

`src/styles/globals.css`에 다음을 추가하세요:

```diff
...
-@import './themes.css';
+@source "../../../apps/**/*.{ts,tsx}";
+@source "../../../components/**/*.{ts,tsx}";
+@source "../**/*.{ts,tsx}";
```

`src/lib/utils.ts` 파일을 추가하세요:

```bash
mkdir -p src/lib && cat <<'EOF' > src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
EOF
```

`components.json` 파일을 추가하세요:

```bash
cat <<'EOF' > components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@monorepo-starter/ui/components",
    "utils": "@monorepo-starter/ui/lib/utils",
    "ui": "@monorepo-starter/ui/components",
    "lib": "@monorepo-starter/ui/lib",
    "hooks": "@monorepo-starter/ui/hooks"
  },
  "iconLibrary": "lucide"
}
EOF
```

다음 명령어를 실행하세요:

```bash
# 모든 컴포넌트 추가
pnpm dlx shadcn@canary add -a -o -y

# 개선된 calendar 추가
curl -o src/components/calendar.tsx https://raw.githubusercontent.com/origin-space/originui/refs/heads/main/registry/default/ui/calendar.tsx
curl -o src/components/select-native.tsx https://raw.githubusercontent.com/origin-space/originui/refs/heads/main/registry/default/ui/select-native.tsx
https://raw.githubusercontent.com/origin-space/originui/refs/heads/main/registry/default/ui/multiselect.tsx

# react-day-picker 재설치
pnpm rm react-day-picker
pnpm add react-day-picker
```
