'use strict';

const ruleModule = require('./../../../src/rules/prefer-alphabetical-peerDependencies');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

describe('prefer-alphabetical-peerDependencies Unit Tests', function() {
  describe('a rule type value should be exported', function() {
    test('it should equal "standard"', function() {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node with an invalid order', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        peerDependencies: {
          'semver': '^5.3.0',
          'chalk': '^1.1.3',
          'user-home': '^2.0.0'
        }
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('prefer-alphabetical-peerDependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('peerDependencies');
      expect(response.lintMessage).toStrictEqual('Your peerDependencies are not in alphabetical order. Please move semver after chalk.');
    });
  });

  describe('when package.json has node with a valid order', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        peerDependencies: {
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
