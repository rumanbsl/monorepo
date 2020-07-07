module.exports = {
  env: {
    node : true,
    es6  : true,
    jest : true,
  },
  extends: [
    "airbnb-base",
    "../.eslintrc",
  ],
  rules: { "import/no-extraneous-dependencies": ["error", { packageDir: ["./", "../"] }] },
};
