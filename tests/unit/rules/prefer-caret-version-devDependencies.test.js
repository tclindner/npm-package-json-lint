'use strict';

const chai = require('chai');
const requireHelper = require('../../require_helper');
const lint = requireHelper('rules/prefer-caret-version-devDependencies').lint;

const should = chai.should();

describe('prefer-caret-version-devDependencies Unit Tests', function() {
  context('when package.json has node with an invalid value', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        devDependencies: {
          'npm-package-json-lint': '~1.0.0'
        }
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('prefer-caret-version-devDependencies');
      response.lintType.should.equal('error');
      response.node.should.equal('devDependencies');
      response.lintMessage.should.equal('You are using an invalid version range. Please use ^.');
    });
  });

  context('when package.json has node with a valid value', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        devDependencies: {
          'gulp-npm-package-json-lint': '^1.0.0'
        }
      };
      const response = lint(packageJsonData, 'error');

      response.should.be.true;
    });
  });

  context('when package.json does not have node', function() {
    it('true should be returned', function() {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      response.should.be.true;
    });
  });
});
