'use strict';

const format = require('./../../../src/validators/format');

describe('format Unit Tests', function() {
  describe('isLowercase method', function() {
    describe('when the node does not exist in the package.json file', function() {
      test('true should be returned', function() {
        const packageJson = {
          name: 'awesome-module'
        };
        const response = format.isLowercase(packageJson, 'devDependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file and name is lowercase', function() {
      test('true should be returned', function() {
        const packageJson = {
          name: 'awesome-module'
        };
        const response = format.isLowercase(packageJson, 'name');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, but name is not lowercase', function() {
      test('false should be returned', function() {
        const packageJson = {
          name: 'aweSome-moDule'
        };
        const response = format.isLowercase(packageJson, 'name');

        expect(response).toBeFalsy();
      });
    });
  });

  describe('isValidVersionNumber method', function() {
    describe('when the node does not exist in the package.json file', function() {
      test('true should be returned', function() {
        const packageJson = {
          version: '1.0.0'
        };
        const response = format.isValidVersionNumber(packageJson, 'devDependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file and version is valid', function() {
      test('true should be returned', function() {
        const packageJson = {
          version: '1.0.0'
        };
        const response = format.isValidVersionNumber(packageJson, 'version');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file and version is invalid', function() {
      test('false should be returned', function() {
        const packageJson = {
          version: '1a.0'
        };
        const response = format.isValidVersionNumber(packageJson, 'version');

        expect(response).toBeFalsy();
      });
    });

    describe('when the node exists in the package.json file and version is invalid', function() {
      test('false should be returned', function() {
        const packageJson = {
          version: '1.a.0'
        };
        const response = format.isValidVersionNumber(packageJson, 'version');

        expect(response).toBeFalsy();
      });
    });
  });
});
