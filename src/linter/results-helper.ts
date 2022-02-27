import {LintIssue} from '../lint-issue';
import {Severity} from '../types/severity';
import {PackageJsonFileLintingResult} from '../types/package-json-linting-result';

/**
 * A result count object for a files.
 * @typedef {Object} FileResultCounts
 * @property {number} errorCount    Number of errors for a file result.
 * @property {number} warningCount  Number of warnings for a file result.
 */

export interface PackageJsonFileAggregatedResultCounts {
  errorCount: number;
  warningCount: number;
}

/**
 * Aggregates the count of errors and warning for a package.json file.
 *
 * @param issues Array of {@link LintIssue} objects from a package.json file.
 * @returns Counts object {@link PackageJsonFileAggregatedResultCounts}.
 */
export const aggregateCountsPerFile = (issues: LintIssue[]): PackageJsonFileAggregatedResultCounts => {
  const incrementOne = 1;

  // eslint-disable-next-line unicorn/no-array-reduce
  return issues.reduce(
    (counts, issue) => {
      const isErrorSeverity = issue.severity === Severity.Error;
      const newErrorCount = isErrorSeverity ? counts.errorCount + incrementOne : counts.errorCount;
      const newWarningCount = isErrorSeverity ? counts.warningCount : counts.warningCount + incrementOne;

      return {
        errorCount: newErrorCount,
        warningCount: newWarningCount,
      };
    },
    {
      errorCount: 0,
      warningCount: 0,
    }
  );
};

export interface OverallAggregatedResultCounts {
  /**
   * Total number of ignored files.
   */
  ignoreCount: number;
  /**
   * Total number of errors.
   */
  errorCount: number;
  /**
   * Total number of warnings.
   */
  warningCount: number;
}

/**
 * Aggregates the count of errors and warnings for all package.json files.
 *
 * @param results Array of {@link PackageJsonFileLintingResult} objects from all package.json files.
 * @returns Counts object {@link OverallAggregatedResultCounts}
 */
export const aggregateOverallCounts = (results: PackageJsonFileLintingResult[]): OverallAggregatedResultCounts =>
  // eslint-disable-next-line unicorn/no-array-reduce
  results.reduce(
    (counts, result) => ({
      ignoreCount: result.ignored ? counts.ignoreCount + 1 : counts.ignoreCount,
      errorCount: counts.errorCount + result.errorCount,
      warningCount: counts.warningCount + result.warningCount,
    }),
    {
      ignoreCount: 0,
      errorCount: 0,
      warningCount: 0,
    }
  );
