module.exports = {
  clearMocks: true,
  moduleFileExtensions: [
    "js",
    "json",
    "ts",
  ],
  collectCoverageFrom: [
    "src/**/*.{js,ts}",
  ],
  collectCoverage: true,
  coverageReporters: [
    "json",
    "html",
  ],
  modulePaths: [
    "<rootDir>/src/",
    "<rootDir>/node_modules/",
    "<rootDir>/__tests__/",
  ],
  transform: {
    ".+\\.(gql|graphql)$": "jest-transform-graphql",
    "^.+\\.(ts|js)?$": "babel-jest",
  },
  moduleNameMapper: {
    "^.+.(gql|graphql)$": "jest-transform-graphql",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/cypress/*",
  ],
};
