# `@monorepo-starter/import-finder`

모노레포에서 파일의 import 의존성을 시각적으로 분석하는 CLI 도구입니다.

## Features

- TypeScript 파일의 import 의존성을 재귀적으로 분석
- 트리 구조로 의존성 시각화
- TUI(터미널 UI) 및 CLI 모드 지원

## Usage

```bash
# TUI 모드 (대화형)
pnpm -F @monorepo-starter/import-finder run start

# CLI 모드
pnpm -F @monorepo-starter/import-finder run start apps/next-full-stack
pnpm -F @monorepo-starter/import-finder run start apps/next-full-stack src/app/page.tsx
```

## Development

```bash
# 빌드
pnpm build

# 테스트
pnpm test

# 린트
pnpm lint
```
