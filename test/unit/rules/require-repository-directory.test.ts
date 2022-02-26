import {lint, ruleType} from '../../../src/rules/require-repository-directory';

describe('require-repository-directory Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json does not have parent node', () => {
    test('false should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('require-repository-directory');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('repository');
      expect(response.lintMessage).toStrictEqual('repository is required');
    });
  });

  describe('when package.json has node', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        repository: {
          url: 'https://github.com/packages/monorepo',
          directory: 'packages/somepackage',
        },
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);
    });
  });

  describe('when package.json does not have node', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        repository: {
          url: 'https://github.com/packages/monorepo',
        },
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('require-repository-directory');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('repository');
      expect(response.lintMessage).toStrictEqual('repository object missing directory property');
    });
  });
});
