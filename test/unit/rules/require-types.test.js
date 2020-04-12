const ruleModule = require('../../../src/rules/require-types');

const {lint, ruleType} = ruleModule;

describe('require-types Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        types: './lib/main.d.ts',
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);
    });
  });

  describe('when package.json does not have node', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('require-types');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('types');
      expect(response.lintMessage).toStrictEqual('types is required');
    });
  });
});
