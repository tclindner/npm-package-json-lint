'use strict';

const chai = require('chai');
const lint = require('./../../../src/rules/private-type').lint;

const should = chai.should();

describe('private-type Unit Tests', function() {
  context('when package.json has node with incorrect type', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        'private': 'string'
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('private-type');
      response.lintType.should.equal('error');
      response.node.should.equal('private');
      response.lintMessage.should.equal('Type should be a boolean');
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
