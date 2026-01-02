import {lint, ruleType, minItems} from '../../../src/rules/no-restricted-devDependencies';
import {Severity} from '../../../src/types/severity';

describe('no-restricted-devDependencies Unit Tests', () => {
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
        devDependencies: {
          'npm-package-json-lint': '^1.0.0',
        },
      };
      const invalidDependencies = ['npm-package-json-lint', 'grunt-npm-package-json-lint'];
      const response = lint(packageJsonData, Severity.Error, invalidDependencies);

      expect(response.lintId).toStrictEqual('no-restricted-devDependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('devDependencies');
      expect(response.lintMessage).toStrictEqual(
        'You are using a restricted dependency. Please remove it. Invalid devDependencies include: npm-package-json-lint',
      );
    });
  });

  describe('when package.json has node with a restricted pattern', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        devDependencies: {
          '@types/node': '^1.0.0',
        },
      };
      const invalidDependencies = ['npm-package-json-lint', '@types/*'];
      const response = lint(packageJsonData, Severity.Error, invalidDependencies);

      expect(response.lintId).toStrictEqual('no-restricted-devDependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('devDependencies');
      expect(response.lintMessage).toStrictEqual(
        'You are using a restricted dependency. Please remove it. Invalid devDependencies include: @types/node',
      );
    });
  });

  describe('when package.json has node with a valid value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        devDependencies: {
          'gulp-npm-package-json-lint': '^1.0.0',
        },
      };
      const invalidDependencies = ['npm-package-json-lint', 'grunt-npm-package-json-lint'];
      const response = lint(packageJsonData, Severity.Error, invalidDependencies);

      expect(response).toBeNull();
    });
  });

  describe('when package.json has node with a restricted value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        devDependencies: {
          'npm-package-json-lint': '^1.0.0',
        },
      };
      const invalidDependencies = [
        {
          name: 'npm-package-json-lint',
          replacement: 'new-npm-package-json-lint'
        }, 
        {
          name: 'grunt-npm-package-json-lint',
          replacement: 'gulp-npm-package-json-lint'
        }
      ];
      const response = lint(packageJsonData, Severity.Error, invalidDependencies);

      expect(response.lintId).toStrictEqual('no-restricted-devDependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('devDependencies');
      expect(response.lintMessage).toStrictEqual(
        'You are using a restricted dependency. Please remove it. Invalid devDependencies include: npm-package-json-lint (recommended replacement: new-npm-package-json-lint)',
      );
    });
  });

  describe('when package.json has node with a restricted pattern', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        devDependencies: {
          '@types/node': '^1.0.0',
        },
      };
      const invalidDependencies = [
        {
          name: 'npm-package-json-lint',
          replacement: 'new-npm-package-json-lint'
        },
        {
          name: '@types/*',
          replacement: '@new-types/*'
        }
      ];
      const response = lint(packageJsonData, Severity.Error, invalidDependencies);

      expect(response.lintId).toStrictEqual('no-restricted-devDependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('devDependencies');
      expect(response.lintMessage).toStrictEqual(
        'You are using a restricted dependency. Please remove it. Invalid devDependencies include: @types/node (recommended replacement: @new-types/*)',
      );
    });
  });

  describe('when package.json has node with a valid value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        devDependencies: {
          'gulp-npm-package-json-lint': '^1.0.0',
        },
      };
      const invalidDependencies = [
        {
          name: 'npm-package-json-lint',
          replacement: 'new-npm-package-json-lint'
        }, {
          name: 'grunt-npm-package-json-lint',
          replacement: 'gulp-npm-package-json-lint'
        }
      ];
      const response = lint(packageJsonData, Severity.Error, invalidDependencies);

      expect(response).toBeNull();
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const invalidDependencies = ['npm-package-json-lint', 'grunt-npm-package-json-lint'];
      const response = lint(packageJsonData, Severity.Error, invalidDependencies);

      expect(response).toBeNull();
    });
  });
});
