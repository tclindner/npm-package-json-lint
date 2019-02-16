const chalk = require('chalk');
const logSymbols = require('log-symbols');

class LintIssue {
  /**
   * constructor
   * @param  {String} lintId      Unique, lowercase, hyphen-separate name for the lint
   * @param  {String} severity    'error' or 'warning'
   * @param  {String} node        Name of the node in the JSON the lint audits
   * @param  {String} lintMessage Human-friendly message to users
   */
  constructor(lintId, severity, node, lintMessage) {
    this.lintId = lintId;
    this.severity = severity;
    this.node = node;
    this.lintMessage = lintMessage;
  }

  /**
   * Helper to convert the LintIssue to a printable string
   * @return {String} Human-friendly message about the lint issue
   */
  toString() {
    const logSymbol = this.severity === 'error' ? logSymbols.error : logSymbols.warning;
    const formattedLintId = chalk.gray.dim(this.lintId);
    const formattedNode = chalk.gray.bold(this.node);
    const formattedMessage = this.severity === 'error' ? chalk.bold.red(this.lintMessage) : chalk.yellow(this.lintMessage);

    return `${logSymbol} ${formattedLintId} - node: ${formattedNode} - ${formattedMessage}`;
  }
}

module.exports = LintIssue;
