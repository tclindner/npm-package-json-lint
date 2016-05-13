'use strict';

/* eslint max-nested-callbacks: "off" */

const should = require('should');
const requireHelper = require('../../require_helper');
const validValuesObj = requireHelper('validators/valid-values');

describe('value-values Unit Tests', function() {
  describe('isValidValue method', function() {
    const packageJson = {
      author: 'Malcolm Reynolds'
    };

    context('when the node does not exist in the package.json file', function() {
      it('false should be returned', function() {
        const validValues = [
          'Zoe Washburn',
          'Hoban Washburn',
          'Inara Serra',
          'Jayne Cobb',
          'Kaylee Frye',
          'Simon Tam',
          'River Tam'
        ];
        const response = validValuesObj.isValidValue(packageJson, 'authors', validValues);

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file and the value is valid', function() {
      it('true should be returned', function() {
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
        const response = validValuesObj.isValidValue(packageJson, 'author', validValues);

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, but the value is invalid', function() {
      it('false should be returned', function() {
        const validValues = [
          'Zoe Washburn',
          'Hoban Washburn',
          'Inara Serra',
          'Jayne Cobb',
          'Kaylee Frye',
          'Simon Tam',
          'River Tam'
        ];
        const response = validValuesObj.isValidValue(packageJson, 'author', validValues);

        response.should.be.false();
      });
    });
  });
});
