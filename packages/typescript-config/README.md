# `@monorepo-starter/typescript-config`

각 워크스페이스에서 사용하는 typescript 설정을 모아둔 패키지 입니다.

## Getting Started

```bash
pnpm add -D @monorepo-starter/typescript-config
cd apps/$PROJECT_NAME
```

### base.json

`node.js` 를 기반으로 하는 모든 워크스페이스에서 사용하는 설정 파일 입니다.  
일반적으로 CLI 프로그램, 웹서버 등에 사용됩니다.

`tsconfig.json` 파일을 수정 합니다.

```json
{
  "extends": "@monorepo-starter/typescript-config/base.json",
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    "outDir": "dist",
    "paths": {
      "~/*": ["./src/*"]
    },
    "rootDir": "."
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

### react-library.json

react 라이브러리를 사용하는 워크스페이스에서 사용하는 설정 파일 입니다.

`tsconfig.json` 파일을 수정 합니다.

```json
{
  "extends": "@monorepo-starter/typescript-config/react-library.json",
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
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
```

### nextjs.json

`Next.js` 를 사용하는 워크스페이스에서 사용하는 설정 파일 입니다.

`tsconfig.json` 파일을 수정 합니다.

```json
{
  "extends": "@monorepo-starter/typescript-config/nextjs.json",
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "~/*": ["./src/*"],
      ".next/*": ["./.next/*"],
      "@monorepo-starter/ui/*": ["../../packages/ui/src/*"]
    }
  },
  "include": ["next-env.d.ts", ".next/types/**/*.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", ".next"]
}

```