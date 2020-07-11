const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const mode = process.env.BUILD || "production";

const configuration = {
  entry   : path.resolve(__dirname, "src", "main"),
  output  : { filename: "[name].js" },
  mode,
  devtool : "source-map",
  resolve : {
    extensions : [".wasm", ".mjs", ".js", ".ts", ".json", ".gql", ".graphql"],
    alias      : { "@": path.resolve("./src"), "common": path.resolve("..", "common") },
  },
  target : "node",
  node   : {
    __dirname  : true, // needed for all the fs operations
    __filename : false,
  },
  externals : [nodeExternals({ modulesDir: "../node_modules/" })],
  module    : {
    rules: [
      {
        test    : /\.js$/,
        exclude : /node_modules/,
        use     : { loader: "babel-loader" },
      },
      {
        test    : /\.ts$/,
        exclude : /node_modules/,
        use     : ["babel-loader", "ts-loader"],
      },
      {
        test    : /\.(graphql|gql)$/,
        exclude : /node_modules/,
        loader  : "graphql-tag/loader",
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};

if (mode === "development") {
  configuration.watchOptions = {
    // poll    : 1000,
    ignored: ["*.{test,spec}.{js,ts}", "node_modules"],
  };
  const eslintConfig = {
    loader  : "eslint-loader",
    enforce : "pre",
    test    : /\.(ts|js)$/,
    include : path.resolve(__dirname, "src"),
    exclude : /node_modules/,
  };
  configuration.module.rules.push(eslintConfig);
}
console.log(`..... Running ${mode} build!! .....`);

module.exports = configuration;
