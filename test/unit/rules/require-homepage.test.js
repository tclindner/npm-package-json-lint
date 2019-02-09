const ruleModule = require('./../../../src/rules/require-homepage');

const {lint, ruleType} = ruleModule;

describe('require-homepage Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        homepage: 'homepage'
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBeTruthy();
    });
  });

  describe('when package.json does not have node', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('require-homepage');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('homepage');
      expect(response.lintMessage).toStrictEqual('homepage is required');
    });
  });
});
