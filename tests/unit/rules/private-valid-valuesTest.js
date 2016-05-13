'use strict';

const should = require('should');
const requireHelper = require('../../require_helper');
const lint = requireHelper('rules/private-valid-values').lint;

describe('private-valid-values Unit Tests', function() {
  context('when package.json has node with incorrect format', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        private: true
      };
      const validValues = [
        false
      ];
      const response = lint(packageJsonData, validValues);

      response.lintId.should.equal('private-valid-values');
      response.lintType.should.equal('error');
      response.node.should.equal('private');
      response.lintMessage.should.equal('Invalid value for private');
    });
  });

  context('when package.json has node with correct format', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        private: false
      };
      const validValues = [
        false
      ];
      const response = lint(packageJsonData, validValues);

      response.should.be.true();
    });
  });

  context('when package.json does not have node', function() {
    it('true should be returned', function() {
      const packageJsonData = {};
      const response = lint(packageJsonData);

      response.should.be.true();
    });
  });
});
