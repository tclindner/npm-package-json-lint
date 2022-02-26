import {lint, ruleType} from '../../../src/rules/prefer-no-optionalDependencies';
import {Severity} from '../../../src/types/severity';

const nodeName = 'optionalDependencies';

describe('prefer-no-optionalDependencies Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has optionalDependencies node', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        optionalDependencies: 'dummy-value',
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('prefer-no-optionalDependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual(nodeName);
      expect(response.lintMessage).toStrictEqual('optionalDependencies should not be defined');
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBe(true);
    });
  });
});
