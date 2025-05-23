// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm'],
  external: [
    '@clack/prompts',
    'zx',
    'yaml',
    'unified',
    'unist-util-visit',
    'remark-frontmatter',
    'remark-parse',
    'remark-stringify',
    'fast-glob',
  ],
  splitting: true,
  clean: true,
  treeshake: true,
  dts: {
    compilerOptions: {
      rootDir: 'src',
    },
  },
});
