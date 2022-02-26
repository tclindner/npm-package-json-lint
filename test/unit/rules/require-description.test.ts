import {lint, ruleType} from '../../../src/rules/require-description';
import {Severity} from '../../../src/types/severity';

describe('require-description Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        description: 'description',
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBeNull();
    });
  });

  describe('when package.json does not have node', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('require-description');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('description');
      expect(response.lintMessage).toStrictEqual('description is required');
    });
  });
});
