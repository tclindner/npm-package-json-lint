const ruleModule = require('../../../src/rules/prefer-no-peerDependencies');
const property = require('../../../src/validators/property');

const {lint, ruleType} = ruleModule;

jest.mock('../../../src/validators/property');

const nodeName = 'peerDependencies';

describe('prefer-no-peerDependencies Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "optionalObject"', () => {
      expect(ruleType).toStrictEqual('optionalObject');
    });
  });

  describe('when package.json has peerDependencies node', () => {
    test('LintIssue object should be returned', () => {
      property.exists.mockReturnValue(true);

      const packageJsonData = {
        peerDependencies: 'dummy-value'
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('prefer-no-peerDependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual(nodeName);
      expect(response.lintMessage).toStrictEqual('peerDependencies should not be defined');

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
