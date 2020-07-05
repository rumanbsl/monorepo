module.exports = {
  env: {
    browser : true,
    es6     : true,
    jest    : true,
  },
  extends: [
    "react-app",
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "../.eslintrc",
  ],
  globals  : { React: "writable" },
  settings : {
    "import/parsers": {
      "@typescript-eslint/parser": [
        ".ts",
        ".tsx",
      ],
    },
    "import/resolver": {
      alias: {
        extensions: [
          ".ts",
          ".js",
          ".tsx",
          ".jsx",
          ".json",
        ],
        map: [
          [
            "components",
            "./components/",
          ],
          [
            "pages",
            "./pages/",
          ],
          [
            "styles",
            "./styles/",
          ],
          [
            "utils",
            "./utils/",
          ],
          [
            "Interfaces",
            "./Interfaces/",
          ],
        ],
      },
      "eslint-import-resolver-typescript" : true,
      node                                : true,
      webpack                             : {
        config: {
          resolve: {
            extensions: [
              ".ts",
              ".js",
              ".tsx",
              ".jsx",
            ],
          },
        },
      },
    },
  },
  rules: {
    "jsx-a11y/anchor-is-valid"                         : 0,
    "react/jsx-filename-extension"                     : [
      2,
      {
        extensions: [
          ".tsx",
          ".jsx",
        ],
      },
    ],
    "react/jsx-props-no-spreading" : 0,
    "react/no-array-index-key"     : 0,
    "react/prop-types"             : 0,
    "react/react-in-jsx-scope"     : "off",
    "react/require-default-props"  : 0,
  },
};
