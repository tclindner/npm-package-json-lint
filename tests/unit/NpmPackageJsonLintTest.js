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
        const rules = {
          'description-type': 'rules\\description-type.js',
          'name-format': 'rules\\name-format.js'
        };
        const rulesStub = sinon.stub(npmPackageJsonLint, '_loadRules').returns(rules);
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
        const rules = {
          'require-keywords': 'rules\\require-keywords.js',
          'name-format': 'rules\\name-format.js'
        };
        const rulesStub = sinon.stub(npmPackageJsonLint, '_loadRules').returns(rules);
        const configStub = sinon.stub(npmPackageJsonLint, '_getConfig').returns(config);
        const response = npmPackageJsonLint.lint();
        const expectedErrorCount = 1;
        const expectedWarningCount = 1;

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
        const rules = {
          'require-keywords': 'rules\\require-keywords.js',
          'name-format': 'rules\\name-format.js'
        };
        const rulesStub = sinon.stub(npmPackageJsonLint, '_loadRules').returns(rules);
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
        const rules = {
          'valid-values-author': 'rules\\valid-values-author.js'
        };
        const rulesStub = sinon.stub(npmPackageJsonLint, '_loadRules').returns(rules);
        const configStub = sinon.stub(npmPackageJsonLint, '_getConfig').returns(config);
        const response = npmPackageJsonLint.lint();
        const expectedErrorCount = 1;

        response.errors.length.should.equal(expectedErrorCount);
        response.hasOwnProperty('warnings').should.be.false();
      });
    });
  });
});
