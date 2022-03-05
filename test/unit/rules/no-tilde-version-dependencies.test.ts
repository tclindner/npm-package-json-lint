import {lint, ruleType} from '../../../src/rules/no-tilde-version-dependencies';
import {Severity} from '../../../src/types/severity';

describe('no-tilde-version-dependencies Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "optionalObject"', () => {
      expect(ruleType).toStrictEqual('optionalObject');
    });
  });

  describe('when package.json has node with an invalid value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        dependencies: {
          'npm-package-json-lint': '~1.0.0',
          'gulp-npm-package-json-lint': '^2.0.0',
        },
      };
      const response = lint(packageJsonData, Severity.Error, {});

      expect(response.lintId).toStrictEqual('no-tilde-version-dependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('dependencies');
      expect(response.lintMessage).toStrictEqual('You are using an invalid version range. Please do not use ~.');
    });
  });

  describe('when package.json has node with a invalid value and config exception', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        dependencies: {
          'gulp-npm-package-json-lint': '~1.0.0',
        },
      };
      const response = lint(packageJsonData, Severity.Error, {exceptions: ['gulp-npm-package-json-lint']});

      expect(response).toBeNull();
    });
  });

  describe('when package.json has node with a valid value', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        dependencies: {
          'npm-package-json-lint': '^1.0.0',
          'gulp-npm-package-json-lint': '^1.0.0',
        },
      };
      const response = lint(packageJsonData, Severity.Error, {});

      expect(response).toBeNull();
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, Severity.Error, {});

      expect(response).toBeNull();
    });
  });
});
