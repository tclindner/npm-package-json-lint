'use strict';

const chai = require('chai');
const requireHelper = require('../../require_helper');
const lint = requireHelper('rules/main-type').lint;

const should = chai.should();

describe('main-type Unit Tests', function() {
  context('when package.json has node with incorrect type', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        main: true
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('main-type');
      response.lintType.should.equal('error');
      response.node.should.equal('main');
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
