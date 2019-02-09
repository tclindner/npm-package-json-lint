/* eslint no-restricted-syntax: 'off' */

const chalk = require('chalk');
const plur = require('plur');

const zeroIssues = 0;
const oneFile = 1;

/* eslint-disable no-console */

/**
 * Prints issues to console
 *
 * @param {LintIssue[]} issues An array of LintIssues
 * @returns {Undefined} No return
 * @private
 */
const printResultSetIssues = (issues) => {
  for (const issue of issues) {
    console.log(issue.toString());
  }
};

/* eslint-disable max-statements */
/**
 * Print results for an individual package.json file linting
 *
 * @param {LintResult} resultSet  Result object from a given file's lint result
 * @param {Boolean}    quiet      True suppress warnings, false show warnings
 * @returns {Undefined} No results
 * @private
 */
const printIndividualResultSet = (resultSet, quiet) => {
  const {filePath, issues, errorCount, warningCount} = resultSet;

  if (errorCount > zeroIssues || (!quiet && warningCount > zeroIssues)) {
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
 * @param {Object}  cliEngineOutput Full results from linting. Includes an array of results and overall counts
 * @param {Boolean} quiet           True suppress warnings, false show warnings
 * @returns {Undefined} No results
 * @private
 */
const printTotals = (cliEngineOutput, quiet) => {
  const {errorCount, warningCount} = cliEngineOutput;

  if (errorCount > zeroIssues || warningCount > zeroIssues) {
    const errorCountMessage = `${errorCount} ${plur('error', errorCount)}`;
    const warningCountMessage = `${warningCount} ${plur('warning', warningCount)}`;

    console.log('');
    console.log(chalk.underline('Totals'));
    console.log(chalk.red.bold(errorCountMessage));

    if (!quiet) {
      console.log(chalk.yellow.bold(warningCountMessage));
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
   * @param  {Object}      cliEngineOutput    An array of LintIssues
   * @param  {boolean}     quiet Flag indicating whether to print warnings.
   * @return {undefined}            No return
   * @static
   */
  static write(cliEngineOutput, quiet) {
    for (const result of cliEngineOutput.results) {
      printIndividualResultSet(result, quiet);
    }

    if (cliEngineOutput.results.length > oneFile) {
      printTotals(cliEngineOutput, quiet);
    }
  }

}

module.exports = Reporter;
