const ruleModule = require('./../../../src/rules/no-repeated-dependencies');
const property = require('../../../src/validators/property');

const {lint, ruleType} = ruleModule;

jest.mock('../../../src/validators/property');

describe('no-repeated-dependencies Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has both nodes with duplicate dependencies', () => {
    test('LintIssue object should be returned', () => {
      property.exists.mockReturnValue(true);

      const packageJsonData = {
        dependencies: {
          express: '^1.0.0',
          jest: '^1.0.0',
          meow: '^1.0.0'
        },
        devDependencies: {
          jest: '^1.0.0'
        }
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('no-repeated-dependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('dependencies|devDependencies');
      expect(response.lintMessage).toStrictEqual(
        'jest exists in both dependencies and devDependencies. Please remove it from one of the dependency lists.'
      );

      expect(property.exists).toHaveBeenCalledTimes(2);
      expect(property.exists).toHaveBeenNthCalledWith(1, packageJsonData, 'dependencies');
      expect(property.exists).toHaveBeenNthCalledWith(2, packageJsonData, 'devDependencies');
    });
  });

  describe('when package.json has both nodes with no duplicate dependencies', () => {
    test('LintIssue object should be returned', () => {
      property.exists.mockReturnValue(true);

      const packageJsonData = {
        dependencies: {
          express: '^1.0.0',
          jest: '^1.0.0',
          meow: '^1.0.0'
        },
        devDependencies: {
          mocha: '^1.0.0'
        }
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);
    });
  });

  describe('when package.json does not have dependencies node', () => {
    test('true should be returned', () => {
      property.exists.mockReturnValueOnce(false);

      const packageJsonData = {
        devDependencies: {
          mocha: '^1.0.0'
        }
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);

      expect(property.exists).toHaveBeenCalledTimes(1);
      expect(property.exists).toHaveBeenCalledWith(packageJsonData, 'dependencies');
    });
  });

  describe('when package.json does not have devDependencies node', () => {
    test('true should be returned', () => {
      property.exists.mockReturnValueOnce(true);
      property.exists.mockReturnValueOnce(false);

      const packageJsonData = {
        dependencies: {
          mocha: '^1.0.0'
        }
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);

      expect(property.exists).toHaveBeenCalledTimes(2);
      expect(property.exists).toHaveBeenNthCalledWith(1, packageJsonData, 'dependencies');
      expect(property.exists).toHaveBeenNthCalledWith(2, packageJsonData, 'devDependencies');
    });
  });

  describe('when package.json does not have dependencies or devDependencies', () => {
    test('true should be returned', () => {
      property.exists.mockReturnValue(false);

      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);

      expect(property.exists).toHaveBeenCalledTimes(1);
      expect(property.exists).toHaveBeenCalledWith(packageJsonData, 'dependencies');
    });
  });
});
