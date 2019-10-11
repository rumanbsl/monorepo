/* eslint-disable import/no-extraneous-dependencies */
import CompressionPlugin from "compression-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { Configuration } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import styleLoaders from "./loaders";

const plugins = [
  new CompressionPlugin({
    cache    : true,
    minRatio : 0.75,
  }),
  new MiniCssExtractPlugin({
    filename      : "[name].css",
    chunkFilename : "[id].css",
  }),
];
if (process.env.SHOW_BUNDLE !== undefined) {
  plugins.push(new BundleAnalyzerPlugin());
}
export default {
  mode         : "production",
  optimization : {
    minimize  : true,
    minimizer : [
      new TerserPlugin({
        terserOptions: {
          ecma     : 6,
          compress : true,
          output   : {
            comments : false,
            beautify : false,
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test : /\.(sa|sc|c)ss$/,
        use  : styleLoaders({ modules: false, mode: "production" }),
      },
      {
        test : /\.(jpe?g|png|gif|svg)$/i,
        use  : [
          "url-loader?limit=10000",
          {
            loader  : "image-webpack-loader",
            options : {
              mozjpeg  : { quality: 65 },
              pngquant : {
                quality : "10-20",
                speed   : 4,
              },
              svgo     : { plugins: [{ removeViewBox: false }, { removeEmptyAttrs: false }] },
              gifsicle : {
                optimizationLevel : 7,
                interlaced        : false,
              },
              optipng: {
                optimizationLevel : 7,
                interlaced        : false,
              },
            },
          },
        ],
      },
    ],
  },
  plugins,
} as Configuration;
