'use strict';

/* eslint max-nested-callbacks: "off" */

const chai = require('chai');
const requireHelper = require('../../require_helper');
const format = requireHelper('validators/format');

const should = chai.should();

describe('format Unit Tests', function() {
  describe('isLowercase method', function() {
    context('when the node does not exist in the package.json file', function() {
      it('true should be returned', function() {
        const packageJson = {
          name: 'awesome-module'
        };
        const response = format.isLowercase(packageJson, 'devDependencies');

        response.should.be.true;
      });
    });

    context('when the node exists in the package.json file and name is lowercase', function() {
      it('true should be returned', function() {
        const packageJson = {
          name: 'awesome-module'
        };
        const response = format.isLowercase(packageJson, 'name');

        response.should.be.true;
      });
    });

    context('when the node exists in the package.json file, but name is not lowercase', function() {
      it('false should be returned', function() {
        const packageJson = {
          name: 'aweSome-moDule'
        };
        const response = format.isLowercase(packageJson, 'name');

        response.should.be.false;
      });
    });
  });

  describe('isValidVersionNumber method', function() {
    context('when the node does not exist in the package.json file', function() {
      it('true should be returned', function() {
        const packageJson = {
          version: '1.0.0'
        };
        const response = format.isValidVersionNumber(packageJson, 'devDependencies');

        response.should.be.true;
      });
    });

    context('when the node exists in the package.json file and version is valid', function() {
      it('true should be returned', function() {
        const packageJson = {
          version: '1.0.0'
        };
        const response = format.isValidVersionNumber(packageJson, 'version');

        response.should.be.true;
      });
    });

    context('when the node exists in the package.json file and version is invalid', function() {
      it('false should be returned', function() {
        const packageJson = {
          version: '1a.0'
        };
        const response = format.isValidVersionNumber(packageJson, 'version');

        response.should.be.false;
      });
    });

    context('when the node exists in the package.json file and version is invalid', function() {
      it('false should be returned', function() {
        const packageJson = {
          version: '1.a.0'
        };
        const response = format.isValidVersionNumber(packageJson, 'version');

        response.should.be.false;
      });
    });
  });
});
