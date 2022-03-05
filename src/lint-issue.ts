import chalk from 'chalk';
import logSymbols from 'log-symbols';
import {Severity} from './types/severity';

/**
 * A lint issue
 */
export class LintIssue {
  /**
   * Unique, lowercase, hyphen-separate name for the lint
   *
   * @type {string}
   * @memberof LintIssue
   */
  lintId: string;

  /**
   * 'error' or 'warning'
   *
   * @type {Severity}
   * @memberof LintIssue
   */
  severity: Severity;

  /**
   * Name of the node in the JSON the lint audits
   *
   * @type {string}
   * @memberof LintIssue
   */
  node: string;

  /**
   * Human-friendly message to users
   *
   * @type {string}
   * @memberof LintIssue
   */
  lintMessage: string;

  /**
   * Creates an instance of LintIssue.
   * @param lintId Unique, lowercase, hyphen-separate name for the lint
   * @param severity 'error' or 'warning'
   * @param node Name of the node in the JSON the lint audits
   * @param lintMessage Human-friendly message to users
   * @memberof LintIssue
   */
  constructor(lintId: string, severity: Severity, node: string, lintMessage: string) {
    this.lintId = lintId;
    this.severity = severity;
    this.node = node;
    this.lintMessage = lintMessage;
  }

  /**
   * Helper to convert the LintIssue to a printable string
   *
   * @returns {string} Human-friendly message about the lint issue
   */
  toString(): string {
    const logSymbol = this.severity === Severity.Error ? logSymbols.error : logSymbols.warning;
    const formattedLintId = chalk.gray.dim(this.lintId);
    const formattedNode = chalk.gray.bold(this.node);
    const formattedMessage =
      this.severity === Severity.Error ? chalk.bold.red(this.lintMessage) : chalk.yellow(this.lintMessage);

    return `${logSymbol} ${formattedLintId} - node: ${formattedNode} - ${formattedMessage}`;
  }
}
