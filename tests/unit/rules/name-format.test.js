'use strict';

const chai = require('chai');
const ruleModule = require('./../../../src/rules/name-format');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

const should = chai.should();

describe('name-format Unit Tests', function() {
  context('a rule type value should be exported', function() {
    it('it should equal "standard"', function() {
      ruleType.should.equal('standard');
    });
  });

  context('when package.json has node with incorrect format', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        name: 'ImNotLowercase'
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('name-format');
      response.severity.should.equal('error');
      response.node.should.equal('name');
      response.lintMessage.should.equal('Format should be all lowercase');
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
