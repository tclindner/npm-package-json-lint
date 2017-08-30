'use strict';

const chai = require('chai');
const ruleModule = require('./../../../src/rules/valid-values-private');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

const should = chai.should();

describe('valid-values-private Unit Tests', function() {
  context('a rule type value should be exported', function() {
    it('it should equal "array"', function() {
      ruleType.should.equal('array');
    });
  });

  context('when package.json has node with incorrect format', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        'private': true
      };
      const validValues = [
        false
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.lintId.should.equal('valid-values-private');
      response.lintType.should.equal('error');
      response.node.should.equal('private');
      response.lintMessage.should.equal('Invalid value for private');
    });
  });

  context('when package.json has node with correct format', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        'private': false
      };
      const validValues = [
        false
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.should.be.true;
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
