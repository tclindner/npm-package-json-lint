'use strict';

const ruleModule = require('./../../../src/rules/valid-values-private');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

describe('valid-values-private Unit Tests', function() {
  describe('a rule type value should be exported', function() {
    test('it should equal "array"', function() {
      expect(ruleType).toStrictEqual('array');
    });
  });

  describe('when package.json has node with incorrect format', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        'private': true
      };
      const validValues = [
        false
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response.lintId).toStrictEqual('valid-values-private');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('private');
      expect(response.lintMessage).toStrictEqual('Invalid value for private');
    });
  });

  describe('when package.json has node with correct format', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        'private': false
      };
      const validValues = [
        false
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response).toBeTruthy();
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
