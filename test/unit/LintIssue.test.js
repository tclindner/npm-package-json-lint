const chalk = require('chalk');
const logSymbols = require('log-symbols');
const LintIssue = require('../../src/LintIssue');

describe('LintIssue Unit Tests', () => {
  describe('constructor', () => {
    describe('when a new object is created', () => {
      const lintIssue = new LintIssue('lintId', 'severity', 'node', 'lintMessage');

      test('the lintId should be set', () => {
        expect(lintIssue.lintId).toStrictEqual('lintId');
      });

      test('the severity should be set', () => {
        expect(lintIssue.severity).toStrictEqual('severity');
      });

      test('the node should be set', () => {
        expect(lintIssue.node).toStrictEqual('node');
      });

      test('the lintMessage should be set', () => {
        expect(lintIssue.lintMessage).toStrictEqual('lintMessage');
      });
    });
  });

  describe('toString method', () => {
    describe('when the severity is an error', () => {
      test('the formattedMessage should equal', () => {
        const formattedLintId = chalk.gray.dim('lintId');
        const formattedNode = chalk.gray.bold('node');
        const formattedMessage = chalk.bold.red('lintMessage');
        const output = `${logSymbols.error} ${formattedLintId} - node: ${formattedNode} - ${formattedMessage}`;
        const lintIssue = new LintIssue('lintId', 'error', 'node', 'lintMessage');

        expect(lintIssue.toString()).toStrictEqual(output);
      });

      test('when an array with one error is passed a formatted message should be returned saying there is one error', () => {
        const formattedLintId = chalk.gray.dim('lintId');
        const formattedNode = chalk.gray.bold('node');
        const formattedMessage = chalk.yellow('lintMessage');
        const output = `${logSymbols.warning} ${formattedLintId} - node: ${formattedNode} - ${formattedMessage}`;
        const lintIssue = new LintIssue('lintId', 'warning', 'node', 'lintMessage');

        expect(lintIssue.toString()).toStrictEqual(output);
      });
    });
  });
});
