'use strict';

const chai = require('chai');
const lint = require('./../../../src/rules/require-bundledDependencies').lint;

const should = chai.should();

describe('require-bundledDependencies Unit Tests', function() {
  context('when package.json has node', function() {
    it('true should be returned', function() {
      const packageJsonData = {
        bundledDependencies: 'bundledDependencies'
      };
      const response = lint(packageJsonData, 'error');

      response.should.be.true;
    });
  });

  context('when package.json does not have node', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('require-bundledDependencies');
      response.lintType.should.equal('error');
      response.node.should.equal('bundledDependencies');
      response.lintMessage.should.equal('bundledDependencies is required');
    });
  });
});
