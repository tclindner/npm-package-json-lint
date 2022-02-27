import {Ignore} from 'ignore';
import {Config} from 'cosmiconfig/dist/types';
import {executeOnPackageJsonFiles, executeOnPackageJsonObject} from '../../../src/linter/linter';
import {Rules} from '../../../src/Rules';
import {LintIssue} from '../../../src/lint-issue';
import {Severity} from '../../../src/types/severity';

describe('linter Unit Tests', () => {
  describe('executeOnPackageJsonFiles method tests', () => {
    test('files not ignored', () => {
      const patterns = ['./test/fixtures/valid/package.json', './test/fixtures/errors/package.json'];
      const mockIgnorer: Ignore = {
        ignores: (): boolean => false,
        add: jest.fn(),
        createFilter: jest.fn(),
        filter: jest.fn(),
        test: jest.fn(),
      };
      const mockConfigHelper: Config = {
        getConfigForFile: jest
          .fn()
          .mockReturnValueOnce({'name-format': 'error'})
          .mockReturnValueOnce({'require-scripts': 'error'}),
      };
      const rules = new Rules();
      rules.load();

      const lintIssue = new LintIssue('require-scripts', Severity.Error, 'scripts', 'scripts is required');
      const expected = {
        errorCount: 1,
        ignoreCount: 0,
        results: [
          {
            errorCount: 0,
            filePath: './test/fixtures/valid/package.json',
            ignored: false,
            issues: [],
            warningCount: 0,
          },
          {
            errorCount: 1,
            filePath: './test/fixtures/errors/package.json',
            ignored: false,
            issues: [lintIssue],
            warningCount: 0,
          },
        ],
        warningCount: 0,
      };

      const results = executeOnPackageJsonFiles({
        cwd: process.cwd(),
        fileList: patterns,
        ignorer: mockIgnorer,
        configHelper: mockConfigHelper,
        rules,
      });

      expect(results).toMatchObject(expected);
    });

    test('files ignored', () => {
      const patterns = ['./test/fixtures/valid/package.json', './test/fixtures/errors/package.json'];
      const mockIgnorer: Ignore = {
        ignores: (): boolean => true,
        add: jest.fn(),
        createFilter: jest.fn(),
        filter: jest.fn(),
        test: jest.fn(),
      };
      const mockConfigHelper: Config = {
        getConfigForFile: jest.fn(),
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
            warningCount: 0,
          },
          {
            errorCount: 0,
            filePath: './test/fixtures/errors/package.json',
            ignored: true,
            issues: [],
            warningCount: 0,
          },
        ],
        warningCount: 0,
      };

      const results = executeOnPackageJsonFiles({
        cwd: process.cwd(),
        fileList: patterns,
        ignorer: mockIgnorer,
        configHelper: mockConfigHelper,
        rules,
      });

      expect(results).toStrictEqual(expected);
    });
  });

  describe('executeOnPackageJsonObject method tests', () => {
    test('pkg not ignored', () => {
      const packageJsonObj = {
        name: 'my-test-module',
      };
      const mockIgnorer: Ignore = {
        ignores: (): boolean => false,
        add: jest.fn(),
        createFilter: jest.fn(),
        filter: jest.fn(),
        test: jest.fn(),
      };
      const mockConfigHelper: Config = {
        getConfigForFile: jest.fn(),
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
            warningCount: 0,
          },
        ],
        warningCount: 0,
      };

      const results = executeOnPackageJsonObject({
        cwd: process.cwd(),
        packageJsonObject: packageJsonObj,
        filename: './test/fixtures/valid/package.json',
        ignorer: mockIgnorer,
        configHelper: mockConfigHelper,
        rules,
      });

      expect(results).toStrictEqual(expected);
    });

    test('pkg ignored', () => {
      const packageJsonObj = {
        name: 'my-test-module',
      };
      const mockIgnorer: Ignore = {
        ignores: (): boolean => true,
        add: jest.fn(),
        createFilter: jest.fn(),
        filter: jest.fn(),
        test: jest.fn(),
      };
      const mockConfigHelper: Config = {
        getConfigForFile: jest.fn(),
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
            warningCount: 0,
          },
        ],
        warningCount: 0,
      };

      const results = executeOnPackageJsonObject({
        cwd: process.cwd(),
        packageJsonObject: packageJsonObj,
        filename: './test/fixtures/valid/package.json',
        ignorer: mockIgnorer,
        configHelper: mockConfigHelper,
        rules,
      });

      expect(results).toStrictEqual(expected);
    });

    test('filename is absolute', () => {
      const packageJsonObj = {
        name: 'my-test-module',
      };
      const mockIgnorer: Ignore = {
        ignores: (): boolean => true,
        add: jest.fn(),
        createFilter: jest.fn(),
        filter: jest.fn(),
        test: jest.fn(),
      };
      const mockConfigHelper: Config = {
        getConfigForFile: jest.fn(),
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
            warningCount: 0,
          },
        ],
        warningCount: 0,
      };

      const results = executeOnPackageJsonObject({
        cwd: process.cwd(),
        packageJsonObject: packageJsonObj,
        filename: `${process.cwd()}/test/fixtures/valid/package.json`,
        ignorer: mockIgnorer,
        configHelper: mockConfigHelper,
        rules,
      });

      expect(results).toStrictEqual(expected);
    });

    test('no filename passed', () => {
      const packageJsonObj = {
        name: 'my-test-module',
      };
      const mockIgnorer: Ignore = {
        ignores: (): boolean => false,
        add: jest.fn(),
        createFilter: jest.fn(),
        filter: jest.fn(),
        test: jest.fn(),
      };
      const mockConfigHelper: Config = {
        getConfigForFile: jest.fn(),
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
            warningCount: 0,
          },
        ],
        warningCount: 0,
      };

      const results = executeOnPackageJsonObject({
        cwd: process.cwd(),
        packageJsonObject: packageJsonObj,
        ignorer: mockIgnorer,
        configHelper: mockConfigHelper,
        rules,
      });

      expect(results).toStrictEqual(expected);
    });

    test('array type rule', () => {
      const packageJsonObj = {
        name: 'my-test-module',
        author: 'Spiderman',
      };
      const mockIgnorer: Ignore = {
        ignores: (): boolean => false,
        add: jest.fn(),
        createFilter: jest.fn(),
        filter: jest.fn(),
        test: jest.fn(),
      };
      const mockConfigHelper: Config = {
        getConfigForFile: jest.fn().mockReturnValue({'valid-values-author': ['error', ['Peter Parker']]}),
      };
      const rules = new Rules();
      rules.load();

      const lintIssue = new LintIssue('valid-values-author', Severity.Error, 'author', 'Invalid value for author');
      const expected = {
        errorCount: 1,
        ignoreCount: 0,
        results: [
          {
            errorCount: 1,
            filePath: './test/fixtures/errors/package.json',
            ignored: false,
            issues: [lintIssue],
            warningCount: 0,
          },
        ],
        warningCount: 0,
      };

      const results = executeOnPackageJsonObject({
        cwd: process.cwd(),
        packageJsonObject: packageJsonObj,
        filename: './test/fixtures/errors/package.json',
        ignorer: mockIgnorer,
        configHelper: mockConfigHelper,
        rules,
      });

      expect(results).toMatchObject(expected);
    });

    test('array type rule - off', () => {
      const packageJsonObj = {
        name: 'my-test-module',
        author: 'Spiderman',
      };
      const mockIgnorer: Ignore = {
        ignores: (): boolean => false,
        add: jest.fn(),
        createFilter: jest.fn(),
        filter: jest.fn(),
        test: jest.fn(),
      };
      const mockConfigHelper: Config = {
        getConfigForFile: jest.fn().mockReturnValue({'valid-values-author': 'off'}),
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
            warningCount: 0,
          },
        ],
        warningCount: 0,
      };

      const results = executeOnPackageJsonObject({
        cwd: process.cwd(),
        packageJsonObject: packageJsonObj,
        filename: './test/fixtures/errors/package.json',
        ignorer: mockIgnorer,
        configHelper: mockConfigHelper,
        rules,
      });

      expect(results).toStrictEqual(expected);
    });

    test('object type rule', () => {
      const packageJsonObj = {
        name: 'my-test-module',
        description: 'Spiderman',
      };
      const mockIgnorer: Ignore = {
        ignores: (): boolean => false,
        add: jest.fn(),
        createFilter: jest.fn(),
        filter: jest.fn(),
        test: jest.fn(),
      };
      const mockConfigHelper: Config = {
        getConfigForFile: jest.fn().mockReturnValue({
          'description-format': [
            'error',
            {
              requireCapitalFirstLetter: true,
              requireEndingPeriod: true,
            },
          ],
        }),
      };
      const rules = new Rules();
      rules.load();

      const lintIssue = new LintIssue(
        'description-format',
        Severity.Error,
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
            warningCount: 0,
          },
        ],
        warningCount: 0,
      };

      const results = executeOnPackageJsonObject({
        cwd: process.cwd(),
        packageJsonObject: packageJsonObj,
        filename: './test/fixtures/errors/package.json',
        ignorer: mockIgnorer,
        configHelper: mockConfigHelper,
        rules,
      });

      expect(results).toMatchObject(expected);
    });

    test('optional object type rule as string', () => {
      const packageJsonObj = {
        name: 'my-test-module',
        dependencies: {
          myModule: '^1.0.0',
        },
      };
      const mockIgnorer: Ignore = {
        ignores: (): boolean => false,
        add: jest.fn(),
        createFilter: jest.fn(),
        filter: jest.fn(),
        test: jest.fn(),
      };
      const mockConfigHelper: Config = {
        getConfigForFile: jest.fn().mockReturnValue({
          'no-caret-version-dependencies': 'error',
        }),
      };
      const rules = new Rules();
      rules.load();

      const lintIssue = new LintIssue(
        'no-caret-version-dependencies',
        Severity.Error,
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
            warningCount: 0,
          },
        ],
        warningCount: 0,
      };

      const results = executeOnPackageJsonObject({
        cwd: process.cwd(),
        packageJsonObject: packageJsonObj,
        filename: './test/fixtures/errors/package.json',
        ignorer: mockIgnorer,
        configHelper: mockConfigHelper,
        rules,
      });

      expect(results).toMatchObject(expected);
    });

    test('optional object type rule as string (scenario 2)', () => {
      const packageJsonObj = {
        name: 'my-test-module',
        dependencies: {
          myModule: '^1.0.0',
        },
      };
      const mockIgnorer: Ignore = {
        ignores: (): boolean => false,
        add: jest.fn(),
        createFilter: jest.fn(),
        filter: jest.fn(),
        test: jest.fn(),
      };
      const mockConfigHelper: Config = {
        getConfigForFile: jest.fn().mockReturnValue({
          'no-caret-version-dependencies': [
            'error',
            {
              exceptions: ['myModule2'],
            },
          ],
        }),
      };
      const rules = new Rules();
      rules.load();

      const lintIssue = new LintIssue(
        'no-caret-version-dependencies',
        Severity.Error,
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
            warningCount: 0,
          },
        ],
        warningCount: 0,
      };

      const results = executeOnPackageJsonObject({
        cwd: process.cwd(),
        packageJsonObject: packageJsonObj,
        filename: './test/fixtures/errors/package.json',
        ignorer: mockIgnorer,
        configHelper: mockConfigHelper,
        rules,
      });

      expect(results).toMatchObject(expected);
    });
  });
});
