'use strict';

const NpmPackageJsonLint = require('./../../src/NpmPackageJsonLint');

describe('NpmPackageJsonLint Unit Tests', function() {
  describe('lint method', function() {
    describe('validate that errors and warnings are set', function() {
      test('two errors and zero warnings expected', function() {
        const packageJsonData = {
          name: 'ALLCAPS',
          description: true
        };
        const config = {
          'description-type': 'error',
          'name-format': 'error'
        };
        const npmPackageJsonLint = new NpmPackageJsonLint();
        const response = npmPackageJsonLint.lint(packageJsonData, config);
        const expectedIssues = 2;
        const expectedErrorCount = 2;
        const expectedWarningCount = 0;

        expect(response.issues.length).toStrictEqual(expectedIssues);
        expect(response.issues.filter((issue) => issue.severity === 'error').length).toStrictEqual(expectedErrorCount);
        expect(response.issues.filter((issue) => issue.severity === 'warning').length).toStrictEqual(expectedWarningCount);
      });
    });

    describe('validate that errors and warnings are set', function() {
      test('one error and one warning expected', function() {
        const packageJsonData = {
          name: 'ALLCAPS'
        };
        const config = {
          'require-keywords': 'error',
          'name-format': 'warning'
        };
        const npmPackageJsonLint = new NpmPackageJsonLint();
        const response = npmPackageJsonLint.lint(packageJsonData, config);
        const expectedIssues = 2;
        const expectedErrorCount = 1;
        const expectedWarningCount = 1;

        expect(response.issues.length).toStrictEqual(expectedIssues);
        expect(response.issues.filter((issue) => issue.severity === 'error').length).toStrictEqual(expectedErrorCount);
        expect(response.issues.filter((issue) => issue.severity === 'warning').length).toStrictEqual(expectedWarningCount);
      });
    });

    describe('validate that errors and warnings are set, but "off" rules are skipped!', function() {
      test('zero errors and zero warnings expected', function() {
        const packageJsonData = {
          name: 'ALLCAPS'
        };
        const config = {
          'require-keywords': 'off',
          'name-format': 'off'
        };
        const npmPackageJsonLint = new NpmPackageJsonLint();
        const response = npmPackageJsonLint.lint(packageJsonData, config);
        const expectedIssues = 0;
        const expectedErrorCount = 0;
        const expectedWarningCount = 0;

        expect(response.issues.length).toStrictEqual(expectedIssues);
        expect(response.issues.filter((issue) => issue.severity === 'error').length).toStrictEqual(expectedErrorCount);
        expect(response.issues.filter((issue) => issue.severity === 'warning').length).toStrictEqual(expectedWarningCount);
      });
    });

    describe('validate that errors and warnings are set', function() {
      test('one error and one warning expected', function() {
        const packageJsonData = {
          name: 'ALLCAPS'
        };
        const config = {
          'require-keywords': 'warning',
          'name-format': 'error'
        };
        const npmPackageJsonLint = new NpmPackageJsonLint();
        const response = npmPackageJsonLint.lint(packageJsonData, config);
        const expectedIssues = 2;
        const expectedErrorCount = 1;
        const expectedWarningCount = 1;

        expect(response.issues.length).toStrictEqual(expectedIssues);
        expect(response.issues.filter((issue) => issue.severity === 'error').length).toStrictEqual(expectedErrorCount);
        expect(response.issues.filter((issue) => issue.severity === 'warning').length).toStrictEqual(expectedWarningCount);
      });
    });

    describe('validate that errors and warnings are set', function() {
      test('one error and one warning expected', function() {
        const packageJsonData = {
          author: 'Caitlin Snow'
        };
        const config = {
          'valid-values-author': ['error', [
            'Barry Allen',
            'Iris West'
          ]]
        };
        const npmPackageJsonLint = new NpmPackageJsonLint();
        const response = npmPackageJsonLint.lint(packageJsonData, config);
        const expectedIssues = 1;
        const expectedErrorCount = 1;
        const expectedWarningCount = 0;

        expect(response.issues.length).toStrictEqual(expectedIssues);
        expect(response.issues.filter((issue) => issue.severity === 'error').length).toStrictEqual(expectedErrorCount);
        expect(response.issues.filter((issue) => issue.severity === 'warning').length).toStrictEqual(expectedWarningCount);
      });
    });

    describe('validate that when array style rules have an array value with off', function() {
      test('zero errors and zero warning expected', function() {
        const packageJsonData = {
          author: 'Caitlin Snow'
        };
        const config = {
          'valid-values-author': ['off', [
            'Barry Allen',
            'Iris West'
          ]]
        };
        const npmPackageJsonLint = new NpmPackageJsonLint();
        const response = npmPackageJsonLint.lint(packageJsonData, config);
        const expectedIssues = 0;
        const expectedErrorCount = 0;
        const expectedWarningCount = 0;

        expect(response.issues.length).toStrictEqual(expectedIssues);
        expect(response.issues.filter((issue) => issue.severity === 'error').length).toStrictEqual(expectedErrorCount);
        expect(response.issues.filter((issue) => issue.severity === 'warning').length).toStrictEqual(expectedWarningCount);
      });
    });

    describe('validate that when array style rules have a value of off', function() {
      test('zero errors and zero warnings expected', function() {
        const packageJsonData = {
          author: 'Caitlin Snow'
        };
        const config = {
          'valid-values-author': 'off'
        };
        const npmPackageJsonLint = new NpmPackageJsonLint();
        const response = npmPackageJsonLint.lint(packageJsonData, config);
        const expectedIssues = 0;
        const expectedErrorCount = 0;
        const expectedWarningCount = 0;

        expect(response.issues.length).toStrictEqual(expectedIssues);
        expect(response.issues.filter((issue) => issue.severity === 'error').length).toStrictEqual(expectedErrorCount);
        expect(response.issues.filter((issue) => issue.severity === 'warning').length).toStrictEqual(expectedWarningCount);
      });
    });
  });

  describe('getRules method', function() {
    describe('when getRules is called', function() {
      test('all rules are returned', function() {
        const npmPackageJsonLint = new NpmPackageJsonLint();
        const rules = npmPackageJsonLint.getRules();

        expect(rules['require-author']).toContain('src/rules/require-author.js');
        expect(rules['require-name']).toContain('src/rules/require-name.js');
      });
    });
  });

  describe('getRule method', function() {
    describe('when getRule is called', function() {
      test('specified rule is returned', function() {
        const npmPackageJsonLint = new NpmPackageJsonLint();
        const rule = npmPackageJsonLint.getRule('require-name');

        expect(typeof rule.lint).toStrictEqual('function');
        expect(rule.ruleType).toStrictEqual('standard');
      });
    });
  });
});
