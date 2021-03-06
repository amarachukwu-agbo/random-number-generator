module.exports = {
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  collectCoverageFrom: ['server/**/*.js', 'client/**/*.{js,jsx}'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/client/index.js',
  ],

  // A set of global variables that need to be available in all test environments
  // globals: {},

  resetMocks: true,

  // A list of paths to directories that Jest should use to search for files in
  roots: [
    '<rootDir>',
  ],

  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },

  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  // The paths to modules that run some code to configure or set up the testing environment
  // before each test
  // setupFiles: [],

  // The test environment that will be used for testing
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/client/index.js',
  ],
};
