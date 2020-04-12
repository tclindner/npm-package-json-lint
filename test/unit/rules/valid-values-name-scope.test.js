const ruleModule = require('../../../src/rules/valid-values-name-scope');

const {lint, ruleType, minItems} = ruleModule;

describe('valid-values-name-scope Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "array"', () => {
      expect(ruleType).toStrictEqual('array');
    });
  });

  describe('a minItems value should be exported', () => {
    test('it should equal 1', () => {
      expect(minItems).toStrictEqual(1);
    });
  });

  describe('when package.json has node with invalid scope', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        name: '@great/awesome-package',
      };
      const validValues = ['@cool', '@awesome'];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response.lintId).toStrictEqual('valid-values-name-scope');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('name');
      expect(response.lintMessage).toStrictEqual('Invalid value for name scope');
    });
  });

  describe('when package.json has node without scope', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        name: 'awesome-package',
      };
      const validValues = ['@cool', '@awesome'];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response.lintId).toStrictEqual('valid-values-name-scope');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('name');
      expect(response.lintMessage).toStrictEqual('Invalid value for name scope');
    });
  });

  describe('when package.json has node with valid scope', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        name: '@cool/awesome-package',
      };
      const validValues = ['@cool', '@awesome'];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response).toBe(true);
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const validValues = ['@cool', '@awesome'];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response).toBe(true);
    });
  });
});
