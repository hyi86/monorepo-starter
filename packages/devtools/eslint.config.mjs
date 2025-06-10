import { config } from '@monorepo-starter/eslint-config/base';

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      quotes: 'off',
    },
  },
];
