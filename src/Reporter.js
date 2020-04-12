/* eslint no-restricted-syntax: 'off' */

const chalk = require('chalk');
const plur = require('plur');

const zeroIssues = 0;
const oneFile = 1;

/**
 * Prints issues to console
 *
 * @param {LintIssue[]} issues An array of LintIssues
 * @returns {Undefined} No return
 * @private
 */
const printResultSetIssues = (issues) => {
  for (const issue of issues) {
    // eslint-disable-next-line no-console
    console.log(issue.toString());
  }
};

/**
 * Print results for an individual package.json file linting
 *
 * @param {LintResult} resultSet  Result object from a given file's lint result
 * @param {Boolean}    quiet      True suppress warnings, false show warnings
 * @returns {Undefined} No results
 * @private
 */
const printIndividualResultSet = (resultSet, quiet) => {
  const {filePath, issues, ignored, errorCount, warningCount} = resultSet;

  if (ignored) {
    console.log('');

    console.log(`${chalk.yellow.underline(filePath)} - ignored`);
  } else if (errorCount > zeroIssues || (!quiet && warningCount > zeroIssues)) {
    console.log('');

    console.log(chalk.underline(filePath));

    printResultSetIssues(issues);

    const errorCountMessage = `${errorCount} ${plur('error', errorCount)}`;
    const warningCountMessage = `${warningCount} ${plur('warning', warningCount)}`;

    console.log(chalk.red.bold(errorCountMessage));

    if (!quiet) {
      console.log(chalk.yellow.bold(warningCountMessage));
    }
  }
};

/**
 * Prints the overall total counts section
 *
 * @param {Object}  linterOutput Full results from linting. Includes an array of results and overall counts
 * @param {Boolean} quiet           True suppress warnings, false show warnings
 * @returns {Undefined} No results
 * @private
 */
const printTotals = (linterOutput, quiet) => {
  const {errorCount, warningCount, ignoreCount} = linterOutput;

  if (errorCount > zeroIssues || warningCount > zeroIssues) {
    const errorCountMessage = `${errorCount} ${plur('error', errorCount)}`;
    const warningCountMessage = `${warningCount} ${plur('warning', warningCount)}`;
    const ignoreCountMessage = `${ignoreCount} ${plur('file', ignoreCount)} ignored`;

    console.log('');
    console.log(chalk.underline('Totals'));
    console.log(chalk.red.bold(errorCountMessage));

    if (!quiet) {
      console.log(chalk.yellow.bold(warningCountMessage));
      console.log(chalk.yellow.bold(ignoreCountMessage));
    }
  }
};

/**
 * Public Reporter class
 * @class
 */
class Reporter {
  /**
   * Print CLIEngine Output
   *
   * @param  {Object}      linterOutput    An array of LintIssues
   * @param  {boolean}     quiet Flag indicating whether to print warnings.
   * @return {undefined}            No return
   * @static
   */
  static write(linterOutput, quiet) {
    for (const result of linterOutput.results) {
      printIndividualResultSet(result, quiet);
    }

    if (linterOutput.results.length > oneFile) {
      printTotals(linterOutput, quiet);
    }
  }
}

module.exports = Reporter;
