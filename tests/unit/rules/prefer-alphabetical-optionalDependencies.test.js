'use strict';

const chai = require('chai');
const lint = require('./../../../src/rules/prefer-alphabetical-optionalDependencies').lint;

const should = chai.should();

describe('prefer-alphabetical-optionalDependencies Unit Tests', function() {
  context('when package.json has node with an invalid order', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        optionalDependencies: {
          'semver': '^5.3.0',
          'chalk': '^1.1.3',
          'user-home': '^2.0.0'
        }
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('prefer-alphabetical-optionalDependencies');
      response.lintType.should.equal('error');
      response.node.should.equal('optionalDependencies');
      response.lintMessage.should.equal('Your optionalDependencies are not in alphabetical order. Please move semver after chalk.');
    });
  });

  context('when package.json has node with a valid order', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        optionalDependencies: {
          'chalk': '^1.1.3',
          'semver': '^5.3.0',
          'user-home': '^2.0.0'
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
