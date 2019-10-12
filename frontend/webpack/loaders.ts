/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

/**
 *
 *
 * @param {{modules: boolean}} {modules} component has css-module?
 * @param {{mode: development | production}} {mode} to extract css or not
 * @returns array of css loaders
 */
export default function styleLoaders({ mode }: { mode: "development" | "production" }) {
  interface Iloader {
    loader: string;
    options: any;
  }
  const development = mode === "development";
  const cssLoader: Iloader = {
    loader  : "css-loader",
    options : { sourceMap: true, importLoaders: development ? 2 : 3 },
  };
  const postCssloader = {
    loader  : "postcss-loader",
    options : {
      ident   : "postcss",
      plugins : [
        autoprefixer(),
        cssnano(),
      ],
    },
  };
  const loaders = [cssLoader, postCssloader];
  return [
    development ? "style-loader" : MiniCssExtractPlugin.loader,
    ...loaders,
    "resolve-url-loader",
    {
      loader  : "sass-loader",
      options : {
        sourceMap      : true,
        implementation : require("dart-sass"),
      },
    },
  ];
}
