'use strict';

const ruleModule = require('./../../../src/rules/description-format');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

describe('description-format Unit Tests', function() {
  describe('a rule type value should be exported', function() {
    test('it should equal "object"', function() {
      expect(ruleType).toStrictEqual('object');
    });
  });

  describe('when package.json has node with incorrect format', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        description: true
      };
      const config = {
        requireCapitalFirstLetter: true,
        requireEndingPeriod: true
      };
      const response = lint(packageJsonData, 'error', config);

      expect(response.lintId).toStrictEqual('description-format');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('description');
      expect(response.lintMessage).toStrictEqual('Type should be a string');
    });
  });

  describe('when package.json has node with lowercase first letter', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        description: 'lowercase'
      };
      const config = {
        requireCapitalFirstLetter: true
      };
      const response = lint(packageJsonData, 'error', config);

      expect(response.lintId).toStrictEqual('description-format');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('description');
      expect(response.lintMessage).toStrictEqual('The description should start with a capital letter. It currently starts with l.');
    });
  });

  describe('when package.json has node without period at end', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        description: 'My description'
      };
      const config = {
        requireEndingPeriod: true
      };
      const response = lint(packageJsonData, 'error', config);

      expect(response.lintId).toStrictEqual('description-format');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('description');
      expect(response.lintMessage).toStrictEqual('The description should end with a period.');
    });
  });

  describe('when package.json has node with correct format', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        description: 'My description.'
      };
      const config = {
        requireCapitalFirstLetter: true,
        requireEndingPeriod: true
      };
      const response = lint(packageJsonData, 'error', config);

      expect(response).toBeTruthy();
    });
  });

  describe('when no rule config passed', function() {
    test('true should be returned', function() {
      const packageJsonData = {
        description: 'lowercase'
      };
      const config = {};
      const response = lint(packageJsonData, 'error', config);

      expect(response).toBeTruthy();
    });
  });

  describe('when package.json does not have node', function() {
    test('true should be returned', function() {
      const packageJsonData = {};
      const config = {
        requireCapitalFirstLetter: true,
        requireEndingPeriod: true
      };
      const response = lint(packageJsonData, 'error', config);

      expect(response).toBeTruthy();
    });
  });
});
