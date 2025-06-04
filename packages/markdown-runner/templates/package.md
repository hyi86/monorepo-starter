---
packageName: ""
packagePrefix: "@monorepo-starter"
---

### Create a new package

```bash
mkdir -p packages/$packageName
cd packages/$packageName
```

### Create a new `package.json`

```json filename="package.json"
{
  "name": "$packagePrefix/$packageName",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./dist/index.js"
  },
  "scripts": {
    "build": "tsup",
    "dev": "tsx src/index.ts",
    "lint": "eslint . --max-warnings 0",
    "check-types": "tsc --noEmit",
    "test": "vitest"
  }
}
```


### Install dependencies

```bash
pnpm add -D --workspace $packagePrefix/eslint-config $packagePrefix/typescript-config $packagePrefix/utils
pnpm add -D @types/node eslint tsup tsx typescript vite-tsconfig-paths vitest
```

### Create config files

`eslint.config.mjs`
```js filename="eslint.config.mjs"
import { config } from '$packagePrefix/eslint-config/base';

/** @type {import("eslint").Linter.Config} */
export default config;
```

`tsconfig.json`
```json filename="tsconfig.json"
{
  "extends": "$packagePrefix/typescript-config/base.json",
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    "outDir": "dist",
    "paths": {
      "~/*": ["./src/*"],
    }
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

`tsup.config.ts`
```js filename="tsup.config.ts"
// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm'],
  external: [],
  splitting: true,
  clean: true,
  treeshake: true,
  dts: {
    compilerOptions: {
      rootDir: 'src',
    },
  },
});
```

`vitest.config.mts`
```js filename="vitest.config.mts"
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'node',
    include: ['**/*.test.{ts,tsx}'],
  },
});
```

### Create root files

`src/index.ts`
```ts filename="src/index.ts"
export function main() {
  console.log('info', 'Hello, world!');
}

export async function mainAsync() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('info', 'Hello, world!');
}

main();
await mainAsync();
```

`src/index.test.ts`
```ts filename="src/index.test.ts"
import { expect, test } from 'vitest';

test('main function should be defined', async () => {
  const result = await import('./index');
  expect(result.main).not.toThrow();
});

test('mainAsync function should be defined', async () => {
  const result = await import('./index');
  expect(result.mainAsync).not.toThrow();
});
```