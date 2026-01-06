import { config } from '@monorepo-starter/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    rules: {
      'react/prop-types': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
    },
  },
];
