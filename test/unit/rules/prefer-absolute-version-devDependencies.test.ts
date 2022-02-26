import {lint, ruleType} from '../../../src/rules/prefer-absolute-version-devDependencies';
import {Severity} from '../../../src/types/severity';

const nodeName = 'devDependencies';

describe('prefer-absolute-version-devDependencies Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "optionalObject"', () => {
      expect(ruleType).toStrictEqual('optionalObject');
    });
  });

  describe('when package.json has node with an invalid value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        devDependencies: {
          'npm-package-json-lint': '~1.0.0',
        },
      };
      const severity = Severity.Error;
      const config = {
        expections: ['grunt-npm-package-json-lint'],
      };
      const response = lint(packageJsonData, severity, config);

      expect(response.lintId).toStrictEqual('prefer-absolute-version-devDependencies');
      expect(response.severity).toStrictEqual(severity);
      expect(response.node).toStrictEqual(nodeName);
      expect(response.lintMessage).toStrictEqual('You are using an invalid version range. Please use absolute versions.');
    });
  });

  describe('when package.json has node with a valid value', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        devDependencies: {
          'gulp-npm-package-json-lint': '1.0.0',
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
      const severity = Severity.Error;
      const config = {
        expections: ['grunt-npm-package-json-lint'],
      };
      const response = lint(packageJsonData, severity, config);

      expect(response).toBeNull();
    });
  });
});
