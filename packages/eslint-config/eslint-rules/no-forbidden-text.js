/**
 * ESLint custom rule: no-forbidden-text
 * Usage (flat config example):
 * import noForbiddenText from './eslint-rules/no-forbidden-text.js';
 *
 * {
 *   plugins: {
 *     local: { rules: { 'no-forbidden-text': noForbiddenText } }
 *   },
 *   rules: { 'local/no-forbidden-text': ['error', { text: ['document', 'window'] }] }
 * }
 */

const rule = {
  meta: {
    type: 'problem',
    docs: { description: 'Disallow forbidden text in files' },
    schema: [
      {
        type: 'object',
        properties: {
          text: { type: 'array', items: { type: 'string' } },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      forbidden: 'Forbidden word "{{word}}" found in file.',
    },
  },
  create(context) {
    const forbidden = (context.options && context.options[0] && context.options[0].text) || [];
    return {
      Program(node) {
        const source = context.getSourceCode().text;
        const isClient = /^\s*['"]use client['"]/.test(source);
        if (isClient) return;
        for (const word of forbidden) {
          if (typeof word === 'string' && word.length > 0 && source.includes(word)) {
            context.report({ node, messageId: 'forbidden', data: { word } });
          }
        }
      },
    };
  },
};

export default rule;
