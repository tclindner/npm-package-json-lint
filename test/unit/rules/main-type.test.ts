import {lint, ruleType} from '../../../src/rules/main-type';
import {Severity} from '../../../src/types/severity';

describe('main-type Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node with incorrect type', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        main: true,
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('main-type');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('main');
      expect(response.lintMessage).toStrictEqual('Type should be a string');
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
