'use strict';

const chai = require('chai');
const ruleModule = require('./../../../src/rules/description-format');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

const should = chai.should();

describe('description-format Unit Tests', function() {
  context('a rule type value should be exported', function() {
    it('it should equal "object"', function() {
      ruleType.should.equal('object');
    });
  });

  context('when package.json has node with incorrect format', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        description: true
      };
      const config = {
        requireCapitalFirstLetter: true,
        requireEndingPeriod: true
      };
      const response = lint(packageJsonData, 'error', config);

      response.lintId.should.equal('description-format');
      response.severity.should.equal('error');
      response.node.should.equal('description');
      response.lintMessage.should.equal('Type should be a string');
    });
  });

  context('when package.json has node with lowercase first letter', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        description: 'lowercase'
      };
      const config = {
        requireCapitalFirstLetter: true
      };
      const response = lint(packageJsonData, 'error', config);

      response.lintId.should.equal('description-format');
      response.severity.should.equal('error');
      response.node.should.equal('description');
      response.lintMessage.should.equal('The description should start with a capital letter. It currently starts with l.');
    });
  });

  context('when package.json has node without period at end', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        description: 'My description'
      };
      const config = {
        requireEndingPeriod: true
      };
      const response = lint(packageJsonData, 'error', config);

      response.lintId.should.equal('description-format');
      response.severity.should.equal('error');
      response.node.should.equal('description');
      response.lintMessage.should.equal('The description should end with a period.');
    });
  });

  context('when package.json has node with correct format', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        description: 'My description.'
      };
      const config = {
        requireCapitalFirstLetter: true,
        requireEndingPeriod: true
      };
      const response = lint(packageJsonData, 'error', config);

      response.should.be.true;
    });
  });

  context('when no rule config passed', function() {
    it('true should be returned', function() {
      const packageJsonData = {
        description: 'lowercase'
      };
      const config = {};
      const response = lint(packageJsonData, 'error', config);

      response.should.be.true;
    });
  });

  context('when package.json does not have node', function() {
    it('true should be returned', function() {
      const packageJsonData = {};
      const config = {
        requireCapitalFirstLetter: true,
        requireEndingPeriod: true
      };
      const response = lint(packageJsonData, 'error', config);

      response.should.be.true;
    });
  });
});
