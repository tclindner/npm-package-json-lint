import {lint, ruleType} from '../../../src/rules/private-type';
import {Severity} from '../../../src/types/severity';

describe('private-type Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node with incorrect type', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        private: 'string',
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('private-type');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('private');
      expect(response.lintMessage).toStrictEqual('Type should be a boolean');
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
