import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'bin',
  format: ['esm'],
  external: [
    '@clack/prompts',
    'commander',
    'fast-glob',
    'remark-frontmatter',
    'remark-parse',
    'remark-stringify',
    'unified',
    'unist-util-visit',
    'yaml',
    'zod',
  ],
  splitting: true,
  clean: true,
  treeshake: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
  // dts: {
  //   compilerOptions: {
  //     rootDir: 'src',
  //   },
  // },
});
