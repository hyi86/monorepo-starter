import type { StorybookConfig } from '@storybook/react-vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'path';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  stories: [
    '../stories/**/*.mdx', // mdx 파일 포함
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)', // 모든 스토리 파일 포함
  ],
  addons: [
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-themes'),
    {
      name: getAbsolutePath('@storybook/addon-docs'),
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  features: {
    backgrounds: false,
  },
  staticDirs: ['../public'],
  async viteFinal(config) {
    return {
      ...config,
      resolve: {
        alias: [
          {
            find: 'ui',
            replacement: resolve(process.cwd(), '../../../packages/ui/'),
          },
        ],
      },
    };
  },
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
