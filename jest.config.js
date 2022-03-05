// eslint-disable-next-line @typescript-eslint/no-var-requires
const {defaults: tsjPreset} = require('ts-jest/presets');

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/cli.ts'],
  coverageThreshold: {
    global: {
      branches: 97,
      functions: 100,
      lines: 99,
      statements: 99,
    },
  },
  moduleFileExtensions: ['js', 'ts'],
  restoreMocks: true,
  resetMocks: true,
  resetModules: true,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    ...tsjPreset.transform,
  },
  transformIgnorePatterns: ['/node_modules'],
  testMatch: ['<rootDir>/**/*.test.(js|ts)'],
};
