const ruleModule = require('../../../src/rules/scripts-type');

const {lint, ruleType} = ruleModule;

describe('scripts-type Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has node with correct type', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        scripts: {
          myscript: 'echo hello'
        }
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);
    });
  });

  describe('when package.json has node with incorrect type', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        scripts: 'scripts'
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('scripts-type');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('scripts');
      expect(response.lintMessage).toStrictEqual('Type should be an Object');
    });
  });

  describe('when package.json has node with correct type, but individual script has invalid type (bool)', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        scripts: {
          myscript: false
        }
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('scripts-type');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('scripts');
      expect(response.lintMessage).toStrictEqual('script, myscript, in the "scripts" property is not a string.');
    });
  });

  describe('when package.json has node with correct type, but individual script has invalid type (object)', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        scripts: {
          myscript: {
            hello: true
          }
        }
      };
      const response = lint(packageJsonData, 'error');

      expect(response.lintId).toStrictEqual('scripts-type');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('scripts');
      expect(response.lintMessage).toStrictEqual('script, myscript, in the "scripts" property is not a string.');
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
