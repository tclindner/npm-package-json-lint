'use strict';

const ruleModule = require('./../../../src/rules/prefer-alphabetical-dependencies');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

describe('prefer-alphabetical-dependencies Unit Tests', function() {
  describe('a rule type value should be exported', function() {
    test('it should equal "standard"', function() {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node with an invalid order', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        dependencies: {
          'semver': '^5.3.0',
          'chalk': '^1.1.3',
          'user-home': '^2.0.0'
        }
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('prefer-alphabetical-dependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('dependencies');
      expect(response.lintMessage).toStrictEqual('Your dependencies are not in alphabetical order. Please move semver after chalk.');
    });
  });

  describe('when package.json has node with a valid order', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        dependencies: {
          'chalk': '^1.1.3',
          'semver': '^5.3.0',
          'user-home': '^2.0.0'
        }
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
