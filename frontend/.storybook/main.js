const { resolve } = require("path")
const StylelintPlugin = require('stylelint-webpack-plugin');


module.exports= {
  stories: [
    '../src/components/**/*.(story|stories).(tsx|mdx)'
  ],
  addons: [
    '@storybook/preset-typescript',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-knobs'
  ],
  webpackFinal: async (config) => {
    config.plugins.push(new StylelintPlugin({ files: '**/*.tsx' }))
    config.module.rules.push(
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        enforce: "pre",
        use: [
          { loader: "eslint-loader" },
        ],
        exclude: /node_modules/,
      },
      /* {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('react-docgen-typescript-loader'),
            options: {
              tsconfigPath: resolve(__dirname, '../tsconfig.json'),

            }
          },
        ],
      } */
    );
    // config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.alias["@"] = resolve(__dirname, "..", "src");
    return config;
  },
};
