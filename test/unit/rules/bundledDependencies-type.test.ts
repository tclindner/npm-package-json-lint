import {lint, ruleType} from '../../../src/rules/bundledDependencies-type';

describe('bundledDependencies-type Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node with incorrect type', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        bundledDependencies: 'bundledDependencies',
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('bundledDependencies-type');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('bundledDependencies');
      expect(response.lintMessage).toStrictEqual('Type should be an array');
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);
    });
  });
});
