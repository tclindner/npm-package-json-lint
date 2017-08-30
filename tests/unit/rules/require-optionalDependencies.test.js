'use strict';

const chai = require('chai');
const ruleModule = require('./../../../src/rules/require-optionalDependencies');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

const should = chai.should();

describe('require-optionalDependencies Unit Tests', function() {
  context('a rule type value should be exported', function() {
    it('it should equal "standard"', function() {
      ruleType.should.equal('standard');
    });
  });

  context('when package.json has node', function() {
    it('true should be returned', function() {
      const packageJsonData = {
        optionalDependencies: 'optionalDependencies'
      };
      const response = lint(packageJsonData, 'error');

      response.should.be.true;
    });
  });

  context('when package.json does not have node', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('require-optionalDependencies');
      response.lintType.should.equal('error');
      response.node.should.equal('optionalDependencies');
      response.lintMessage.should.equal('optionalDependencies is required');
    });
  });
});
