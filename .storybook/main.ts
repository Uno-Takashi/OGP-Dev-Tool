import { createRequire } from 'module';
import type { StorybookConfig } from '@storybook/react-webpack5';
import type { RuleSetRule } from 'webpack';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-webpack5',
  webpackFinal: async (config) => {
    config.module = config.module ?? { rules: [] };
    config.module.rules = (config.module.rules ?? []).filter(
      (rule) => !(rule as RuleSetRule).test?.toString().includes('css')
    );
    config.module.rules.push(
      { test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] }
    );

    config.resolve = config.resolve ?? {};
    config.resolve.alias = { ...(config.resolve.alias ?? {}), querystring: require.resolve('querystring-es3') };
    config.resolve.fallback = {
      ...(config.resolve.fallback ?? {}),
      process: require.resolve('process/browser.js'),
      buffer: require.resolve('buffer/'),
    };

    return config;
  },
};

export default config;
