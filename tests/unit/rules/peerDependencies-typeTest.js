'use strict';

const should = require('should');
const requireHelper = require('../../require_helper');
const lint = requireHelper('rules/peerDependencies-type').lint;

describe('peerDependencies-type Unit Tests', function() {
  context('when package.json has node with incorrect type', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        peerDependencies: 'peerDependencies'
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('peerDependencies-type');
      response.lintType.should.equal('error');
      response.node.should.equal('peerDependencies');
      response.lintMessage.should.equal('Type should be an Object');
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
