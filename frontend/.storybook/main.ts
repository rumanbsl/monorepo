const { resolve } = require("path");
const StylelintPlugin = require('stylelint-webpack-plugin');


module.exports = {
  stories: ['../components/**/*.(story|stories).(tsx|mdx)'],
  addons: [
    '@storybook/preset-typescript',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-knobs'
  ],
  webpackFinal: async (config) => {
    config.plugins.push(new StylelintPlugin({files: '**/*.tsx'}))
    config.module.rules.push({
      test    : /\.(js|mjs|jsx|ts|tsx)$/,
      enforce : "pre",
      use     : [
        { loader: "eslint-loader" },
      ],
      exclude: /node_modules/,
    });
    config.resolve.alias["@"] = resolve(__dirname,"..","src");
    return config;
  },
};
