'use strict';

const ruleModule = require('./../../../src/rules/no-restricted-pre-release-dependencies');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

describe('no-restricted-pre-release-dependencies Unit Tests', function() {
  describe('a rule type value should be exported', function() {
    test('it should equal "array"', function() {
      expect(ruleType).toStrictEqual('array');
    });
  });

  describe('when package.json has node with a restricted value', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        dependencies: {
          'npm-package-json-lint': '^1.0.0-beta'
        }
      };
      const invldPreReleaseDeps = [
        'npm-package-json-lint',
        'grunt-npm-package-json-lint'
      ];
      const response = lint(packageJsonData, 'error', invldPreReleaseDeps);

      expect(response.lintId).toStrictEqual('no-restricted-pre-release-dependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('dependencies');
      expect(response.lintMessage).toStrictEqual('You are using a restricted pre-release dependency. Please remove it.');
    });
  });

  describe('when package.json has node with a valid value', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        dependencies: {
          'grunt-npm-package-json-lint': '^1.0.0'
        }
      };
      const invldPreReleaseDeps = [
        'npm-package-json-lint',
        'grunt-npm-package-json-lint'
      ];
      const response = lint(packageJsonData, 'error', invldPreReleaseDeps);

      expect(response).toBeTruthy();
    });
  });

  describe('when package.json does not have node', function() {
    test('true should be returned', function() {
      const packageJsonData = {};
      const invldPreReleaseDeps = [
        'npm-package-json-lint',
        'grunt-npm-package-json-lint'
      ];
      const response = lint(packageJsonData, 'error', invldPreReleaseDeps);

      expect(response).toBeTruthy();
    });
  });
});
