/* eslint-disable import/no-extraneous-dependencies */

import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import { resolve } from "path";
import StyleLintPlugin from "stylelint-webpack-plugin";
import { Configuration } from "webpack";
import WebpackNotifierPlugin from "webpack-notifier";

const config = async ({ config }: { config: Configuration }) => {
  config.resolve = {
    ...config.resolve,
    alias: {
      "@": resolve("src"),
      src: resolve("src"),
      vue$: "vue/dist/vue.esm.js",
    },
  };

  if (config.module && config.resolve.extensions && config.plugins) {
    config.module.rules.push(
      {
        test: /\.vue$/,
        loader: 'storybook-addon-vue-info/loader',
        enforce: 'post'
      },
      {
        test: /\.stories\.(js|ts)$/,
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        enforce: 'pre'
      },
      {
        test: /\.ts$/,
        include: resolve(__dirname, "../src"),
        loader: "babel-loader",
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sourceMapContents: false,
            },
          },
        ],
        /* exclude: /node_modules/ */
      },
      {
        enforce: "pre",
        test: /\.(js|ts)$/,
        include: resolve("app"),
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
    );
    config.resolve.extensions.push(".ts", ".tsx");
    (config.plugins as any).push(
      new FriendlyErrorsWebpackPlugin(),
        new WebpackNotifierPlugin(),
        new ForkTsCheckerWebpackPlugin({
          vue: true,
          tslint: true,
          reportFiles: ["src/**/*.{ts,tsx,vue}"],
        }),
        new StyleLintPlugin({
          configFile: "./.stylelintrc",
          files: ["src/**/*.vue", "src/**/*.sass", "src/**/*.scss"],
        }),
    );
  }

  return config;
};

module.exports = config;
