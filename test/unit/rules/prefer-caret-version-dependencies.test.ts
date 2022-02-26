import {lint, ruleType} from '../../../src/rules/prefer-caret-version-dependencies');
import * as dependencyAudit from '../../../src/validators/dependency-audit';
import * as property from '../../../src/validators/property';

jest.mock('../../../src/validators/dependency-audit');
jest.mock('../../../src/validators/property');

const nodeName = 'dependencies';
const rangeSpecifier = '^';
import {Severity} from '../../../src/types/severity';

describe('prefer-caret-version-dependencies Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "optionalObject"', () => {
      expect(ruleType).toStrictEqual('optionalObject');
    });
  });

  describe('when package.json has node with an invalid value', () => {
    test('LintIssue object should be returned', () => {
      dependencyAudit.areVersRangesValid.mockReturnValue(false);
      property.exists.mockReturnValue(true);

      const packageJsonData = {
        dependencies: {
          'npm-package-json-lint': '~1.0.0',
        },
      };
      const severity = 'error';
      const config = {
        expections: ['grunt-npm-package-json-lint'],
      };
      const response = lint(packageJsonData, severity, config);

      expect(response.lintId).toStrictEqual('prefer-caret-version-dependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('dependencies');
      expect(response.lintMessage).toStrictEqual('You are using an invalid version range. Please use ^.');

      expect(property.exists).toHaveBeenCalledTimes(1);
      expect(property.exists).toHaveBeenCalledWith(packageJsonData, nodeName);
      expect(dependencyAudit.areVersRangesValid).toHaveBeenCalledTimes(1);
      expect(dependencyAudit.areVersRangesValid).toHaveBeenCalledWith(packageJsonData, nodeName, rangeSpecifier, config);
    });
  });

  describe('when package.json has node with a valid value', () => {
    test('true should be returned', () => {
      dependencyAudit.areVersRangesValid.mockReturnValue(true);
      property.exists.mockReturnValue(true);

      const packageJsonData = {
        dependencies: {
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
      expect(dependencyAudit.areVersRangesValid).toHaveBeenCalledTimes(1);
      expect(dependencyAudit.areVersRangesValid).toHaveBeenCalledWith(packageJsonData, nodeName, rangeSpecifier, config);
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
