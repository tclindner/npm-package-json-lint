import {lint, ruleType} from '../../../src/rules/require-engines';
import {Severity} from '../../../src/types/severity';

describe('require-engines Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        engines: 'engines',
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBeNull();
    });
  });

  describe('when package.json does not have node', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('require-engines');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('engines');
      expect(response.lintMessage).toStrictEqual('engines is required');
    });
  });
});
