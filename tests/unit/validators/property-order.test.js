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
        (response.msg === null).should.be.true;
      });
    });

    context('when the properties in the package.json file are in the desired order, but the defaults are used', function() {
      it('true should be returned', function() {
        const packageJson = {
          name: 'awesome-module',
          version: '1.0.0',
          description: 'description'
        };
        const preferredOrder = [];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        response.status.should.be.true;
        (response.msg === null).should.be.true;
      });
    });

    context('when the actual node list does not have the same number of nodes as the desired list', function() {
      it('true should be returned', function() {
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

        response.status.should.be.true;
        (response.msg === null).should.be.true;
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
        response.msg.should.equal('Please move "description" after "version".');
      });
    });

    context('when the actual node list is in a different order than desired', function() {
      it('false should be returned', function() {
        const packageJson = {
          version: '1.0.0',
          name: 'awesome-module',
          description: 'description'
        };
        const preferredOrder = [
          'name',
          'version',
          'description'
        ];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        response.status.should.be.false;
        response.msg.should.equal('Please move "version" after "name".');
      });
    });

    context('when the actual node list is in a different order than desired', function() {
      it('true should be returned', function() {
        const packageJson = {
          name: 'awesome-module',
          version: '1.0.0',
          description: 'description'
        };
        const preferredOrder = [
          'name',
          'version',
          'homepage',
          'description'
        ];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        response.status.should.be.true;
        (response.msg === null).should.be.true;
      });
    });

    context('when the actual node list is in a different order than desired', function() {
      it('true should be returned', function() {
        const packageJson = {
          name: 'awesome-module',
          version: '1.0.0',
          description: 'description',
          homepage: 'https://github.com/tclindner/npm-package-json-lint'
        };
        const preferredOrder = [
          'name',
          'version',
          'description',
          'keywords',
          'homepage'
        ];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        response.status.should.be.true;
        (response.msg === null).should.be.true;
      });
    });

    context('when the actual node list is in correct order, but has extra values in preferred order', function() {
      it('true should be returned', function() {
        const packageJson = {
          name: 'awesome-module',
          version: '1.0.0',
          description: 'description',
          homepage: 'https://github.com/tclindner/npm-package-json-lint'
        };
        const preferredOrder = [
          'name',
          'version',
          'description',
          'scripts',
          'bin',
          'keywords',
          'homepage'
        ];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        response.status.should.be.true;
        (response.msg === null).should.be.true;
      });
    });

    context('when the actual node list is in correct order, but has extra values in preferred order', function() {
      it('false should be returned', function() {
        const packageJson = {
          name: 'awesome-module',
          version: '1.0.0',
          description: 'description',
          homepage: 'https://github.com/tclindner/npm-package-json-lint',
          license: 'MIT',
          keywords: ['awesome']
        };
        const preferredOrder = [
          'name',
          'version',
          'description',
          'scripts',
          'bin',
          'keywords',
          'homepage'
        ];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        response.status.should.be.false;
        response.msg.should.equal('Please move "homepage" after "keywords".');
      });
    });

    context('when the actual node list is not in correct order and also has extra values in preferred order', function() {
      it('false should be returned', function() {
        const packageJson = {
          name: 'awesome-module',
          version: '1.0.0',
          description: 'description',
          homepage: 'https://github.com/tclindner/npm-package-json-lint',
          keywords: ['word']
        };
        const preferredOrder = [
          'name',
          'version',
          'description',
          'scripts',
          'bin',
          'keywords',
          'homepage'
        ];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        response.status.should.be.false;
        response.msg.should.equal('Please move "homepage" after "keywords".');
      });
    });

    context('when node is not in the preferred node list', function() {
      it('true should be returned', function() {
        const packageJson = {
          name: 'awesome-module',
          version: '1.0.0',
          description: 'description',
          homepage: 'https://github.com/tclindner/npm-package-json-lint'
        };
        const preferredOrder = [
          'name',
          'version',
          'keywords',
          'homepage'
        ];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        response.status.should.be.true;
        (response.msg === null).should.be.true;
      });
    });

    context('when node is not in the preferred node list', function() {
      it('true should be returned', function() {
        const packageJson = {
          name: 'awesome-module',
          version: '1.0.0',
          description: 'description',
          homepage: 'https://github.com/tclindner/npm-package-json-lint'
        };
        const preferredOrder = [
          'version',
          'keywords',
          'homepage'
        ];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        response.status.should.be.true;
        (response.msg === null).should.be.true;
      });
    });
  });
});
