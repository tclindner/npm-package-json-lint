import {LintIssue} from '../../../src/lint-issue';
import {aggregateCountsPerFile, aggregateOverallCounts} from '../../../src/linter/results-helper';
import {PackageJsonFileLintingResult} from '../../../src/types/package-json-linting-result';
import {Severity} from '../../../src/types/severity';

describe('resultsHelper Unit Tests', () => {
  describe('aggregateCountsPerFile', () => {
    test('multiple issues', () => {
      const issues: LintIssue[] = [
        {
          lintId: 'require-name',
          severity: Severity.Error,
          node: 'name',
          lintMessage: 'dummyText',
        },
        {
          lintId: 'require-name',
          severity: Severity.Warning,
          node: 'name',
          lintMessage: 'dummyText',
        },
      ];
      const result = aggregateCountsPerFile(issues);

      expect(result.errorCount).toStrictEqual(1);
      expect(result.warningCount).toStrictEqual(1);
    });

    test('no issues', () => {
      const issues = [];
      const result = aggregateCountsPerFile(issues);

      expect(result.errorCount).toStrictEqual(0);
      expect(result.warningCount).toStrictEqual(0);
    });
  });

  describe('aggregateOverallCounts', () => {
    test('multiple issues', () => {
      const results: PackageJsonFileLintingResult[] = [
        {
          issues: [],
          filePath: '',
          ignored: true,
          errorCount: 0,
          warningCount: 0,
        },
        {
          issues: [],
          filePath: '',
          ignored: false,
          errorCount: 1,
          warningCount: 1,
        },
        {
          issues: [],
          filePath: '',
          ignored: false,
          errorCount: 9,
          warningCount: 0,
        },
        {
          issues: [],
          filePath: '',
          ignored: true,
          errorCount: 0,
          warningCount: 0,
        },
      ];
      const result = aggregateOverallCounts(results);

      expect(result.ignoreCount).toStrictEqual(2);
      expect(result.errorCount).toStrictEqual(10);
      expect(result.warningCount).toStrictEqual(1);
    });

    test('no issues', () => {
      const results = [];
      const result = aggregateOverallCounts(results);

      expect(result.ignoreCount).toStrictEqual(0);
      expect(result.errorCount).toStrictEqual(0);
      expect(result.warningCount).toStrictEqual(0);
    });
  });
});
