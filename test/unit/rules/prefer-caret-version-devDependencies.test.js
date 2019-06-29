const ruleModule = require('./../../../src/rules/prefer-caret-version-devDependencies');
const dependencyAudit = require('../../../src/validators/dependency-audit');
const property = require('../../../src/validators/property');

const {lint, ruleType} = ruleModule;

jest.mock('../../../src/validators/dependency-audit');
jest.mock('../../../src/validators/property');

const nodeName = 'devDependencies';
const rangeSpecifier = '^';

describe('prefer-caret-version-devDependencies Unit Tests', () => {
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
        devDependencies: {
          'npm-package-json-lint': '~1.0.0'
        }
      };
      const severity = 'error';
      const config = {
        expections: ['grunt-npm-package-json-lint']
      };
      const response = lint(packageJsonData, severity, config);

      expect(response.lintId).toStrictEqual('prefer-caret-version-devDependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('devDependencies');
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
        devDependencies: {
          'gulp-npm-package-json-lint': '^1.0.0'
        }
      };
      const severity = 'error';
      const config = {
        expections: ['grunt-npm-package-json-lint']
      };
      const response = lint(packageJsonData, severity, config);

      expect(response).toBeTruthy();

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
      const response = lint(packageJsonData, 'error');

      expect(response).toBeTruthy();

      expect(property.exists).toHaveBeenCalledTimes(1);
      expect(property.exists).toHaveBeenCalledWith(packageJsonData, nodeName);
    });
  });
});
