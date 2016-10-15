'use strict';

const should = require('should');
const requireHelper = require('../../require_helper');
const lint = requireHelper('rules/valid-values-license').lint;

describe('valid-values-license Unit Tests', function() {
  context('when package.json has node with incorrect value', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        license: 'MIT'
      };
      const validValues = [
        'private',
        'unlicensed'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.lintId.should.equal('valid-values-license');
      response.lintType.should.equal('error');
      response.node.should.equal('license');
      response.lintMessage.should.equal('Invalid value for license');
    });
  });

  context('when package.json has node with correct value', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        license: 'unlicensed'
      };
      const validValues = [
        'private',
        'unlicensed'
      ];
      const response = lint(packageJsonData, 'error', validValues);

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
