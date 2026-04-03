import {lint, ruleType} from '../../../src/rules/prefer-no-main';
import {Severity} from '../../../src/types/severity';

const nodeName = 'main';

describe('prefer-no-main Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has main node', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        main: 'dummy-value',
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('prefer-no-main');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual(nodeName);
      expect(response.lintMessage).toStrictEqual('main should not be defined');
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
