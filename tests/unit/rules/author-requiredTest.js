'use strict';

const should = require('should');
const requireHelper = require('../../require_helper');
const lint = requireHelper('rules/author-required').lint;

describe('author-required Unit Tests', function() {
  context('when package.json has node', function() {
    it('true should be returned', function() {
      const packageJsonData = {
        author: 'author'
      };
      const response = lint(packageJsonData);

      response.should.be.true();
    });
  });

  context('when package.json does not have node', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {};
      const response = lint(packageJsonData);

      response.lintId.should.equal('author-required');
      response.lintType.should.equal('error');
      response.node.should.equal('author');
      response.lintMessage.should.equal('author is required');
    });
  });
});
