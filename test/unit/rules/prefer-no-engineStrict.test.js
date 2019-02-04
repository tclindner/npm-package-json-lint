'use strict';

const ruleModule = require('./../../../src/rules/prefer-no-engineStrict');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

describe('prefer-no-engineStrict Unit Tests', function() {
  describe('a rule type value should be exported', function() {
    test('it should equal "standard"', function() {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has engineStrict node', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        engineStrict: 'dummy-value'
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('prefer-no-engineStrict');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('engineStrict');
      expect(response.lintMessage).toStrictEqual('engineStrict was deprecated with npm v3.0.0. Please remove it from your package.json file');
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
