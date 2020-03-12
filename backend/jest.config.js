module.exports = {
  clearMocks          : true,
  collectCoverage     : true,
  collectCoverageFrom : [
    "src/**/*.{js,ts}",
    "!src/**/*.d.ts",
  ],
  coverageReporters: [
    "json",
    "html",
  ],
  moduleFileExtensions: [
    "js",
    "json",
    "ts",
  ],
  moduleNameMapper: {
    "^.+.(gql|graphql)$" : "jest-transform-graphql",
    "^@/(.*)$"           : "<rootDir>/src/$1",
  },
  modulePaths: [
    "<rootDir>/src/",
    "<rootDir>/node_modules/",
    "<rootDir>/__tests__/",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/cypress/*",
  ],
  testRegex : "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  transform : {
    ".+\\.(gql|graphql)$" : "jest-transform-graphql",
    "^.+\\.(ts|js)?$"     : "babel-jest",
  },
};
