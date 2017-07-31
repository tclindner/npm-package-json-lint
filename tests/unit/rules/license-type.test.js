'use strict';

const chai = require('chai');
const requireHelper = require('../../require_helper');
const lint = requireHelper('rules/license-type').lint;

const should = chai.should();

describe('license-type Unit Tests', function() {
  context('when package.json has node with incorrect type', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        license: true
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('license-type');
      response.lintType.should.equal('error');
      response.node.should.equal('license');
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
