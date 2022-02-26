import {lint, ruleType} from '../../../src/rules/prefer-tilde-version-devDependencies';
import {Severity} from '../../../src/types/severity';

describe('prefer-tilde-version-devDependencies Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "optionalObject"', () => {
      expect(ruleType).toStrictEqual('optionalObject');
    });
  });

  describe('when package.json has node with an invalid value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        devDependencies: {
          'npm-package-json-lint': '^1.0.0',
        },
      };
      const severity = Severity.Error;
      const config = {
        expections: ['grunt-npm-package-json-lint'],
      };
      const response = lint(packageJsonData, severity, config);

      expect(response.lintId).toStrictEqual('prefer-tilde-version-devDependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('devDependencies');
      expect(response.lintMessage).toStrictEqual('You are using an invalid version range. Please use ~.');
    });
  });

  describe('when package.json has node with a valid value', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        devDependencies: {
          'gulp-npm-package-json-lint': '~1.0.0',
        },
      };
      const severity = Severity.Error;
      const config = {
        expections: ['grunt-npm-package-json-lint'],
      };
      const response = lint(packageJsonData, severity, config);

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
