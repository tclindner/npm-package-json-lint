'use strict';

const chai = require('chai');
const lint = require('./../../../src/rules/preferGlobal-type').lint;

const should = chai.should();

describe('preferGlobal-type Unit Tests', function() {
  context('when package.json has node with incorrect type', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        preferGlobal: 'string'
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('preferGlobal-type');
      response.lintType.should.equal('error');
      response.node.should.equal('preferGlobal');
      response.lintMessage.should.equal('Type should be a boolean');
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
