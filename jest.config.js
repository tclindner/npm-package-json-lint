module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js'
  ],
  coverageThreshold: {
    global: {
      branches: 94,
      functions: 99,
      lines: 99,
      statements: 99
    }
  },
  testEnvironment: 'node'
};
