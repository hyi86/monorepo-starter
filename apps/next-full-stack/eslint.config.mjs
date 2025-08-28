import { nextJsConfig } from '@monorepo-starter/eslint-config/next';

/** @type {import("eslint").Linter.Config} */
export default [
  ...nextJsConfig,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
