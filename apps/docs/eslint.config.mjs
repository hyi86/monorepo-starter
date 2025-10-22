import { config } from '@monorepo-starter/eslint-config/react-internal';
import storybook from 'eslint-plugin-storybook';

export default [
  ...config, // base config
  ...storybook.configs['flat/recommended'], // storybook config
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
];
