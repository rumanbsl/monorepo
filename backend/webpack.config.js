const path = require("path");
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const mode = process.env.BUILD;

const configuration = {
  entry: path.resolve(__dirname, "src", "main"),
  output: {
    filename: "[name].js"
  },
  mode,
  devtool: "source-map",
  resolve: {
    extensions: [".wasm", ".mjs", ".js", ".ts", ".json", ".gql", ".graphql"],
    alias: {
      "@": path.resolve("./")
    },
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: mode === "production" ? "babel-loader" : "ts-loader",
        }
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  },
  plugins: [new CleanWebpackPlugin()]
}

if (mode === "development") {
  configuration.watchOptions = {
    poll: 1000,
    ignored: ["*.{test,spec}.{js,ts}", "node_modules"]
  };
  const eslintConfig = {
    enforce: "pre",
    test: /\.(ts|js)$/,
    include: path.resolve(__dirname, "src"),
    exclude: /node_modules/,
    loader: "eslint-loader",
    options: { fix: true }
  };
  configuration.module.rules.push(eslintConfig)
}
console.log(`..... Running ${mode} build .....`);

module.exports = configuration;
