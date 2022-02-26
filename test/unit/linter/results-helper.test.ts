import resultsHelper from '../../../src/linter/results-helper';

describe('resultsHelper Unit Tests', () => {
  describe('aggregateCountsPerFile', () => {
    test('multiple issues', () => {
      const issues = [
        {
          lintId: 'require-name',
          severity: 'error',
          node: 'name',
          lintMessage: 'dummyText',
        },
        {
          lintId: 'require-name',
          severity: 'warning',
          node: 'name',
          lintMessage: 'dummyText',
        },
      ];
      const result = resultsHelper.aggregateCountsPerFile(issues);

      expect(result.errorCount).toStrictEqual(1);
      expect(result.warningCount).toStrictEqual(1);
    });

    test('no issues', () => {
      const issues = [];
      const result = resultsHelper.aggregateCountsPerFile(issues);

      expect(result.errorCount).toStrictEqual(0);
      expect(result.warningCount).toStrictEqual(0);
    });
  });

  describe('aggregateOverallCounts', () => {
    test('multiple issues', () => {
      const results = [
        {
          issues: [],
          ignored: true,
          errorCount: 0,
          warningCount: 0,
        },
        {
          issues: [],
          ignored: false,
          errorCount: 1,
          warningCount: 1,
        },
        {
          issues: [],
          ignored: false,
          errorCount: 9,
          warningCount: 0,
        },
        {
          issues: [],
          ignored: true,
          errorCount: 0,
          warningCount: 0,
        },
      ];
      const result = resultsHelper.aggregateOverallCounts(results);

      expect(result.ignoreCount).toStrictEqual(2);
      expect(result.errorCount).toStrictEqual(10);
      expect(result.warningCount).toStrictEqual(1);
    });

    test('no issues', () => {
      const results = [];
      const result = resultsHelper.aggregateOverallCounts(results);

      expect(result.ignoreCount).toStrictEqual(0);
      expect(result.errorCount).toStrictEqual(0);
      expect(result.warningCount).toStrictEqual(0);
    });
  });
});
