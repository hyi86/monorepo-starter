// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm'],
  external: ['ts-morph', 'fast-glob', 'yaml', 'prettier'],
  splitting: true,
  clean: true,
  treeshake: true,
  // dts: {
  //   compilerOptions: {
  //     rootDir: 'src',
  //   },
  // },
});
