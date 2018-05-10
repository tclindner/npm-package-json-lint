'use strict';

const chai = require('chai');
const ruleModule = require('./../../../src/rules/scripts-type');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

const should = chai.should();

describe('scripts-type Unit Tests', function() {
  context('a rule type value should be exported', function() {
    it('it should equal "standard"', function() {
      ruleType.should.equal('standard');
    });
  });

  context('when package.json has node with correct type', function() {
    it('true should be returned', function() {
      const packageJsonData = {
        scripts: {
          'script': 'echo hello'
        }
      };
      const response = lint(packageJsonData, 'error');

      response.should.be.true;
    });
  });

  context('when package.json has node with incorrect type', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        scripts: 'scripts'
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('scripts-type');
      response.severity.should.equal('error');
      response.node.should.equal('scripts');
      response.lintMessage.should.equal('Type should be an Object');
    });
  });

  context('when package.json has node with correct type, but individual script has invalid type (bool)', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        scripts: {
          myscript: false
        }
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('scripts-type');
      response.severity.should.equal('error');
      response.node.should.equal('scripts');
      response.lintMessage.should.equal('script, myscript, in the "scripts" property is not a string.');
    });
  });

  context('when package.json has node with correct type, but individual script has invalid type (object)', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        scripts: {
          myscript: {
            hello: true
          }
        }
      };
      const response = lint(packageJsonData, 'error');

      response.lintId.should.equal('scripts-type');
      response.severity.should.equal('error');
      response.node.should.equal('scripts');
      response.lintMessage.should.equal('script, myscript, in the "scripts" property is not a string.');
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
