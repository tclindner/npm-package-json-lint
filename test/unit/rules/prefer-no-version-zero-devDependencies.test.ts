import {lint, ruleType} from '../../../src/rules/prefer-no-version-zero-devDependencies');
import * as dependencyAudit from '../../../src/validators/dependency-audit';
import * as property from '../../../src/validators/property';

jest.mock('../../../src/validators/dependency-audit');
jest.mock('../../../src/validators/property');

const nodeName = 'devDependencies';
import {Severity} from '../../../src/types/severity';

describe('prefer-no-version-zero-devDependencies Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "optionalObject"', () => {
      expect(ruleType).toStrictEqual('optionalObject');
    });
  });

  describe('when package.json has node with an invalid value', () => {
    test('LintIssue object should be returned', () => {
      dependencyAudit.hasDepVersZero.mockReturnValue(true);
      property.exists.mockReturnValue(true);

      const packageJsonData = {
        devDependencies: {
          'npm-package-json-lint': '~0.3.0',
        },
      };
      const severity = 'error';
      const config = {
        expections: ['grunt-npm-package-json-lint'],
      };
      const response = lint(packageJsonData, severity, config);

      expect(response.lintId).toStrictEqual('prefer-no-version-zero-devDependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('devDependencies');
      expect(response.lintMessage).toStrictEqual(
        'You have invalid version 0 dependencies. Please use modules with a major version >= 1.'
      );

      expect(property.exists).toHaveBeenCalledTimes(1);
      expect(property.exists).toHaveBeenCalledWith(packageJsonData, nodeName);
      expect(dependencyAudit.hasDepVersZero).toHaveBeenCalledTimes(1);
      expect(dependencyAudit.hasDepVersZero).toHaveBeenCalledWith(packageJsonData, nodeName, config);
    });
  });

  describe('when package.json has node with a valid value', () => {
    test('true should be returned', () => {
      dependencyAudit.hasDepVersZero.mockReturnValue(false);
      property.exists.mockReturnValue(true);

      const packageJsonData = {
        devDependencies: {
          'gulp-npm-package-json-lint': '^1.0.0',
        },
      };
      const severity = 'error';
      const config = {
        expections: ['grunt-npm-package-json-lint'],
      };
      const response = lint(packageJsonData, severity, config);

      expect(response).toBe(true);

      expect(property.exists).toHaveBeenCalledTimes(1);
      expect(property.exists).toHaveBeenCalledWith(packageJsonData, nodeName);
      expect(dependencyAudit.hasDepVersZero).toHaveBeenCalledTimes(1);
      expect(dependencyAudit.hasDepVersZero).toHaveBeenCalledWith(packageJsonData, nodeName, config);
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      property.exists.mockReturnValue(false);

      const packageJsonData = {};
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBe(true);

      expect(property.exists).toHaveBeenCalledTimes(1);
      expect(property.exists).toHaveBeenCalledWith(packageJsonData, nodeName);
    });
  });
});
