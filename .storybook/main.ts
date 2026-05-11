import type { StorybookConfig } from '@storybook/react-vite';

const vmRuntimePackages = [
  '@go-go-golems/os-scripting',
  '@go-go-golems/os-ui-cards',
  '@go-go-golems/os-kanban',
];

const config: StorybookConfig = {
  stories: ['../examples/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    return {
      ...config,
      optimizeDeps: {
        ...config.optimizeDeps,
        exclude: [...(config.optimizeDeps?.exclude ?? []), ...vmRuntimePackages],
        include: [...(config.optimizeDeps?.include ?? []), 'debug'],
      },
    };
  },
};

export default config;
