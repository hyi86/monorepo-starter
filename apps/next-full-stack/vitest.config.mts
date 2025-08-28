import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    exclude: ['e2e/**', 'node_modules/**', '.next/**'],
    passWithNoTests: true,
    coverage: {
      provider: 'v8',
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/app-path-types.ts'],
      reporter: ['html'],
    },
    env: {
      DB_FILE_NAME: 'database/local.db',
      CACHE_PATH: '.cache',
    },
  },
});
