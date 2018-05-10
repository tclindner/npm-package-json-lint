'use strict';

const fs = require('fs');
const chai = require('chai');
const sinon = require('sinon');
const NpmPackageJsonLint = require('./../../src/NpmPackageJsonLint');

const should = chai.should();

describe('NpmPackageJsonLint Unit Tests', function() {
  describe('lint method', function() {
    context('validate that errors and warnings are set', function() {
      it('two errors and zero warnings expected', function() {
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

        response.issues.length.should.equal(expectedIssues);
        response.issues.filter((issue) => issue.severity === 'error').length.should.equal(expectedErrorCount);
        response.issues.filter((issue) => issue.severity === 'warning').length.should.equal(expectedWarningCount);
      });
    });

    context('validate that errors and warnings are set', function() {
      it('one error and one warning expected', function() {
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

        response.issues.length.should.equal(expectedIssues);
        response.issues.filter((issue) => issue.severity === 'error').length.should.equal(expectedErrorCount);
        response.issues.filter((issue) => issue.severity === 'warning').length.should.equal(expectedWarningCount);
      });
    });

    context('validate that errors and warnings are set, but "off" rules are skipped!', function() {
      it('zero errors and zero warnings expected', function() {
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

        response.issues.length.should.equal(expectedIssues);
        response.issues.filter((issue) => issue.severity === 'error').length.should.equal(expectedErrorCount);
        response.issues.filter((issue) => issue.severity === 'warning').length.should.equal(expectedWarningCount);
      });
    });

    context('validate that errors and warnings are set', function() {
      it('one error and one warning expected', function() {
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

        response.issues.length.should.equal(expectedIssues);
        response.issues.filter((issue) => issue.severity === 'error').length.should.equal(expectedErrorCount);
        response.issues.filter((issue) => issue.severity === 'warning').length.should.equal(expectedWarningCount);
      });
    });

    context('validate that errors and warnings are set', function() {
      it('one error and one warning expected', function() {
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

        response.issues.length.should.equal(expectedIssues);
        response.issues.filter((issue) => issue.severity === 'error').length.should.equal(expectedErrorCount);
        response.issues.filter((issue) => issue.severity === 'warning').length.should.equal(expectedWarningCount);
      });
    });

    context('validate that when array style rules have an array value with off', function() {
      it('zero errors and zero warning expected', function() {
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

        response.issues.length.should.equal(expectedIssues);
        response.issues.filter((issue) => issue.severity === 'error').length.should.equal(expectedErrorCount);
        response.issues.filter((issue) => issue.severity === 'warning').length.should.equal(expectedWarningCount);
      });
    });

    context('validate that when array style rules have a value of off', function() {
      it('zero errors and zero warnings expected', function() {
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

        response.issues.length.should.equal(expectedIssues);
        response.issues.filter((issue) => issue.severity === 'error').length.should.equal(expectedErrorCount);
        response.issues.filter((issue) => issue.severity === 'warning').length.should.equal(expectedWarningCount);
      });
    });
  });

  describe('getRules method', function() {
    context('when getRules is called', function() {
      it('all rules are returned', function() {
        const npmPackageJsonLint = new NpmPackageJsonLint();
        const rules = npmPackageJsonLint.getRules();

        rules['require-author'].includes('src/rules/require-author.js').should.be.true;
        rules['require-name'].includes('src/rules/require-name.js').should.be.true;
      });
    });
  });

  describe('getRule method', function() {
    context('when getRule is called', function() {
      it('specified rule is returned', function() {
        const npmPackageJsonLint = new NpmPackageJsonLint();
        const rule = npmPackageJsonLint.getRule('require-name');

        (typeof rule.lint).should.equal('function');
        rule.ruleType.should.equal('standard');
      });
    });
  });
});
