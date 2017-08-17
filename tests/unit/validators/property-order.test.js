'use strict';

const chai = require('chai');
const propertyOrder = require('./../../../src/validators/property-order');

const should = chai.should();

describe('property-order Unit Tests', function() {
  describe('isInPreferredOrder method', function() {
    context('when the properties in the package.json file are in the desired order', function() {
      it('true should be returned', function() {
        const packageJson = {
          name: 'awesome-module',
          version: '1.0.0',
          description: 'description'
        };
        const preferredOrder = [
          'name',
          'version',
          'description'
        ];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        response.status.should.be.true;
        (response.data.actualNode === null).should.be.true;
        (response.data.desiredNode === null).should.be.true;
      });
    });

    context('when the actual node list does not have the same number of nodes as the desired list', function() {
      it('false should be returned', function() {
        const packageJson = {
          name: 'awesome-module',
          version: '1.0.0'
        };
        const preferredOrder = [
          'name',
          'version',
          'description'
        ];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        response.status.should.be.false;
        (response.data.actualNode === null).should.be.true;
        response.data.desiredNode.should.equal('description');
      });
    });

    context('when the actual node list is in a different order than desired', function() {
      it('false should be returned', function() {
        const packageJson = {
          name: 'awesome-module',
          description: 'description',
          version: '1.0.0'
        };
        const preferredOrder = [
          'name',
          'version',
          'description'
        ];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        response.status.should.be.false;
        response.data.actualNode.should.equal('description');
        response.data.desiredNode.should.equal('version');
      });
    });
  });
});
