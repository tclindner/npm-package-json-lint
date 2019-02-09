'use strict';

const ruleModule = require('./../../../src/rules/prefer-property-order');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

describe('prefer-property-order Unit Tests', function() {
  describe('a rule type value should be exported', function() {
    test('it should equal "array"', function() {
      expect(ruleType).toStrictEqual('array');
    });
  });

  describe('when the properties in the package.json file are in the desired order', function() {
    test('true should be returned', function() {
      const packageJsonData = {
        name: 'awesome-module',
        version: '1.0.0',
        description: 'description'
      };
      const preferredOrder = [
        'name',
        'version',
        'description'
      ];
      const response = lint(packageJsonData, 'error', preferredOrder);

      expect(response).toBeTruthy();
    });
  });

  describe('when the actual node list does not have the same number of nodes as the desired list', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        name: 'awesome-module',
        version: '1.0.0'
      };
      const preferredOrder = [
        'name',
        'version',
        'description'
      ];
      const response = lint(packageJsonData, 'error', preferredOrder);

      expect(response).toBeTruthy();
    });
  });

  describe('when the actual node list is in a different order than desired', function() {
    test('LintIssue object should be returned', function() {
      const packageJsonData = {
        name: 'awesome-module',
        description: 'description',
        version: '1.0.0'
      };
      const preferredOrder = [
        'name',
        'version',
        'description'
      ];
      const response = lint(packageJsonData, 'error', preferredOrder);

      expect(response.lintId).toStrictEqual('prefer-property-order');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('');
      expect(response.lintMessage).toStrictEqual('Your package.json properties are not in the desired order. Please move "description" after "version".');
    });
  });
});
