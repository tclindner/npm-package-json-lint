const alphabeticalSort = require('../../../src/validators/alphabetical-sort');

describe('alphabetical-sort Unit Tests', () => {
  describe('isInAlphabeticalOrder method', () => {
    describe('when the node exists in the package.json file and dependencies are in alpahbetical order', () => {
      test('true should be returned', () => {
        const packageJson = {
          devDependencies: {
            chalk: '^1.1.3',
            semver: '^5.3.0',
            'user-home': '^2.0.0',
          },
        };
        const response = alphabeticalSort.isInAlphabeticalOrder(packageJson, 'devDependencies');

        expect(response.status).toBe(true);
        expect(response.data.invalidNode).toBeNull();
        expect(response.data.validNode).toBeNull();
      });
    });

    describe('when the node exists in the package.json file and dependencies are not in alpahbetical order', () => {
      test('false should be returned', () => {
        const packageJson = {
          devDependencies: {
            semver: '^5.3.0',
            chalk: '^1.1.3',
            'user-home': '^2.0.0',
          },
        };
        const response = alphabeticalSort.isInAlphabeticalOrder(packageJson, 'devDependencies');

        expect(response.status).toBe(false);
        expect(response.data.invalidNode).toStrictEqual('semver');
        expect(response.data.validNode).toStrictEqual('chalk');
      });
    });
  });
});
