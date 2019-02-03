'use strict';

const ruleModule = require('./../../../src/rules/version-format');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

describe('version-format Unit Tests', function() {
  describe('a rule type value should be exported', function() {
    test('it should equal "standard"', function() {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node with invalid version', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        version: '1.a.0'
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('version-format');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('version');
      expect(response.lintMessage).toStrictEqual('Format must be a valid semantic version');
    });
  });

  describe('when package.json has node with valid version', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        version: '1.0.0'
      };
      const response = lint(packageJsonData, 'error');

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
