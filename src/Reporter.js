'use strict';

const chalk = require('chalk');
const plur = require('plur');

class Reporter {

  /**
   * Print issues
   * @param  {Array}      issues    An array of LintIssues
   * @param  {string}     issueType Error or warning
   * @return {undefined}            No return
   * @static
   */
  static write(issues, issueType) {
    const issueCount = issues.length;

    if (issueCount) {
      const startOfString = 0;
      const oneChar = 1;
      const issueTypeAdj = issueType.substring(startOfString, issueType.length - oneChar);
      const formattedHeading = `${issueCount} ${plur(issueTypeAdj, issueCount)}`;

      if (issueType === 'errors') {
        console.log(chalk.red.bold.underline(formattedHeading));
      } else {
        console.log(chalk.yellow.bold.underline(formattedHeading));
      }

      for (const issue of issues) {
        console.log(issue.toString());
      }

      console.log();
    }
  }

}

module.exports = Reporter;
