import {lint, ruleType} from '../../../src/rules/prefer-no-devDependencies');
import * as property from '../../../src/validators/property';

jest.mock('../../../src/validators/property');

const nodeName = 'devDependencies';
import {Severity} from '../../../src/types/severity';

describe('prefer-no-devDependencies Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has devDependencies node', () => {
    test('LintIssue object should be returned', () => {
      property.exists.mockReturnValue(true);

      const packageJsonData = {
        devDependencies: 'dummy-value',
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('prefer-no-devDependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual(nodeName);
      expect(response.lintMessage).toStrictEqual('devDependencies should not be defined');

      expect(property.exists).toHaveBeenCalledTimes(1);
      expect(property.exists).toHaveBeenCalledWith(packageJsonData, nodeName);
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
