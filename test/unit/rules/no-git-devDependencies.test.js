const ruleModule = require('../../../src/rules/no-git-devDependencies');

const {lint, ruleType} = ruleModule;

describe('no-git-devDependencies Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "optionalObject"', () => {
      expect(ruleType).toStrictEqual('optionalObject');
    });
  });

  describe('when package.json has node with an invalid value', () => {
    describe('with github:user/repo', () => {
      test('LintIssue object should be returned', () => {
        const packageJsonData = {
          devDependencies: {
            'my-module': 'github:username/repo',
          },
        };
        const response = lint(packageJsonData, 'error', {exceptions: ['grunt-npm-package-json-lint']});

        expect(response.lintId).toStrictEqual('no-git-devDependencies');
        expect(response.severity).toStrictEqual('error');
        expect(response.node).toStrictEqual('devDependencies');
        expect(response.lintMessage).toStrictEqual(
          'You are using devDependencies from git repository. Please use devDependencies from npm.'
        );
      });
    });

    describe('with user/repo', () => {
      test('LintIssue object should be returned', () => {
        const packageJsonData = {
          devDependencies: {
            'my-module': 'username/repo',
          },
        };
        const response = lint(packageJsonData, 'error', {exceptions: ['grunt-npm-package-json-lint']});

        expect(response.lintId).toStrictEqual('no-git-devDependencies');
        expect(response.severity).toStrictEqual('error');
        expect(response.node).toStrictEqual('devDependencies');
        expect(response.lintMessage).toStrictEqual(
          'You are using devDependencies from git repository. Please use devDependencies from npm.'
        );
      });
    });

    describe('with user/repo#author/issue', () => {
      test('LintIssue object should be returned', () => {
        const packageJsonData = {
          devDependencies: {
            'my-module': 'username/repo#author/issue',
          },
        };
        const response = lint(packageJsonData, 'error', {exceptions: ['grunt-npm-package-json-lint']});

        expect(response.lintId).toStrictEqual('no-git-devDependencies');
        expect(response.severity).toStrictEqual('error');
        expect(response.node).toStrictEqual('devDependencies');
        expect(response.lintMessage).toStrictEqual(
          'You are using devDependencies from git repository. Please use devDependencies from npm.'
        );
      });
    });

    describe('with user/repo#tag', () => {
      test('LintIssue object should be returned', () => {
        const packageJsonData = {
          devDependencies: {
            'my-module': 'username/repo#v1.0.0-rc-1',
          },
        };
        const response = lint(packageJsonData, 'error', {exceptions: ['grunt-npm-package-json-lint']});

        expect(response.lintId).toStrictEqual('no-git-devDependencies');
        expect(response.severity).toStrictEqual('error');
        expect(response.node).toStrictEqual('devDependencies');
        expect(response.lintMessage).toStrictEqual(
          'You are using devDependencies from git repository. Please use devDependencies from npm.'
        );
      });
    });

    describe('with user/repo#commit', () => {
      test('LintIssue object should be returned', () => {
        const packageJsonData = {
          devDependencies: {
            'my-module': 'username/repo#4f9012b132aa4d2d6097b516b31327c999b0a846',
          },
        };
        const response = lint(packageJsonData, 'error', {exceptions: ['grunt-npm-package-json-lint']});

        expect(response.lintId).toStrictEqual('no-git-devDependencies');
        expect(response.severity).toStrictEqual('error');
        expect(response.node).toStrictEqual('devDependencies');
        expect(response.lintMessage).toStrictEqual(
          'You are using devDependencies from git repository. Please use devDependencies from npm.'
        );
      });
    });

    describe('with git://github.com/user/repo.git', () => {
      test('LintIssue object should be returned', () => {
        const packageJsonData = {
          devDependencies: {
            'my-module': 'git://github.com/user/repo.git',
          },
        };
        const response = lint(packageJsonData, 'error', {exceptions: ['grunt-npm-package-json-lint']});

        expect(response.lintId).toStrictEqual('no-git-devDependencies');
        expect(response.severity).toStrictEqual('error');
        expect(response.node).toStrictEqual('devDependencies');
        expect(response.lintMessage).toStrictEqual(
          'You are using devDependencies from git repository. Please use devDependencies from npm.'
        );
      });
    });

    describe('with git@github.com:user/repo.git', () => {
      test('LintIssue object should be returned', () => {
        const packageJsonData = {
          devDependencies: {
            'my-module': 'git@github.com:user/repo.git',
          },
        };
        const response = lint(packageJsonData, 'error', {exceptions: ['grunt-npm-package-json-lint']});

        expect(response.lintId).toStrictEqual('no-git-devDependencies');
        expect(response.severity).toStrictEqual('error');
        expect(response.node).toStrictEqual('devDependencies');
        expect(response.lintMessage).toStrictEqual(
          'You are using devDependencies from git repository. Please use devDependencies from npm.'
        );
      });
    });

    describe('with git+https://github.com/user/repo.git', () => {
      test('LintIssue object should be returned', () => {
        const packageJsonData = {
          devDependencies: {
            'my-module': 'git+https://github.com/user/repo.git',
          },
        };
        const response = lint(packageJsonData, 'error', {exceptions: ['grunt-npm-package-json-lint']});

        expect(response.lintId).toStrictEqual('no-git-devDependencies');
        expect(response.severity).toStrictEqual('error');
        expect(response.node).toStrictEqual('devDependencies');
        expect(response.lintMessage).toStrictEqual(
          'You are using devDependencies from git repository. Please use devDependencies from npm.'
        );
      });
    });

    describe('with git+ssh://github.com/user/repo.git', () => {
      test('LintIssue object should be returned', () => {
        const packageJsonData = {
          devDependencies: {
            'my-module': 'git+ssh://github.com/user/repo.git',
          },
        };
        const response = lint(packageJsonData, 'error', {exceptions: ['grunt-npm-package-json-lint']});

        expect(response.lintId).toStrictEqual('no-git-devDependencies');
        expect(response.severity).toStrictEqual('error');
        expect(response.node).toStrictEqual('devDependencies');
        expect(response.lintMessage).toStrictEqual(
          'You are using devDependencies from git repository. Please use devDependencies from npm.'
        );
      });
    });

    describe('with http://github.com/user/repo.git', () => {
      test('LintIssue object should be returned', () => {
        const packageJsonData = {
          devDependencies: {
            'my-module': 'http://github.com/user/repo.git',
          },
        };
        const response = lint(packageJsonData, 'error', {exceptions: ['grunt-npm-package-json-lint']});

        expect(response.lintId).toStrictEqual('no-git-devDependencies');
        expect(response.severity).toStrictEqual('error');
        expect(response.node).toStrictEqual('devDependencies');
        expect(response.lintMessage).toStrictEqual(
          'You are using devDependencies from git repository. Please use devDependencies from npm.'
        );
      });
    });

    describe('with https://github.com/user/repo.git', () => {
      test('LintIssue object should be returned', () => {
        const packageJsonData = {
          devDependencies: {
            'my-module': 'https://github.com/user/repo.git',
          },
        };
        const response = lint(packageJsonData, 'error', {exceptions: ['grunt-npm-package-json-lint']});

        expect(response.lintId).toStrictEqual('no-git-devDependencies');
        expect(response.severity).toStrictEqual('error');
        expect(response.node).toStrictEqual('devDependencies');
        expect(response.lintMessage).toStrictEqual(
          'You are using devDependencies from git repository. Please use devDependencies from npm.'
        );
      });
    });
  });

  describe('when package.json has node with a invalid value and config exception', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        devDependencies: {
          'my-module': 'username/repo',
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
          'my-module': '^1.2.3',
        },
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);
    });
  });

  describe('when package.json has node with an archive URL', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        devDependencies: {
          'my-module-v3':
            'https://registry.npmjs.org/npm-package-json-lint-config-default/-/npm-package-json-lint-config-default-3.0.0.tgz',
        },
      };
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);
    });
  });
});
