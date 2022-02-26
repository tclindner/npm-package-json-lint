import api from '../../src/api';

jest.mock('../../src/NpmPackageJsonLint');

describe('api Unit Tests', () => {
  test('NpmPackageJsonLint should be exported', () => {
    expect(api).toHaveProperty('NpmPackageJsonLint');
  });
});
