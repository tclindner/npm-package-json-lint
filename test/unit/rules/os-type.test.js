const ruleModule = require('../../../src/rules/os-type');

const {lint, ruleType} = ruleModule;

describe('os-type Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node with incorrect type', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        os: true,
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('os-type');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('os');
      expect(response.lintMessage).toStrictEqual('Type should be an array');
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);
    });
  });
});
