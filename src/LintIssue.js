"use strict";

const chalk = require("chalk");

class LintIssue {

  /**
   * constructor
   * @param  {String} lintId      Unique, lowercase, hyphen-separate name for the lint
   * @param  {String} lintType    error or warning
   * @param  {String} node        Name of the node in the JSON the lint audits
   * @param  {String} lintMessage Human-friendly message to users
   */
  constructor(lintId, lintType, node, lintMessage) {
    this.lintId = lintId;
    this.lintType = lintType;
    this.node = node;
    this.lintMessage = lintMessage;
  }

  /**
   * Helper to convert the LintIssue to a printable string
   * @return {String} Human-friendly message about the lint issue
   */
  toString() {
    const formattedLintId = chalk.cyan.bold(this.lintId);
    const formattedNode = chalk.blue.bold(this.node);
    const formattedMessage = this.lintType === "error" ? chalk.bold.red(this.lintMessage) : chalk.yellow(this.lintMessage);

    return `${formattedLintId} - node: ${formattedNode} - ${formattedMessage}`;
  }

}

module.exports = LintIssue;
