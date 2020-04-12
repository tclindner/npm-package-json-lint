const ruleModule = require('../../../src/rules/prefer-alphabetical-scripts');
const alphabeticalSort = require('../../../src/validators/alphabetical-sort');
const property = require('../../../src/validators/property');

const {lint, ruleType} = ruleModule;

jest.mock('../../../src/validators/alphabetical-sort');
jest.mock('../../../src/validators/property');

const nodeName = 'scripts';

describe('prefer-alphabetical-scripts Unit Tests', () => {
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
          invalidNode: 'test',
          validNode: 'start',
        },
      });
      property.exists.mockReturnValue(true);

      const packageJsonData = {
        scripts: {
          build: 'build script',
          test: 'jest',
          start: 'node index.js',
        },
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('prefer-alphabetical-scripts');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('scripts');
      expect(response.lintMessage).toStrictEqual(
        'Your scripts are not in alphabetical order. Please move test after start.'
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
        scripts: {
          build: 'build script',
          start: 'node index.js',
          test: 'jest',
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
