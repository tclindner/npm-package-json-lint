'use strict';

const should = require('should');
const requireHelper = require('../../require_helper');
const lint = requireHelper('rules/prefer-no-engineStrict').lint;

describe('prefer-no-engineStrict Unit Tests', function() {
  context('when package.json has engineStrict node', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        engineStrict: 'dummy-value'
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('prefer-no-engineStrict');
      response.lintType.should.equal('error');
      response.node.should.equal('engineStrict');
      response.lintMessage.should.equal('engineStrict was deprecated with npm v3.0.0. Please remove it from your package.json file');
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
