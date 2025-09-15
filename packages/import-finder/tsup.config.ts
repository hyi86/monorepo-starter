// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/*.ts', '!src/*.test.ts'],
  outDir: 'bin',
  format: ['esm'],
  external: [
    '@clack/prompts',
    'console-table-printer',
    'fast-glob',
    'nanoid',
    'prettier',
    'ts-morph',
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
