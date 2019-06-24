const property = require('./../../../src/validators/property');

describe('property Unit Tests', () => {
  describe('exists method', () => {
    describe('when the node does not exist in the package.json file', () => {
      test('false should be returned', () => {
        const packageJson = {
          version: '1.0.0'
        };
        const response = property.exists(packageJson, 'devDependencies');

        expect(response).toBeFalsy();
      });
    });

    describe('when the node exists in the package.json file', () => {
      test('true should be returned', () => {
        const packageJson = {
          version: '1.0.0'
        };
        const response = property.exists(packageJson, 'version');

        expect(response).toBeTruthy();
      });
    });
  });
});
