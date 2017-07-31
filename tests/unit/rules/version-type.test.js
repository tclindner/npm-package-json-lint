'use strict';

const chai = require('chai');
const lint = require('./../../../src/rules/version-type').lint;

const should = chai.should();

describe('version-type Unit Tests', function() {
  context('when package.json has node with incorrect type', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        version: true
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('version-type');
      response.lintType.should.equal('error');
      response.node.should.equal('version');
      response.lintMessage.should.equal('Type should be a string');
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
