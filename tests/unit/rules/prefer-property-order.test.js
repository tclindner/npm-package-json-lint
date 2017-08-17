'use strict';

const chai = require('chai');
const lint = require('./../../../src/rules/prefer-property-order').lint;

const should = chai.should();

describe('prefer-property-order Unit Tests', function() {
  context('when the properties in the package.json file are in the desired order', function() {
    it('true should be returned', function() {
      const packageJsonData = {
        name: 'awesome-module',
        version: '1.0.0',
        description: 'description'
      };
      const preferredOrder = [
        'name',
        'version',
        'description'
      ];
      const response = lint(packageJsonData, 'error', preferredOrder);
console.log(response);
      response.should.be.true;
    });
  });

  context('when the actual node list does not have the same number of nodes as the desired list', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        name: 'awesome-module',
        version: '1.0.0'
      };
      const preferredOrder = [
        'name',
        'version',
        'description'
      ];
      const response = lint(packageJsonData, 'error', preferredOrder);

      response.lintId.should.equal('prefer-property-order');
      response.lintType.should.equal('error');
      response.node.should.equal('');
      response.lintMessage.should.equal('Your package.json properties are not in the desired order. Please add description at the end of the file.');
    });
  });

  context('when the actual node list is in a different order than desired', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        name: 'awesome-module',
        description: 'description',
        version: '1.0.0'
      };
      const preferredOrder = [
        'name',
        'version',
        'description'
      ];
      const response = lint(packageJsonData, 'error', preferredOrder);

      response.lintId.should.equal('prefer-property-order');
      response.lintType.should.equal('error');
      response.node.should.equal('');
      response.lintMessage.should.equal('Your package.json properties are not in the desired order. Please move description after version.');
    });
  });
});
