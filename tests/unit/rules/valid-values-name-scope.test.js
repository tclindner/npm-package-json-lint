'use strict';

const chai = require('chai');
const ruleModule = require('./../../../src/rules/valid-values-name-scope');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

const should = chai.should();

describe('valid-values-name-scope Unit Tests', function() {
  context('a rule type value should be exported', function() {
    it('it should equal "array"', function() {
      ruleType.should.equal('array');
    });
  });

  context('when package.json has node with invalid scope', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        name: '@great/awesome-package'
      };
      const validValues = [
        '@cool',
        '@awesome'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.lintId.should.equal('valid-values-name-scope');
      response.severity.should.equal('error');
      response.node.should.equal('name');
      response.lintMessage.should.equal('Invalid value for name scope');
    });
  });

  context('when package.json has node without scope', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        name: 'awesome-package'
      };
      const validValues = [
        '@cool',
        '@awesome'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.lintId.should.equal('valid-values-name-scope');
      response.severity.should.equal('error');
      response.node.should.equal('name');
      response.lintMessage.should.equal('Invalid value for name scope');
    });
  });

  context('when package.json has node with valid scope', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        name: '@cool/awesome-package'
      };
      const validValues = [
        '@cool',
        '@awesome'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.should.be.true;
    });
  });

  context('when package.json does not have node', function() {
    it('true should be returned', function() {
      const packageJsonData = {};
      const validValues = [
        '@cool',
        '@awesome'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.should.be.true;
    });
  });
});
