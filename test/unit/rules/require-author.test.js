const ruleModule = require('./../../../src/rules/require-author');

const {lint, ruleType} = ruleModule;

describe('require-author Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        author: 'author'
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);
    });
  });

  describe('when package.json does not have node', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('require-author');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('author');
      expect(response.lintMessage).toStrictEqual('author is required');
    });
  });
});
