import {lint, ruleType} from '../../../src/rules/name-format';
import {Severity} from '../../../src/types/severity';

describe('name-format Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node with incorrect format', () => {
    test('not lowercase - LintIssue object should be returned', () => {
      const packageJsonData = {
        name: 'ImNotLowercase',
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('name-format');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('name');
      expect(response.lintMessage).toStrictEqual('name can no longer contain capital letters');
    });

    test('contains space - LintIssue object should be returned', () => {
      const packageJsonData = {
        name: 'contains space',
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('name-format');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('name');
      expect(response.lintMessage).toStrictEqual('name can only contain URL-friendly characters');
    });

    test('exceeds max length - LintIssue object should be returned', () => {
      const packageJsonData = {
        name: 'a'.padStart(215, 'a'),
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('name-format');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('name');
      expect(response.lintMessage).toStrictEqual('name can no longer contain more than 214 characters');
    });

    test('starts with . and no scope - LintIssue object should be returned', () => {
      const packageJsonData = {
        name: '.lowercase',
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('name-format');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('name');
      expect(response.lintMessage).toStrictEqual('name cannot start with a period');
    });

    test('starts with _ and no scope - LintIssue object should be returned', () => {
      const packageJsonData = {
        name: '_lowercase',
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('name-format');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('name');
      expect(response.lintMessage).toStrictEqual('name cannot start with an underscore');
    });
  });

  describe('when package.json has node with correct format', () => {
    test('all valid characters - true should be returned', () => {
      const packageJsonData = {
        name: 'lowercase-name',
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);
    });

    test('starts with . and has scope - true should be returned', () => {
      const packageJsonData = {
        name: '@foo/.lowercase',
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);
    });

    test('starts with _ and has scope - true should be returned', () => {
      const packageJsonData = {
        name: '@foo/_lowercase',
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBeNull();
    });
  });
});
