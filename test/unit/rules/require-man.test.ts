import {lint, ruleType} from '../../../src/rules/require-man';
import {Severity} from '../../../src/types/severity';

describe('require-man Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        man: 'man',
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBe(true);
    });
  });

  describe('when package.json does not have node', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('require-man');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('man');
      expect(response.lintMessage).toStrictEqual('man is required');
    });
  });
});
