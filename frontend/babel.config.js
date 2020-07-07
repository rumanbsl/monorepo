module.exports = {
  extends : "../babel.config.js",
  plugins : [
    [
      "styled-components",
      {
        ssr         : true,
        displayName : true,
      },
    ],
  ],
  presets: [
    "next/babel",
  ],
};
