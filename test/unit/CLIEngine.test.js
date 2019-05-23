/* eslint max-lines: 'off', id-length: 'off' */

const path = require('path');
const Config = require('./../../src/Config');
const CLIEngine = require('./../../src/CLIEngine');
const pkg = require('./../../package.json');

describe('CLIEngine Unit Tests', () => {
  describe('version', () => {
    test('matches package', () => {
      const options = {
        configFile: '',
        cwd: process.cwd(),
        useConfigFiles: true,
        rules: {}
      };
      const cliEngine = new CLIEngine(options);
      expect(cliEngine.version).toStrictEqual(pkg.version);
    });
  });

  describe('invalid rules object', () => {
    test('error is thrown', () => {
      const options = {
        configFile: '',
        cwd: process.cwd(),
        useConfigFiles: true,
        rules: {
          'require-name': 'blah'
        }
      };

      expect(() => {
        const engine = new CLIEngine(options);
      }).toThrow(
        'cli:\n\tConfiguration for rule "require-name" is invalid:\n\tmust be set to "error", "warning", or "off". Currently set to "blah".'
      );
    });
  });

  describe('getRules method tests', () => {
    test('when called a list of rules is returned', () => {
      const options = {
        configFile: '',
        cwd: process.cwd(),
        useConfigFiles: true,
        rules: {}
      };
      const cliEngine = new CLIEngine(options);
      const results = cliEngine.getRules();

      expect(typeof results).toStrictEqual('object');
      expect(results).toHaveProperty('require-name');
    });
  });

  describe('getErrorResults method tests', () => {
    test('when called warnings should be filtered out', () => {
      const results = [
        {
          filePath: 'dummyText',
          issues: [
            {
              lintId: 'require-name',
              severity: 'error',
              node: 'name',
              lintMessage: 'dummyText'
            },
            {
              lintId: 'require-name',
              severity: 'warning',
              node: 'name',
              lintMessage: 'dummyText'
            }
          ],
          errorCount: 1,
          warningCount: 1
        }
      ];

      const filteredResults = CLIEngine.getErrorResults(results);
      const expected = [
        {
          filePath: 'dummyText',
          issues: [
            {
              lintId: 'require-name',
              severity: 'error',
              node: 'name',
              lintMessage: 'dummyText'
            }
          ],
          errorCount: 1,
          warningCount: 0
        }
      ];

      expect(filteredResults).toStrictEqual(expected);
    });
  });

  describe('executeOnPackageJsonFiles method tests', () => {
    test('when called with patterns', () => {
      const patterns = [
        './test/fixtures/valid/',
        './test/fixtures/errors/**',
        './test/fixtures/errors',
        './test/fixtures/errors/package.json',
        './test/fixtures/errors/package.json'
      ];

      const expected = {
        errorCount: 1,
        results: [
          {
            errorCount: 0,
            filePath: './test/fixtures/valid/package.json',
            issues: [],
            warningCount: 0
          },
          {
            errorCount: 1,
            filePath: './test/fixtures/errors/package.json',
            issues: [
              {
                lintId: 'require-scripts',
                lintMessage: 'scripts is required',
                node: 'scripts',
                severity: 'error'
              }
            ],
            warningCount: 0
          }
        ],
        warningCount: 0
      };

      const options = {
        configFile: '',
        cwd: process.cwd(),
        useConfigFiles: true,
        rules: {}
      };
      const cliEngine = new CLIEngine(options);
      const results = cliEngine.executeOnPackageJsonFiles(patterns);

      expect(results).toEqual(expected);
    });

    test('when called with patterns and ignorePath', () => {
      const patterns = ['./test/fixtures/ignorePath/'];
      const ignorePath = path.resolve(__dirname, '../fixtures/ignorePath/.gitignore-example');

      const expected = {
        errorCount: 0,
        results: [
          {
            errorCount: 0,
            filePath: './test/fixtures/ignorePath/package.json',
            issues: [],
            warningCount: 0
          }
        ],
        warningCount: 0
      };

      const options = {
        configFile: '',
        cwd: process.cwd(),
        useConfigFiles: true,
        ignorePath,
        rules: {}
      };
      const cliEngine = new CLIEngine(options);
      const results = cliEngine.executeOnPackageJsonFiles(patterns);

      expect(results).toStrictEqual(expected);
    });

    test('when called with patterns should respect .npmpackagejsonlintignore', () => {
      const cwd = path.resolve(__dirname, '../fixtures/npmPackageJsonLintIgnore');
      const patterns = [cwd];

      const expected = {
        errorCount: 0,
        results: [
          {
            errorCount: 0,
            filePath: './package.json',
            issues: [],
            warningCount: 0
          }
        ],
        warningCount: 0
      };

      const options = {
        configFile: '',
        cwd,
        useConfigFiles: true,
        rules: {}
      };
      const cliEngine = new CLIEngine(options);
      const results = cliEngine.executeOnPackageJsonFiles(patterns);

      expect(results).toStrictEqual(expected);
    });

    test('when called with patterns (pattern is file) and ignorePath', () => {
      const patterns = ['./test/fixtures/ignorePath/ignoredDirectory/package.json'];
      const ignorePath = path.resolve(__dirname, '../fixtures/ignorePath/.gitignore-example');

      const expected = {
        errorCount: 0,
        results: [],
        warningCount: 0
      };

      const options = {
        configFile: '',
        cwd: process.cwd(),
        useConfigFiles: true,
        ignorePath,
        rules: {}
      };
      const cliEngine = new CLIEngine(options);
      const results = cliEngine.executeOnPackageJsonFiles(patterns);

      expect(results).toStrictEqual(expected);
    });

    test('when called with invalid pattern', () => {
      const pattern = './test/fixtures/valid/.npmpackagejsonlintrc.json';
      const patterns = [pattern];

      const options = {
        configFile: '',
        cwd: process.cwd(),
        useConfigFiles: true,
        rules: {}
      };
      const cliEngine = new CLIEngine(options);

      expect(() => {
        cliEngine.executeOnPackageJsonFiles(patterns);
      }).toThrow(`Pattern, ${pattern}, is a file, but isn't a package.json file.`);
    });
  });

  describe('executeOnPackageJsonObject method tests', () => {
    test('when called with absolute path', () => {
      const pkgObject = {
        name: 'name'
      };

      const expected = {
        errorCount: 8,
        results: [
          {
            errorCount: 8,
            filePath: './test/fixtures/errors/package.json',
            issues: [
              {
                lintId: 'require-author',
                lintMessage: 'author is required',
                severity: 'error',
                node: 'author'
              },
              {
                lintId: 'require-description',
                lintMessage: 'description is required',
                node: 'description',
                severity: 'error'
              },
              {
                lintId: 'require-devDependencies',
                lintMessage: 'devDependencies is required',
                node: 'devDependencies',
                severity: 'error'
              },
              {
                lintId: 'require-homepage',
                lintMessage: 'homepage is required',
                node: 'homepage',
                severity: 'error'
              },
              {
                lintId: 'require-keywords',
                lintMessage: 'keywords is required',
                node: 'keywords',
                severity: 'error'
              },
              {
                lintId: 'require-repository',
                lintMessage: 'repository is required',
                node: 'repository',
                severity: 'error'
              },
              {
                lintId: 'require-scripts',
                lintMessage: 'scripts is required',
                node: 'scripts',
                severity: 'error'
              },
              {
                lintId: 'require-version',
                lintMessage: 'version is required',
                node: 'version',
                severity: 'error'
              }
            ],
            warningCount: 0
          }
        ],
        warningCount: 0
      };
      const fileName = `${process.cwd()}/test/fixtures/errors/package.json`;
      const options = {
        configFile: '',
        cwd: process.cwd(),
        useConfigFiles: true,
        rules: {}
      };
      const cliEngine = new CLIEngine(options);
      const results = cliEngine.executeOnPackageJsonObject(pkgObject, fileName);

      expect(results).toEqual(expected);
    });

    test('when called with relative path', () => {
      const pkgObject = {
        name: 'name'
      };

      const expected = {
        errorCount: 8,
        results: [
          {
            errorCount: 8,
            filePath: './test/fixtures/errors/package.json',
            issues: [
              {
                lintId: 'require-author',
                lintMessage: 'author is required',
                severity: 'error',
                node: 'author'
              },
              {
                lintId: 'require-description',
                lintMessage: 'description is required',
                node: 'description',
                severity: 'error'
              },
              {
                lintId: 'require-devDependencies',
                lintMessage: 'devDependencies is required',
                node: 'devDependencies',
                severity: 'error'
              },
              {
                lintId: 'require-homepage',
                lintMessage: 'homepage is required',
                node: 'homepage',
                severity: 'error'
              },
              {
                lintId: 'require-keywords',
                lintMessage: 'keywords is required',
                node: 'keywords',
                severity: 'error'
              },
              {
                lintId: 'require-repository',
                lintMessage: 'repository is required',
                node: 'repository',
                severity: 'error'
              },
              {
                lintId: 'require-scripts',
                lintMessage: 'scripts is required',
                node: 'scripts',
                severity: 'error'
              },
              {
                lintId: 'require-version',
                lintMessage: 'version is required',
                node: 'version',
                severity: 'error'
              }
            ],
            warningCount: 0
          }
        ],
        warningCount: 0
      };
      const fileName = './test/fixtures/errors/package.json';
      const options = {
        configFile: '',
        cwd: process.cwd(),
        useConfigFiles: true,
        rules: {}
      };
      const cliEngine = new CLIEngine(options);
      const results = cliEngine.executeOnPackageJsonObject(pkgObject, fileName);

      expect(results).toEqual(expected);
    });
  });

  describe('getConfigForFile method tests', () => {
    test('when called config object should be returned', () => {
      jest.spyOn(Config.prototype, 'get').mockReturnValue({rules: {'require-name': 'error'}});

      const expectedConfigObj = {
        rules: {
          'require-name': 'error'
        }
      };
      const filePath = './package.json';
      const options = {
        configFile: '',
        cwd: process.cwd(),
        useConfigFiles: true,
        rules: {}
      };
      const cliEngine = new CLIEngine(options);
      const results = cliEngine.getConfigForFile(filePath);

      expect(Config.prototype.get).toHaveBeenCalledTimes(1);
      expect(Config.prototype.get).toHaveBeenCalledWith(filePath);

      expect(results).toStrictEqual(expectedConfigObj);
    });
  });
});
