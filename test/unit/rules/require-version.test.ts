import {lint, ruleType} from '../../../src/rules/require-version';
import {Severity} from '../../../src/types/severity';

describe('require-version Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        version: 'version',
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBeNull();
    });
  });

  describe('when package.json does not have node', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('require-version');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('version');
      expect(response.lintMessage).toStrictEqual('version is required');
    });
  });
});
