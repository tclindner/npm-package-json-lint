'use strict';

const chalk = require('chalk');
const LintIssue = require('../../src/LintIssue');
const chai = require('chai');
const sinon = require('sinon');
const Reporter = require('./../../src/Reporter');

const should = chai.should();

/* eslint-disable no-magic-numbers */

describe('Reporter Unit Tests', function() {
  describe('write method', function() {
    context('when results are for a single file', function() {
      const error = 'doh, I am an error';
      let spy;

      beforeEach(function() {
        spy = sinon.spy(console, 'log');
      });

      afterEach(function() {
        console.log.restore();
      });

      it('and zero errors, zero warnings exist, and quiet is false. Spy should be 0', function() {
        const results = {
          results: [
            {
              filePath: 'dummyText',
              issues: [],
              errorCount: 0,
              warningCount: 0
            }
          ],
          errorCount: 0,
          warningCount: 0
        };
        const expectedCallCount = 0;

        Reporter.write(results, false);
        spy.callCount.should.equal(expectedCallCount);
      });

      it('and one error, zero warning exist, and quiet is false. Spy should be 5', function() {
        const results = {
          results: [
            {
              filePath: 'dummyText',
              issues: [
                {
                  lintId: 'require-name',
                  severity: 'error',
                  node: 'name',
                  lintMessage: 'dummyText'
                }
              ],
              errorCount: 1,
              warningCount: 0
            }
          ],
          errorCount: 1,
          warningCount: 0
        };
        const expectedCallCount = 5;

        Reporter.write(results, false);
        spy.callCount.should.equal(expectedCallCount);
        spy.firstCall.calledWithExactly('').should.be.true;
        spy.secondCall.calledWithExactly(chalk.underline('dummyText')).should.be.true;

        // NOTE: getCall() is zero-based
        spy.getCall(3).calledWithExactly(chalk.red.bold('1 error')).should.be.true;
        spy.getCall(4).calledWithExactly(chalk.yellow.bold('0 warnings')).should.be.true;
      });

      it('and one error, one warning exist, and quiet is false. Spy should be 6', function() {
        const results = {
          results: [
            {
              filePath: 'dummyText',
              issues: [
                {
                  lintId: 'require-name',
                  severity: 'error',
                  node: 'name',
                  lintMessage: 'dummyText'
                },
                {
                  lintId: 'require-name',
                  severity: 'warning',
                  node: 'name',
                  lintMessage: 'dummyText'
                }
              ],
              errorCount: 1,
              warningCount: 1
            }
          ],
          errorCount: 1,
          warningCount: 1
        };
        const expectedCallCount = 6;

        Reporter.write(results, false);
        spy.callCount.should.equal(expectedCallCount);
        spy.firstCall.calledWithExactly('').should.be.true;
        spy.secondCall.calledWithExactly(chalk.underline('dummyText')).should.be.true;

        // NOTE: getCall() is zero-based
        spy.getCall(4).calledWithExactly(chalk.red.bold('1 error')).should.be.true;
        spy.getCall(5).calledWithExactly(chalk.yellow.bold('1 warning')).should.be.true;
      });

      it('and one error, one warning exist (filtered out), and quiet is true. Spy should be 4', function() {
        const results = {
          results: [
            {
              filePath: 'dummyText',
              issues: [
                {
                  lintId: 'require-name',
                  severity: 'error',
                  node: 'name',
                  lintMessage: 'dummyText'
                }
              ],
              errorCount: 1,
              warningCount: 0
            }
          ],
          errorCount: 1,
          warningCount: 0
        };
        const expectedCallCount = 4;

        Reporter.write(results, true);
        spy.callCount.should.equal(expectedCallCount);
        spy.firstCall.calledWithExactly('').should.be.true;
        spy.secondCall.calledWithExactly(chalk.underline('dummyText')).should.be.true;

        // NOTE: getCall() is zero-based
        spy.getCall(3).calledWithExactly(chalk.red.bold('1 error')).should.be.true;
      });

      it('and two errors, two warnings exist, and quiet is false. Spy should be 8', function() {
        const results = {
          results: [
            {
              filePath: 'dummyText',
              issues: [
                {
                  lintId: 'require-name',
                  severity: 'error',
                  node: 'name',
                  lintMessage: 'dummyText'
                },
                {
                  lintId: 'require-name',
                  severity: 'error',
                  node: 'name',
                  lintMessage: 'dummyText'
                },
                {
                  lintId: 'require-name',
                  severity: 'warning',
                  node: 'name',
                  lintMessage: 'dummyText'
                },
                {
                  lintId: 'require-name',
                  severity: 'warning',
                  node: 'name',
                  lintMessage: 'dummyText'
                }
              ],
              errorCount: 2,
              warningCount: 2
            }
          ],
          errorCount: 2,
          warningCount: 2
        };
        const expectedCallCount = 8;

        Reporter.write(results, false);
        spy.callCount.should.equal(expectedCallCount);
        spy.firstCall.calledWithExactly('').should.be.true;
        spy.secondCall.calledWithExactly(chalk.underline('dummyText')).should.be.true;

        // NOTE: getCall() is zero-based
        spy.getCall(6).calledWithExactly(chalk.red.bold('2 errors')).should.be.true;
        spy.getCall(7).calledWithExactly(chalk.yellow.bold('2 warnings')).should.be.true;
      });
    });

    context('when results are for more than one file', function() {
      const error = 'doh, I am an error';
      let spy;

      beforeEach(function() {
        spy = sinon.spy(console, 'log');
      });

      afterEach(function() {
        console.log.restore();
      });

      it('and one error in each file, zero warnings exist, and quiet is false. Spy should be 14', function() {
        const results = {
          results: [
            {
              filePath: 'dummyText',
              issues: [
                {
                  lintId: 'require-name',
                  severity: 'error',
                  node: 'name',
                  lintMessage: 'dummyText'
                }
              ],
              errorCount: 1,
              warningCount: 0
            },
            {
              filePath: 'dummyText2',
              issues: [
                {
                  lintId: 'require-name',
                  severity: 'error',
                  node: 'name',
                  lintMessage: 'dummyText'
                }
              ],
              errorCount: 1,
              warningCount: 0
            }
          ],
          errorCount: 2,
          warningCount: 0
        };
        const expectedCallCount = 14;

        Reporter.write(results, false);
        spy.callCount.should.equal(expectedCallCount);
        spy.firstCall.calledWithExactly('').should.be.true;
        spy.secondCall.calledWithExactly(chalk.underline('dummyText')).should.be.true;

        // NOTE: getCall() is zero-based
        spy.getCall(3).calledWithExactly(chalk.red.bold('1 error')).should.be.true;
        spy.getCall(4).calledWithExactly(chalk.yellow.bold('0 warnings')).should.be.true;
        spy.getCall(5).calledWithExactly('').should.be.true;
        spy.getCall(6).calledWithExactly(chalk.underline('dummyText2')).should.be.true;
        spy.getCall(8).calledWithExactly(chalk.red.bold('1 error')).should.be.true;
        spy.getCall(9).calledWithExactly(chalk.yellow.bold('0 warnings')).should.be.true;
        spy.getCall(10).calledWithExactly('').should.be.true;
        spy.getCall(11).calledWithExactly(chalk.underline('Totals')).should.be.true;
        spy.getCall(12).calledWithExactly(chalk.red.bold('2 errors')).should.be.true;
        spy.getCall(13).calledWithExactly(chalk.yellow.bold('0 warnings')).should.be.true;
      });

      it('and one error in each file, one warning exist (filtered out), and quiet is true. Spy should be 11', function() {
        const results = {
          results: [
            {
              filePath: 'dummyText',
              issues: [
                {
                  lintId: 'require-name',
                  severity: 'error',
                  node: 'name',
                  lintMessage: 'dummyText'
                }
              ],
              errorCount: 1,
              warningCount: 0
            },
            {
              filePath: 'dummyText2',
              issues: [
                {
                  lintId: 'require-name',
                  severity: 'error',
                  node: 'name',
                  lintMessage: 'dummyText'
                }
              ],
              errorCount: 1,
              warningCount: 0
            }
          ],
          errorCount: 2,
          warningCount: 0
        };
        const expectedCallCount = 11;

        Reporter.write(results, true);
        spy.callCount.should.equal(expectedCallCount);
        spy.firstCall.calledWithExactly('').should.be.true;
        spy.secondCall.calledWithExactly(chalk.underline('dummyText')).should.be.true;

        // NOTE: getCall() is zero-based
        spy.getCall(3).calledWithExactly(chalk.red.bold('1 error')).should.be.true;
        spy.getCall(4).calledWithExactly('').should.be.true;
        spy.getCall(5).calledWithExactly(chalk.underline('dummyText2')).should.be.true;
        spy.getCall(7).calledWithExactly(chalk.red.bold('1 error')).should.be.true;
        spy.getCall(8).calledWithExactly('').should.be.true;
        spy.getCall(9).calledWithExactly(chalk.underline('Totals')).should.be.true;
        spy.getCall(10).calledWithExactly(chalk.red.bold('2 errors')).should.be.true;
      });
    });
  });
});
