'use strict';

const ruleModule = require('./../../../src/rules/no-absolute-version-dependencies');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

describe('no-absolute-version-dependencies Unit Tests', function() {
  describe('a rule type value should be exported', function() {
    test('it should equal "standard"', function() {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node with an invalid value', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        dependencies: {
          'npm-package-json-lint': '1.0.0'
        }
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('no-absolute-version-dependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('dependencies');
      expect(response.lintMessage).toStrictEqual('You are using an invalid version range. Please do not use absolute versions.');
    });
  });

  describe('when package.json has node with an invalid value (= prefixed)', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        dependencies: {
          'npm-package-json-lint': '=1.0.0'
        }
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('no-absolute-version-dependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('dependencies');
      expect(response.lintMessage).toStrictEqual('You are using an invalid version range. Please do not use absolute versions.');
    });
  });

  describe('when package.json has node with a valid value', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        dependencies: {
          'gulp-npm-package-json-lint': '~1.0.0'
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
