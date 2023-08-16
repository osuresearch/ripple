import type { StorybookConfig } from '@storybook/react-webpack5';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config: StorybookConfig = {
  stories: ['../@(src|docs)/**/*.mdx', '../@(src|docs)/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-dark-mode'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      strictMode: true
    }
  },
  docs: {
    autodocs: true
  }
};

export default config;
