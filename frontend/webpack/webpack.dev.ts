/* eslint-disable import/no-extraneous-dependencies */

import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { resolve } from "path";
import StyleLintWebpackPlugin from "stylelint-webpack-plugin";
import { Configuration, HotModuleReplacementPlugin } from "webpack";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";
import styleLoaders from "./loaders";

interface IwebpackConfig extends Configuration {
  devServer: DevServerConfiguration;
}

const devConfig: IwebpackConfig = {
  output: {
    filename      : "[name].bundle.js",
    chunkFilename : "[name].bundle.js",
    path          : resolve(__dirname, "dist"),
    publicPath    : "/",
  },
  mode   : "development",
  module : {
    rules: [
      {
        test : /\.(sa|sc|c)ss$/,
        use  : styleLoaders({ mode: "development" }),
      },

      {
        enforce : "pre",
        test    : /\.(js|ts|vue)$/,
        include : resolve("src"),
        exclude : /node_modules/,
        loader  : "eslint-loader",
        options : { configFile: ".eslintrc", quiet: true, fix: true },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      vue         : true,
      reportFiles : ["src/**/*.{ts,tsx,vue}"],
    }),
    new HotModuleReplacementPlugin(),
    new StyleLintWebpackPlugin({
      configFile : "./.vuestylelintrc",
      files      : ["src/**/*.vue"],
    }),
    new StyleLintWebpackPlugin({
      configFile : "./.stylelintrc",
      files      : ["src/**/*.scss"],
    }) as any,
  ],
  devServer: {
    // needed for react change observation
    watchContentBase : true,
    clientLogLevel   : "warning",
    contentBase      : [
      resolve(__dirname, "..", "dist"),
      resolve(__dirname, "..", "public"),
    ],
    historyApiFallback : true,
    hot                : true,
    port               : 80,
    proxy              : [
      {
        context : ["/api", "/graphql"],
        target  : "http://localhost:3000",
      },
    ],
    quiet        : true,
    watchOptions : { ignored: ["*.{test,spec}.{js,ts}", "node_modules"] },
  },
};

export default devConfig;
