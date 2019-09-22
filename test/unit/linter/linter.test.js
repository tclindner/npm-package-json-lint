const linter = require('../../../src/linter/linter');
const Rules = require('../../../src/Rules');
const LintIssue = require('../../../src/LintIssue');

describe('linter Unit Tests', () => {
  describe('executeOnPackageJsonFiles method tests', () => {
    test('files not ignored', () => {
      const patterns = ['./test/fixtures/valid/package.json', './test/fixtures/errors/package.json'];
      const mockIgnorer = {
        ignores: () => false
      };
      const mockConfigHelper = {
        getConfigForFile: jest
          .fn()
          .mockReturnValueOnce({'name-format': 'error'})
          .mockReturnValueOnce({'require-scripts': 'error'})
      };
      const rules = new Rules();
      rules.load();

      const lintIssue = new LintIssue('require-scripts', 'error', 'scripts', 'scripts is required');
      const expected = {
        errorCount: 1,
        ignoreCount: 0,
        results: [
          {
            errorCount: 0,
            filePath: './test/fixtures/valid/package.json',
            ignored: false,
            issues: [],
            warningCount: 0
          },
          {
            errorCount: 1,
            filePath: './test/fixtures/errors/package.json',
            ignored: false,
            issues: [lintIssue],
            warningCount: 0
          }
        ],
        warningCount: 0
      };

      const results = linter.executeOnPackageJsonFiles({
        cwd: process.cwd(),
        fileList: patterns,
        ignorer: mockIgnorer,
        configHelper: mockConfigHelper,
        rules
      });

      expect(results).toMatchObject(expected);
    });

    test('files ignored', () => {
      const patterns = ['./test/fixtures/valid/package.json', './test/fixtures/errors/package.json'];
      const mockIgnorer = {
        ignores: () => true
      };
      const mockConfigHelper = {
        getConfigForFile: jest.fn()
      };
      const rules = new Rules();

      const expected = {
        errorCount: 0,
        ignoreCount: 2,
        results: [
          {
            errorCount: 0,
            filePath: './test/fixtures/valid/package.json',
            ignored: true,
            issues: [],
            warningCount: 0
          },
          {
            errorCount: 0,
            filePath: './test/fixtures/errors/package.json',
            ignored: true,
            issues: [],
            warningCount: 0
          }
        ],
        warningCount: 0
      };

      const results = linter.executeOnPackageJsonFiles({
        cwd: process.cwd(),
        fileList: patterns,
        ignorer: mockIgnorer,
        configHelper: mockConfigHelper,
        rules
      });

      expect(results).toStrictEqual(expected);
    });
  });

  describe('executeOnPackageJsonObject method tests', () => {
    test('pkg not ignored', () => {
      const packageJsonObj = {
        name: 'my-test-module'
      };
      const mockIgnorer = {
        ignores: () => false
      };
      const mockConfigHelper = {
        getConfigForFile: jest.fn()
      };
      const rules = new Rules();

      const expected = {
        errorCount: 0,
        ignoreCount: 0,
        results: [
          {
            errorCount: 0,
            filePath: './test/fixtures/valid/package.json',
            ignored: false,
            issues: [],
            warningCount: 0
          }
        ],
        warningCount: 0
      };

      const results = linter.executeOnPackageJsonObject({
        cwd: process.cwd(),
        packageJsonObject: packageJsonObj,
        filename: './test/fixtures/valid/package.json',
        ignorer: mockIgnorer,
        configHelper: mockConfigHelper,
        rules
      });

      expect(results).toStrictEqual(expected);
    });

    test('pkg ignored', () => {
      const packageJsonObj = {
        name: 'my-test-module'
      };
      const mockIgnorer = {
        ignores: () => true
      };
      const mockConfigHelper = {
        getConfigForFile: jest.fn()
      };
      const rules = new Rules();

      const expected = {
        errorCount: 0,
        ignoreCount: 1,
        results: [
          {
            errorCount: 0,
            filePath: './test/fixtures/valid/package.json',
            ignored: true,
            issues: [],
            warningCount: 0
          }
        ],
        warningCount: 0
      };

      const results = linter.executeOnPackageJsonObject({
        cwd: process.cwd(),
        packageJsonObject: packageJsonObj,
        filename: './test/fixtures/valid/package.json',
        ignorer: mockIgnorer,
        configHelper: mockConfigHelper,
        rules
      });

      expect(results).toStrictEqual(expected);
    });

    test('filename is absolute', () => {
      const packageJsonObj = {
        name: 'my-test-module'
      };
      const mockIgnorer = {
        ignores: () => true
      };
      const mockConfigHelper = {
        getConfigForFile: jest.fn()
      };
      const rules = new Rules();

      const expected = {
        errorCount: 0,
        ignoreCount: 1,
        results: [
          {
            errorCount: 0,
            filePath: './test/fixtures/valid/package.json',
            ignored: true,
            issues: [],
            warningCount: 0
          }
        ],
        warningCount: 0
      };

      const results = linter.executeOnPackageJsonObject({
        cwd: process.cwd(),
        packageJsonObject: packageJsonObj,
        filename: `${process.cwd()}/test/fixtures/valid/package.json`,
        ignorer: mockIgnorer,
        configHelper: mockConfigHelper,
        rules
      });

      expect(results).toStrictEqual(expected);
    });

    test('no filename passed', () => {
      const packageJsonObj = {
        name: 'my-test-module'
      };
      const mockIgnorer = {
        ignores: () => false
      };
      const mockConfigHelper = {
        getConfigForFile: jest.fn()
      };
      const rules = new Rules();

      const expected = {
        errorCount: 0,
        ignoreCount: 0,
        results: [
          {
            errorCount: 0,
            filePath: './',
            ignored: false,
            issues: [],
            warningCount: 0
          }
        ],
        warningCount: 0
      };

      const results = linter.executeOnPackageJsonObject({
        cwd: process.cwd(),
        packageJsonObject: packageJsonObj,
        ignorer: mockIgnorer,
        configHelper: mockConfigHelper,
        rules
      });

      expect(results).toStrictEqual(expected);
    });

    test('array type rule', () => {
      const packageJsonObj = {
        name: 'my-test-module',
        author: 'Spiderman'
      };
      const mockIgnorer = {
        ignores: () => false
      };
      const mockConfigHelper = {
        getConfigForFile: jest.fn().mockReturnValue({'valid-values-author': ['error', ['Peter Parker']]})
      };
      const rules = new Rules();
      rules.load();

      const lintIssue = new LintIssue('valid-values-author', 'error', 'author', 'Invalid value for author');
      const expected = {
        errorCount: 1,
        ignoreCount: 0,
        results: [
          {
            errorCount: 1,
            filePath: './test/fixtures/errors/package.json',
            ignored: false,
            issues: [lintIssue],
            warningCount: 0
          }
        ],
        warningCount: 0
      };

      const results = linter.executeOnPackageJsonObject({
        cwd: process.cwd(),
        packageJsonObject: packageJsonObj,
        filename: './test/fixtures/errors/package.json',
        ignorer: mockIgnorer,
        configHelper: mockConfigHelper,
        rules
      });

      expect(results).toMatchObject(expected);
    });

    test('array type rule - off', () => {
      const packageJsonObj = {
        name: 'my-test-module',
        author: 'Spiderman'
      };
      const mockIgnorer = {
        ignores: () => false
      };
      const mockConfigHelper = {
        getConfigForFile: jest.fn().mockReturnValue({'valid-values-author': 'off'})
      };
      const rules = new Rules();
      rules.load();

      const expected = {
        errorCount: 0,
        ignoreCount: 0,
        results: [
          {
            errorCount: 0,
            filePath: './test/fixtures/errors/package.json',
            ignored: false,
            issues: [],
            warningCount: 0
          }
        ],
        warningCount: 0
      };

      const results = linter.executeOnPackageJsonObject({
        cwd: process.cwd(),
        packageJsonObject: packageJsonObj,
        filename: './test/fixtures/errors/package.json',
        ignorer: mockIgnorer,
        configHelper: mockConfigHelper,
        rules
      });

      expect(results).toStrictEqual(expected);
    });

    test('object type rule', () => {
      const packageJsonObj = {
        name: 'my-test-module',
        description: 'Spiderman'
      };
      const mockIgnorer = {
        ignores: () => false
      };
      const mockConfigHelper = {
        getConfigForFile: jest.fn().mockReturnValue({
          'description-format': [
            'error',
            {
              requireCapitalFirstLetter: true,
              requireEndingPeriod: true
            }
          ]
        })
      };
      const rules = new Rules();
      rules.load();

      const lintIssue = new LintIssue(
        'description-format',
        'error',
        'description',
        'The description should end with a period.'
      );
      const expected = {
        errorCount: 1,
        ignoreCount: 0,
        results: [
          {
            errorCount: 1,
            filePath: './test/fixtures/errors/package.json',
            ignored: false,
            issues: [lintIssue],
            warningCount: 0
          }
        ],
        warningCount: 0
      };

      const results = linter.executeOnPackageJsonObject({
        cwd: process.cwd(),
        packageJsonObject: packageJsonObj,
        filename: './test/fixtures/errors/package.json',
        ignorer: mockIgnorer,
        configHelper: mockConfigHelper,
        rules
      });

      expect(results).toMatchObject(expected);
    });

    test('optional object type rule as string', () => {
      const packageJsonObj = {
        name: 'my-test-module',
        dependencies: {
          myModule: '^1.0.0'
        }
      };
      const mockIgnorer = {
        ignores: () => false
      };
      const mockConfigHelper = {
        getConfigForFile: jest.fn().mockReturnValue({
          'no-caret-version-dependencies': 'error'
        })
      };
      const rules = new Rules();
      rules.load();

      const lintIssue = new LintIssue(
        'no-caret-version-dependencies',
        'error',
        'dependencies',
        'You are using an invalid version range. Please do not use ^.'
      );
      const expected = {
        errorCount: 1,
        ignoreCount: 0,
        results: [
          {
            errorCount: 1,
            filePath: './test/fixtures/errors/package.json',
            ignored: false,
            issues: [lintIssue],
            warningCount: 0
          }
        ],
        warningCount: 0
      };

      const results = linter.executeOnPackageJsonObject({
        cwd: process.cwd(),
        packageJsonObject: packageJsonObj,
        filename: './test/fixtures/errors/package.json',
        ignorer: mockIgnorer,
        configHelper: mockConfigHelper,
        rules
      });

      expect(results).toMatchObject(expected);
    });

    test('optional object type rule as string (scenario 2)', () => {
      const packageJsonObj = {
        name: 'my-test-module',
        dependencies: {
          myModule: '^1.0.0'
        }
      };
      const mockIgnorer = {
        ignores: () => false
      };
      const mockConfigHelper = {
        getConfigForFile: jest.fn().mockReturnValue({
          'no-caret-version-dependencies': [
            'error',
            {
              exceptions: ['myModule2']
            }
          ]
        })
      };
      const rules = new Rules();
      rules.load();

      const lintIssue = new LintIssue(
        'no-caret-version-dependencies',
        'error',
        'dependencies',
        'You are using an invalid version range. Please do not use ^.'
      );
      const expected = {
        errorCount: 1,
        ignoreCount: 0,
        results: [
          {
            errorCount: 1,
            filePath: './test/fixtures/errors/package.json',
            ignored: false,
            issues: [lintIssue],
            warningCount: 0
          }
        ],
        warningCount: 0
      };

      const results = linter.executeOnPackageJsonObject({
        cwd: process.cwd(),
        packageJsonObject: packageJsonObj,
        filename: './test/fixtures/errors/package.json',
        ignorer: mockIgnorer,
        configHelper: mockConfigHelper,
        rules
      });

      expect(results).toMatchObject(expected);
    });
  });
});
