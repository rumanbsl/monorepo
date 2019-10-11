/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import HtmlWebPackPlugin from "html-webpack-plugin";
import { resolve } from "path";
import SimpleProgressWebpackPlugin from "simple-progress-webpack-plugin";
import { VueLoaderPlugin } from "vue-loader";
import { Configuration, DefinePlugin } from "webpack";

require("dotenv").config();

const tsLoader = process.env.NODE_ENV === "development" ? {
  loader  : "ts-loader",
  options : { appendTsSuffixTo: [/\.vue$/] },
} : {};

export default {
  entry        : [resolve(__dirname, "..", "src", "main")],
  optimization : {
    splitChunks: {
      cacheGroups: {
        commons: {
          test   : /[\\/]node_modules[\\/]/,
          name   : "vendors",
          chunks : "all",
        },
      },
    },
  },
  output: {
    path       : resolve(__dirname, "..", "dist"),
    publicPath : "/",
    filename   : "index.js",
  },
  resolve: {
    alias      : { "@": resolve("src"), src: resolve("src") },
    extensions : [".wasm", ".mjs", ".ts", ".js", ".vue", ".yml"],
  },
  devtool : "source-map",
  target  : "web",
  module  : {
    rules: [
      {
        test   : /\.yml$/,
        loader : ["json-loader", "yml-loader"],
      },
      {
        test    : /\.vue$/,
        loader  : "vue-loader",
        options : { loaders: { i18n: "@kazupon/vue-i18n-loader" } },
      },
      {
        test : /\.(jpe?g|png|gif|svg)$/i,
        use  : ["url-loader?limit=10000", "img-loader"],
      },
      {
        test    : /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader  : "file-loader",
        options : { name: "./fonts/[name].[ext]", publicPath: "/" },
      },
      {
        test    : /\.(ts|js)$/,
        exclude : /(node_modules)/,
        use     : [
          "babel-loader",
          tsLoader,
        ],
      },
      {
        test : /\.html$/,
        use  : [
          {
            loader  : "html-loader",
            options : { minimize: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename : "./index.html",
      template : "./src/index.html",
      favicon  : "./favicon.png",
    }),
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new SimpleProgressWebpackPlugin(),
    new DefinePlugin({ WEATHER_API_KEY: JSON.stringify(process.env.WEATHER_API_KEY) }),
  ],
} as Configuration;
