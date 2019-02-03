'use strict';

const ruleModule = require('./../../../src/rules/valid-values-license');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

describe('valid-values-license Unit Tests', function() {
  describe('a rule type value should be exported', function() {
    test('it should equal "array"', function() {
      expect(ruleType).toStrictEqual('array');
    });
  });

  describe('when package.json has node with incorrect value', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        license: 'MIT'
      };
      const validValues = [
        'private',
        'unlicensed'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response.lintId).toStrictEqual('valid-values-license');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('license');
      expect(response.lintMessage).toStrictEqual('Invalid value for license');
    });
  });

  describe('when package.json has node with correct value', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        license: 'unlicensed'
      };
      const validValues = [
        'private',
        'unlicensed'
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
