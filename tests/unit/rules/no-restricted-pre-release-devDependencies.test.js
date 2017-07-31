'use strict';

const chai = require('chai');
const lint = require('./../../../src/rules/no-restricted-pre-release-devDependencies').lint;

const should = chai.should();

describe('no-restricted-pre-release-devDependencies Unit Tests', function() {
  context('when package.json has node with a restricted value', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        devDependencies: {
          'npm-package-json-lint': '^1.0.0-beta'
        }
      };
      const invldPreReleaseDeps = [
        'npm-package-json-lint',
        'grunt-npm-package-json-lint'
      ];
      const response = lint(packageJsonData, 'error', invldPreReleaseDeps);

      response.lintId.should.equal('no-restricted-pre-release-devDependencies');
      response.lintType.should.equal('error');
      response.node.should.equal('devDependencies');
      response.lintMessage.should.equal('You are using a restricted pre-release dependency. Please remove it.');
    });
  });

  context('when package.json has node with a valid value', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        devDependencies: {
          'grunt-npm-package-json-lint': '^1.0.0'
        }
      };
      const invldPreReleaseDeps = [
        'npm-package-json-lint',
        'grunt-npm-package-json-lint'
      ];
      const response = lint(packageJsonData, 'error', invldPreReleaseDeps);

      response.should.be.true;
    });
  });

  context('when package.json does not have node', function() {
    it('true should be returned', function() {
      const packageJsonData = {};
      const invldPreReleaseDeps = [
        'npm-package-json-lint',
        'grunt-npm-package-json-lint'
      ];
      const response = lint(packageJsonData, 'error', invldPreReleaseDeps);

      response.should.be.true;
    });
  });
});
