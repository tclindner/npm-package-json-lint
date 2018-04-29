'use strict';

/* eslint max-lines: 'off', id-length: 'off' */

const fs = require('fs');
const path = require('path');
const chai = require('chai');
const sinon = require('sinon');
const Config = require('./../../src/Config');
const ConfigFile = require('./../../src/config/ConfigFile');
const NpmPackageJsonLint = require('./../../src/NpmPackageJsonLint');

const should = chai.should();
const linterContext = new NpmPackageJsonLint();

describe('Config Unit Tests', function() {
  context('get method tests', function() {
    context('when each source has a different rule', function() {
      it('a config object should returned with all rules', function() {
        const configFile = './configfile';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {
            'require-scripts': 'error'
          }
        };
        const config = new Config(options, linterContext);

        const stubGetFromProp = sinon.stub(config, 'getConfigFromPkgJsonProp');
        const stubHierarchy = sinon.stub(config, 'getProjectHierarchyConfig');
        const stubCli = sinon.stub(config, 'loadCliSpecifiedCfgFile');
        const stubUserHome = sinon.stub(config, 'getUserHomeConfig');

        stubGetFromProp.returns({rules: {'version-type': 'error'}});
        stubHierarchy.returns({rules: {'require-version': 'error'}});
        stubCli.returns({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'version-type': 'error',
            'require-version': 'error',
            'require-name': 'error',
            'require-scripts': 'error'
          }
        };
        const filePath = './.npmpackagejsonlintrc.json';
        const result = config.get(filePath);

        stubGetFromProp.calledOnce.should.be.true;
        stubGetFromProp.firstCall.calledWithExactly(filePath).should.be.true;

        stubHierarchy.calledOnce.should.be.true;
        stubHierarchy.firstCall.calledWithExactly(filePath).should.be.true;

        stubCli.calledOnce.should.be.true;
        stubCli.firstCall.calledWithExactly(configFile).should.be.true;

        stubUserHome.notCalled.should.be.true;

        result.should.deep.equal(expectedConfigObj);

        config.getConfigFromPkgJsonProp.restore();
        config.getProjectHierarchyConfig.restore();
        config.loadCliSpecifiedCfgFile.restore();
        config.getUserHomeConfig.restore();
      });
    });

    context('when package.json property does not have rules', function() {
      it('a config object should returned with rules from other sources', function() {
        const configFile = './configfile';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {
            'require-scripts': 'error'
          }
        };
        const config = new Config(options, linterContext);

        const stubGetFromProp = sinon.stub(config, 'getConfigFromPkgJsonProp');
        const stubHierarchy = sinon.stub(config, 'getProjectHierarchyConfig');
        const stubCli = sinon.stub(config, 'loadCliSpecifiedCfgFile');
        const stubUserHome = sinon.stub(config, 'getUserHomeConfig');

        stubGetFromProp.returns({rules: {}});
        stubHierarchy.returns({rules: {'require-version': 'error'}});
        stubCli.returns({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'require-version': 'error',
            'require-name': 'error',
            'require-scripts': 'error'
          }
        };
        const filePath = './.npmpackagejsonlintrc.json';
        const result = config.get(filePath);

        stubGetFromProp.calledOnce.should.be.true;
        stubGetFromProp.firstCall.calledWithExactly(filePath).should.be.true;

        stubHierarchy.calledOnce.should.be.true;
        stubHierarchy.firstCall.calledWithExactly(filePath).should.be.true;

        stubCli.calledOnce.should.be.true;
        stubCli.firstCall.calledWithExactly(configFile).should.be.true;

        stubUserHome.notCalled.should.be.true;

        result.should.deep.equal(expectedConfigObj);

        config.getConfigFromPkgJsonProp.restore();
        config.getProjectHierarchyConfig.restore();
        config.loadCliSpecifiedCfgFile.restore();
        config.getUserHomeConfig.restore();
      });
    });

    context('when project hierarchy does not have rules', function() {
      it('a config object should returned with rules from other sources', function() {
        const configFile = './configfile';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {
            'require-scripts': 'error'
          }
        };
        const config = new Config(options, linterContext);

        const stubGetFromProp = sinon.stub(config, 'getConfigFromPkgJsonProp');
        const stubHierarchy = sinon.stub(config, 'getProjectHierarchyConfig');
        const stubCli = sinon.stub(config, 'loadCliSpecifiedCfgFile');
        const stubUserHome = sinon.stub(config, 'getUserHomeConfig');

        stubGetFromProp.returns({rules: {'version-type': 'error'}});
        stubHierarchy.returns({rules: {}});
        stubCli.returns({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'version-type': 'error',
            'require-name': 'error',
            'require-scripts': 'error'
          }
        };
        const filePath = './.npmpackagejsonlintrc.json';
        const result = config.get(filePath);

        stubGetFromProp.calledOnce.should.be.true;
        stubGetFromProp.firstCall.calledWithExactly(filePath).should.be.true;

        stubHierarchy.calledOnce.should.be.true;
        stubHierarchy.firstCall.calledWithExactly(filePath).should.be.true;

        stubCli.calledOnce.should.be.true;
        stubCli.firstCall.calledWithExactly(configFile).should.be.true;

        stubUserHome.notCalled.should.be.true;

        result.should.deep.equal(expectedConfigObj);

        config.getConfigFromPkgJsonProp.restore();
        config.getProjectHierarchyConfig.restore();
        config.loadCliSpecifiedCfgFile.restore();
        config.getUserHomeConfig.restore();
      });
    });

    context('when cli specified config does not have rules', function() {
      it('a config object should returned with rules from other sources', function() {
        const configFile = './configfile';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {
            'require-scripts': 'error'
          }
        };
        const config = new Config(options, linterContext);

        const stubGetFromProp = sinon.stub(config, 'getConfigFromPkgJsonProp');
        const stubHierarchy = sinon.stub(config, 'getProjectHierarchyConfig');
        const stubCli = sinon.stub(config, 'loadCliSpecifiedCfgFile');
        const stubUserHome = sinon.stub(config, 'getUserHomeConfig');

        stubGetFromProp.returns({rules: {'version-type': 'error'}});
        stubHierarchy.returns({rules: {'require-version': 'error'}});
        stubCli.returns({rules: {}});

        const expectedConfigObj = {
          rules: {
            'version-type': 'error',
            'require-version': 'error',
            'require-scripts': 'error'
          }
        };
        const filePath = './.npmpackagejsonlintrc.json';
        const result = config.get(filePath);

        stubGetFromProp.calledOnce.should.be.true;
        stubGetFromProp.firstCall.calledWithExactly(filePath).should.be.true;

        stubHierarchy.calledOnce.should.be.true;
        stubHierarchy.firstCall.calledWithExactly(filePath).should.be.true;

        stubCli.calledOnce.should.be.true;
        stubCli.firstCall.calledWithExactly(configFile).should.be.true;

        stubUserHome.notCalled.should.be.true;

        result.should.deep.equal(expectedConfigObj);

        config.getConfigFromPkgJsonProp.restore();
        config.getProjectHierarchyConfig.restore();
        config.loadCliSpecifiedCfgFile.restore();
        config.getUserHomeConfig.restore();
      });
    });

    context('when cli specified rules does not exist', function() {
      it('a config object should returned with rules from other sources', function() {
        const configFile = './configfile';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        const stubGetFromProp = sinon.stub(config, 'getConfigFromPkgJsonProp');
        const stubHierarchy = sinon.stub(config, 'getProjectHierarchyConfig');
        const stubCli = sinon.stub(config, 'loadCliSpecifiedCfgFile');
        const stubUserHome = sinon.stub(config, 'getUserHomeConfig');

        stubGetFromProp.returns({rules: {'version-type': 'error'}});
        stubHierarchy.returns({rules: {'require-version': 'error'}});
        stubCli.returns({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'version-type': 'error',
            'require-version': 'error',
            'require-name': 'error'
          }
        };
        const filePath = './.npmpackagejsonlintrc.json';
        const result = config.get(filePath);

        stubGetFromProp.calledOnce.should.be.true;
        stubGetFromProp.firstCall.calledWithExactly(filePath).should.be.true;

        stubHierarchy.calledOnce.should.be.true;
        stubHierarchy.firstCall.calledWithExactly(filePath).should.be.true;

        stubCli.calledOnce.should.be.true;
        stubCli.firstCall.calledWithExactly(configFile).should.be.true;

        stubUserHome.notCalled.should.be.true;

        result.should.deep.equal(expectedConfigObj);

        config.getConfigFromPkgJsonProp.restore();
        config.getProjectHierarchyConfig.restore();
        config.loadCliSpecifiedCfgFile.restore();
        config.getUserHomeConfig.restore();
      });
    });

    context('when no rules exist in package.json, hierarchy, and cli', function() {
      it('a config object should returned from user home', function() {
        const configFile = './configfile';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        const stubGetFromProp = sinon.stub(config, 'getConfigFromPkgJsonProp');
        const stubHierarchy = sinon.stub(config, 'getProjectHierarchyConfig');
        const stubCli = sinon.stub(config, 'loadCliSpecifiedCfgFile');
        const stubUserHome = sinon.stub(config, 'getUserHomeConfig');

        stubGetFromProp.returns({rules: {}});
        stubHierarchy.returns({rules: {}});
        stubCli.returns({rules: {}});
        stubUserHome.returns({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'require-name': 'error'
          }
        };
        const filePath = './.npmpackagejsonlintrc.json';
        const result = config.get(filePath);

        stubGetFromProp.calledOnce.should.be.true;
        stubGetFromProp.firstCall.calledWithExactly(filePath).should.be.true;

        stubHierarchy.calledOnce.should.be.true;
        stubHierarchy.firstCall.calledWithExactly(filePath).should.be.true;

        stubCli.calledOnce.should.be.true;
        stubCli.firstCall.calledWithExactly(configFile).should.be.true;

        stubUserHome.calledOnce.should.be.true;

        result.should.deep.equal(expectedConfigObj);

        config.getConfigFromPkgJsonProp.restore();
        config.getProjectHierarchyConfig.restore();
        config.loadCliSpecifiedCfgFile.restore();
        config.getUserHomeConfig.restore();
      });
    });

    context('when project hierarchy exists, but useConfigFiles is off', function() {
      it('a config object should returned with all rules', function() {
        const configFile = './configfile';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: false,
          rules: {
            'require-scripts': 'error'
          }
        };
        const config = new Config(options, linterContext);

        const stubGetFromProp = sinon.stub(config, 'getConfigFromPkgJsonProp');
        const stubHierarchy = sinon.stub(config, 'getProjectHierarchyConfig');
        const stubCli = sinon.stub(config, 'loadCliSpecifiedCfgFile');
        const stubUserHome = sinon.stub(config, 'getUserHomeConfig');

        stubGetFromProp.returns({rules: {}});
        stubHierarchy.returns({rules: {'require-version': 'error'}});
        stubCli.returns({rules: {}});

        const expectedConfigObj = {
          rules: {
            'require-scripts': 'error'
          }
        };
        const filePath = './.npmpackagejsonlintrc.json';
        const result = config.get(filePath);

        stubGetFromProp.calledOnce.should.be.true;
        stubGetFromProp.firstCall.calledWithExactly(filePath).should.be.true;

        stubHierarchy.notCalled.should.be.true;

        stubCli.calledOnce.should.be.true;
        stubCli.firstCall.calledWithExactly(configFile).should.be.true;

        stubUserHome.notCalled.should.be.true;

        result.should.deep.equal(expectedConfigObj);

        config.getConfigFromPkgJsonProp.restore();
        config.getProjectHierarchyConfig.restore();
        config.loadCliSpecifiedCfgFile.restore();
        config.getUserHomeConfig.restore();
      });
    });
  });

  context('getConfigFromPkgJsonProp method tests', function() {
    it('loadFromPackageJson should be called', function() {
      const configFile = './configfile';
      const options = {
        configFile,
        cwd: process.cwd(),
        useConfigFiles: true,
        rules: {
          'require-scripts': 'error'
        }
      };
      const config = new Config(options, linterContext);

      const stub = sinon.stub(ConfigFile, 'loadFromPackageJson');

      stub.returns('a');

      const expected = 'a';
      const filePath = './.npmpackagejsonlintrc.json';
      const result = config.getConfigFromPkgJsonProp(filePath);

      stub.calledOnce.should.be.true;
      stub.firstCall.calledWithExactly(filePath, config).should.be.true;

      result.should.equal(expected);

      ConfigFile.loadFromPackageJson.restore();
    });
  });

  context('loadCliSpecifiedCfgFile method tests', function() {
    it('no passed config, empty config object should be returned', function() {
      const configFile = '';
      const options = {
        configFile,
        cwd: '/dummy/cwd',
        useConfigFiles: true,
        rules: {
          'require-scripts': 'error'
        }
      };
      const config = new Config(options, linterContext);

      const stub = sinon.stub(ConfigFile, 'load');

      stub.returns('a');

      const expected = {rules: {}};
      const result = config.loadCliSpecifiedCfgFile(configFile);

      stub.notCalled.should.be.true;

      result.should.deep.equal(expected);

      ConfigFile.load.restore();
    });

    it('scoped module, config object should be returned', function() {
      const configFile = '@myscope/npm-package-json-lint-config-awesome';
      const options = {
        configFile,
        cwd: '/dummy/cwd',
        useConfigFiles: true,
        rules: {
          'require-scripts': 'error'
        }
      };
      const config = new Config(options, linterContext);

      const stub = sinon.stub(ConfigFile, 'load');

      stub.returns('a');

      const expected = 'a';
      const result = config.loadCliSpecifiedCfgFile(configFile);

      stub.calledOnce.should.be.true;
      stub.firstCall.calledWithExactly(configFile, config).should.be.true;

      result.should.equal(expected);

      ConfigFile.load.restore();
    });

    it('with resolvable module, config object should be returned', function() {
      const configFile = 'eslint-config-tc';
      const options = {
        configFile,
        cwd: process.cwd(),
        useConfigFiles: true,
        rules: {
          'require-scripts': 'error'
        }
      };
      const config = new Config(options, linterContext);
      const stub = sinon.stub(ConfigFile, 'load');

      stub.returns('a');

      const expected = 'a';
      const result = config.loadCliSpecifiedCfgFile(configFile);

      stub.calledOnce.should.be.true;
      stub.firstCall.calledWithExactly(configFile, config).should.be.true;

      result.should.equal(expected);

      ConfigFile.load.restore();
    });

    it('with real local file, config object should be returned', function() {
      const configFile = './test/fixtures/valid/.npmpackagejsonlintrc.json';
      const options = {
        configFile,
        cwd: process.cwd(),
        useConfigFiles: true,
        rules: {
          'require-scripts': 'error'
        }
      };
      const config = new Config(options, linterContext);
      const stub = sinon.stub(ConfigFile, 'load');

      stub.returns('a');

      const expected = 'a';
      const result = config.loadCliSpecifiedCfgFile(configFile);

      stub.calledOnce.should.be.true;
      stub.firstCall.calledWithExactly(`${process.cwd()}/test/fixtures/valid/.npmpackagejsonlintrc.json`, config).should.be.true;

      result.should.equal(expected);

      ConfigFile.load.restore();
    });
  });
});
