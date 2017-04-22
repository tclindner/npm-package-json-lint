'use strict';

/* eslint max-nested-callbacks: "off" */
// jscs:disable disallowQuotedKeysInObjects

const should = require('should');
const requireHelper = require('../../require_helper');
const alphabeticalSort = requireHelper('validators/alphabetical-sort');

describe('alphabetical-sort Unit Tests', function() {
  describe('isInAlphabeticalOrder method', function() {
    context('when the node does not exist in the package.json file', function() {
      it('true should be returned', function() {
        const packageJson = {
          name: 'awesome-module'
        };
        const response = alphabeticalSort.isInAlphabeticalOrder(packageJson, 'devDependencies');

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file and dependencies are in alpahbetical order', function() {
      it('true should be returned', function() {
        const packageJson = {
          devDependencies: {
            'chalk': '^1.1.3',
            'semver': '^5.3.0',
            'user-home': '^2.0.0'
          }
        };
        const response = alphabeticalSort.isInAlphabeticalOrder(packageJson, 'devDependencies');

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file and dependencies are not in alpahbetical order', function() {
      it('false should be returned', function() {
        const packageJson = {
          devDependencies: {
            'semver': '^5.3.0',
            'chalk': '^1.1.3',
            'user-home': '^2.0.0'
          }
        };
        const response = alphabeticalSort.isInAlphabeticalOrder(packageJson, 'devDependencies');

        response.should.be.false();
      });
    });
  });
});
