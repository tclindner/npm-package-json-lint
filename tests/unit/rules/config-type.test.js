'use strict';

const chai = require('chai');
const requireHelper = require('../../require_helper');
const lint = requireHelper('rules/config-type').lint;

const should = chai.should();

describe('config-type Unit Tests', function() {
  context('when package.json has node with incorrect type', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        config: 'config'
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('config-type');
      response.lintType.should.equal('error');
      response.node.should.equal('config');
      response.lintMessage.should.equal('Type should be an Object');
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
