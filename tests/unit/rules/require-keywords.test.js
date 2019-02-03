'use strict';

const ruleModule = require('./../../../src/rules/require-keywords');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

describe('require-keywords Unit Tests', function() {
  describe('a rule type value should be exported', function() {
    test('it should equal "standard"', function() {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node', function() {
    test('true should be returned', function() {
      const packageJsonData = {
        keywords: 'keywords'
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBeTruthy();
    });
  });

  describe('when package.json does not have node', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('require-keywords');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('keywords');
      expect(response.lintMessage).toStrictEqual('keywords is required');
    });
  });
});
