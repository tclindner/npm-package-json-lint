const chalk = require('chalk');
const logSymbols = require('log-symbols');

class LintIssue {
  /**
   * A lint issue. It could be an error or a warning.
   * @typedef {Object} LintIssue
   * @property {string} lintId      Unique, lowercase, hyphen-separate name for the lint
   * @property {string} severity    'error' or 'warning'
   * @property {string} node        Name of the node in the JSON the lint audits
   * @property {string} lintMessage Human-friendly message to users
   */

  /**
   * constructor
   * @param  {String} lintId      Unique, lowercase, hyphen-separate name for the lint
   * @param  {String} severity    'error' or 'warning'
   * @param  {String} node        Name of the node in the JSON the lint audits
   * @param  {String} lintMessage Human-friendly message to users
   * @returns {LintIssue} An instance of {@link LintIssue}.
   */
  constructor(lintId, severity, node, lintMessage) {
    this.lintId = lintId;
    this.severity = severity;
    this.node = node;
    this.lintMessage = lintMessage;
  }

  /**
   * Helper to convert the LintIssue to a printable string
   * @returns {string} Human-friendly message about the lint issue
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
