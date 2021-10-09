const ruleModule = require('../../../src/rules/prefer-no-contributors');
const property = require('../../../src/validators/property');

const {lint, ruleType} = ruleModule;

jest.mock('../../../src/validators/property');

const nodeName = 'contributors';

describe('prefer-no-contributors Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has contributors node', () => {
    test('LintIssue object should be returned', () => {
      property.exists.mockReturnValue(true);

      const packageJsonData = {
        contributors: 'dummy-value',
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('prefer-no-contributors');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual(nodeName);
      expect(response.lintMessage).toStrictEqual('contributors should not be defined');

      expect(property.exists).toHaveBeenCalledTimes(1);
      expect(property.exists).toHaveBeenCalledWith(packageJsonData, nodeName);
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
