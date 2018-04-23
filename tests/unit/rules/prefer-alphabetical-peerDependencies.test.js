'use strict';

const chai = require('chai');
const ruleModule = require('./../../../src/rules/prefer-alphabetical-peerDependencies');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

const should = chai.should();

describe('prefer-alphabetical-peerDependencies Unit Tests', function() {
  context('a rule type value should be exported', function() {
    it('it should equal "standard"', function() {
      ruleType.should.equal('standard');
    });
  });

  context('when package.json has node with an invalid order', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        peerDependencies: {
          'semver': '^5.3.0',
          'chalk': '^1.1.3',
          'user-home': '^2.0.0'
        }
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('prefer-alphabetical-peerDependencies');
      response.severity.should.equal('error');
      response.node.should.equal('peerDependencies');
      response.lintMessage.should.equal('Your peerDependencies are not in alphabetical order. Please move semver after chalk.');
    });
  });

  context('when package.json has node with a valid order', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        peerDependencies: {
          'chalk': '^1.1.3',
          'semver': '^5.3.0',
          'user-home': '^2.0.0'
        }
      };
      const response = lint(packageJsonData, 'error');

      response.should.be.true;
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
