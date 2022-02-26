import {lint, ruleType} from '../../../src/rules/prefer-alphabetical-optionalDependencies';
import * as alphabeticalSort from '../../../src/validators/alphabetical-sort';
import {Severity} from '../../../src/types/severity';

jest.mock('../../../src/validators/alphabetical-sort');

const nodeName = 'optionalDependencies';

describe('prefer-alphabetical-optionalDependencies Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node with an invalid order', () => {
    test('LintIssue object should be returned', () => {
      jest.spyOn(alphabeticalSort, 'isInAlphabeticalOrder').mockReturnValue({
        status: false,
        data: {
          invalidNode: 'semver',
          validNode: 'chalk',
        },
      });

      const packageJsonData = {
        optionalDependencies: {
          semver: '^5.3.0',
          chalk: '^1.1.3',
          'user-home': '^2.0.0',
        },
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('prefer-alphabetical-optionalDependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('optionalDependencies');
      expect(response.lintMessage).toStrictEqual(
        'Your optionalDependencies are not in alphabetical order. Please move semver after chalk.'
      );

      expect(alphabeticalSort.isInAlphabeticalOrder).toHaveBeenCalledTimes(1);
      expect(alphabeticalSort.isInAlphabeticalOrder).toHaveBeenCalledWith(packageJsonData, nodeName);
    });
  });

  describe('when package.json has node with a valid order', () => {
    test('true should be returned', () => {
      jest.spyOn(alphabeticalSort, 'isInAlphabeticalOrder').mockReturnValue({
        status: true,
        data: {
          invalidNode: null,
          validNode: null,
        },
      });

      const packageJsonData = {
        optionalDependencies: {
          chalk: '^1.1.3',
          semver: '^5.3.0',
          'user-home': '^2.0.0',
        },
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBeNull();

      expect(alphabeticalSort.isInAlphabeticalOrder).toHaveBeenCalledTimes(1);
      expect(alphabeticalSort.isInAlphabeticalOrder).toHaveBeenCalledWith(packageJsonData, nodeName);
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBeNull();
    });
  });
});
