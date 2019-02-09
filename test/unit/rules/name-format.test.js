const ruleModule = require('./../../../src/rules/name-format');

const {lint, ruleType} = ruleModule;

describe('name-format Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node with incorrect format', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        name: 'ImNotLowercase'
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('name-format');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('name');
      expect(response.lintMessage).toStrictEqual('Format should be all lowercase');
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      expect(response).toBeTruthy();
    });
  });
});
