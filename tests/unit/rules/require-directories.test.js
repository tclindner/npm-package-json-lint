'use strict';

const chai = require('chai');
const lint = require('./../../../src/rules/require-directories').lint;

const should = chai.should();

describe('require-directories Unit Tests', function() {
  context('when package.json has node', function() {
    it('true should be returned', function() {
      const packageJsonData = {
        directories: 'directories'
      };
      const response = lint(packageJsonData, 'error');

      response.should.be.true;
    });
  });

  context('when package.json does not have node', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('require-directories');
      response.lintType.should.equal('error');
      response.node.should.equal('directories');
      response.lintMessage.should.equal('directories is required');
    });
  });
});
