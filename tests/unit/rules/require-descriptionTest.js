'use strict';

const should = require('should');
const requireHelper = require('../../require_helper');
const lint = requireHelper('rules/require-description').lint;

describe('require-description Unit Tests', function() {
  context('when package.json has node', function() {
    it('true should be returned', function() {
      const packageJsonData = {
        description: 'description'
      };
      const response = lint(packageJsonData, 'error');

      response.should.be.true();
    });
  });

  context('when package.json does not have node', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('require-description');
      response.lintType.should.equal('error');
      response.node.should.equal('description');
      response.lintMessage.should.equal('description is required');
    });
  });
});
