import {lint, ruleType} from '../../../src/rules/prefer-tilde-version-dependencies';
import {Severity} from '../../../src/types/severity';

describe('prefer-tilde-version-dependencies Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "optionalObject"', () => {
      expect(ruleType).toStrictEqual('optionalObject');
    });
  });

  describe('when package.json has node with an invalid value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        dependencies: {
          'npm-package-json-lint': '^1.0.0',
        },
      };
      const severity = Severity.Error;
      const config = {
        expections: ['grunt-npm-package-json-lint'],
      };
      const response = lint(packageJsonData, severity, config);

      expect(response.lintId).toStrictEqual('prefer-tilde-version-dependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('dependencies');
      expect(response.lintMessage).toStrictEqual(
        'You are using an invalid version range. Please use ~. Invalid dependencies include: npm-package-json-lint',
      );
    });
  });

  describe('when package.json has node with a valid value', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        dependencies: {
          'gulp-npm-package-json-lint': '~1.0.0',
        },
      };
      const severity = Severity.Error;
      const config = {
        expections: ['grunt-npm-package-json-lint'],
      };
      const response = lint(packageJsonData, severity, config);

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
