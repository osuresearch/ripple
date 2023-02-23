// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-dark-mode",
  ],
  framework: "@storybook/react",
  core: {
    builder: 'webpack5',
  },
  // webpackFinal: async (config, { configType }) => {
  //   config.resolve.plugins = [new TsconfigPathsPlugin()];
  //   return config;
  // }
  // webpackFinal: async (config) => {
  //   // Resolve .mjs files (currently being used by @osuresearch/ui)
  //   // See: https://github.com/storybookjs/storybook/issues/16690
  //   config.module.rules.push({
  //     test: /\.mjs$/,
  //     include: /node_modules/,
  //     type: "javascript/auto",
  //   })
  //   return config
  // }
}
