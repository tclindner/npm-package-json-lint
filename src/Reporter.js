"use strict";

let chalk = require("chalk");
let LintIssue = require("./LintIssue");

class Reporter {
  /**
   * Print issues
   * @param  {Array}  issues    An array of LintIssues
   * @param  {string} issueType error or warning
   */
  write(issues, issueType) {
    let issueCount = issues.length;

    if (issueCount) {
      console.log(`\n----${issueType}-----`);

      for (let issue of issues) {
        console.log(issue.toString());
      }

      console.log("\n" + chalk.red.bold(issueCount) + ` ${issueType} found.`);
    } else {
      console.log("\n" + chalk.green.bold(`No ${issueType} found!`));
    }
  }
}

module.exports = Reporter;
