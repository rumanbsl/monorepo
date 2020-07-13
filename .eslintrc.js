const production = process.env.NODE_ENV === "production";
const devRules = production ? { "no-console": "warn" } : { "no-console": 0 };

module.exports = {
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "overrides": [
    {
      "files" : "*.{test,spec}.{tsx,ts}",
      "rules" : {
        "@typescript-eslint/no-explicit-any" : 0,
        "@typescript-eslint/no-unused-vars"  : 0,
        "import/no-extraneous-dependencies"  : 0
      }
    },
    {
      "files" : "webpack.*.{js,ts}",
      "rules" : {
        "@typescript-eslint/no-var-requires" : 0,
        "import/no-extraneous-dependencies"  : 0,
        "require-jsdoc"                      : 0
      }
    }
  ],
  "parser"        : "@typescript-eslint/parser",
  "parserOptions" : { "project": "./tsconfig.json" },
  "plugins"       : [
    "import"
  ],
  "root"  : true,
  "rules" : {
    "@typescript-eslint/ban-ts-comment"                   : 0,
    "@typescript-eslint/camelcase"                        : 0,
    "@typescript-eslint/explicit-module-boundary-types"   : 0,
    "@typescript-eslint/indent"                           : 0,
    "@typescript-eslint/no-explicit-any"                  : 0,
    "@typescript-eslint/no-misused-promises"              : 0,
    "@typescript-eslint/no-object-literal-type-assertion" : 0,
    "@typescript-eslint/no-this-alias"                    : 0,
    "@typescript-eslint/no-unsafe-assignment"             : 0,
    "@typescript-eslint/no-unsafe-call"                   : 0,
    "@typescript-eslint/no-unsafe-member-access"          : 0,
    "@typescript-eslint/no-unsafe-return"                 : 0,
    "@typescript-eslint/require-await"                    : 0,
    "@typescript-eslint/restrict-template-expressions"    : 0,
    "camelcase"                                           : 0,
    "comma-dangle"                                        : 2,
    "comma-spacing"                                       : [
      "error",
      {
        "after"  : true,
        "before" : false
      }
    ],
    "func-names"                 : 0,
    "import/extensions"          : 0,
    "import/no-cycle"            : 0,
    "import/no-named-as-default" : 0,
    "import/no-unresolved"       : 0,
    "indent"                     : [
      "error",
      2
    ],
    "key-spacing": [
      "error",
      {
        "align": {
          "afterColon"  : true,
          "beforeColon" : true,
          "on"          : "colon"
        }
      }
    ],
    "linebreak-style"             : "error",
    "lines-between-class-members" : 0,
    "max-len"                     : [
      "error",
      { "code": 160 }
    ],
    "no-multi-spaces"         : 2,
    "no-multiple-empty-lines" : [
      "error",
      {
        "max"    : 1,
        "maxEOF" : 0
      }
    ],
    "no-param-reassign"    : 0,
    "no-throw-literal"     : 0,
    "no-trailing-spaces"   : "error",
    "no-underscore-dangle" : 0,
    "no-unused-vars"       : 0,
    "object-curly-newline" : [
      "error",
      { "multiline": true }
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "require-jsdoc": [
      "error",
      {
        "require": {
          "ArrowFunctionExpression" : false,
          "ClassDeclaration"        : true,
          "FunctionDeclaration"     : false,
          "FunctionExpression"      : false,
          "MethodDefinition"        : false
        }
      }
    ],
    "semi"                : "error",
    "space-before-blocks" : [
      "error",
      {
        "classes"   : "never",
        "functions" : "always",
        "keywords"  : "always"
      }
    ],
    ...devRules
  }
};
