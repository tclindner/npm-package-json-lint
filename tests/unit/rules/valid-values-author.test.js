'use strict';

const chai = require('chai');
const requireHelper = require('../../require_helper');
const lint = requireHelper('rules/valid-values-author').lint;

const should = chai.should();

describe('valid-values-author Unit Tests', function() {
  context('when package.json has node with invalid value', function() {
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

  context('when package.json has node with valid value', function() {
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
