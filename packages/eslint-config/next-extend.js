import js from '@eslint/js';
import pluginNext from '@next/eslint-plugin-next';
import eslintConfigPrettier from 'eslint-config-prettier';
import boundaries from 'eslint-plugin-boundaries';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import turboPlugin from 'eslint-plugin-turbo';
import globals from 'globals';
import tseslint from 'typescript-eslint';
// import onlyWarn from 'eslint-plugin-only-warn';

/**
 * A custom extended ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,

  // TypeScript specific rules
  ...tseslint.configs.recommended,
  {
    rules: {
      // any 타입 사용 허용
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Turbo specific rules
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },

  // Only warn plugin
  // {
  //   plugins: {
  //     onlyWarn,
  //   },
  // },

  // React specific rules
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/jsx-uses-react': 'off',
    },
  },

  // Next.js specific rules
  {
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },

  // React Hooks specific rules
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
    },
  },

  // React boundaries specific rules
  {
    plugins: {
      boundaries,
    },
    settings: {
      'boundaries/elements': [
        // next.js app layer
        { type: 'app', pattern: 'src/app/**' },
      ],
    },
    rules: {
      ...boundaries.configs.recommended.rules,
      'boundaries/external': [
        'error',
        {
          default: 'allow',
          rules: [],
        },
      ],
    },
  },

  // Ignore specific files
  {
    ignores: ['dist/**', 'bin/**', '.next/**', 'next-env.d.ts'],
  },
];
