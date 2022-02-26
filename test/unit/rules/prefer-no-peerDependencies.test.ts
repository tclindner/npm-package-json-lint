import {lint, ruleType} from '../../../src/rules/prefer-no-peerDependencies';
import {Severity} from '../../../src/types/severity';

const nodeName = 'peerDependencies';

describe('prefer-no-peerDependencies Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has peerDependencies node', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        peerDependencies: 'dummy-value',
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('prefer-no-peerDependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual(nodeName);
      expect(response.lintMessage).toStrictEqual('peerDependencies should not be defined');
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
