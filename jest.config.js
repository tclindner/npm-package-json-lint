module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!src/cli.js'],
  coverageThreshold: {
    global: {
      branches: 97,
      functions: 100,
      lines: 99,
      statements: 99
    }
  },
  restoreMocks: true,
  resetMocks: true,
  resetModules: true,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/node_modules/']
};
