import { config } from '@monorepo-starter/eslint-config/react-internal';
import storybook from 'eslint-plugin-storybook';

export default [
  ...config,
  ...storybook.configs['flat/recommended'],
  {
    ignores: ['!.storybook'],
  },
];
