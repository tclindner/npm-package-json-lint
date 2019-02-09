'use strict';

const validValuesObj = require('./../../../src/validators/valid-values');

describe('value-values Unit Tests', function() {
  describe('isValidValue method', function() {
    const packageJson = {
      author: 'Malcolm Reynolds'
    };

    describe('when the node does not exist in the package.json file', function() {
      test('true should be returned', function() {
        const validValues = [
          'Zoe Washburn',
          'Hoban Washburn',
          'Inara Serra',
          'Jayne Cobb',
          'Kaylee Frye',
          'Simon Tam',
          'River Tam'
        ];
        const response = validValuesObj.isValidValue(packageJson, 'authors', packageJson.author, validValues);

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file and the value is valid', function() {
      test('true should be returned', function() {
        const validValues = [
          'Malcolm Reynolds',
          'Zoe Washburn',
          'Hoban Washburn',
          'Inara Serra',
          'Jayne Cobb',
          'Kaylee Frye',
          'Simon Tam',
          'River Tam'
        ];
        const response = validValuesObj.isValidValue(packageJson, 'author', packageJson.author, validValues);

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, but the value is invalid', function() {
      test('false should be returned', function() {
        const validValues = [
          'Zoe Washburn',
          'Hoban Washburn',
          'Inara Serra',
          'Jayne Cobb',
          'Kaylee Frye',
          'Simon Tam',
          'River Tam'
        ];
        const response = validValuesObj.isValidValue(packageJson, 'author', packageJson.author, validValues);

        expect(response).toBeFalsy();
      });
    });
  });

  describe('matchValidValue method', function() {
    const packageJson = {
      name: '@lerna/publish'
    };

    describe('when the node does not exist in the package.json file', function() {
      test('true should be returned', function() {
        const validRegexes = [
          /^@babel\//,
          /run$/,
          /[0-9]+/
        ];
        const response = validValuesObj.matchValidValue(packageJson, 'names', packageJson.name, validRegexes);

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file and the value matches', function() {
      test('true should be returned', function() {
        const validRegexes = [
          /^@lerna\//,
          /^@babel\//,
          /run$/,
          /[0-9]+/
        ];
        const response = validValuesObj.matchValidValue(packageJson, 'name', packageJson.name, validRegexes);

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, but the value does not match', function() {
      test('false should be returned', function() {
        const validRegexes = [
          /^@babel\//,
          /run$/,
          /[0-9]+/
        ];
        const response = validValuesObj.matchValidValue(packageJson, 'name', packageJson.name, validRegexes);

        expect(response).toBeFalsy();
      });
    });
  });
});
