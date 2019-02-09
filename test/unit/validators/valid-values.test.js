const validValuesObj = require('./../../../src/validators/valid-values');

describe('value-values Unit Tests', () => {
  describe('isValidValue method', () => {
    const packageJson = {
      author: 'Malcolm Reynolds'
    };

    describe('when the node does not exist in the package.json file', () => {
      test('true should be returned', () => {
        const validValues = [
          'Zoe Washburn',
          'Hoban Washburn',
          'Inara Serra',
          'Jayne Cobb',
          'Kaylee Frye',
          'Simon Tam',
          'River Tam'
        ];
        const response = validValuesObj.isValidValue(packageJson, 'authors', packageJson.author, validValues);

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file and the value is valid', () => {
      test('true should be returned', () => {
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
        const response = validValuesObj.isValidValue(packageJson, 'author', packageJson.author, validValues);

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, but the value is invalid', () => {
      test('false should be returned', () => {
        const validValues = [
          'Zoe Washburn',
          'Hoban Washburn',
          'Inara Serra',
          'Jayne Cobb',
          'Kaylee Frye',
          'Simon Tam',
          'River Tam'
        ];
        const response = validValuesObj.isValidValue(packageJson, 'author', packageJson.author, validValues);

        expect(response).toBeFalsy();
      });
    });
  });

  describe('matchValidValue method', () => {
    const packageJson = {
      name: '@lerna/publish'
    };

    describe('when the node does not exist in the package.json file', () => {
      test('true should be returned', () => {
        const validRegexes = [
          /^@babel\//,
          /run$/,
          /[0-9]+/
        ];
        const response = validValuesObj.matchValidValue(packageJson, 'names', packageJson.name, validRegexes);

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file and the value matches', () => {
      test('true should be returned', () => {
        const validRegexes = [
          /^@lerna\//,
          /^@babel\//,
          /run$/,
          /[0-9]+/
        ];
        const response = validValuesObj.matchValidValue(packageJson, 'name', packageJson.name, validRegexes);

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, but the value does not match', () => {
      test('false should be returned', () => {
        const validRegexes = [
          /^@babel\//,
          /run$/,
          /[0-9]+/
        ];
        const response = validValuesObj.matchValidValue(packageJson, 'name', packageJson.name, validRegexes);

        expect(response).toBeFalsy();
      });
    });
  });
});
