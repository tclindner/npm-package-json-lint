import {lint, ruleType} from '../../../src/rules/require-keywords';
import {Severity} from '../../../src/types/severity';

describe('require-keywords Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        keywords: 'keywords',
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBeNull();
    });
  });

  describe('when package.json does not have node', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('require-keywords');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('keywords');
      expect(response.lintMessage).toStrictEqual('keywords is required');
    });
  });
});
