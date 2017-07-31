'use strict';

/* eslint max-nested-callbacks: "off" */

const chai = require('chai');
const requireHelper = require('../../require_helper');
const alphabeticalSort = requireHelper('validators/alphabetical-sort');

const should = chai.should();

describe('alphabetical-sort Unit Tests', function() {
  describe('isInAlphabeticalOrder method', function() {
    context('when the node does not exist in the package.json file', function() {
      it('true should be returned', function() {
        const packageJson = {
          name: 'awesome-module'
        };
        const response = alphabeticalSort.isInAlphabeticalOrder(packageJson, 'devDependencies');

        response.status.should.be.true;
        (response.data.invalidNode === null).should.be.true;
        (response.data.validNode === null).should.be.true;
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

        response.status.should.be.true;
        (response.data.invalidNode === null).should.be.true;
        (response.data.validNode === null).should.be.true;
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

        response.status.should.be.false;
        response.data.invalidNode.should.equal('semver');
        response.data.validNode.should.equal('chalk');
      });
    });
  });
});
