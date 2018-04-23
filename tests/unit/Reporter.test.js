'use strict';

const chalk = require('chalk');
const LintIssue = require('../../src/LintIssue');
const chai = require('chai');
const sinon = require('sinon');
const Reporter = require('./../../src/Reporter');

const should = chai.should();

describe('Reporter Unit Tests', function() {
  describe('write method', function() {
    context('when an array is passed', function() {
      const error = 'doh, I am an error';
      let spy;

      beforeEach(function() {
        spy = sinon.spy(console, 'log');
      });

      afterEach(function() {
        console.log.restore();
      });

      it('with an array with zero errors is passed a formatted message should be returned saying there are no errors', function() {
        const errors = [];
        const expectedCallCount = 0;

        Reporter.write(errors, 'errors');
        spy.callCount.should.equal(expectedCallCount);
      });

      it('when an array with one error is passed a formatted message should be returned saying there is one error', function() {
        const errors = [];
        const errorCount = 1;
        const output = chalk.red.bold.underline(`${errorCount} error`);

        errors.push(new LintIssue('Lint ID', 'severity', 'node', 'lintMessage'));

        Reporter.write(errors, 'errors');
        spy.calledThrice.should.be.true;
        spy.firstCall.calledWithExactly(output).should.be.true;
      });

      it('when an array with twos errors are passed a formatted message should be returned saying there are two errors', function() {
        const errors = [];
        const errorCount = 2;
        const output = chalk.red.bold.underline(`${errorCount} errors`);
        const writeMethodCallCount = 4;

        errors.push(new LintIssue('Lint ID', 'severity', 'node', 'lintMessage'));
        errors.push(new LintIssue('Lint ID', 'severity', 'node', 'lintMessage'));

        Reporter.write(errors, 'errors');
        spy.callCount.should.equal(writeMethodCallCount);
        spy.firstCall.calledWithExactly(output).should.be.true;
      });
    });
  });
});
