import {lint, ruleType, minItems} from '../../../src/rules/no-restricted-pre-release-dependencies';
import {Severity} from '../../../src/types/severity';

describe('no-restricted-pre-release-dependencies Unit Tests', () => {
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
          'npm-package-json-lint': '^1.0.0-beta',
        },
      };
      const invldPreReleaseDeps = ['npm-package-json-lint', 'grunt-npm-package-json-lint'];
      const response = lint(packageJsonData, Severity.Error, invldPreReleaseDeps);

      expect(response.lintId).toStrictEqual('no-restricted-pre-release-dependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('dependencies');
      expect(response.lintMessage).toStrictEqual(
        'You are using a restricted pre-release dependency. Please remove it. Invalid dependencies include: npm-package-json-lint'
      );
    });
  });

  describe('when package.json has node with a valid value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        dependencies: {
          'grunt-npm-package-json-lint': '^1.0.0',
        },
      };
      const invldPreReleaseDeps = ['npm-package-json-lint', 'grunt-npm-package-json-lint'];
      const response = lint(packageJsonData, Severity.Error, invldPreReleaseDeps);

      expect(response).toBeNull();
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const invldPreReleaseDeps = ['npm-package-json-lint', 'grunt-npm-package-json-lint'];
      const response = lint(packageJsonData, Severity.Error, invldPreReleaseDeps);

      expect(response).toBeNull();
    });
  });
});
