import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, join, resolve } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-themes'),
  ],
  features: {
    backgrounds: false,
  },
  async viteFinal(config) {
    // customize the Vite config here
    return {
      ...config,
      resolve: {
        alias: [
          {
            find: 'ui',
            replacement: resolve(__dirname, '../../../packages/ui/'),
          },
        ],
      },
    };
  },
};
export default config;
