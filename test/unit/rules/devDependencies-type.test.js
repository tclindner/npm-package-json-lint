'use strict';

const ruleModule = require('./../../../src/rules/devDependencies-type');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

describe('devDependencies-type Unit Tests', function() {
  describe('a rule type value should be exported', function() {
    test('it should equal "standard"', function() {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node with incorrect type', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        devDependencies: 'devDependencies'
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('devDependencies-type');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('devDependencies');
      expect(response.lintMessage).toStrictEqual('Type should be an Object');
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
