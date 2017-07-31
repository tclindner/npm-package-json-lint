'use strict';

const chai = require('chai');
const lint = require('./../../../src/rules/require-private').lint;

const should = chai.should();

describe('require-private Unit Tests', function() {
  context('when package.json has node', function() {
    it('true should be returned', function() {
      const packageJsonData = {
        'private': 'private'
      };
      const response = lint(packageJsonData, 'error');

      response.should.be.true;
    });
  });

  context('when package.json does not have node', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('require-private');
      response.lintType.should.equal('error');
      response.node.should.equal('private');
      response.lintMessage.should.equal('private is required');
    });
  });
});
