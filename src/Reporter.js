'use strict';

const chalk = require('chalk');
const LintIssue = require('./LintIssue');

class Reporter {

  /**
   * Print issues
   * @param  {Array}      issues    An array of LintIssues
   * @param  {string}     issueType Error or warning
   * @return {undefined}            No return
   */
  write(issues, issueType) {
    const issueCount = issues.length;

    if (issueCount) {
      console.log(`\n----${issueType}-----`);

      for (const issue of issues) {
        console.log(issue.toString());
      }

      const formattedIssueCount = chalk.red.bold(issueCount);

      console.log(`\n${formattedIssueCount} ${issueType} found.`);
    } else {
      console.log(chalk.green.bold(`\nNo ${issueType} found!`));
    }
  }

}

module.exports = Reporter;
