'use strict';

/* eslint max-lines: 'off', id-length: 'off' */

const fs = require('fs');
const path = require('path');
const chai = require('chai');
const sinon = require('sinon');
const Config = require('./../../src/Config');
const ConfigFile = require('./../../src/config/ConfigFile');
const ConfigValidator = require('./../../src/config/ConfigValidator');
const Parser = require('./../../src/Parser');
const CLIEngine = require('./../../src/CLIEngine');
const pkg = require('./../../package.json');

const should = chai.should();

describe('CLIEngine Unit Tests', function() {
  context('version', function() {
    it('matches package', function() {
      const options = {
        configFile: '',
        cwd: process.cwd(),
        useConfigFiles: true,
        rules: {}
      };
      const cliEngine = new CLIEngine(options);
      cliEngine.version.should.equal(pkg.version);
    });
  });

  context('invalid rules object', function() {
    it('error is thrown', function() {
      const options = {
        configFile: '',
        cwd: process.cwd(),
        useConfigFiles: true,
        rules: {
          'require-name': 'blah'
        }
      };

      (function() {
        const cliEngine = new CLIEngine(options);
      }).should.throw('cli:\n\tConfiguration for rule "require-name" is invalid:\n\tmust be set to "error", "warning", or "off". Currently set to "blah".');
    });
  });

  context('getRules method tests', function() {
    it('when called a list of rules is returned', function() {
      const options = {
        configFile: '',
        cwd: process.cwd(),
        useConfigFiles: true,
        rules: {}
      };
      const cliEngine = new CLIEngine(options);
      const results = cliEngine.getRules();

      const type = typeof results;
      type.should.equal('object');
      results.hasOwnProperty('require-name').should.be.true;
    });
  });

  context('getErrorResults method tests', function() {
    it('when called warnings should be filtered out', function() {
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

      filteredResults.should.deep.equal(expected);
    });
  });

  context('executeOnPackageJsonFiles method tests', function() {
    it('when called with patterns', function() {
      const patterns = [
        './tests/fixtures/valid/',
        './tests/fixtures/errors/**',
        './tests/fixtures/errors',
        './tests/fixtures/errors/package.json',
        './tests/fixtures/errors/package.json'
      ];

      const expected = {
        errorCount: 1,
        results: [
          {
            errorCount: 0,
            filePath: './tests/fixtures/valid/package.json',
            issues: [],
            warningCount: 0
          },
          {
            errorCount: 1,
            filePath: './tests/fixtures/errors/package.json',
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

      results.should.deep.equal(expected);
    });

    it('when called with invalid pattern', function() {
      const path = './tests/fixtures/valid/.npmpackagejsonlintrc.json';
      const patterns = [path];

      const options = {
        configFile: '',
        cwd: process.cwd(),
        useConfigFiles: true,
        rules: {}
      };
      const cliEngine = new CLIEngine(options);

      (function() {
        cliEngine.executeOnPackageJsonFiles(patterns);
      }).should.throw(`Pattern, ${path}, is a file, but isn't a package.json file.`);
    });
  });

  context('executeOnPackageJsonObject method tests', function() {
    it('when called with absolute path', function() {
      const pkgObject = {
        name: 'name'
      };

      const expected = {
        errorCount: 8,
        results: [
          {
            errorCount: 8,
            filePath: './tests/fixtures/errors/package.json',
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
      const fileName = `${process.cwd()}/tests/fixtures/errors/package.json`;
      const options = {
        configFile: '',
        cwd: process.cwd(),
        useConfigFiles: true,
        rules: {}
      };
      const cliEngine = new CLIEngine(options);
      const results = cliEngine.executeOnPackageJsonObject(pkgObject, fileName);

      results.should.deep.equal(expected);
    });

    it('when called with relative path', function() {
      const pkgObject = {
        name: 'name'
      };

      const expected = {
        errorCount: 8,
        results: [
          {
            errorCount: 8,
            filePath: './tests/fixtures/errors/package.json',
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
      const fileName = './tests/fixtures/errors/package.json';
      const options = {
        configFile: '',
        cwd: process.cwd(),
        useConfigFiles: true,
        rules: {}
      };
      const cliEngine = new CLIEngine(options);
      const results = cliEngine.executeOnPackageJsonObject(pkgObject, fileName);

      results.should.deep.equal(expected);
    });
  });

  context('getConfigForFile method tests', function() {
    it('when called config object should be returned', function() {
      const stub = sinon.stub(Config.prototype, 'get');

      stub.returns({rules: {'require-name': 'error'}});

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

      stub.calledOnce.should.be.true;
      stub.firstCall.calledWithExactly(filePath).should.be.true;

      results.should.deep.equal(expectedConfigObj);

      Config.prototype.get.restore();
    });
  });
});
