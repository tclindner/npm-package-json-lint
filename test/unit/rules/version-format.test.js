const ruleModule = require('./../../../src/rules/version-format');

const {lint, ruleType} = ruleModule;

describe('version-format Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node with invalid version', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        version: '1.a.0'
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('version-format');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('version');
      expect(response.lintMessage).toStrictEqual('Format must be a valid semantic version');
    });
  });

  describe('when package.json has node with valid version', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        version: '1.0.0'
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBeTruthy();
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
