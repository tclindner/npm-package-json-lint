const ruleModule = require('./../../../src/rules/no-restricted-pre-release-dependencies');

const {lint, ruleType} = ruleModule;

describe('no-restricted-pre-release-dependencies Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "array"', () => {
      expect(ruleType).toStrictEqual('array');
    });
  });

  describe('when package.json has node with a restricted value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        dependencies: {
          'npm-package-json-lint': '^1.0.0-beta'
        }
      };
      const invldPreReleaseDeps = ['npm-package-json-lint', 'grunt-npm-package-json-lint'];
      const response = lint(packageJsonData, 'error', invldPreReleaseDeps);

      expect(response.lintId).toStrictEqual('no-restricted-pre-release-dependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('dependencies');
      expect(response.lintMessage).toStrictEqual('You are using a restricted pre-release dependency. Please remove it.');
    });
  });

  describe('when package.json has node with a valid value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        dependencies: {
          'grunt-npm-package-json-lint': '^1.0.0'
        }
      };
      const invldPreReleaseDeps = ['npm-package-json-lint', 'grunt-npm-package-json-lint'];
      const response = lint(packageJsonData, 'error', invldPreReleaseDeps);

      expect(response).toBe(true);
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const invldPreReleaseDeps = ['npm-package-json-lint', 'grunt-npm-package-json-lint'];
      const response = lint(packageJsonData, 'error', invldPreReleaseDeps);

      expect(response).toBe(true);
    });
  });
});
