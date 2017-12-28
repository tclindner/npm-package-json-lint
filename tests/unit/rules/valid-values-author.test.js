'use strict';

const chai = require('chai');
const ruleModule = require('./../../../src/rules/valid-values-author');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

const should = chai.should();

describe('valid-values-author Unit Tests', function() {
  context('a rule type value should be exported', function() {
    it('it should equal "array"', function() {
      ruleType.should.equal('array');
    });
  });

  context('when package.json has string node with invalid value', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        author: 'LastName, FirstName'
      };
      const validValues = [
        'FirstName LastName',
        'FirstName MiddleName LastName'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.lintId.should.equal('valid-values-author');
      response.lintType.should.equal('error');
      response.node.should.equal('author');
      response.lintMessage.should.equal('Invalid value for author');
    });
  });

  context('when package.json has string node with valid value', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        author: 'LastName, FirstName'
      };
      const validValues = [
        'FirstName LastName',
        'FirstName MiddleName LastName',
        'LastName, FirstName'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.should.be.true;
    });
  });

  context('when package.json has object node with invalid value', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        author: {
          name: 'LastName, FirstName',
          url: 'http://www.example.com'
        }
      };
      const validValues = [
        'FirstName LastName',
        'FirstName MiddleName LastName'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.lintId.should.equal('valid-values-author');
      response.lintType.should.equal('error');
      response.node.should.equal('author');
      response.lintMessage.should.equal('Invalid value for author');
    });
  });

  context('when package.json has object node with valid value', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        author: {
          name: 'LastName, FirstName',
          url: 'http://www.example.com'
        }
      };
      const validValues = [
        'FirstName LastName',
        'FirstName MiddleName LastName',
        'LastName, FirstName'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.should.be.true;
    });
  });

  context('when package.json has object node but is missing the name property', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        author: {
          names: 'LastName, FirstName',
          url: 'http://www.example.com'
        }
      };
      const validValues = [
        'FirstName LastName',
        'FirstName MiddleName LastName'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.lintId.should.equal('valid-values-author');
      response.lintType.should.equal('error');
      response.node.should.equal('author');
      response.lintMessage.should.equal('author object missing name property');
    });
  });

  context('when package.json has node but is invalid type', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        author: true
      };
      const validValues = [
        'FirstName LastName',
        'FirstName MiddleName LastName'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.lintId.should.equal('valid-values-author');
      response.lintType.should.equal('error');
      response.node.should.equal('author');
      response.lintMessage.should.equal('author node has invalid data type');
    });
  });

  context('when package.json does not have node', function() {
    it('true should be returned', function() {
      const packageJsonData = {};
      const validValues = [
        'FirstName LastName',
        'FirstName MiddleName LastName',
        'LastName, FirstName'
      ];
      const response = lint(packageJsonData, 'error', validValues);

      response.should.be.true;
    });
  });
});
