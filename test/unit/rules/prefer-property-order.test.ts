import {lint, ruleType, minItems} from '../../../src/rules/prefer-property-order';
import {Severity} from '../../../src/types/severity';

describe('prefer-property-order Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "array"', () => {
      expect(ruleType).toStrictEqual('array');
    });
  });

  describe('a minItems value should be exported', () => {
    test('it should equal 0', () => {
      expect(minItems).toStrictEqual(0);
    });
  });

  describe('when the properties in the package.json file are in the desired order', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        name: 'awesome-module',
        version: '1.0.0',
        description: 'description',
      };
      const preferredOrder = ['name', 'version', 'description'];
      const response = lint(packageJsonData, Severity.Error, preferredOrder);

      expect(response).toBeNull();
    });
  });

  describe('when the actual node list does not have the same number of nodes as the desired list', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        name: 'awesome-module',
        version: '1.0.0',
      };
      const preferredOrder = ['name', 'version', 'description'];
      const response = lint(packageJsonData, Severity.Error, preferredOrder);

      expect(response).toBeNull();
    });
  });

  describe('when the actual node list is in a different order than desired', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        name: 'awesome-module',
        description: 'description',
        version: '1.0.0',
      };
      const preferredOrder = ['name', 'version', 'description'];
      const response = lint(packageJsonData, Severity.Error, preferredOrder);

      expect(response.lintId).toStrictEqual('prefer-property-order');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('');
      expect(response.lintMessage).toStrictEqual(
        'Your package.json properties are not in the desired order. Please move "description" after "version".',
      );
    });
  });
});
