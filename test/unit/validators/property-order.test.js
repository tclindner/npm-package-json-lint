const propertyOrder = require('./../../../src/validators/property-order');

describe('property-order Unit Tests', () => {
  describe('isInPreferredOrder method', () => {
    describe('when the properties in the package.json file are in the desired order', () => {
      test('true should be returned', () => {
        const packageJson = {
          name: 'awesome-module',
          version: '1.0.0',
          description: 'description'
        };
        const preferredOrder = ['name', 'version', 'description'];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        expect(response.status).toBe(true);
        expect(response.msg).toBeNull();
      });
    });

    describe('when the properties in the package.json file are in the desired order, but the defaults are used', () => {
      test('true should be returned', () => {
        const packageJson = {
          name: 'awesome-module',
          version: '1.0.0',
          description: 'description'
        };
        const preferredOrder = [];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        expect(response.status).toBe(true);
        expect(response.msg).toBeNull();
      });
    });

    describe('when the actual node list does not have the same number of nodes as the desired list', () => {
      test('true should be returned', () => {
        const packageJson = {
          name: 'awesome-module',
          version: '1.0.0'
        };
        const preferredOrder = ['name', 'version', 'description'];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        expect(response.status).toBe(true);
        expect(response.msg).toBeNull();
      });
    });

    describe('when the actual node list is in a different order than desired', () => {
      test('false should be returned', () => {
        const packageJson = {
          name: 'awesome-module',
          description: 'description',
          version: '1.0.0'
        };
        const preferredOrder = ['name', 'version', 'description'];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        expect(response.status).toBe(false);
        expect(response.msg).toStrictEqual('Please move "description" after "version".');
      });
    });

    describe('when the actual node list is in a different order than desired (scenario 2)', () => {
      test('false should be returned', () => {
        const packageJson = {
          version: '1.0.0',
          name: 'awesome-module',
          description: 'description'
        };
        const preferredOrder = ['name', 'version', 'description'];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        expect(response.status).toBe(false);
        expect(response.msg).toStrictEqual('Please move "version" after "name".');
      });
    });

    describe('when the actual node list is in a different order than desired (scenario 3)', () => {
      test('true should be returned', () => {
        const packageJson = {
          name: 'awesome-module',
          version: '1.0.0',
          description: 'description'
        };
        const preferredOrder = ['name', 'version', 'homepage', 'description'];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        expect(response.status).toBe(true);
        expect(response.msg).toBeNull();
      });
    });

    describe('when the actual node list is in a different order than desired (scenario 4)', () => {
      test('true should be returned', () => {
        const packageJson = {
          name: 'awesome-module',
          version: '1.0.0',
          description: 'description',
          homepage: 'https://github.com/tclindner/npm-package-json-lint'
        };
        const preferredOrder = ['name', 'version', 'description', 'keywords', 'homepage'];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        expect(response.status).toBe(true);
        expect(response.msg).toBeNull();
      });
    });

    describe('when the actual node list is in correct order, but has extra values in preferred order', () => {
      test('true should be returned', () => {
        const packageJson = {
          name: 'awesome-module',
          version: '1.0.0',
          description: 'description',
          homepage: 'https://github.com/tclindner/npm-package-json-lint'
        };
        const preferredOrder = ['name', 'version', 'description', 'scripts', 'bin', 'keywords', 'homepage'];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        expect(response.status).toBe(true);
        expect(response.msg).toBeNull();
      });
    });

    describe('when the actual node list is in correct order, but has extra values in preferred order (scenario 2)', () => {
      test('false should be returned', () => {
        const packageJson = {
          name: 'awesome-module',
          version: '1.0.0',
          description: 'description',
          homepage: 'https://github.com/tclindner/npm-package-json-lint',
          license: 'MIT',
          keywords: ['awesome']
        };
        const preferredOrder = ['name', 'version', 'description', 'scripts', 'bin', 'keywords', 'homepage'];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        expect(response.status).toBe(false);
        expect(response.msg).toStrictEqual('Please move "homepage" after "keywords".');
      });
    });

    describe('when the actual node list is not in correct order and also has extra values in preferred order', () => {
      test('false should be returned', () => {
        const packageJson = {
          name: 'awesome-module',
          version: '1.0.0',
          description: 'description',
          homepage: 'https://github.com/tclindner/npm-package-json-lint',
          keywords: ['word']
        };
        const preferredOrder = ['name', 'version', 'description', 'scripts', 'bin', 'keywords', 'homepage'];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        expect(response.status).toBe(false);
        expect(response.msg).toStrictEqual('Please move "homepage" after "keywords".');
      });
    });

    describe('when node is not in the preferred node list', () => {
      test('true should be returned', () => {
        const packageJson = {
          name: 'awesome-module',
          version: '1.0.0',
          description: 'description',
          homepage: 'https://github.com/tclindner/npm-package-json-lint'
        };
        const preferredOrder = ['name', 'version', 'keywords', 'homepage'];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        expect(response.status).toBe(true);
        expect(response.msg).toBeNull();
      });
    });

    describe('when node is not in the preferred node list (scenario 2)', () => {
      test('true should be returned', () => {
        const packageJson = {
          name: 'awesome-module',
          version: '1.0.0',
          description: 'description',
          homepage: 'https://github.com/tclindner/npm-package-json-lint'
        };
        const preferredOrder = ['version', 'keywords', 'homepage'];
        const response = propertyOrder.isInPreferredOrder(packageJson, preferredOrder);

        expect(response.status).toBe(true);
        expect(response.msg).toBeNull();
      });
    });
  });
});
