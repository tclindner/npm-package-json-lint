'use strict';

const chai = require('chai');
const type = require('./../../../src/validators/type');

const should = chai.should();

describe('type Unit Tests', function() {
  describe('isArray method', function() {
    context('when the node does not exist in the package.json file', function() {
      it('true should be returned', function() {
        const packageJson = {
          name: ['awesome-module']
        };
        const response = type.isArray(packageJson, 'devDependencies');

        response.should.be.true;
      });
    });

    context('when the node exists in the package.json file and it is a string', function() {
      it('false should be returned', function() {
        const packageJson = {
          name: 'awesome-module'
        };
        const response = type.isArray(packageJson, 'name');

        response.should.be.false;
      });
    });

    context('when the node exists in the package.json file and it is a boolean', function() {
      it('false should be returned', function() {
        const packageJson = {
          name: true
        };
        const response = type.isArray(packageJson, 'name');

        response.should.be.false;
      });
    });

    context('when the node exists in the package.json file and it is an object', function() {
      it('false should be returned', function() {
        const packageJson = {
          name: {}
        };
        const response = type.isArray(packageJson, 'name');

        response.should.be.false;
      });
    });

    context('when the node exists in the package.json file and it is an array', function() {
      it('true should be returned', function() {
        const packageJson = {
          name: ['awesome-module']
        };
        const response = type.isArray(packageJson, 'name');

        response.should.be.true;
      });
    });
  });

  describe('isBoolean method', function() {
    context('when the node does not exist in the package.json file', function() {
      it('true should be returned', function() {
        const packageJson = {
          name: ['awesome-module']
        };
        const response = type.isBoolean(packageJson, 'devDependencies');

        response.should.be.true;
      });
    });

    context('when the node exists in the package.json file and it is a string', function() {
      it('false should be returned', function() {
        const packageJson = {
          name: 'awesome-module'
        };
        const response = type.isBoolean(packageJson, 'name');

        response.should.be.false;
      });
    });

    context('when the node exists in the package.json file and it is a boolean', function() {
      it('true should be returned', function() {
        const packageJson = {
          name: true
        };
        const response = type.isBoolean(packageJson, 'name');

        response.should.be.true;
      });
    });

    context('when the node exists in the package.json file and it is an object', function() {
      it('false should be returned', function() {
        const packageJson = {
          name: {}
        };
        const response = type.isBoolean(packageJson, 'name');

        response.should.be.false;
      });
    });

    context('when the node exists in the package.json file and it is an array', function() {
      it('false should be returned', function() {
        const packageJson = {
          name: ['awesome-module']
        };
        const response = type.isBoolean(packageJson, 'name');

        response.should.be.false;
      });
    });
  });

  describe('isObject method', function() {
    context('when the node does not exist in the package.json file', function() {
      it('true should be returned', function() {
        const packageJson = {
          name: ['awesome-module']
        };
        const response = type.isObject(packageJson, 'devDependencies');

        response.should.be.true;
      });
    });

    context('when the node exists in the package.json file and it is a string', function() {
      it('false should be returned', function() {
        const packageJson = {
          name: 'awesome-module'
        };
        const response = type.isObject(packageJson, 'name');

        response.should.be.false;
      });
    });

    context('when the node exists in the package.json file and it is a boolean', function() {
      it('false should be returned', function() {
        const packageJson = {
          name: true
        };
        const response = type.isObject(packageJson, 'name');

        response.should.be.false;
      });
    });

    context('when the node exists in the package.json file and it is an object', function() {
      it('true should be returned', function() {
        const packageJson = {
          name: {}
        };
        const response = type.isObject(packageJson, 'name');

        response.should.be.true;
      });
    });

    context('when the node exists in the package.json file and it is an array', function() {
      it('false should be returned', function() {
        const packageJson = {
          name: ['awesome-module']
        };
        const response = type.isObject(packageJson, 'name');

        response.should.be.false;
      });
    });
  });

  describe('isString method', function() {
    context('when the node does not exist in the package.json file', function() {
      it('true should be returned', function() {
        const packageJson = {
          name: ['awesome-module']
        };
        const response = type.isString(packageJson, 'devDependencies');

        response.should.be.true;
      });
    });

    context('when the node exists in the package.json file and it is a string', function() {
      it('true should be returned', function() {
        const packageJson = {
          name: 'awesome-module'
        };
        const response = type.isString(packageJson, 'name');

        response.should.be.true;
      });
    });

    context('when the node exists in the package.json file and it is a boolean', function() {
      it('false should be returned', function() {
        const packageJson = {
          name: true
        };
        const response = type.isString(packageJson, 'name');

        response.should.be.false;
      });
    });

    context('when the node exists in the package.json file and it is an object', function() {
      it('false should be returned', function() {
        const packageJson = {
          name: {}
        };
        const response = type.isString(packageJson, 'name');

        response.should.be.false;
      });
    });

    context('when the node exists in the package.json file and it is an array', function() {
      it('false should be returned', function() {
        const packageJson = {
          name: ['awesome-module']
        };
        const response = type.isString(packageJson, 'name');

        response.should.be.false;
      });
    });
  });
});
