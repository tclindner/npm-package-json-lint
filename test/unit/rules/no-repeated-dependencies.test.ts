import {lint, ruleType} from '../../../src/rules/no-repeated-dependencies';
import {Severity} from '../../../src/types/severity';

describe('no-repeated-dependencies Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has both nodes with duplicate dependencies', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        dependencies: {
          express: '^1.0.0',
          jest: '^1.0.0',
          meow: '^1.0.0',
        },
        devDependencies: {
          jest: '^1.0.0',
        },
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('no-repeated-dependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('dependencies|devDependencies');
      expect(response.lintMessage).toStrictEqual(
        'jest exists in both dependencies and devDependencies. Please remove it from one of the dependency lists.'
      );
    });
  });

  describe('when package.json has both nodes with no duplicate dependencies', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        dependencies: {
          express: '^1.0.0',
          jest: '^1.0.0',
          meow: '^1.0.0',
        },
        devDependencies: {
          mocha: '^1.0.0',
        },
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBeNull();
    });
  });

  describe('when package.json does not have dependencies node', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        devDependencies: {
          mocha: '^1.0.0',
        },
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBeNull();
    });
  });

  describe('when package.json does not have devDependencies node', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        dependencies: {
          mocha: '^1.0.0',
        },
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBeNull();
    });
  });

  describe('when package.json does not have dependencies or devDependencies', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBeNull();
    });
  });
});
