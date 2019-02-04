'use strict';

const ruleModule = require('./../../../src/rules/valid-values-name-scope');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

describe('valid-values-name-scope Unit Tests', function() {
  describe('a rule type value should be exported', function() {
    test('it should equal "array"', function() {
      expect(ruleType).toStrictEqual('array');
    });
  });

  describe('when package.json has node with invalid scope', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        name: '@great/awesome-package'
      };
      const validValues = [
        '@cool',
        '@awesome'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response.lintId).toStrictEqual('valid-values-name-scope');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('name');
      expect(response.lintMessage).toStrictEqual('Invalid value for name scope');
    });
  });

  describe('when package.json has node without scope', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        name: 'awesome-package'
      };
      const validValues = [
        '@cool',
        '@awesome'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response.lintId).toStrictEqual('valid-values-name-scope');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('name');
      expect(response.lintMessage).toStrictEqual('Invalid value for name scope');
    });
  });

  describe('when package.json has node with valid scope', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        name: '@cool/awesome-package'
      };
      const validValues = [
        '@cool',
        '@awesome'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response).toBeTruthy();
    });
  });

  describe('when package.json does not have node', function() {
    test('true should be returned', function() {
      const packageJsonData = {};
      const validValues = [
        '@cool',
        '@awesome'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response).toBeTruthy();
    });
  });
});
