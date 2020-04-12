const type = require('../../../src/validators/type');

describe('type Unit Tests', () => {
  describe('isArray method', () => {
    describe('when the node does not exist in the package.json file', () => {
      test('true should be returned', () => {
        const packageJson = {
          name: ['awesome-module'],
        };
        const response = type.isArray(packageJson, 'devDependencies');

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file and it is a string', () => {
      test('false should be returned', () => {
        const packageJson = {
          name: 'awesome-module',
        };
        const response = type.isArray(packageJson, 'name');

        expect(response).toBe(false);
      });
    });

    describe('when the node exists in the package.json file and it is a boolean', () => {
      test('false should be returned', () => {
        const packageJson = {
          name: true,
        };
        const response = type.isArray(packageJson, 'name');

        expect(response).toBe(false);
      });
    });

    describe('when the node exists in the package.json file and it is an object', () => {
      test('false should be returned', () => {
        const packageJson = {
          name: {},
        };
        const response = type.isArray(packageJson, 'name');

        expect(response).toBe(false);
      });
    });

    describe('when the node exists in the package.json file and it is an array', () => {
      test('true should be returned', () => {
        const packageJson = {
          name: ['awesome-module'],
        };
        const response = type.isArray(packageJson, 'name');

        expect(response).toBe(true);
      });
    });
  });

  describe('isBoolean method', () => {
    describe('when the node does not exist in the package.json file', () => {
      test('true should be returned', () => {
        const packageJson = {
          name: ['awesome-module'],
        };
        const response = type.isBoolean(packageJson, 'devDependencies');

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file and it is a string', () => {
      test('false should be returned', () => {
        const packageJson = {
          name: 'awesome-module',
        };
        const response = type.isBoolean(packageJson, 'name');

        expect(response).toBe(false);
      });
    });

    describe('when the node exists in the package.json file and it is a boolean', () => {
      test('true should be returned', () => {
        const packageJson = {
          name: true,
        };
        const response = type.isBoolean(packageJson, 'name');

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file and it is an object', () => {
      test('false should be returned', () => {
        const packageJson = {
          name: {},
        };
        const response = type.isBoolean(packageJson, 'name');

        expect(response).toBe(false);
      });
    });

    describe('when the node exists in the package.json file and it is an array', () => {
      test('false should be returned', () => {
        const packageJson = {
          name: ['awesome-module'],
        };
        const response = type.isBoolean(packageJson, 'name');

        expect(response).toBe(false);
      });
    });
  });

  describe('isObject method', () => {
    describe('when the node does not exist in the package.json file', () => {
      test('true should be returned', () => {
        const packageJson = {
          name: ['awesome-module'],
        };
        const response = type.isObject(packageJson, 'devDependencies');

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file and it is a string', () => {
      test('false should be returned', () => {
        const packageJson = {
          name: 'awesome-module',
        };
        const response = type.isObject(packageJson, 'name');

        expect(response).toBe(false);
      });
    });

    describe('when the node exists in the package.json file and it is a boolean', () => {
      test('false should be returned', () => {
        const packageJson = {
          name: true,
        };
        const response = type.isObject(packageJson, 'name');

        expect(response).toBe(false);
      });
    });

    describe('when the node exists in the package.json file and it is an object', () => {
      test('true should be returned', () => {
        const packageJson = {
          name: {},
        };
        const response = type.isObject(packageJson, 'name');

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file and it is an array', () => {
      test('false should be returned', () => {
        const packageJson = {
          name: ['awesome-module'],
        };
        const response = type.isObject(packageJson, 'name');

        expect(response).toBe(false);
      });
    });
  });

  describe('isString method', () => {
    describe('when the node does not exist in the package.json file', () => {
      test('true should be returned', () => {
        const packageJson = {
          name: ['awesome-module'],
        };
        const response = type.isString(packageJson, 'devDependencies');

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file and it is a string', () => {
      test('true should be returned', () => {
        const packageJson = {
          name: 'awesome-module',
        };
        const response = type.isString(packageJson, 'name');

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file and it is a boolean', () => {
      test('false should be returned', () => {
        const packageJson = {
          name: true,
        };
        const response = type.isString(packageJson, 'name');

        expect(response).toBe(false);
      });
    });

    describe('when the node exists in the package.json file and it is an object', () => {
      test('false should be returned', () => {
        const packageJson = {
          name: {},
        };
        const response = type.isString(packageJson, 'name');

        expect(response).toBe(false);
      });
    });

    describe('when the node exists in the package.json file and it is an array', () => {
      test('false should be returned', () => {
        const packageJson = {
          name: ['awesome-module'],
        };
        const response = type.isString(packageJson, 'name');

        expect(response).toBe(false);
      });
    });
  });
});
