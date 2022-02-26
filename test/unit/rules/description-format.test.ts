import {lint, ruleType} from '../../../src/rules/description-format';
import {Severity} from '../../../src/types/severity';

describe('description-format Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "object"', () => {
      expect(ruleType).toStrictEqual('object');
    });
  });

  describe('when package.json has node with incorrect format', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        description: true,
      };
      const config = {
        requireCapitalFirstLetter: true,
        requireEndingPeriod: true,
      };
      const response = lint(packageJsonData, Severity.Error, config);

      expect(response.lintId).toStrictEqual('description-format');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('description');
      expect(response.lintMessage).toStrictEqual('Type should be a string');
    });
  });

  describe('when package.json has node with lowercase first letter', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        description: 'lowercase',
      };
      const config = {
        requireCapitalFirstLetter: true,
      };
      const response = lint(packageJsonData, Severity.Error, config);

      expect(response.lintId).toStrictEqual('description-format');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('description');
      expect(response.lintMessage).toStrictEqual(
        'The description should start with a capital letter. It currently starts with l.'
      );
    });
  });

  describe('when package.json has requireEndingPeriod and forbidEndingPeriod set', () => {
    test('An exception should be thrown', () => {
      const packageJsonData = {
        description: 'My description',
      };
      const config = {
        forbidEndingPeriod: true,
        requireEndingPeriod: true,
      };

      expect(() => {
        lint(packageJsonData, Severity.Error, config);
      }).toThrow('description-format does not support `requireEndingPeriod` and `forbidEndingPeriod` being `true`.');
    });
  });

  describe('when package.json has node without period at end', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        description: 'My description',
      };
      const config = {
        requireEndingPeriod: true,
      };
      const response = lint(packageJsonData, Severity.Error, config);

      expect(response.lintId).toStrictEqual('description-format');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('description');
      expect(response.lintMessage).toStrictEqual('The description should end with a period.');
    });
  });

  describe('when package.json has node with period at end', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        description: 'My description.',
      };
      const config = {
        forbidEndingPeriod: true,
      };
      const response = lint(packageJsonData, Severity.Error, config);

      expect(response.lintId).toStrictEqual('description-format');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('description');
      expect(response.lintMessage).toStrictEqual('The description should not end with a period.');
    });
  });

  describe('when package.json has empty node', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        description: '',
      };
      const config = {
        requireCapitalFirstLetter: true,
      };
      const response = lint(packageJsonData, Severity.Error, config);

      expect(response).toBeNull();
    });
  });

  describe('when package.json has node with correct format', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        description: 'My description.',
      };
      const config = {
        requireCapitalFirstLetter: true,
        requireEndingPeriod: true,
      };
      const response = lint(packageJsonData, Severity.Error, config);

      expect(response).toBeNull();
    });
  });

  describe('when no rule config passed', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        description: 'lowercase',
      };
      const config = {};
      const response = lint(packageJsonData, Severity.Error, config);

      expect(response).toBeNull();
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const config = {
        requireCapitalFirstLetter: true,
        requireEndingPeriod: true,
      };
      const response = lint(packageJsonData, Severity.Error, config);

      expect(response).toBeNull();
    });
  });
});
