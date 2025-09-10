#!/bin/bash

# ------------------------------------------------------------
# create cli
# ------------------------------------------------------------
# .
# ├── .gitignore
# ├── README.md
# ├── eslint.config.mjs
# ├── package.json
# ├── src
# │   ├── index.test.ts
# │   └── index.ts
# ├── tsconfig.json
# ├── tsup.config.ts
# └── vitest.config.mts

mkdir -p packages/$INPUT
cd packages/$INPUT
pnpm init

# create .gitignore
cat <<'EOF' > .gitignore
scripts/
bin/
EOF

# create README.md
cat <<EOF > README.md
# \`@monorepo-starter/$INPUT\`

local CLI for monorepo.

# Getting Started

```bash
pnpm dev
```

```bash
pnpm build
./bin/index.js
```
EOF

# create eslint.config.mjs
cat <<EOF > eslint.config.mjs
import { config } from '@monorepo-starter/eslint-config/base';

/** @type {import("eslint").Linter.Config} */
export default config;
EOF

# create package.json
cat <<EOF > package.json
{
  "name": "@monorepo-starter/cli",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "bin": {
    "cli": "./bin/index.js"
  },
  "scripts": {
    "check-types": "tsc --noEmit",
    "lint": "eslint . --max-warnings 0",
    "test": "vitest run --reporter=verbose",
    "dev": "tsx src/index.ts",
    "build": "tsup",
    "postbuild": "chmod +x bin/*"
  },
  "devDependencies": {
    "@henry-hong/common-utils": "^0.1.9",
    "@monorepo-starter/eslint-config": "workspace:*",
    "@monorepo-starter/typescript-config": "workspace:*",
    "@types/node": "catalog:",
    "eslint": "catalog:",
    "tsup": "^8.5.0",
    "tsx": "^4.20.3",
    "typescript": "catalog:",
    "vite-tsconfig-paths": "^5.1.4",
    "vitest": "^3.2.3"
  }
}
EOF

# create tsconfig.json
cat <<EOF > tsconfig.json
{
  "extends": "@monorepo-starter/typescript-config/base.json",
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "outDir": "dist",
    "paths": {
      "~/*": ["./src/*"],
    }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules", "dist"]
}
EOF

# create tsup.config.ts
cat <<EOF > tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/*.ts', '!src/*.test.ts'],
  outDir: 'bin',
  format: ['esm'],
  external: [
    'ts-morph',
    '@clack/prompts',
    'console-table-printer',
    'fast-glob',
    'prettier',
    'tar-stream',
    'fast-glob',
    'yaml',
  ],
  splitting: false,
  clean: true,
  treeshake: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
  // outExtension: (ext) => ({ js: '.mjs' }),
  // dts: {
  //   compilerOptions: {
  //     rootDir: 'src',
  //   },
  // },
});
EOF

# create vitest.config.mts
cat <<EOF > vitest.config.mts
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'node',
    include: ['**/*.test.{ts,tsx}'],
  },
});
EOF

# create src/index.ts
mkdir -p src
cat <<'EOF' > src/index.ts
/**
 * CLI
 *
 * @example
 * ./bin/index.js
 */
import path from 'node:path';

// 현재 파일의 실행 경로를 프로젝트 루트로 변경
process.chdir(path.join(import.meta.dirname, '../../..'));

// Run
await main();

async function main() {
  console.log('Hello, World!');
}
EOF

# create src/index.test.ts
cat <<'EOF' > src/index.test.ts
import { test } from 'vitest';

test('Test', async () => {
  console.log('test');
});
EOF