'use strict';

const chai = require('chai');
const ruleModule = require('./../../../src/rules/prefer-property-order');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

const should = chai.should();

describe('prefer-property-order Unit Tests', function() {
  context('a rule type value should be exported', function() {
    it('it should equal "array"', function() {
      ruleType.should.equal('array');
    });
  });

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

      response.should.be.true;
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
      response.lintMessage.should.equal('Your package.json properties are not in the desired order. Please move "description" after "version".');
    });
  });
});
