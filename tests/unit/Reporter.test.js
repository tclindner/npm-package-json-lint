'use strict';

const chalk = require('chalk');
const Reporter = require('./../../src/Reporter');

/* eslint-disable no-magic-numbers */

describe('Reporter Unit Tests', function() {
  describe('write method', function() {
    describe('when results are for a single file', function() {
      test('and zero errors, zero warnings exist, and quiet is false. Spy should be 0', function() {
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

        jest.spyOn(console, 'log');

        Reporter.write(results, false);
        expect(console.log).toHaveBeenCalledTimes(expectedCallCount);
      });

      test('and one error, zero warning exist, and quiet is false. Spy should be 5', function() {
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

        jest.spyOn(console, 'log');

        Reporter.write(results, false);
        expect(console.log).toHaveBeenCalledTimes(expectedCallCount);
        expect(console.log).toHaveBeenNthCalledWith(1, '');
        expect(console.log).toHaveBeenNthCalledWith(2, chalk.underline('dummyText'));
        expect(console.log).toHaveBeenNthCalledWith(3, chalk.red.bold('1 error'));
        expect(console.log).toHaveBeenNthCalledWith(4, chalk.yellow.bold('0 warnings'));
      });

      test('and one error, one warning exist, and quiet is false. Spy should be 6', function() {
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

        jest.spyOn(console, 'log');

        Reporter.write(results, false);
        expect(console.log).toHaveBeenCalledTimes(expectedCallCount);
        expect(console.log).toHaveBeenNthCalledWith(1, '');
        expect(console.log).toHaveBeenNthCalledWith(2, chalk.underline('dummyText'));

        // NOTE: getCall() is zero-based
        expect(console.log).toHaveBeenNthCalledWith(4, chalk.red.bold('1 error'));
        expect(console.log).toHaveBeenNthCalledWith(5, chalk.yellow.bold('1 warning'));
      });

      test('and one error, one warning exist (filtered out), and quiet is true. Spy should be 4', function() {
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

        jest.spyOn(console, 'log');

        Reporter.write(results, true);
        expect(console.log).toHaveBeenCalledTimes(expectedCallCount);
        expect(console.log).toHaveBeenNthCalledWith(1, '');
        expect(console.log).toHaveBeenNthCalledWith(2, chalk.underline('dummyText'));
        expect(console.log).toHaveBeenNthCalledWith(3, chalk.red.bold('1 error'));
      });

      test('and two errors, two warnings exist, and quiet is false. Spy should be 8', function() {
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

        jest.spyOn(console, 'log');

        Reporter.write(results, false);
        expect(console.log).toHaveBeenCalledTimes(expectedCallCount);
        expect(console.log).toHaveBeenNthCalledWith(1, '');
        expect(console.log).toHaveBeenNthCalledWith(2, chalk.underline('dummyText'));
        expect(console.log).toHaveBeenNthCalledWith(6, chalk.red.bold('2 errors'));
        expect(console.log).toHaveBeenNthCalledWith(7, chalk.yellow.bold('2 warnings'));
      });
    });

    describe('when results are for more than one file', function() {
      test('and one error in each file, zero warnings exist, and quiet is false. Spy should be 14', function() {
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

        jest.spyOn(console, 'log');

        Reporter.write(results, false);
        
        expect(console.log).toHaveBeenCalledTimes(expectedCallCount);
        expect(console.log).toHaveBeenNthCalledWith(1, '');
        expect(console.log).toHaveBeenNthCalledWith(2, chalk.underline('dummyText'));
        expect(console.log).toHaveBeenNthCalledWith(3, chalk.red.bold('1 error'));
        expect(console.log).toHaveBeenNthCalledWith(4, chalk.yellow.bold('0 warnings'));
        expect(console.log).toHaveBeenNthCalledWith(5, '');
        expect(console.log).toHaveBeenNthCalledWith(6, chalk.underline('dummyText2'));
        expect(console.log).toHaveBeenNthCalledWith(8, chalk.red.bold('1 error'));
        expect(console.log).toHaveBeenNthCalledWith(9, chalk.yellow.bold('0 warnings'));
        expect(console.log).toHaveBeenNthCalledWith(10, '');
        expect(console.log).toHaveBeenNthCalledWith(11, chalk.underline('Totals'));
        expect(console.log).toHaveBeenNthCalledWith(12, chalk.red.bold('2 errors'));
        expect(console.log).toHaveBeenNthCalledWith(13, chalk.yellow.bold('0 warnings'));
      });

      test('and one error in each file, one warning exist (filtered out), and quiet is true. Spy should be 11', function() {
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

        jest.spyOn(console, 'log');

        Reporter.write(results, true);
        expect(console.log).toHaveBeenCalledTimes(expectedCallCount);
        expect(console.log).toHaveBeenNthCalledWith(1, '');
        expect(console.log).toHaveBeenNthCalledWith(2, chalk.underline('dummyText'));
        expect(console.log).toHaveBeenNthCalledWith(3, chalk.red.bold('1 error'));
        expect(console.log).toHaveBeenNthCalledWith(4, '');
        expect(console.log).toHaveBeenNthCalledWith(5, chalk.underline('dummyText2'));
        expect(console.log).toHaveBeenNthCalledWith(7, chalk.red.bold('1 error'));
        expect(console.log).toHaveBeenNthCalledWith(8, '');
        expect(console.log).toHaveBeenNthCalledWith(9, chalk.underline('Totals'));
        expect(console.log).toHaveBeenNthCalledWith(10, chalk.red.bold('2 errors'));
      });
    });
  });
});
