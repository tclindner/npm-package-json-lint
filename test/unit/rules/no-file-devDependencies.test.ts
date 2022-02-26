import {lint, ruleType} from '../../../src/rules/no-file-devDependencies';
import {Severity} from '../../../src/types/severity';

describe('no-archive-devDependencies Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "optionalObject"', () => {
      expect(ruleType).toStrictEqual('optionalObject');
    });
  });

  describe('when package.json has node with an invalid value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        devDependencies: {
          'test-module': 'file:local-directory',
        },
      };
      const response = lint(packageJsonData, 'error', {exceptions: ['grunt-npm-package-json-lint']});

      expect(response.lintId).toStrictEqual('no-file-devDependencies');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('devDependencies');
      expect(response.lintMessage).toStrictEqual(
        'You are using devDependencies via url to local file. Please use devDependencies from npm.'
      );
    });
  });

  describe('when package.json has node with a invalid value and config exception', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        devDependencies: {
          'my-module': 'file:local-directory',
        },
      };
      const response = lint(packageJsonData, 'error', {exceptions: ['my-module']});

      expect(response).toBe(true);
    });
  });

  describe('when package.json has node with a valid value', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        devDependencies: {
          'my-module': 'username/repo',
          'my-other-module': '1.2.3',
        },
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBe(true);
    });
  });
});
