import {lint, ruleType} from '../../../src/rules/type-type';
import {Severity} from '../../../src/types/severity';

describe('type-type Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node with correct type', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        type: 'module',
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBeNull();
    });
  });

  describe('when package.json has node with incorrect type', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        type: true,
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('type-type');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('type');
      expect(response.lintMessage).toStrictEqual('Type should be a string');
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
