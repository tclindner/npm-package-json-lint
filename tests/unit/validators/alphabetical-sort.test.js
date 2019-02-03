'use strict';

const alphabeticalSort = require('./../../../src/validators/alphabetical-sort');

describe('alphabetical-sort Unit Tests', function() {
  describe('isInAlphabeticalOrder method', function() {
    describe('when the node does not exist in the package.json file', function() {
      test('true should be returned', function() {
        const packageJson = {
          name: 'awesome-module'
        };
        const response = alphabeticalSort.isInAlphabeticalOrder(packageJson, 'devDependencies');

        expect(response.status).toBeTruthy();
        expect(response.data.invalidNode).toBeNull();
        expect(response.data.validNode).toBeNull();
      });
    });

    describe('when the node exists in the package.json file and dependencies are in alpahbetical order', function() {
      test('true should be returned', function() {
        const packageJson = {
          devDependencies: {
            'chalk': '^1.1.3',
            'semver': '^5.3.0',
            'user-home': '^2.0.0'
          }
        };
        const response = alphabeticalSort.isInAlphabeticalOrder(packageJson, 'devDependencies');

        expect(response.status).toBeTruthy();
        expect(response.data.invalidNode).toBeNull();
        expect(response.data.validNode).toBeNull();
      });
    });

    describe('when the node exists in the package.json file and dependencies are not in alpahbetical order', function() {
      test('false should be returned', function() {
        const packageJson = {
          devDependencies: {
            'semver': '^5.3.0',
            'chalk': '^1.1.3',
            'user-home': '^2.0.0'
          }
        };
        const response = alphabeticalSort.isInAlphabeticalOrder(packageJson, 'devDependencies');

        expect(response.status).toBeFalsy();
        expect(response.data.invalidNode).toStrictEqual('semver');
        expect(response.data.validNode).toStrictEqual('chalk');
      });
    });
  });
});
