import {lint, ruleType} from '../../../src/rules/prefer-alphabetical-scripts';
import {Severity} from '../../../src/types/severity';
import * as alphabeticalSort from '../../../src/validators/alphabetical-sort';

jest.mock('../../../src/validators/alphabetical-sort');

const nodeName = 'scripts';

describe('prefer-alphabetical-scripts Unit Tests', () => {
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
          invalidNode: 'test',
          validNode: 'start',
        },
      });

      const packageJsonData = {
        scripts: {
          build: 'build script',
          test: 'jest',
          start: 'node index.js',
        },
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('prefer-alphabetical-scripts');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('scripts');
      expect(response.lintMessage).toStrictEqual(
        'Your scripts are not in alphabetical order. Please move test after start.',
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
        scripts: {
          build: 'build script',
          start: 'node index.js',
          test: 'jest',
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
