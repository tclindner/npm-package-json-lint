'use strict';

const chai = require('chai');
const lint = require('./../../../src/rules/files-type').lint;

const should = chai.should();

describe('files-type Unit Tests', function() {
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
