'use strict';

const type = require('./../../../src/validators/type');

describe('type Unit Tests', function() {
  describe('isArray method', function() {
    describe('when the node does not exist in the package.json file', function() {
      test('true should be returned', function() {
        const packageJson = {
          name: ['awesome-module']
        };
        const response = type.isArray(packageJson, 'devDependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file and it is a string', function() {
      test('false should be returned', function() {
        const packageJson = {
          name: 'awesome-module'
        };
        const response = type.isArray(packageJson, 'name');

        expect(response).toBeFalsy();
      });
    });

    describe('when the node exists in the package.json file and it is a boolean', function() {
      test('false should be returned', function() {
        const packageJson = {
          name: true
        };
        const response = type.isArray(packageJson, 'name');

        expect(response).toBeFalsy();
      });
    });

    describe('when the node exists in the package.json file and it is an object', function() {
      test('false should be returned', function() {
        const packageJson = {
          name: {}
        };
        const response = type.isArray(packageJson, 'name');

        expect(response).toBeFalsy();
      });
    });

    describe('when the node exists in the package.json file and it is an array', function() {
      test('true should be returned', function() {
        const packageJson = {
          name: ['awesome-module']
        };
        const response = type.isArray(packageJson, 'name');

        expect(response).toBeTruthy();
      });
    });
  });

  describe('isBoolean method', function() {
    describe('when the node does not exist in the package.json file', function() {
      test('true should be returned', function() {
        const packageJson = {
          name: ['awesome-module']
        };
        const response = type.isBoolean(packageJson, 'devDependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file and it is a string', function() {
      test('false should be returned', function() {
        const packageJson = {
          name: 'awesome-module'
        };
        const response = type.isBoolean(packageJson, 'name');

        expect(response).toBeFalsy();
      });
    });

    describe('when the node exists in the package.json file and it is a boolean', function() {
      test('true should be returned', function() {
        const packageJson = {
          name: true
        };
        const response = type.isBoolean(packageJson, 'name');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file and it is an object', function() {
      test('false should be returned', function() {
        const packageJson = {
          name: {}
        };
        const response = type.isBoolean(packageJson, 'name');

        expect(response).toBeFalsy();
      });
    });

    describe('when the node exists in the package.json file and it is an array', function() {
      test('false should be returned', function() {
        const packageJson = {
          name: ['awesome-module']
        };
        const response = type.isBoolean(packageJson, 'name');

        expect(response).toBeFalsy();
      });
    });
  });

  describe('isObject method', function() {
    describe('when the node does not exist in the package.json file', function() {
      test('true should be returned', function() {
        const packageJson = {
          name: ['awesome-module']
        };
        const response = type.isObject(packageJson, 'devDependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file and it is a string', function() {
      test('false should be returned', function() {
        const packageJson = {
          name: 'awesome-module'
        };
        const response = type.isObject(packageJson, 'name');

        expect(response).toBeFalsy();
      });
    });

    describe('when the node exists in the package.json file and it is a boolean', function() {
      test('false should be returned', function() {
        const packageJson = {
          name: true
        };
        const response = type.isObject(packageJson, 'name');

        expect(response).toBeFalsy();
      });
    });

    describe('when the node exists in the package.json file and it is an object', function() {
      test('true should be returned', function() {
        const packageJson = {
          name: {}
        };
        const response = type.isObject(packageJson, 'name');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file and it is an array', function() {
      test('false should be returned', function() {
        const packageJson = {
          name: ['awesome-module']
        };
        const response = type.isObject(packageJson, 'name');

        expect(response).toBeFalsy();
      });
    });
  });

  describe('isString method', function() {
    describe('when the node does not exist in the package.json file', function() {
      test('true should be returned', function() {
        const packageJson = {
          name: ['awesome-module']
        };
        const response = type.isString(packageJson, 'devDependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file and it is a string', function() {
      test('true should be returned', function() {
        const packageJson = {
          name: 'awesome-module'
        };
        const response = type.isString(packageJson, 'name');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file and it is a boolean', function() {
      test('false should be returned', function() {
        const packageJson = {
          name: true
        };
        const response = type.isString(packageJson, 'name');

        expect(response).toBeFalsy();
      });
    });

    describe('when the node exists in the package.json file and it is an object', function() {
      test('false should be returned', function() {
        const packageJson = {
          name: {}
        };
        const response = type.isString(packageJson, 'name');

        expect(response).toBeFalsy();
      });
    });

    describe('when the node exists in the package.json file and it is an array', function() {
      test('false should be returned', function() {
        const packageJson = {
          name: ['awesome-module']
        };
        const response = type.isString(packageJson, 'name');

        expect(response).toBeFalsy();
      });
    });
  });
});
