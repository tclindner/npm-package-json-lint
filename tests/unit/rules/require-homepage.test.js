'use strict';

const chai = require('chai');
const lint = require('./../../../src/rules/require-homepage').lint;

const should = chai.should();

describe('require-homepage Unit Tests', function() {
  context('when package.json has node', function() {
    it('true should be returned', function() {
      const packageJsonData = {
        homepage: 'homepage'
      };
      const response = lint(packageJsonData, 'error');

      response.should.be.true;
    });
  });

  context('when package.json does not have node', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('require-homepage');
      response.lintType.should.equal('error');
      response.node.should.equal('homepage');
      response.lintMessage.should.equal('homepage is required');
    });
  });
});
