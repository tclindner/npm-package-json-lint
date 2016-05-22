'use strict';

const should = require('should');
const requireHelper = require('../../require_helper');
const lint = requireHelper('rules/require-peerDependencies').lint;

describe('require-peerDependencies Unit Tests', function() {
  context('when package.json has node', function() {
    it('true should be returned', function() {
      const packageJsonData = {
        peerDependencies: 'peerDependencies'
      };
      const response = lint(packageJsonData, 'error');

      response.should.be.true();
    });
  });

  context('when package.json does not have node', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('require-peerDependencies');
      response.lintType.should.equal('error');
      response.node.should.equal('peerDependencies');
      response.lintMessage.should.equal('peerDependencies is required');
    });
  });
});
