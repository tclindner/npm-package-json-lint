import {lint, ruleType} from '../../../src/rules/require-name';
import {Severity} from '../../../src/types/severity';

describe('require-name Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        name: 'name',
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBeNull();
    });
  });

  describe('when package.json does not have node', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('require-name');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('name');
      expect(response.lintMessage).toStrictEqual('name is required');
    });
  });
});
