import boundaries from 'eslint-plugin-boundaries';
import { config as nextJsConfig } from './next.js';

/**
 * FSD(Feature-Sliced Design) 아키텍처를 위한 Next.js ESLint 설정
 *
 * 이 설정은 Feature-Sliced Design 아키텍처 패턴을 강제하여
 * 코드의 의존성 방향을 제어하고 아키텍처 위반을 방지합니다.
 *
 * @see {@link https://feature-sliced.design/kr/docs/get-started/overview}
 * @see {@link https://github.com/javierbrea/eslint-plugin-boundaries}
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  ...nextJsConfig,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react-hooks/incompatible-library': 'off',
      'react-hooks/refs': 'off',
    },
  },
  {
    /**
     * 현재 프로젝트 기준으로
     * `src` 폴더 내의 모든 TypeScript/JavaScript 파일에 적용
     */
    files: ['src/**/*.{ts,tsx,js,jsx,mjs,mts}'],

    /**
     * eslint-plugin-boundaries 플러그인 사용
     * 이 플러그인은 FSD 아키텍처의 의존성 규칙을 강제합니다
     */
    plugins: {
      boundaries,
    },

    /**
     * FSD 계층별 디렉토리 패턴 정의 (변수 설정이라고 생각하면 됩니다)
     */
    settings: {
      'boundaries/elements': [
        // next.js page files
        {
          type: 'next-page',
          pattern: 'src/app/**/page.tsx',
          mode: 'file',
        },
        // layers
        { type: 'shared', pattern: 'src/shared/**' },
        { type: 'entities', pattern: 'src/entities/**' },
        { type: 'features', pattern: 'src/features/**' },
        { type: 'widgets', pattern: 'src/widgets/**' },
        { type: 'app', pattern: 'src/app/**' },
        // external
        { type: 'external', pattern: 'node_modules/**' }, // 외부 패키지
      ],
    },

    /**
     * FSD 계층 간 import 규칙 정의
     */
    rules: {
      /**
       * FSD 계층 간 import 규칙 정의
       */
      'boundaries/element-types': [
        'error',
        {
          /**
           * 기본적으로 모든 import 금지하고, 아래에서 허용된 것만 import 가능하도록 설정
           * 기준은 src 폴더 기준이고, 외부 패키지 정의는 아래에서 합니다.
           */
          default: 'disallow',
          rules: [
            /**
             * `shared`는 아무것도 import 할 수 없음(최하위 계층)
             * 공통 유틸은 순수해야 하며 다른 계층에 의존하지 않아야 함
             */
            { from: 'shared', allow: [] },

            /**
             * `entities`에서는 `shared`만 import 가능
             * 도메인 모델은 공통 유틸만 사용, 다른 도메인과 격리되어야 함
             */
            { from: 'entities', allow: ['shared'] },

            /**
             * `features`에서는 `shared`와 `entities`만 import 가능
             */
            { from: 'features', allow: ['shared', 'entities'] },

            /**
             * `widgets`에서는 `features`, `entities`, `shared` import 가능
             */
            { from: 'widgets', allow: ['shared', 'entities', 'features'] },

            /**
             * `app`은 모든 하위 계층 import 가능
             */
            { from: 'app', allow: ['shared', 'entities', 'features', 'widgets'] },

            /**
             * `app/../page.tsx`는 모든 하위 계층 import 가능
             */
            { from: 'next-page', allow: ['shared', 'entities', 'features', 'widgets', 'app'] },
          ],
        },
      ],

      /**
       * FSD 계층에서 외부 패키지 import 규칙 정의
       * 기본적으로 외부 패키지 허용
       * 필요시 특정 계층에서 외부 패키지 제한 가능
       * @example
       * in rules:
       * // app 폴더의 page.tsx 파일에서 next import 금지
       * { from: ['next-page'], disallow: ['next'] },
       */
      'boundaries/external': [
        'error',
        {
          default: 'allow',
          rules: [
            {
              from: ['next-page'],
              allow: ['*.json'],
            },
          ],
        },
      ],
    },
  },
];
