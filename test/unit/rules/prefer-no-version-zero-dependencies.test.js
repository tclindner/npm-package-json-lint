const ruleModule = require('./../../../src/rules/prefer-no-version-zero-dependencies');

const {lint, ruleType} = ruleModule;

describe('prefer-no-version-zero-dependencies Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node with an invalid value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        dependencies: {
          'npm-package-json-lint': '~0.3.0'
        }
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('prefer-no-version-zero-dependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('dependencies');
      expect(response.lintMessage).toStrictEqual('You have invalid version 0 dependencies. Please use modules with a major version >= 1.');
    });
  });

  describe('when package.json has node with a valid value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        dependencies: {
          'gulp-npm-package-json-lint': '^1.0.0'
        }
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
