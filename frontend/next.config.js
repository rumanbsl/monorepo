const withCSS = require("@zeit/next-css");
const { resolve } = require("path");
const StylelintPlugin = require("stylelint-webpack-plugin");

module.exports = withCSS({
  webpack(config) {
    config.plugins.push(new StylelintPlugin({ files: "**/*.tsx" }));
    config.module.rules.push({
      test    : /\.(js|mjs|jsx|ts|tsx)$/,
      enforce : "pre",
      use     : [
        { loader: "eslint-loader" },
      ],
      exclude: /node_modules/,
    });

    config.resolve.alias.components = resolve(__dirname, "components");
    config.resolve.alias.styles = resolve(__dirname, "styles");
    config.resolve.alias.utils = resolve(__dirname, "utils");
    config.resolve.alias.Interfaces = resolve(__dirname, "Interfaces");
    const extensions = new Set(config.resolve.extensions);
    extensions.add(".tsx");
    config.resolve.extensions = [...extensions];
    return config;
  },
});
