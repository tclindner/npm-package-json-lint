import * as api from '../../src/api';

jest.mock('../../src/npm-package-json-lint');

describe('api Unit Tests', () => {
  test('NpmPackageJsonLint should be exported', () => {
    expect(api).toHaveProperty('NpmPackageJsonLint');
  });

  test('NpmPackageJsonLintOptions should be exported', () => {
    expect(api).not.toHaveProperty('NpmPackageJsonLintOptions');
  });

  test('LintIssue should be exported', () => {
    expect(api).toHaveProperty('LintIssue');
  });

  test('Severity should be exported', () => {
    expect(api).toHaveProperty('Severity');
  });

  test('LinterResult should be exported', () => {
    expect(api).not.toHaveProperty('LinterResult');
  });

  test('PackageJsonFileLintingResult should be exported', () => {
    expect(api).not.toHaveProperty('PackageJsonFileLintingResult');
  });

  test('PackageJsonFileAggregatedResultCounts should be exported', () => {
    expect(api).not.toHaveProperty('PackageJsonFileAggregatedResultCounts');
  });

  test('OverallAggregatedResultCounts should be exported', () => {
    expect(api).not.toHaveProperty('OverallAggregatedResultCounts');
  });

  test('Rules should be exported', () => {
    expect(api).not.toHaveProperty('Rules');
  });
});
