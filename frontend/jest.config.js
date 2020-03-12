module.exports = {
  clearMocks          : true,
  collectCoverage     : true,
  collectCoverageFrom : [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
  ],
  coverageReporters: [
    "json",
    "html",
  ],
  moduleFileExtensions: [
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
  ],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$" : "identity-obj-proxy",
    "^@/(.*)$"                        : "<rootDir>/src/$1",
    "^react-native$"                  : "react-native-web",
    "^src/(.*)$"                      : "<rootDir>/src/$1",
  },
  modulePaths: [
    "<rootDir>/src/",
    "<rootDir>/node_modules/",
    "<rootDir>/__tests__/",
  ],
  setupFiles: [
    "react-app-polyfill/jsdom",
  ],
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.ts",
  ],
  testEnvironment : "jest-environment-jsdom-fourteen",
  testMatch       : [
    "<rootDir>/src/**/__tests__/**/*.{ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{ts,tsx}",
  ],
  transform: {
    "^.+\\.(ts|tsx)$"              : "babel-jest",
    "^.+\\.css$"                   : "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(ts|tsx|css|json)$)" : "<rootDir>/config/jest/fileTransform.js",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
