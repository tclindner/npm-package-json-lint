'use strict';

/* eslint max-nested-callbacks: "off" */

const chalk = require('chalk');
const chai = require('chai');
const requireHelper = require('../require_helper');
const LintIssue = requireHelper('LintIssue');
const logSymbols = require('log-symbols');

const should = chai.should();

describe('LintIssue Unit Tests', function() {
  describe('constructor', function() {
    context('when a new object is created', function() {
      const lintIssue = new LintIssue('lintId', 'lintType', 'node', 'lintMessage');

      it('the lintId should be set', function() {
        lintIssue.lintId.should.equal('lintId');
      });

      it('the lintType should be set', function() {
        lintIssue.lintType.should.equal('lintType');
      });

      it('the node should be set', function() {
        lintIssue.node.should.equal('node');
      });

      it('the lintMessage should be set', function() {
        lintIssue.lintMessage.should.equal('lintMessage');
      });
    });
  });

  describe('toString method', function() {
    context('when the lintType is an error', function() {
      it('the formattedMessage should equal', function() {
        const formattedLintId = chalk.gray.dim('lintId');
        const formattedNode = chalk.gray.bold('node');
        const formattedMessage = chalk.bold.red('lintMessage');
        const output = `${logSymbols.error} ${formattedLintId} - node: ${formattedNode} - ${formattedMessage}`;
        const lintIssue = new LintIssue('lintId', 'error', 'node', 'lintMessage');

        lintIssue.toString().should.equal(output);
      });

      it('when an array with one error is passed a formatted message should be returned saying there is one error', function() {
        const formattedLintId = chalk.gray.dim('lintId');
        const formattedNode = chalk.gray.bold('node');
        const formattedMessage = chalk.yellow('lintMessage');
        const output = `${logSymbols.warning} ${formattedLintId} - node: ${formattedNode} - ${formattedMessage}`;
        const lintIssue = new LintIssue('lintId', 'warning', 'node', 'lintMessage');

        lintIssue.toString().should.equal(output);
      });
    });
  });
});
