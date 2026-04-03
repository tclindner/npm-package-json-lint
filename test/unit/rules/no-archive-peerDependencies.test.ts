import {lint, ruleType} from '../../../src/rules/no-archive-peerDependencies';
import {Severity} from '../../../src/types/severity';

describe('no-archive-peerDependencies Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "optionalObject"', () => {
      expect(ruleType).toStrictEqual('optionalObject');
    });
  });

  describe('when package.json has node with an invalid value', () => {
    describe('with https://github.com/org/repo/archive/v1.2.3.tar.gz', () => {
      test('LintIssue object should be returned', () => {
        const packageJsonData = {
          peerDependencies: {
            'test-module': 'https://github.com/org/repo/archive/v1.2.3.tar.gz',
          },
        };
        const response = lint(packageJsonData, Severity.Error, {exceptions: ['grunt-npm-package-json-lint']});

        expect(response.lintId).toStrictEqual('no-archive-peerDependencies');
        expect(response.severity).toStrictEqual('error');
        expect(response.node).toStrictEqual('peerDependencies');
        expect(response.lintMessage).toStrictEqual(
          'You are using peerDependencies via url to archive file. Please use peerDependencies from npm. Invalid peerDependencies include: test-module',
        );
      });
    });

    describe('with https://github.com/org/repo/archive/v1.2.3.zip', () => {
      test('LintIssue object should be returned', () => {
        const packageJsonData = {
          peerDependencies: {
            'test-module': 'https://github.com/org/repo/archive/v1.2.3.zip',
          },
        };
        const response = lint(packageJsonData, Severity.Error, {exceptions: ['grunt-npm-package-json-lint']});

        expect(response.lintId).toStrictEqual('no-archive-peerDependencies');
        expect(response.severity).toStrictEqual('error');
        expect(response.node).toStrictEqual('peerDependencies');
        expect(response.lintMessage).toStrictEqual(
          'You are using peerDependencies via url to archive file. Please use peerDependencies from npm. Invalid peerDependencies include: test-module',
        );
      });
    });
  });

  describe('when package.json has node with a invalid value and config exception', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        peerDependencies: {
          'my-module': 'https://github.com/org/repo/archive/v1.2.3.zip',
        },
      };
      const response = lint(packageJsonData, Severity.Error, {exceptions: ['my-module']});

      expect(response).toBeNull();
    });
  });

  describe('when package.json has node with a valid value', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        peerDependencies: {
          'my-module': 'username/repo',
          'my-other-module': '1.2.3',
        },
      };
      const response = lint(packageJsonData, Severity.Error, {});

      expect(response).toBeNull();
    });
  });
});
