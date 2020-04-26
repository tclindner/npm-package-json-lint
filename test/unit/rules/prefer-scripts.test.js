const ruleModule = require('../../../src/rules/prefer-scripts');

const {lint, ruleType, minItems} = ruleModule;

describe('prefer-scripts Unit Tests', () => {
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

  describe('when package.json scripts does not have all required scripts', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        scripts: {
          lint: 'npmPkgJsonLint .',
          test: 'jest'
        },
      };
      const requiredScripts = ['lint', 'start', 'test'];
      const response = lint(packageJsonData, 'error', requiredScripts);

      expect(response.lintId).toStrictEqual('prefer-scripts');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('scripts');
      expect(response.lintMessage).toStrictEqual('Your package.json scripts object must include: lint, start, test.');
    });
  });

  describe('when package.json scripts has all required scripts', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        scripts: {
          lint: 'npmPkgJsonLint .',
          test: 'jest'
        },
      };
      const requiredScripts = ['lint', 'test'];
      const response = lint(packageJsonData, 'error', requiredScripts);

      expect(response).toBe(true);
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const requiredScripts = ['lint', 'test'];
      const response = lint(packageJsonData, 'error', requiredScripts);

      expect(response).toBe(true);
    });
  });
});
