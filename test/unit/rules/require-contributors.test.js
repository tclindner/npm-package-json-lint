const ruleModule = require('./../../../src/rules/require-contributors');

const {lint, ruleType} = ruleModule;

describe('require-contributors Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        contributors: 'contributors'
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBeTruthy();
    });
  });

  describe('when package.json does not have node', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('require-contributors');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('contributors');
      expect(response.lintMessage).toStrictEqual('contributors is required');
    });
  });
});
