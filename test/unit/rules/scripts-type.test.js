'use strict';

const ruleModule = require('./../../../src/rules/scripts-type');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

describe('scripts-type Unit Tests', function() {
  describe('a rule type value should be exported', function() {
    test('it should equal "standard"', function() {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node with correct type', function() {
    test('true should be returned', function() {
      const packageJsonData = {
        scripts: {
          myscript: 'echo hello'
        }
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBeTruthy();
    });
  });

  describe('when package.json has node with incorrect type', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        scripts: 'scripts'
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('scripts-type');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('scripts');
      expect(response.lintMessage).toStrictEqual('Type should be an Object');
    });
  });

  describe('when package.json has node with correct type, but individual script has invalid type (bool)', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        scripts: {
          myscript: false
        }
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('scripts-type');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('scripts');
      expect(response.lintMessage).toStrictEqual('script, myscript, in the "scripts" property is not a string.');
    });
  });

  describe('when package.json has node with correct type, but individual script has invalid type (object)', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        scripts: {
          myscript: {
            hello: true
          }
        }
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('scripts-type');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('scripts');
      expect(response.lintMessage).toStrictEqual('script, myscript, in the "scripts" property is not a string.');
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
