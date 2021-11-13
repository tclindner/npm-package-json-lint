/**
 * A result count object for a files.
 * @typedef {Object} FileResultCounts
 * @property {number} errorCount    Number of errors for a file result.
 * @property {number} warningCount  Number of warnings for a file result.
 */

/**
 * Aggregates the count of errors and warning for a package.json file.
 *
 * @param {LintIssue[]} issues Array of {@link LintIssue} objects from a package.json file.
 * @returns {FileResultCounts} Counts object {@link FileResultCounts}.
 */
const aggregateCountsPerFile = (issues) => {
  const incrementOne = 1;

  return issues.reduce(
    (counts, issue) => {
      const isErrorSeverity = issue.severity === 'error';
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

/**
 * A result count object for all files.
 * @typedef {Object} OverallResultCounts
 * @property {number} ignoreCount  Total number of ignored files.
 * @property {number} errorCount   Total number of errors.
 * @property {number} warningCount Total number of warnings.
 */

/**
 * Aggregates the count of errors and warnings for all package.json files.
 *
 * @param {FileLintResult[]} results Array of {@link FileLintResult} objects from all package.json files.
 * @returns {OverallResultCounts} Counts object {@link OverallResultCounts}
 */
const aggregateOverallCounts = (results) =>
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

module.exports = {
  aggregateCountsPerFile,
  aggregateOverallCounts,
};
