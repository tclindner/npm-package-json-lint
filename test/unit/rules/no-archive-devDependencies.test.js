const ruleModule = require('../../../src/rules/no-archive-devDependencies');

const {lint, ruleType} = ruleModule;

describe('no-archive-devDependencies Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "optionalObject"', () => {
      expect(ruleType).toStrictEqual('optionalObject');
    });
  });

  describe('when package.json has node with an invalid value', () => {
    describe('with https://github.com/org/repo/archive/v1.2.3.tar.gz', () => {
      test('LintIssue object should be returned', () => {
        const packageJsonData = {
          devDependencies: {
            'test-module': 'https://github.com/org/repo/archive/v1.2.3.tar.gz'
          }
        };
        const response = lint(packageJsonData, 'error', {exceptions: ['grunt-npm-package-json-lint']});

        expect(response.lintId).toStrictEqual('no-archive-devDependencies');
        expect(response.severity).toStrictEqual('error');
        expect(response.node).toStrictEqual('devDependencies');
        expect(response.lintMessage).toStrictEqual(
          'You are using devDependencies via url to archive file. Please use devDependencies from npm.'
        );
      });
    });

    describe('with https://github.com/org/repo/archive/v1.2.3.zip', () => {
      test('LintIssue object should be returned', () => {
        const packageJsonData = {
          devDependencies: {
            'test-module': 'https://github.com/org/repo/archive/v1.2.3.zip'
          }
        };
        const response = lint(packageJsonData, 'error', {exceptions: ['grunt-npm-package-json-lint']});

        expect(response.lintId).toStrictEqual('no-archive-devDependencies');
        expect(response.severity).toStrictEqual('error');
        expect(response.node).toStrictEqual('devDependencies');
        expect(response.lintMessage).toStrictEqual(
          'You are using devDependencies via url to archive file. Please use devDependencies from npm.'
        );
      });
    });
  });

  describe('when package.json has node with a invalid value and config exception', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        devDependencies: {
          'my-module': 'https://github.com/org/repo/archive/v1.2.3.zip'
        }
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
          'my-other-module': '1.2.3'
        }
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);
    });
  });
});
