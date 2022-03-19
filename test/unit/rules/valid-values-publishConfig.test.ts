import {lint, ruleType, minItems} from '../../../src/rules/valid-values-publishConfig';
import {Severity} from '../../../src/types/severity';

describe('valid-values-publishConfig Unit Tests', () => {
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

  describe('when package.json has object node with invalid value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        publishConfig: {
          access: 'public',
        },
      };
      const validValues = [{access: 'private'}, {access: 'protected'}];
      const response = lint(packageJsonData, Severity.Error, validValues);

      expect(response.lintId).toStrictEqual('valid-values-publishConfig');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('publishConfig');
      expect(response.lintMessage).toStrictEqual(
        'Invalid value for publishConfig. Current value is {"access":"public"}. Value values include: {"access":"private"}, {"access":"protected"}.'
      );
    });
  });

  describe('when package.json has object node with valid value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        publishConfig: {
          access: 'public',
        },
      };
      const validValues = [{access: 'private'}, {access: 'public'}];
      const response = lint(packageJsonData, Severity.Error, validValues);

      expect(response).toBeNull();
    });
  });

  describe('when package.json has node but is invalid type', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        publishConfig: true,
      };
      const validValues = [{access: 'private'}, {access: 'protected'}];
      const response = lint(packageJsonData, Severity.Error, validValues);

      expect(response.lintId).toStrictEqual('valid-values-publishConfig');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('publishConfig');
      expect(response.lintMessage).toStrictEqual('publishConfig node has invalid data type');
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const validValues = [{access: 'private'}, {access: 'protected'}];
      const response = lint(packageJsonData, Severity.Error, validValues);

      expect(response).toBeNull();
    });
  });
});
