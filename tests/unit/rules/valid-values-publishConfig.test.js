'use strict';

const chai = require('chai');
const ruleModule = require('./../../../src/rules/valid-values-publishConfig');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

const should = chai.should();

describe('valid-values-publishConfig Unit Tests', function() {
  context('a rule type value should be exported', function() {
    it('it should equal "array"', function() {
      ruleType.should.equal('array');
    });
  });

  context('when package.json has object node with invalid value', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        publishConfig: {
          access: 'public'
        }
      };
      const validValues = [
        {access: 'private'},
        {access: 'protected'}
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.lintId.should.equal('valid-values-publishConfig');
      response.severity.should.equal('error');
      response.node.should.equal('publishConfig');
      response.lintMessage.should.equal('Invalid value for publishConfig');
    });
  });

  context('when package.json has object node with valid value', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        publishConfig: {
          access: 'public'
        }
      };
      const validValues = [
        {access: 'private'},
        {access: 'public'}
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.should.be.true;
    });
  });

  context('when package.json has node but is invalid type', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        publishConfig: true
      };
      const validValues = [
        {access: 'private'},
        {access: 'protected'}
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.lintId.should.equal('valid-values-publishConfig');
      response.severity.should.equal('error');
      response.node.should.equal('publishConfig');
      response.lintMessage.should.equal('publishConfig node has invalid data type');
    });
  });

  context('when package.json does not have node', function() {
    it('true should be returned', function() {
      const packageJsonData = {};
      const validValues = [
        {access: 'private'},
        {access: 'protected'}
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.should.be.true;
    });
  });
});
