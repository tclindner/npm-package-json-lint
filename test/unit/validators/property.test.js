const property = require('../../../src/validators/property');

describe('property Unit Tests', () => {
  describe('exists method', () => {
    describe('when the node does not exist in the package.json file', () => {
      test('false should be returned', () => {
        const packageJson = {
          version: '1.0.0'
        };
        const response = property.exists(packageJson, 'devDependencies');

        expect(response).toBe(false);
      });
    });

    describe('when the node exists in the package.json file', () => {
      test('true should be returned', () => {
        const packageJson = {
          version: '1.0.0'
        };
        const response = property.exists(packageJson, 'version');

        expect(response).toBe(true);
      });
    });
  });
  describe('findDuplicatePropNames method', () => {
    describe('when duplicates properties exists', () => {
      test('list with names should be returnd', () => {
        const packageJsonSource = `{
          "version": "1.0.0",
          "name": "package",
          "version": "1.0.0",
          "scripts": {
            "test": "jest",
            "test:ci": "jest --runInBand",
            "test:ci": "jest --runInBand"
          }
        }`;
        const response = property.findDuplicatePropNames(packageJsonSource);

        expect(response).toStrictEqual(expect.arrayContaining(['version', 'test:ci']));
      });
    });

    describe('when duplicates properties does not exists', () => {
      test('empty list should be returned', () => {
        const packageJsonSource = `{
          "name": "package",
          "version": "1.0.0"
        }`;
        const response = property.findDuplicatePropNames(packageJsonSource);

        expect(response).toHaveLength(0);
      });
    });
  });
});
