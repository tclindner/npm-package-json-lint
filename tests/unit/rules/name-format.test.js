'use strict';

const chai = require('chai');
const lint = require('./../../../src/rules/name-format').lint;

const should = chai.should();

describe('name-format Unit Tests', function() {
  context('when package.json has node with incorrect format', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        name: 'ImNotLowercase'
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('name-format');
      response.lintType.should.equal('error');
      response.node.should.equal('name');
      response.lintMessage.should.equal('Format should be all lowercase');
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
