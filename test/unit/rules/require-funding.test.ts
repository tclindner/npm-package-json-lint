import {lint, ruleType} from '../../../src/rules/require-funding';

describe('require-funding Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        funding: 'funding',
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);
    });
  });

  describe('when package.json does not have node', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('require-funding');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('funding');
      expect(response.lintMessage).toStrictEqual('funding is required');
    });
  });
});
