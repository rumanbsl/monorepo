module.exports = {
  presets: [
    ["@babel/env", { targets: { node: 12 } }]
  ],
  plugins: [
    "@babel/transform-typescript",
    "dynamic-import-node",
    "@babel/syntax-dynamic-import",
    [
      "module-resolver",
      {
        "root": [
          "./"
        ],
        "alias": {
          "@": "./"
        }
      }
    ]
  ]
}
