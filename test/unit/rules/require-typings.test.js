const ruleModule = require('../../../src/rules/require-typings');

const {lint, ruleType} = ruleModule;

describe('require-typings Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        typings: './lib/main.d.ts',
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);
    });
  });

  describe('when package.json does not have node', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('require-typings');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('typings');
      expect(response.lintMessage).toStrictEqual('typings is required');
    });
  });
});
