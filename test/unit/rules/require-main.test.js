const ruleModule = require('./../../../src/rules/require-main');

const {lint, ruleType} = ruleModule;

describe('require-main Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        main: 'main'
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBeTruthy();
    });
  });

  describe('when package.json does not have node', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('require-main');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('main');
      expect(response.lintMessage).toStrictEqual('main is required');
    });
  });
});
