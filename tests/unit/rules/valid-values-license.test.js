'use strict';

const chai = require('chai');
const ruleModule = require('./../../../src/rules/valid-values-license');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

const should = chai.should();

describe('valid-values-license Unit Tests', function() {
  context('a rule type value should be exported', function() {
    it('it should equal "array"', function() {
      ruleType.should.equal('array');
    });
  });

  context('when package.json has node with incorrect value', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        license: 'MIT'
      };
      const validValues = [
        'private',
        'unlicensed'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.lintId.should.equal('valid-values-license');
      response.severity.should.equal('error');
      response.node.should.equal('license');
      response.lintMessage.should.equal('Invalid value for license');
    });
  });

  context('when package.json has node with correct value', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        license: 'unlicensed'
      };
      const validValues = [
        'private',
        'unlicensed'
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
