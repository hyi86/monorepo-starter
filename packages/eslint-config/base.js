import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { plugin as ex } from 'eslint-plugin-exception-handling';
import onlyWarn from 'eslint-plugin-only-warn';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 **/
export const config = [
  {
    ignores: ['dist/**', 'bin/**'],
  },
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    plugins: {
      ex,
    },
    rules: {
      'ex/no-unhandled': 'error',
      'ex/use-error-cause': 'error',
    },
  },
];
