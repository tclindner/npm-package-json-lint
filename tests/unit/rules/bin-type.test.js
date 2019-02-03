'use strict';

const ruleModule = require('./../../../src/rules/bin-type');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

describe('bin-type Unit Tests', function() {
  describe('a rule type value should be exported', function() {
    test('it should equal "standard"', function() {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node with incorrect type', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        bin: true
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('bin-type');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('bin');
      expect(response.lintMessage).toStrictEqual('Type should be either a string or an Object');
    });
  });

  describe('when package.json does not have node', function() {
    test('true should be returned', function() {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      expect(response).toBeTruthy();
    });
  });
});
