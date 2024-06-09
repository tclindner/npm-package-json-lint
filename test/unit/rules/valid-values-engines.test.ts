import {lint, ruleType, minItems} from '../../../src/rules/valid-values-engines';
import {Severity} from '../../../src/types/severity';

describe('valid-values-engines Unit Tests', () => {
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
        engines: {
          node: '^6.0.0',
        },
      };
      const validValues = [
        {
          node: '^6.0.0',
          npm: '^3.0.0',
        },
        {node: '^10.0.0'},
      ];
      const response = lint(packageJsonData, Severity.Error, validValues);

      expect(response.lintId).toStrictEqual('valid-values-engines');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('engines');
      expect(response.lintMessage).toStrictEqual(
        'Invalid value for engines. Current value is {"node":"^6.0.0"}. Value values include: {"node":"^6.0.0","npm":"^3.0.0"}, {"node":"^10.0.0"}.',
      );
    });
  });

  describe('when package.json has object node with vvalid value, but invalid version range', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        engines: {
          node: '^6.a.0',
        },
      };
      const validValues = [{node: '^6.a.0'}];
      const response = lint(packageJsonData, Severity.Error, validValues);

      expect(response.lintId).toStrictEqual('valid-values-engines');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('engines');
      expect(response.lintMessage).toStrictEqual('engines, node version range is invalid. Currently set to ^6.a.0');
    });
  });

  describe('when package.json has object node with valid value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        engines: {
          node: '^6.0.0',
          npm: '^3.0.0',
        },
      };
      const validValues = [
        {
          node: '^6.0.0',
          npm: '^3.0.0',
        },
        {
          node: '^10.0.0',
          npm: '^5.0.0',
        },
      ];
      const response = lint(packageJsonData, Severity.Error, validValues);

      expect(response).toBeNull();
    });
  });

  describe('when package.json has node but is invalid type', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        engines: true,
      };
      const validValues = [
        {
          node: '^6.0.0',
          npm: '^3.0.0',
        },
        {
          node: '^10.0.0',
          npm: '^5.0.0',
        },
      ];
      const response = lint(packageJsonData, Severity.Error, validValues);

      expect(response.lintId).toStrictEqual('valid-values-engines');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('engines');
      expect(response.lintMessage).toStrictEqual('engines node has invalid data type');
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const validValues = [
        {
          node: '^6.0.0',
          npm: '^3.0.0',
        },
        {node: '^10.0.0'},
      ];
      const response = lint(packageJsonData, Severity.Error, validValues);

      expect(response).toBeNull();
    });
  });
});
