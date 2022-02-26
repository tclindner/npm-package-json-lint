import {lint, ruleType} from '../../../src/rules/prefer-alphabetical-bundledDependencies');
import * as alphabeticalSort from '../../../src/validators/alphabetical-sort';
import * as property from '../../../src/validators/property';

jest.mock('../../../src/validators/alphabetical-sort');
jest.mock('../../../src/validators/property');

const nodeName = 'bundledDependencies';

describe('prefer-alphabetical-bundledDependencies Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node with an invalid order', () => {
    test('LintIssue object should be returned', () => {
      alphabeticalSort.isInAlphabeticalOrder.mockReturnValue({
        status: false,
        data: {
          invalidNode: 'semver',
          validNode: 'chalk',
        },
      });
      property.exists.mockReturnValue(true);

      const packageJsonData = {
        bundledDependencies: {
          semver: '^5.3.0',
          chalk: '^1.1.3',
          'user-home': '^2.0.0',
        },
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('prefer-alphabetical-bundledDependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('bundledDependencies');
      expect(response.lintMessage).toStrictEqual(
        'Your bundledDependencies are not in alphabetical order. Please move semver after chalk.'
      );

      expect(property.exists).toHaveBeenCalledTimes(1);
      expect(property.exists).toHaveBeenCalledWith(packageJsonData, nodeName);
      expect(alphabeticalSort.isInAlphabeticalOrder).toHaveBeenCalledTimes(1);
      expect(alphabeticalSort.isInAlphabeticalOrder).toHaveBeenCalledWith(packageJsonData, nodeName);
    });
  });

  describe('when package.json has node with a valid order', () => {
    test('true should be returned', () => {
      alphabeticalSort.isInAlphabeticalOrder.mockReturnValue({
        status: true,
        data: {},
      });
      property.exists.mockReturnValue(true);

      const packageJsonData = {
        bundledDependencies: {
          chalk: '^1.1.3',
          semver: '^5.3.0',
          'user-home': '^2.0.0',
        },
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);

      expect(property.exists).toHaveBeenCalledTimes(1);
      expect(property.exists).toHaveBeenCalledWith(packageJsonData, nodeName);
      expect(alphabeticalSort.isInAlphabeticalOrder).toHaveBeenCalledTimes(1);
      expect(alphabeticalSort.isInAlphabeticalOrder).toHaveBeenCalledWith(packageJsonData, nodeName);
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      property.exists.mockReturnValue(false);

      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);

      expect(property.exists).toHaveBeenCalledTimes(1);
      expect(property.exists).toHaveBeenCalledWith(packageJsonData, nodeName);
    });
  });
});