import chalk from 'chalk';
import plur from 'plur';
import {LintIssue} from './lint-issue';

const zeroIssues = 0;
const oneFile = 1;

/**
 * Prints issues to console
 *
 * @param issues An array of LintIssues
 * @internal
 */
const printResultSetIssues = (issues: LintIssue[]): void => {
  issues.forEach((issue) => {
    console.log(issue.toString());
  });
};

/**
 * Print results for an individual package.json file linting
 *
 * @param resultSet Result object from a given file's lint result
 * @param quiet True suppress warnings, false show warnings
 * @internal
 */
const printIndividualResultSet = (resultSet, quiet: boolean): void => {
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
 * @param linterOutput Full results from linting. Includes an array of results and overall counts
 * @param quiet True suppress warnings, false show warnings
 * @internal
 */
const printTotals = (linterOutput, quiet: boolean): void => {
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
 * Print results to console
 *
 * @param linterOutput An array of LintIssues
 * @param quiet Flag indicating whether to print warnings.
 * @internal
 */
export const write = (linterOutput, quiet: boolean): void => {
  linterOutput.results.forEach((result) => {
    printIndividualResultSet(result, quiet);
  });

  if (linterOutput.results.length > oneFile) {
    printTotals(linterOutput, quiet);
  }
};
