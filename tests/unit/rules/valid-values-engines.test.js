'use strict';

const chai = require('chai');
const ruleModule = require('./../../../src/rules/valid-values-engines');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

const should = chai.should();

describe('valid-values-engines Unit Tests', function() {
  context('a rule type value should be exported', function() {
    it('it should equal "array"', function() {
      ruleType.should.equal('array');
    });
  });

  context('when package.json has object node with invalid value', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        engines: {
          node: '^6.0.0'
        }
      };
      const validValues = [
        {
          node: '^6.0.0',
          npm: '^3.0.0'
        },
        {node: '^8.0.0'}
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.lintId.should.equal('valid-values-engines');
      response.severity.should.equal('error');
      response.node.should.equal('engines');
      response.lintMessage.should.equal('Invalid value for engines');
    });
  });

  context('when package.json has object node with vvalid value, but invalid version range', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        engines: {
          node: '^6.a.0'
        }
      };
      const validValues = [
        {node: '^6.a.0'}
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.lintId.should.equal('valid-values-engines');
      response.severity.should.equal('error');
      response.node.should.equal('engines');
      response.lintMessage.should.equal('engines, node version range is invalid. Currently set to ^6.a.0');
    });
  });

  context('when package.json has object node with valid value', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        engines: {
          node: '^6.0.0',
          npm: '^3.0.0'
        }
      };
      const validValues = [
        {
          node: '^6.0.0',
          npm: '^3.0.0'
        },
        {
          node: '^8.0.0',
          npm: '^5.0.0'
        }
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.should.be.true;
    });
  });

  context('when package.json has node but is invalid type', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        engines: true
      };
      const validValues = [
        {
          node: '^6.0.0',
          npm: '^3.0.0'
        },
        {
          node: '^8.0.0',
          npm: '^5.0.0'
        }
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.lintId.should.equal('valid-values-engines');
      response.severity.should.equal('error');
      response.node.should.equal('engines');
      response.lintMessage.should.equal('engines node has invalid data type');
    });
  });

  context('when package.json does not have node', function() {
    it('true should be returned', function() {
      const packageJsonData = {};
      const validValues = [
        {
          node: '^6.0.0',
          npm: '^3.0.0'
        },
        {node: '^8.0.0'}
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.should.be.true;
    });
  });
});
