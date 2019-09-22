const ruleModule = require('./../../../src/rules/valid-values-private');

const {lint, ruleType} = ruleModule;

describe('valid-values-private Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "array"', () => {
      expect(ruleType).toStrictEqual('array');
    });
  });

  describe('when package.json has node with incorrect format', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        private: true
      };
      const validValues = [false];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response.lintId).toStrictEqual('valid-values-private');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('private');
      expect(response.lintMessage).toStrictEqual('Invalid value for private');
    });
  });

  describe('when package.json has node with correct format', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        private: false
      };
      const validValues = [false];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response).toBe(true);
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
