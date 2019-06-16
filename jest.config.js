module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageThreshold: {
    global: {
      branches: 92,
      functions: 100,
      lines: 97,
      statements: 97
    }
  },
  restoreMocks: true,
  resetMocks: true,
  resetModules: true,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/node_modules/']
};
