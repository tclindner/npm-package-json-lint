const ruleModule = require('./../../../src/rules/require-config');

const {lint, ruleType} = ruleModule;

describe('require-config Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        config: 'config'
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);
    });
  });

  describe('when package.json does not have node', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('require-config');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('config');
      expect(response.lintMessage).toStrictEqual('config is required');
    });
  });
});
