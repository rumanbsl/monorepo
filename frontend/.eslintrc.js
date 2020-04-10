
module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest": true,
  },
  "extends": [
    "react-app",
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "../.eslintrc"
  ],
  "rules": {
    "react/jsx-filename-extension": [2, { "extensions": [".tsx", ".jsx"] }],
  }
}
