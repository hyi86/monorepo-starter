import { nextJsConfig } from '@monorepo-starter/eslint-config/next';
import boundaries from 'eslint-plugin-boundaries';

/** @type {import("eslint").Linter.Config} */
export default [
  ...nextJsConfig,
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    plugins: {
      boundaries,
    },
    settings: {
      'boundaries/elements': [
        { type: 'shared', pattern: 'src/shared/**' },
        { type: 'entities', pattern: 'src/entities/**' },
        { type: 'features', pattern: 'src/features/**' },
        { type: 'widgets', pattern: 'src/widgets/**' },
        { type: 'app', pattern: 'src/app/**' },
        { type: 'external', pattern: 'node_modules/**' }, // 외부 패키지
      ],
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'features', allow: ['shared', 'entities'] },
            { from: 'widgets', allow: ['features', 'entities', 'shared'] },
            { from: 'app', allow: ['widgets', 'features', 'entities'] },
            { from: 'entities', allow: ['shared'] },
            { from: 'shared', allow: [] }, // shared는 아무것도 import 안함
          ],
        },
      ],
      'boundaries/external': [
        'error',
        {
          default: 'allow',
          rules: [
            // entities 계층에서는 모든 외부 패키지 금지
            // { from: 'entities', disallow: ['*'] },
            // app 계층에서는 필요한 최소만 허용 (예: next, react 등)
            // { from: 'app', allow: ['next', 'react', 'react-dom', 'next/navigation', 'next/link'], disallow: ['*'] },
          ],
        },
      ],
    },
  },
];
