'use strict';

const chai = require('chai');
const {lint, ruleType} = require('./../../../src/rules/version-format');

const should = chai.should();

describe('version-format Unit Tests', function() {
  context('a rule type value should be exported', function() {
    it('it should equal "standard"', function() {
      ruleType.should.equal('standard');
    });
  });

  context('when package.json has node with invalid version', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        version: '1.a.0'
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('version-format');
      response.lintType.should.equal('error');
      response.node.should.equal('version');
      response.lintMessage.should.equal('Format must be a valid semantic version');
    });
  });

  context('when package.json has node with valid version', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        version: '1.0.0'
      };
      const response = lint(packageJsonData, 'error');

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
