'use strict';

const chai = require('chai');
const requireHelper = require('../../require_helper');
const lint = requireHelper('rules/require-publishConfig').lint;

const should = chai.should();

describe('require-publishConfig Unit Tests', function() {
  context('when package.json has node', function() {
    it('true should be returned', function() {
      const packageJsonData = {
        publishConfig: 'publishConfig'
      };
      const response = lint(packageJsonData, 'error');

      response.should.be.true;
    });
  });

  context('when package.json does not have node', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('require-publishConfig');
      response.lintType.should.equal('error');
      response.node.should.equal('publishConfig');
      response.lintMessage.should.equal('publishConfig is required');
    });
  });
});
