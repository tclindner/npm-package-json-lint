import {lint, ruleType, minItems} from '../../../src/rules/valid-values-type';
import {Severity} from '../../../src/types/severity';

describe('valid-values-type Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "array"', () => {
      expect(ruleType).toStrictEqual('array');
    });
  });

  describe('a minItems value should be exported', () => {
    test('it should equal 1', () => {
      expect(minItems).toStrictEqual(1);
    });
  });

  describe('when package.json has node with incorrect format', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        type: 'type',
      };
      const validValues = ['commonjs', 'module'];
      const response = lint(packageJsonData, Severity.Error, validValues);

      expect(response.lintId).toStrictEqual('valid-values-type');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('type');
      expect(response.lintMessage).toStrictEqual(
        'Invalid value for type. Current value is type. Valid values include: commonjs, module.',
      );
    });
  });

  describe('when package.json has node with correct format', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        type: 'module',
      };
      const validValues = ['commonjs', 'module'];
      const response = lint(packageJsonData, Severity.Error, validValues);

      expect(response).toBeNull();
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, Severity.Error, []);

      expect(response).toBeNull();
    });
  });
});
