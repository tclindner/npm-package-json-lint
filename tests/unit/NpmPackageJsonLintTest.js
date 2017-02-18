'use strict';

/* eslint max-nested-callbacks: "off" */

const fs = require('fs');
const should = require('should');
const sinon = require('sinon');
const requireHelper = require('../require_helper');
const NpmPackageJsonLint = requireHelper('NpmPackageJsonLint');

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
        const options = {
          ignoreWarnings: false
        };
        const npmPackageJsonLint = new NpmPackageJsonLint(packageJsonData, config, options);
        const configStub = sinon.stub(npmPackageJsonLint, '_getConfig').returns(config);
        const response = npmPackageJsonLint.lint();
        const expectedErrorCount = 2;
        const expectedWarningCount = 0;

        response.errors.length.should.equal(expectedErrorCount);
        response.warnings.length.should.equal(expectedWarningCount);
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
        const options = {
          ignoreWarnings: false
        };
        const npmPackageJsonLint = new NpmPackageJsonLint(packageJsonData, config, options);
        const configStub = sinon.stub(npmPackageJsonLint, '_getConfig').returns(config);
        const response = npmPackageJsonLint.lint();
        const expectedErrorCount = 1;
        const expectedWarningCount = 1;

        response.errors.length.should.equal(expectedErrorCount);
        response.warnings.length.should.equal(expectedWarningCount);
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
        const options = {
          ignoreWarnings: false
        };
        const npmPackageJsonLint = new NpmPackageJsonLint(packageJsonData, config, options);
        const configStub = sinon.stub(npmPackageJsonLint, '_getConfig').returns(config);
        const response = npmPackageJsonLint.lint();
        const expectedErrorCount = 0;
        const expectedWarningCount = 0;

        response.errors.length.should.equal(expectedErrorCount);
        response.warnings.length.should.equal(expectedWarningCount);
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
        const options = {
          ignoreWarnings: true
        };
        const npmPackageJsonLint = new NpmPackageJsonLint(packageJsonData, config, options);
        const configStub = sinon.stub(npmPackageJsonLint, '_getConfig').returns(config);
        const response = npmPackageJsonLint.lint();
        const expectedErrorCount = 1;

        response.errors.length.should.equal(expectedErrorCount);
        response.hasOwnProperty('warnings').should.be.false();
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
        const options = {
          ignoreWarnings: true
        };
        const npmPackageJsonLint = new NpmPackageJsonLint(packageJsonData, config, options);
        const configStub = sinon.stub(npmPackageJsonLint, '_getConfig').returns(config);
        const response = npmPackageJsonLint.lint();
        const expectedErrorCount = 1;

        response.errors.length.should.equal(expectedErrorCount);
        response.hasOwnProperty('warnings').should.be.false();
      });
    });
  });

  describe('_getConfig method', function() {
    context('when a valid config object is passed', function() {
      it('config is returned', function() {
        const packageJsonData = {
          author: 'Caitlin Snow'
        };
        const config = {
          'rules': {
            'require-author': 'error'
          }
        };
        const options = {
          ignoreWarnings: true
        };
        const npmPackageJsonLint = new NpmPackageJsonLint(packageJsonData, config, options);
        const actual = npmPackageJsonLint._getConfig(config);
        const expected = {
          'require-author': 'error'
        };

        actual.should.eql(expected);
      });
    });
  });
});
