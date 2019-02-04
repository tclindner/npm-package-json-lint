'use strict';

const ruleModule = require('./../../../src/rules/valid-values-engines');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

describe('valid-values-engines Unit Tests', function() {
  describe('a rule type value should be exported', function() {
    test('it should equal "array"', function() {
      expect(ruleType).toStrictEqual('array');
    });
  });

  describe('when package.json has object node with invalid value', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        engines: {
          node: '^6.0.0'
        }
      };
      const validValues = [
        {
          node: '^6.0.0',
          npm: '^3.0.0'
        },
        {node: '^8.0.0'}
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response.lintId).toStrictEqual('valid-values-engines');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('engines');
      expect(response.lintMessage).toStrictEqual('Invalid value for engines');
    });
  });

  describe('when package.json has object node with vvalid value, but invalid version range', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        engines: {
          node: '^6.a.0'
        }
      };
      const validValues = [
        {node: '^6.a.0'}
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response.lintId).toStrictEqual('valid-values-engines');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('engines');
      expect(response.lintMessage).toStrictEqual('engines, node version range is invalid. Currently set to ^6.a.0');
    });
  });

  describe('when package.json has object node with valid value', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        engines: {
          node: '^6.0.0',
          npm: '^3.0.0'
        }
      };
      const validValues = [
        {
          node: '^6.0.0',
          npm: '^3.0.0'
        },
        {
          node: '^8.0.0',
          npm: '^5.0.0'
        }
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response).toBeTruthy();
    });
  });

  describe('when package.json has node but is invalid type', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        engines: true
      };
      const validValues = [
        {
          node: '^6.0.0',
          npm: '^3.0.0'
        },
        {
          node: '^8.0.0',
          npm: '^5.0.0'
        }
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response.lintId).toStrictEqual('valid-values-engines');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('engines');
      expect(response.lintMessage).toStrictEqual('engines node has invalid data type');
    });
  });

  describe('when package.json does not have node', function() {
    test('true should be returned', function() {
      const packageJsonData = {};
      const validValues = [
        {
          node: '^6.0.0',
          npm: '^3.0.0'
        },
        {node: '^8.0.0'}
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response).toBeTruthy();
    });
  });
});
