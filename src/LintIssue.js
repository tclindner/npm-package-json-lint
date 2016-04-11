"use strict";

let chalk = require("chalk");

class LintIssue {
  /**
   * constructor
   * @param  {string} lintId      Unique, lowercase, hyphen-separate name for the lint
   * @param  {string} lintType    error or warning
   * @param  {string} node        Name of the node in the JSON the lint audits
   * @param  {string} lintMessage Human-friendly message to users
   */
  constructor(lintId, lintType, node, lintMessage) {
    this.lintId = lintId;
    this.lintType = lintType;
    this.node = node;
    this.lintMessage = lintMessage;
  }

  /**
   * Helper to convert the LintIssue to a printable string
   * @return {string} Human-friendly message about the lint issue
   */
  toString() {
    let formattedMessage = (this.lintType === "error") ? chalk.bold.red(this.lintMessage) : chalk.yellow(this.lintMessage);

    return chalk.cyan.bold(this.lintId) + " - node: " + chalk.blue.bold(this.node) + " - " + formattedMessage;
  }
}

module.exports = LintIssue;
