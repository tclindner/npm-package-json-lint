const ruleModule = require('./../../../src/rules/no-restricted-dependencies');

const {lint, ruleType, minItems} = ruleModule;

describe('no-restricted-dependencies Unit Tests', () => {
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

  describe('when package.json has node with a restricted value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        dependencies: {
          'npm-package-json-lint': '^1.0.0'
        }
      };
      const invalidDependencies = ['npm-package-json-lint', 'grunt-npm-package-json-lint'];
      const response = lint(packageJsonData, 'error', invalidDependencies);

      expect(response.lintId).toStrictEqual('no-restricted-dependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('dependencies');
      expect(response.lintMessage).toStrictEqual('You are using a restricted dependency. Please remove it.');
    });
  });

  describe('when package.json has node with a restricted pattern', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        dependencies: {
          '@types/node': '^1.0.0'
        }
      };
      const invalidDependencies = ['npm-package-json-lint', '@types/node'];
      const response = lint(packageJsonData, 'error', invalidDependencies);

      expect(response.lintId).toStrictEqual('no-restricted-dependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('dependencies');
      expect(response.lintMessage).toStrictEqual('You are using a restricted dependency. Please remove it.');
    });
  });

  describe('when package.json has node with a valid value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        dependencies: {
          'gulp-npm-package-json-lint': '^1.0.0'
        }
      };
      const invalidDependencies = ['npm-package-json-lint', 'grunt-npm-package-json-lint'];
      const response = lint(packageJsonData, 'error', invalidDependencies);

      expect(response).toBe(true);
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const invalidDependencies = ['npm-package-json-lint', 'grunt-npm-package-json-lint'];
      const response = lint(packageJsonData, 'error', invalidDependencies);

      expect(response).toBe(true);
    });
  });
});
