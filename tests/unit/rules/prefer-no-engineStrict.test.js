'use strict';

const chai = require('chai');
const {lint, ruleType} = require('./../../../src/rules/prefer-no-engineStrict');

const should = chai.should();

describe('prefer-no-engineStrict Unit Tests', function() {
  context('a rule type value should be exported', function() {
    it('it should equal "standard"', function() {
      ruleType.should.equal('standard');
    });
  });

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

      response.should.be.true;
    });
  });
});
