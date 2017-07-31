'use strict';

const chai = require('chai');
const lint = require('./../../../src/rules/require-cpu').lint;

const should = chai.should();

describe('require-cpu Unit Tests', function() {
  context('when package.json has node', function() {
    it('true should be returned', function() {
      const packageJsonData = {
        cpu: 'cpu'
      };
      const response = lint(packageJsonData, 'error');

      response.should.be.true;
    });
  });

  context('when package.json does not have node', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('require-cpu');
      response.lintType.should.equal('error');
      response.node.should.equal('cpu');
      response.lintMessage.should.equal('cpu is required');
    });
  });
});
