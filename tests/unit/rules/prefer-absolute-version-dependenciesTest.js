'use strict';

const should = require('should');
const requireHelper = require('../../require_helper');
const lint = requireHelper('rules/prefer-absolute-version-dependencies').lint;

describe('prefer-absolute-version-dependencies Unit Tests', function() {
  context('when package.json has node with an invalid value', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        dependencies: {
          'npm-package-json-lint': '~1.0.0'
        }
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('prefer-absolute-version-dependencies');
      response.lintType.should.equal('error');
      response.node.should.equal('dependencies');
      response.lintMessage.should.equal('You are using an invalid version range. Please use absolute versions.');
    });
  });

  context('when package.json has node with a valid value (= prefixed)', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        dependencies: {
          'gulp-npm-package-json-lint': '=1.0.0'
        }
      };
      const response = lint(packageJsonData, 'error');

      response.should.be.true();
    });
  });

  context('when package.json has node with a valid value', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        dependencies: {
          'gulp-npm-package-json-lint': '1.0.0'
        }
      };
      const response = lint(packageJsonData, 'error');

      response.should.be.true();
    });
  });

  context('when package.json does not have node', function() {
    it('true should be returned', function() {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      response.should.be.true();
    });
  });
});
