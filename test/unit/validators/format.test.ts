import * as format from '../../../src/validators/format';

describe('format Unit Tests', () => {
  describe('isLowercase method', () => {
    describe('when the string is lowercase', () => {
      test('true should be returned', () => {
        const string = 'awesome-module';
        const response = format.isLowercase(string);

        expect(response).toBe(true);
      });
    });

    describe('when the string is not lowercase', () => {
      test('false should be returned', () => {
        const string = 'aweSome-moDule';
        const response = format.isLowercase(string);

        expect(response).toBe(false);
      });
    });
  });

  describe('isValidVersionNumber method', () => {
    describe('when the node does not exist in the package.json file', () => {
      test('true should be returned', () => {
        const packageJson = {
          version: '1.0.0',
        };
        const response = format.isValidVersionNumber(packageJson, 'devDependencies');

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file and version is valid', () => {
      test('true should be returned', () => {
        const packageJson = {
          version: '1.0.0',
        };
        const response = format.isValidVersionNumber(packageJson, 'version');

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file and version is invalid', () => {
      test('false should be returned', () => {
        const packageJson = {
          version: '1a.0',
        };
        const response = format.isValidVersionNumber(packageJson, 'version');

        expect(response).toBe(false);
      });
    });

    describe('when the node exists in the package.json file and version is invalid (scenario 2)', () => {
      test('false should be returned', () => {
        const packageJson = {
          version: '1.a.0',
        };
        const response = format.isValidVersionNumber(packageJson, 'version');

        expect(response).toBe(false);
      });
    });
  });
});
