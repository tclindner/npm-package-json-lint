'use strict';

const ruleModule = require('./../../../src/rules/valid-values-publishConfig');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

describe('valid-values-publishConfig Unit Tests', function() {
  describe('a rule type value should be exported', function() {
    test('it should equal "array"', function() {
      expect(ruleType).toStrictEqual('array');
    });
  });

  describe('when package.json has object node with invalid value', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        publishConfig: {
          access: 'public'
        }
      };
      const validValues = [
        {access: 'private'},
        {access: 'protected'}
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response.lintId).toStrictEqual('valid-values-publishConfig');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('publishConfig');
      expect(response.lintMessage).toStrictEqual('Invalid value for publishConfig');
    });
  });

  describe('when package.json has object node with valid value', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        publishConfig: {
          access: 'public'
        }
      };
      const validValues = [
        {access: 'private'},
        {access: 'public'}
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response).toBeTruthy();
    });
  });

  describe('when package.json has node but is invalid type', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        publishConfig: true
      };
      const validValues = [
        {access: 'private'},
        {access: 'protected'}
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response.lintId).toStrictEqual('valid-values-publishConfig');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('publishConfig');
      expect(response.lintMessage).toStrictEqual('publishConfig node has invalid data type');
    });
  });

  describe('when package.json does not have node', function() {
    test('true should be returned', function() {
      const packageJsonData = {};
      const validValues = [
        {access: 'private'},
        {access: 'protected'}
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response).toBeTruthy();
    });
  });
});
