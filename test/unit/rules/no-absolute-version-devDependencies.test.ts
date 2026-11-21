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
        'You are using an invalid version range. Please do not use absolute versions. Invalid devDependencies include: npm-package-json-lint',
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
      const response = lint(packageJsonData, Severity.Error, {});

      expect(response.lintId).toStrictEqual('no-absolute-version-devDependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('devDependencies');
      expect(response.lintMessage).toStrictEqual(
        'You are using an invalid version range. Please do not use absolute versions. Invalid devDependencies include: npm-package-json-lint',
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

      expect(response).toBeNull();
    });
  });

  describe('when package.json has node with a valid value', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        devDependencies: {
          'gulp-npm-package-json-lint': '~1.0.0',
        },
      };
      const response = lint(packageJsonData, Severity.Error, {});

      expect(response).toBeNull();
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

  describe('when package.json has one absolute version and one range', () => {
    test('LintIssue object should list only the absolute version', () => {
      const packageJsonData = {
        devDependencies: {
          pinned: '1.2.3',
          ranged: '^1.0.0',
        },
      };
      const response = lint(packageJsonData, Severity.Error, {});

      expect(response.lintId).toStrictEqual('no-absolute-version-devDependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('devDependencies');
      expect(response.lintMessage).toStrictEqual(
        'You are using an invalid version range. Please do not use absolute versions. Invalid devDependencies include: pinned',
      );
    });
  });

  describe('when package.json has an absolute version that is an exception next to a range', () => {
    test('null should be returned', () => {
      const packageJsonData = {
        devDependencies: {
          pinned: '1.2.3',
          ranged: '^1.0.0',
        },
      };
      const response = lint(packageJsonData, Severity.Error, {exceptions: ['pinned']});

      expect(response).toBeNull();
    });
  });

  describe('when package.json has node with npm aliases, local package specs and ranges', () => {
    test('null should be returned', () => {
      const packageJsonData = {
        devDependencies: {
          'babel-core': 'npm:@babel/core@^7.0.0',
          'local-pkg': 'file:../local-pkg',
          'ws-pkg': 'workspace:*',
          'git-pkg': 'github:username/repo',
          ranged: '^1.0.0',
        },
      };
      const response = lint(packageJsonData, Severity.Error, {});

      expect(response).toBeNull();
    });
  });
});
