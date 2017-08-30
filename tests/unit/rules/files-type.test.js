'use strict';

const chai = require('chai');
const {lint, ruleType} = require('./../../../src/rules/files-type');

const should = chai.should();

describe('files-type Unit Tests', function() {
  context('a rule type value should be exported', function() {
    it('it should equal "standard"', function() {
      ruleType.should.equal('standard');
    });
  });

  context('when package.json has node with incorrect type', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        files: 'string'
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('files-type');
      response.lintType.should.equal('error');
      response.node.should.equal('files');
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
