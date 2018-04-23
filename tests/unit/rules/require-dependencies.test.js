'use strict';

const chai = require('chai');
const ruleModule = require('./../../../src/rules/require-dependencies');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

const should = chai.should();

describe('require-dependencies Unit Tests', function() {
  context('a rule type value should be exported', function() {
    it('it should equal "standard"', function() {
      ruleType.should.equal('standard');
    });
  });

  context('when package.json has node', function() {
    it('true should be returned', function() {
      const packageJsonData = {
        dependencies: 'dependencies'
      };
      const response = lint(packageJsonData, 'error');

      response.should.be.true;
    });
  });

  context('when package.json does not have node', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('require-dependencies');
      response.severity.should.equal('error');
      response.node.should.equal('dependencies');
      response.lintMessage.should.equal('dependencies is required');
    });
  });
});
