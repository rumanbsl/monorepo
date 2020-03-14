const production = process.env.NODE_ENV === "production";
const devRules = production ? { "no-console": "warn" } : { "no-console": 0 };

module.exports = {
	"parser": "@typescript-eslint/parser",
	"plugins": [
		"import",
		"@typescript-eslint"
	],
	"settings": {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx"]
		},
		"import/resolver": {
			"alias": {
				"map": [
					[
						"@",
						"./src/"
					],
					[
						"src",
						"./src/"
					]
				],
				"extensions": [
					".ts",
					".js",
					".tsx",
					".jsx",
					".json"
				]
			},
			"node": true,
			"eslint-import-resolver-typescript": true,
			"webpack": {
				"config": {
					"resolve": {
						"extensions": [
							".ts",
							".js",
							".tsx",
							".jsx",
						]
					}
				}
			}
		}
	},
	"overrides": [
		{
			"files": "*.{test,spec}.{tsx,ts}",
			"rules": {
				"@typescript-eslint/explicit-function-return-type": 0,
				"@typescript-eslint/no-explicit-any": 0,
				"@typescript-eslint/no-unused-vars": 0,
				"import/no-extraneous-dependencies": 0,
				"require-jsdoc": 0
			}
		},
		{
			"files": "webpack.*.{js,ts}",
			"rules": {
				"@typescript-eslint/no-var-requires": 0,
				"import/no-extraneous-dependencies": 0,
				"require-jsdoc": 0
			}
		}
	],
	"root": true,
	"rules": {
		"no-throw-literal": 0,
		"func-names": 0,
		"import/no-cycle": 0,
		"@typescript-eslint/ban-ts-ignore": "off",
		"@typescript-eslint/camelcase": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/indent": "off",
		"@typescript-eslint/interface-name-prefix": "error",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-object-literal-type-assertion": "off",
		"@typescript-eslint/no-this-alias": "off",
		"camelcase": 0,
		"comma-dangle": 2,
		"comma-spacing": [
			"error",
			{
				"after": true,
				"before": false
			}
		],
		"import/extensions": 0,
		"import/no-named-as-default": 0,
		"import/no-unresolved": 0,
		"indent": [
			"error",
			2
		],
		"key-spacing": [
			"error",
			{
				"align": {
					"afterColon": true,
					"beforeColon": true,
					"on": "colon"
				}
			}
		],
		"linebreak-style": "error",
		"lines-between-class-members": 0,
		"max-len": [
			"error",
			{
				"code": 160
			}
		],
		"no-multi-spaces": 2,
		"no-multiple-empty-lines": [
			"error",
			{
				"max": 1,
				"maxEOF": 0
			}
		],
		"no-param-reassign": 0,
		"no-trailing-spaces": "error",
		"no-underscore-dangle": 0,
		"no-unused-vars": 0,
		"object-curly-newline": [
			"error",
			{
				"multiline": true
			}
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
					"ArrowFunctionExpression": false,
					"ClassDeclaration": true,
					"FunctionDeclaration": true,
					"FunctionExpression": false,
					"MethodDefinition": true
				}
			}
		],
		"semi": "error",
		"space-before-blocks": [
			"error",
			{
				"classes": "never",
				"functions": "always",
				"keywords": "always"
			}
		],
		...devRules,
	}
}
