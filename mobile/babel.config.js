module.exports = function babelConfig(api) {
  api.cache(true);
  return {
    extends : "../babel.config.js",
    presets : [["@babel/env", { targets: { esmodules: true } }]],
  };
};
