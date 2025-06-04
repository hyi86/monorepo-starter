import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'bin',
  format: ['esm'],
  external: ['@clack/prompts', 'chokidar', 'commander', 'fast-glob', 'prettier', 'yaml', 'zod'],
  splitting: false,
  clean: true,
  treeshake: true,
  banner: {
    js: `#!/usr/bin/env node`,
  },
});
