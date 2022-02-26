import {lint, ruleType} from '../../../src/rules/no-absolute-version-devDependencies';
import {Severity} from '../../../src/types/severity';

describe('no-absolute-version-devDependencies Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "optionalObject"', () => {
      expect(ruleType).toStrictEqual('optionalObject');
    });
  });

  describe('when package.json has node with an invalid value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        devDependencies: {
          'npm-package-json-lint': '1.0.0',
        },
      };
      const response = lint(packageJsonData, Severity.Error, {exceptions: ['grunt-npm-package-json-lint']});

      expect(response.lintId).toStrictEqual('no-absolute-version-devDependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('devDependencies');
      expect(response.lintMessage).toStrictEqual(
        'You are using an invalid version range. Please do not use absolute versions.'
      );
    });
  });

  describe('when package.json has node with an invalid value (= prefixed)', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        devDependencies: {
          'npm-package-json-lint': '=1.0.0',
        },
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('no-absolute-version-devDependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('devDependencies');
      expect(response.lintMessage).toStrictEqual(
        'You are using an invalid version range. Please do not use absolute versions.'
      );
    });
  });

  describe('when package.json has node with a invalid value and config exception', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        dependencies: {
          'gulp-npm-package-json-lint': '=1.0.0',
        },
      };
      const response = lint(packageJsonData, Severity.Error, {exceptions: ['gulp-npm-package-json-lint']});

      expect(response).toBe(true);
    });
  });

  describe('when package.json has node with a valid value', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        devDependencies: {
          'gulp-npm-package-json-lint': '~1.0.0',
        },
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBe(true);
    });
  });

  describe('when package.json has node with an invalid value and an exception', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        dependencies: {
          'gulp-npm-package-json-lint': '~1.0.0',
        },
      };
      const response = lint(packageJsonData, Severity.Error, {exceptions: ['grunt-npm-package-json-lint']});

      expect(response).toBe(true);
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBe(true);
    });
  });
});
