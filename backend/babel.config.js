module.exports = {
  extends : "../babel.config.js",
  presets : [
    ["@babel/env", { targets: { node: 12 } }]],
  plugins: [
    ["@babel/proposal-optional-chaining", { loose: true }],
    "@babel/transform-typescript",
    "dynamic-import-node",
    "@babel/syntax-dynamic-import",
    [
      "module-resolver",
      {
        root: [
          "./",
        ],
        alias: { "@": "./src" },
      },
    ],
  ],
};
