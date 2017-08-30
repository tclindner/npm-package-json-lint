'use strict';

const chai = require('chai');
const ruleModule = require('./../../../src/rules/no-restricted-dependencies');
const lint = ruleModule.lint;
const ruleType = ruleModule.ruleType;

const should = chai.should();

describe('no-restricted-dependencies Unit Tests', function() {
  context('a rule type value should be exported', function() {
    it('it should equal "array"', function() {
      ruleType.should.equal('array');
    });
  });

  context('when package.json has node with a restricted value', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        dependencies: {
          'npm-package-json-lint': '^1.0.0'
        }
      };
      const invalidDependencies = [
        'npm-package-json-lint',
        'grunt-npm-package-json-lint'
      ];
      const response = lint(packageJsonData, 'error', invalidDependencies);

      response.lintId.should.equal('no-restricted-dependencies');
      response.lintType.should.equal('error');
      response.node.should.equal('dependencies');
      response.lintMessage.should.equal('You are using a restricted dependency. Please remove it.');
    });
  });

  context('when package.json has node with a valid value', function() {
    it('LintIssue object should be returned', function() {
      const packageJsonData = {
        dependencies: {
          'gulp-npm-package-json-lint': '^1.0.0'
        }
      };
      const invalidDependencies = [
        'npm-package-json-lint',
        'grunt-npm-package-json-lint'
      ];
      const response = lint(packageJsonData, 'error', invalidDependencies);

      response.should.be.true;
    });
  });

  context('when package.json does not have node', function() {
    it('true should be returned', function() {
      const packageJsonData = {};
      const invalidDependencies = [
        'npm-package-json-lint',
        'grunt-npm-package-json-lint'
      ];
      const response = lint(packageJsonData, 'error', invalidDependencies);

      response.should.be.true;
    });
  });
});
