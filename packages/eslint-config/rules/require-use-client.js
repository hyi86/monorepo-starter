/**
 * ESLint custom rule: require-use-client
 *
 * Next.js App Router에서 클라이언트 컴포넌트가 필요한 hooks 사용 시 'use client' 지시어를 요구하는 규칙
 *
 * 이 규칙은 다음과 같은 상황에서 에러를 발생시킵니다:
 * - React hooks (useState, useEffect 등)를 사용하는 파일에서
 * - 파일 상단에 'use client' 지시어가 없는 경우
 *
 * Next.js 13+ App Router에서는 서버 컴포넌트가 기본이므로,
 * 클라이언트 사이드 기능(hooks, 이벤트 핸들러 등)을 사용할 때는
 * 명시적으로 'use client' 지시어를 추가해야 합니다.
 *
 * Usage (flat config example):
 * import requireUseClient from './rules/require-use-client.js';
 *
 * {
 *   plugins: {
 *     local: { rules: { 'require-use-client': requireUseClient } }
 *   },
 *   rules: { 'local/require-use-client': 'error' }
 * }
 *
 * @example
 * // ❌ 에러 발생 - 'use client' 없이 hooks 사용
 * import { useState } from 'react';
 * export function MyComponent() {
 *   const [count, setCount] = useState(0);
 *   return <div>{count}</div>;
 * }
 *
 * @example
 * // ✅ 올바른 사용 - 'use client' 지시어 추가
 * 'use client';
 * import { useState } from 'react';
 * export function MyComponent() {
 *   const [count, setCount] = useState(0);
 *   return <div>{count}</div>;
 * }
 */

const rule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require "use client" directive when using client-side React hooks',
      category: 'Best Practices',
      recommended: true,
    },
    // 규칙 옵션 스키마 정의
    schema: [
      {
        type: 'object',
        properties: {
          // 체크할 React hooks 목록을 커스터마이징할 수 있음
          hooks: {
            type: 'array',
            items: { type: 'string' },
            default: [
              'useState',
              'useEffect',
              'useContext',
              'useReducer',
              'useCallback',
              'useMemo',
              'useRef',
              'useImperativeHandle',
              'useLayoutEffect',
              'useDebugValue',
            ],
          },
        },
        additionalProperties: false,
      },
    ],
    // 에러 메시지 정의
    messages: {
      missingUseClient: '파일 상단에 "use client" 지시어가 필요합니다. {{hook}}을 사용하고 있기 때문입니다.',
      missingUseClientMultiple: '파일 상단에 "use client" 지시어가 필요합니다. {{hooks}}를 사용하고 있기 때문입니다.',
    },
  },
  // 규칙의 실제 로직을 구현하는 함수
  create(context) {
    // 규칙 옵션에서 체크할 hooks 목록 가져오기
    const options = context.options[0] || {};
    const targetHooks = options.hooks || [
      'useState',
      'useEffect',
      'useContext',
      'useReducer',
      'useCallback',
      'useMemo',
      'useRef',
      'useImperativeHandle',
      'useLayoutEffect',
      'useDebugValue',
    ];

    // 파일 상태 추적을 위한 변수들
    let hasUseClient = false; // 'use client' 지시어 존재 여부
    let usedHooks = new Set(); // 사용된 hooks 목록

    return {
      // 파일이 파싱될 때 실행되는 핸들러
      Program(node) {
        // 파일 상단에서 'use client' 지시어 확인
        const sourceCode = context.getSourceCode();
        const text = sourceCode.text;

        // 'use client' 지시어가 파일 상단에 있는지 정규식으로 확인
        // 'use client' 또는 "use client"
        hasUseClient = /^\s*['"]use client['"]/.test(text);
      },

      // 함수 호출을 감지하는 핸들러
      CallExpression(node) {
        // 함수 호출이 React hooks인지 확인
        // node.callee.type === 'Identifier': 직접적인 함수 호출 (useState() 같은)
        // targetHooks.includes(node.callee.name): 우리가 체크하는 hooks 목록에 포함되는지 확인
        if (node.callee.type === 'Identifier' && targetHooks.includes(node.callee.name)) {
          usedHooks.add(node.callee.name);
        }
      },

      // 파일 파싱이 완료될 때 실행되는 핸들러
      'Program:exit'(node) {
        // hooks를 사용했지만 'use client'가 없는 경우 에러 발생
        if (usedHooks.size > 0 && !hasUseClient) {
          const hookArray = Array.from(usedHooks);
          const hookNames = hookArray.join(', ');

          // 에러 보고
          context.report({
            node,
            // 단일 hook과 다중 hook에 따라 다른 메시지 사용
            messageId: hookArray.length === 1 ? 'missingUseClient' : 'missingUseClientMultiple',
            data: {
              hook: hookArray[0], // 첫 번째 hook 이름
              hooks: hookNames, // 모든 hook 이름들
            },
          });
        }
      },
    };
  },
};

export default rule;
