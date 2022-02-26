import {lint, ruleType} from '../../../src/rules/repository-type';
import {Severity} from '../../../src/types/severity';

describe('repository-type Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node with incorrect type', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        repository: true,
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('repository-type');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('repository');
      expect(response.lintMessage).toStrictEqual('Type should be either a string or an Object');
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBe(true);
    });
  });
});
