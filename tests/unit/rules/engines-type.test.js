'use strict';

const chai = require('chai');
const lint = require('./../../../src/rules/engines-type').lint;

const should = chai.should();

describe('engines-type Unit Tests', function() {
  context('when package.json has node with incorrect type', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        engines: 'engines'
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('engines-type');
      response.lintType.should.equal('error');
      response.node.should.equal('engines');
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
