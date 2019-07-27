module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageThreshold: {
    global: {
      branches: 87,
      functions: 91,
      lines: 92,
      statements: 92
    }
  },
  restoreMocks: true,
  resetMocks: true,
  resetModules: true,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/node_modules/']
};
