'use strict';

const ruleModule = require('./../../../src/rules/valid-values-author');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

describe('valid-values-author Unit Tests', function() {
  describe('a rule type value should be exported', function() {
    test('it should equal "array"', function() {
      expect(ruleType).toStrictEqual('array');
    });
  });

  describe('when package.json has string node with invalid value', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        author: 'LastName, FirstName'
      };
      const validValues = [
        'FirstName LastName',
        'FirstName MiddleName LastName'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response.lintId).toStrictEqual('valid-values-author');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('author');
      expect(response.lintMessage).toStrictEqual('Invalid value for author');
    });
  });

  describe('when package.json has string node with valid value', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        author: 'LastName, FirstName'
      };
      const validValues = [
        'FirstName LastName',
        'FirstName MiddleName LastName',
        'LastName, FirstName'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response).toBeTruthy();
    });
  });

  describe('when package.json has object node with invalid value', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        author: {
          name: 'LastName, FirstName',
          url: 'http://www.example.com'
        }
      };
      const validValues = [
        'FirstName LastName',
        'FirstName MiddleName LastName'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response.lintId).toStrictEqual('valid-values-author');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('author');
      expect(response.lintMessage).toStrictEqual('Invalid value for author');
    });
  });

  describe('when package.json has object node with valid value', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        author: {
          name: 'LastName, FirstName',
          url: 'http://www.example.com'
        }
      };
      const validValues = [
        'FirstName LastName',
        'FirstName MiddleName LastName',
        'LastName, FirstName'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response).toBeTruthy();
    });
  });

  describe('when package.json has object node but is missing the name property', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        author: {
          names: 'LastName, FirstName',
          url: 'http://www.example.com'
        }
      };
      const validValues = [
        'FirstName LastName',
        'FirstName MiddleName LastName'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response.lintId).toStrictEqual('valid-values-author');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('author');
      expect(response.lintMessage).toStrictEqual('author object missing name property');
    });
  });

  describe('when package.json has node but is invalid type', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        author: true
      };
      const validValues = [
        'FirstName LastName',
        'FirstName MiddleName LastName'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response.lintId).toStrictEqual('valid-values-author');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('author');
      expect(response.lintMessage).toStrictEqual('author node has invalid data type');
    });
  });

  describe('when package.json does not have node', function() {
    test('true should be returned', function() {
      const packageJsonData = {};
      const validValues = [
        'FirstName LastName',
        'FirstName MiddleName LastName',
        'LastName, FirstName'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response).toBeTruthy();
    });
  });
});
