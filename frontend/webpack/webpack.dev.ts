/* eslint-disable import/no-extraneous-dependencies */

import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { resolve } from "path";
import StyleLintWebpackPlugin from "stylelint-webpack-plugin";
import { Configuration, HotModuleReplacementPlugin } from "webpack";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";
import styleLoaders from "./loaders";
// backend port is internal, not available in docker-compose.yml
const HOST_BACKEND = process.env.HOST_BACKEND || "localhost";

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
      configFile : "./.stylelintrc",
      files      : ["src/**/*.scss", "src/**/*.vue"],
    }) as any,
  ],
  devServer: {
    port               : 8090,
    host               : "0.0.0.0",
    clientLogLevel     : "warning",
    // https              : true,
    disableHostCheck   : true,
    hot                : true,
    historyApiFallback : true,
    quiet              : true,
    watchContentBase   : true,
    watchOptions       : { ignored: ["*.{test,spec}.{js,ts}", "node_modules"] },
    proxy              : [
      {
        context : ["/api", "/graphql"],
        target  : `http://${HOST_BACKEND}:3000`,
      },
    ],
    contentBase: [
      resolve(__dirname, "..", "dist"),
      resolve(__dirname, "..", "public"),
    ],
  },
};

export default devConfig;
