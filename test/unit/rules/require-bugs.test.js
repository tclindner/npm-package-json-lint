const ruleModule = require('../../../src/rules/require-bugs');

const {lint, ruleType} = ruleModule;

describe('require-bugs Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        bugs: 'bugs'
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);
    });
  });

  describe('when package.json does not have node', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('require-bugs');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('bugs');
      expect(response.lintMessage).toStrictEqual('bugs is required');
    });
  });
});
