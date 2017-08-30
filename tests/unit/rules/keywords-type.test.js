'use strict';

const chai = require('chai');
const ruleModule = require('./../../../src/rules/keywords-type');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

const should = chai.should();

describe('keywords-type Unit Tests', function() {
  context('a rule type value should be exported', function() {
    it('it should equal "standard"', function() {
      ruleType.should.equal('standard');
    });
  });

  context('when package.json has node with incorrect type', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        keywords: 'string'
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('keywords-type');
      response.lintType.should.equal('error');
      response.node.should.equal('keywords');
      response.lintMessage.should.equal('Type should be an Array');
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
