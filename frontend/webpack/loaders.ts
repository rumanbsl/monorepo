/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import postcssSass from "postcss-sass";
/**
 *
 *
 * @param {{modules: boolean}} {modules} component has css-module?
 * @param {{mode: development | production}} {mode} to extract css or not
 * @returns array of css loaders
 */
export default function styleLoaders({ modules, mode }: { modules: boolean; mode: "development" | "production" }) {
  interface Iloader {
    loader: string;
    options: any;
  }
  const development = mode === "development";
  const cssLoader: Iloader = {
    loader  : "css-loader",
    options : { sourceMap: true, importLoaders: development ? 3 : 4 },
  };
  if (modules === true) {
    cssLoader.options.modules = true;
    cssLoader.options.localIdentName = "[path][name]__[local]--[hash:base64:5]";
  }
  let postCssloader;
  if (!development && modules) {
    postCssloader = {
      loader  : "postcss-loader",
      options : {
        ident   : "postcss",
        plugins : [
          autoprefixer(),
          cssnano(),
          postcssSass(),
        ],
      },
    };
  }
  const loaders = [cssLoader];
  if (postCssloader) { loaders.push(postCssloader); }
  return [
    development ? "style-loader" : MiniCssExtractPlugin.loader,
    ...loaders,
    "resolve-url-loader",
    {
      loader  : "sass-loader",
      options : { sourceMap: true },
    },
  ];
}
