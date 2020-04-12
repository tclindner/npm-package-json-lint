const ruleModule = require('../../../src/rules/require-os');

const {lint, ruleType} = ruleModule;

describe('require-os Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        os: 'os'
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);
    });
  });

  describe('when package.json does not have node', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('require-os');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('os');
      expect(response.lintMessage).toStrictEqual('os is required');
    });
  });
});
