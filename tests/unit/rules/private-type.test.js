'use strict';

const chai = require('chai');
const ruleModule = require('./../../../src/rules/private-type');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

const should = chai.should();

describe('private-type Unit Tests', function() {
  context('a rule type value should be exported', function() {
    it('it should equal "standard"', function() {
      ruleType.should.equal('standard');
    });
  });

  context('when package.json has node with incorrect type', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        'private': 'string'
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('private-type');
      response.severity.should.equal('error');
      response.node.should.equal('private');
      response.lintMessage.should.equal('Type should be a boolean');
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
