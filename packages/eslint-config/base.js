import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import { plugin as exceptionHandling } from 'eslint-plugin-exception-handling';
import onlyWarn from 'eslint-plugin-only-warn';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
      ex: exceptionHandling,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
      'no-undef': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      quotes: ['error', 'single', { allowTemplateLiterals: false }],
      'ex/no-unhandled': 'error',
      'ex/use-error-cause': 'error',
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ['dist/**', 'bin/**'],
  },
];
