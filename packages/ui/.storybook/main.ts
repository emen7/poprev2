import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  viteFinal: async config => {
    // Add custom Vite configuration
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@ub-ecosystem/state-management': resolve(
          __dirname,
          '../../../packages/state-management/src'
        ),
      };
    }
    return config;
  },
};

export default config;
