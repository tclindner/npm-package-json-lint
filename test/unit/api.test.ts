import * as api from '../../src/api';

jest.mock('../../src/npm-package-json-lint');

describe('api Unit Tests', () => {
  test('NpmPackageJsonLint should be exported', () => {
    expect(api).toHaveProperty('NpmPackageJsonLint');
  });
});
