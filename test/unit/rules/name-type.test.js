const ruleModule = require('../../../src/rules/name-type');

const {lint, ruleType} = ruleModule;

describe('name-type Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node with incorrect type', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        name: true
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('name-type');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('name');
      expect(response.lintMessage).toStrictEqual('Type should be a string');
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
