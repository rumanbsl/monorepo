module.exports = {
  clearMocks           : true,
  moduleFileExtensions : [
    "js",
    "json",
    "vue",
    "ts",
  ],
  collectCoverageFrom: [
    "!**/node_modules/**",
    "!**/cypress/**",
    "!src/**/**/Interfaces/**",
    "!src/Interfaces/**",
    "!src/@types/**",
    "!src/**/*.story.ts",
    "src/**/*.{js,ts,vue}",
  ],
  collectCoverage   : true,
  coverageReporters : [
    "json",
    "html",
  ],
  modulePaths: [
    "<rootDir>/src/",
    "<rootDir>/node_modules/",
    "<rootDir>/__tests__/",
  ],
  transform: {
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$" : "jest-transform-stub",
    "^.+\\.tsx?$"                                                : "babel-jest",
    "^.+\\.vue$"                                                 : "vue-jest",
    "^.+\\.jsx?$"                                                : "babel-jest",
  },
  moduleNameMapper: {
    "^.+.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$" : "jest-transform-stub",
    "^src/(.*)$"                                                : "<rootDir>/src/$1",
    "^@/(.*)$"                                                  : "<rootDir>/src/$1",
    "^vue$"                                                     : "vue/dist/vue.common.js",
  },
  snapshotSerializers: [
    "jest-serializer-vue",
  ],
  testRegex              : "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testPathIgnorePatterns : [
    "/node_modules/",
    "/cypress/*",
  ],
};
