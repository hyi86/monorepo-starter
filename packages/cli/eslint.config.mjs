import { config } from '@monorepo-starter/eslint-config/base';

/** @type {import("eslint").Linter.Config} */
export default {
  ...config,
  rules: {
    ...config.rules,
    'no-undef': 'off',
  },
};
