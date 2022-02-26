import {lint, ruleType, minItems} from '../../../src/rules/valid-values-license';
import { Severity } from '../../../src/types/severity';

describe('valid-values-license Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "array"', () => {
      expect(ruleType).toStrictEqual('array');
    });
  });

  describe('a minItems value should be exported', () => {
    test('it should equal 1', () => {
      expect(minItems).toStrictEqual(1);
    });
  });

  describe('when package.json has node with incorrect value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        license: 'MIT',
      };
      const validValues = ['private', 'unlicensed'];
      const response = lint(packageJsonData, Severity.Error, validValues);

      expect(response.lintId).toStrictEqual('valid-values-license');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('license');
      expect(response.lintMessage).toStrictEqual('Invalid value for license');
    });
  });

  describe('when package.json has node with correct value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        license: 'unlicensed',
      };
      const validValues = ['private', 'unlicensed'];
      const response = lint(packageJsonData, Severity.Error, validValues);

      expect(response).toBeNull();
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, Severity.Error, 'valid');

      expect(response).toBeNull();
    });
  });
});
