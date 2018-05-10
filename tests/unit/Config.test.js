'use strict';

/* eslint max-lines: 'off', id-length: 'off' */

const fs = require('fs');
const os = require('os');
const path = require('path');
const chai = require('chai');
const sinon = require('sinon');
const isResolvable = require('is-resolvable');
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

        const stubHierarchy = sinon.stub(config, 'getProjectHierarchyConfig');
        const stubCli = sinon.stub(config, 'loadCliSpecifiedCfgFile');
        const stubUserHome = sinon.stub(config, 'getUserHomeConfig');

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

        stubHierarchy.calledOnce.should.be.true;
        stubHierarchy.firstCall.calledWithExactly(filePath).should.be.true;

        stubCli.calledOnce.should.be.true;
        stubCli.firstCall.calledWithExactly(configFile).should.be.true;

        stubUserHome.notCalled.should.be.true;

        result.should.deep.equal(expectedConfigObj);

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

        const stubHierarchy = sinon.stub(config, 'getProjectHierarchyConfig');
        const stubCli = sinon.stub(config, 'loadCliSpecifiedCfgFile');
        const stubUserHome = sinon.stub(config, 'getUserHomeConfig');

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

        stubHierarchy.calledOnce.should.be.true;
        stubHierarchy.firstCall.calledWithExactly(filePath).should.be.true;

        stubCli.calledOnce.should.be.true;
        stubCli.firstCall.calledWithExactly(configFile).should.be.true;

        stubUserHome.notCalled.should.be.true;

        result.should.deep.equal(expectedConfigObj);

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

        const stubHierarchy = sinon.stub(config, 'getProjectHierarchyConfig');
        const stubCli = sinon.stub(config, 'loadCliSpecifiedCfgFile');
        const stubUserHome = sinon.stub(config, 'getUserHomeConfig');

        stubHierarchy.returns({rules: {}});
        stubCli.returns({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'require-name': 'error',
            'require-scripts': 'error'
          }
        };
        const filePath = './.npmpackagejsonlintrc.json';
        const result = config.get(filePath);

        stubHierarchy.calledOnce.should.be.true;
        stubHierarchy.firstCall.calledWithExactly(filePath).should.be.true;

        stubCli.calledOnce.should.be.true;
        stubCli.firstCall.calledWithExactly(configFile).should.be.true;

        stubUserHome.notCalled.should.be.true;

        result.should.deep.equal(expectedConfigObj);

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

        const stubHierarchy = sinon.stub(config, 'getProjectHierarchyConfig');
        const stubCli = sinon.stub(config, 'loadCliSpecifiedCfgFile');
        const stubUserHome = sinon.stub(config, 'getUserHomeConfig');

        stubHierarchy.returns({rules: {'require-version': 'error'}});
        stubCli.returns({rules: {}});

        const expectedConfigObj = {
          rules: {
            'require-version': 'error',
            'require-scripts': 'error'
          }
        };
        const filePath = './.npmpackagejsonlintrc.json';
        const result = config.get(filePath);

        stubHierarchy.calledOnce.should.be.true;
        stubHierarchy.firstCall.calledWithExactly(filePath).should.be.true;

        stubCli.calledOnce.should.be.true;
        stubCli.firstCall.calledWithExactly(configFile).should.be.true;

        stubUserHome.notCalled.should.be.true;

        result.should.deep.equal(expectedConfigObj);

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

        const stubHierarchy = sinon.stub(config, 'getProjectHierarchyConfig');
        const stubCli = sinon.stub(config, 'loadCliSpecifiedCfgFile');
        const stubUserHome = sinon.stub(config, 'getUserHomeConfig');

        stubHierarchy.returns({rules: {'require-version': 'error'}});
        stubCli.returns({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'require-version': 'error',
            'require-name': 'error'
          }
        };
        const filePath = './.npmpackagejsonlintrc.json';
        const result = config.get(filePath);

        stubHierarchy.calledOnce.should.be.true;
        stubHierarchy.firstCall.calledWithExactly(filePath).should.be.true;

        stubCli.calledOnce.should.be.true;
        stubCli.firstCall.calledWithExactly(configFile).should.be.true;

        stubUserHome.notCalled.should.be.true;

        result.should.deep.equal(expectedConfigObj);

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

        const stubHierarchy = sinon.stub(config, 'getProjectHierarchyConfig');
        const stubCli = sinon.stub(config, 'loadCliSpecifiedCfgFile');
        const stubUserHome = sinon.stub(config, 'getUserHomeConfig');

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

        stubHierarchy.calledOnce.should.be.true;
        stubHierarchy.firstCall.calledWithExactly(filePath).should.be.true;

        stubCli.calledOnce.should.be.true;
        stubCli.firstCall.calledWithExactly(configFile).should.be.true;

        stubUserHome.calledOnce.should.be.true;

        result.should.deep.equal(expectedConfigObj);

        config.getProjectHierarchyConfig.restore();
        config.loadCliSpecifiedCfgFile.restore();
        config.getUserHomeConfig.restore();
      });
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

  context('loadCliSpecifiedCfgFile method tests', function() {
    context('when called without config object', function() {
      it('an empty config object should returned', function() {
        const configFile = '';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        const stub = sinon.stub(ConfigFile, 'load');

        const expectedConfigObj = {
          rules: {}
        };
        const result = config.loadCliSpecifiedCfgFile(config.options.configFile);

        stub.notCalled.should.be.true;

        result.should.deep.equal(expectedConfigObj);

        ConfigFile.load.restore();
      });
    });

    context('when called with config file path that is resolvable', function() {
      it('the config object should returned', function() {
        const configFile = 'eslint-config-tc';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        const stubLoad = sinon.stub(ConfigFile, 'load');

        stubLoad.returns({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'require-name': 'error'
          }
        };
        const result = config.loadCliSpecifiedCfgFile(config.options.configFile);

        stubLoad.calledOnce.should.be.true;
        stubLoad.firstCall.calledWithExactly(configFile, config).should.be.true;

        result.should.deep.equal(expectedConfigObj);

        ConfigFile.load.restore();
      });
    });

    context('when called with config file path starts with @', function() {
      it('the config object should returned', function() {
        const configFile = '@tclindner/eslint-config-tc';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        const stubLoad = sinon.stub(ConfigFile, 'load');

        stubLoad.returns({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'require-name': 'error'
          }
        };
        const result = config.loadCliSpecifiedCfgFile(config.options.configFile);

        stubLoad.calledOnce.should.be.true;
        stubLoad.firstCall.calledWithExactly(configFile, config).should.be.true;

        result.should.deep.equal(expectedConfigObj);

        ConfigFile.load.restore();
      });
    });

    context('when called with config file path is not resolvable and does not start with @', function() {
      it('the config object should returned', function() {
        const configFile = 'npm-package-json-lint-config-my-awesome-config';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        const stubLoad = sinon.stub(ConfigFile, 'load');

        stubLoad.returns({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'require-name': 'error'
          }
        };
        const result = config.loadCliSpecifiedCfgFile(config.options.configFile);

        stubLoad.calledOnce.should.be.true;
        stubLoad.firstCall.calledWithExactly(`${config.options.cwd}/${configFile}`, config).should.be.true;

        result.should.deep.equal(expectedConfigObj);

        ConfigFile.load.restore();
      });
    });
  });

  context('getUserHomeConfig method tests', function() {
    context('when called and personalConfig cache exists', function() {
      it('the peronalConfig object should be returned returned', function() {
        const configFile = '';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        config.personalConfig = {
          rules: {
            'required-name': 'error'
          }
        };

        const stubExists = sinon.stub(fs, 'existsSync');

        const expectedConfigObj = {
          rules: {
            'required-name': 'error'
          }
        };

        const result = config.getUserHomeConfig();

        stubExists.notCalled.should.be.true;

        result.should.deep.equal(expectedConfigObj);

        fs.existsSync.restore();
      });
    });

    context('when called and personalConfig cache does not exist', function() {
      it('and rc file does, the config object should returned', function() {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        const stubExists = sinon.stub(fs, 'existsSync');
        const stubStats = sinon.stub(fs, 'statSync');
        const stubHome = sinon.stub(os, 'homedir');
        const stubLoad = sinon.stub(ConfigFile, 'load');

        stubExists.returns(true);
        stubStats.returns({
          isFile: function() {
            return true;
          }
        });
        stubHome.returns('/home/');
        stubLoad.returns({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'require-name': 'error'
          }
        };
        const result = config.getUserHomeConfig();

        stubExists.calledOnce.should.be.true;
        stubExists.firstCall.calledWithExactly('/home/.npmpackagejsonlintrc.json').should.be.true;

        stubStats.calledOnce.should.be.true;
        stubStats.firstCall.calledWithExactly('/home/.npmpackagejsonlintrc.json').should.be.true;

        stubHome.calledOnce.should.be.true;

        stubLoad.calledOnce.should.be.true;
        stubLoad.firstCall.calledWithExactly('/home/.npmpackagejsonlintrc.json', config).should.be.true;

        result.should.deep.equal(expectedConfigObj);
        config.personalConfig.should.deep.equal(expectedConfigObj);

        fs.existsSync.restore();
        fs.statSync.restore();
        os.homedir.restore();
        ConfigFile.load.restore();
      });

      it('and rc file does not, JavaScript config does, the config object should returned', function() {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        const stubExists = sinon.stub(fs, 'existsSync');
        const stubStats = sinon.stub(fs, 'statSync');
        const stubHome = sinon.stub(os, 'homedir');
        const stubLoad = sinon.stub(ConfigFile, 'load');

        stubExists.onCall(0).returns(false);
        stubExists.onCall(1).returns(true);
        stubStats.returns({
          isFile: function() {
            return true;
          }
        });
        stubHome.returns('/home/');
        stubLoad.returns({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'require-name': 'error'
          }
        };
        const result = config.getUserHomeConfig();

        stubExists.calledTwice.should.be.true;
        stubExists.firstCall.calledWithExactly('/home/.npmpackagejsonlintrc.json').should.be.true;
        stubExists.secondCall.calledWithExactly('/home/npmpackagejsonlint.config.js').should.be.true;

        stubStats.calledOnce.should.be.true;
        stubStats.firstCall.calledWithExactly('/home/npmpackagejsonlint.config.js').should.be.true;

        stubHome.calledOnce.should.be.true;

        stubLoad.calledOnce.should.be.true;
        stubLoad.firstCall.calledWithExactly('/home/npmpackagejsonlint.config.js', config).should.be.true;

        result.should.deep.equal(expectedConfigObj);
        config.personalConfig.should.deep.equal(expectedConfigObj);

        fs.existsSync.restore();
        fs.statSync.restore();
        os.homedir.restore();
        ConfigFile.load.restore();
      });

      it('and rc/js config files do not exist, empty object should returned', function() {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        const stubExists = sinon.stub(fs, 'existsSync');
        const stubStats = sinon.stub(fs, 'statSync');
        const stubHome = sinon.stub(os, 'homedir');
        const stubLoad = sinon.stub(ConfigFile, 'load');

        stubExists.returns(false);
        stubHome.returns('/home/');

        const expectedConfigObj = {};
        const result = config.getUserHomeConfig();

        stubExists.calledTwice.should.be.true;
        stubExists.firstCall.calledWithExactly('/home/.npmpackagejsonlintrc.json').should.be.true;
        stubExists.secondCall.calledWithExactly('/home/npmpackagejsonlint.config.js').should.be.true;

        stubStats.notCalled.should.be.true;

        stubHome.calledOnce.should.be.true;

        stubLoad.notCalled.should.be.true;

        result.should.deep.equal(expectedConfigObj);
        config.personalConfig.should.deep.equal(expectedConfigObj);

        fs.existsSync.restore();
        fs.statSync.restore();
        os.homedir.restore();
        ConfigFile.load.restore();
      });
    });
  });

  context('getProjectHierarchyConfig method tests', function() {
    context('when called', function() {
      it('and package.json prop exists and is root, the config object should returned', function() {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        const stubDirname = sinon.stub(path, 'dirname');
        const stubExists = sinon.stub(fs, 'existsSync');
        const stubStats = sinon.stub(fs, 'statSync');
        const stubLoadPkgJson = sinon.stub(ConfigFile, 'loadFromPackageJson');
        const stubLoad = sinon.stub(ConfigFile, 'load');

        stubDirname.returns('./npm-package-json-lint/');
        stubExists.returns(true);
        stubStats.returns({
          isFile: function() {
            return true;
          }
        });
        stubLoadPkgJson.returns({root: true, rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          root: true,
          rules: {
            'require-name': 'error'
          }
        };
        const filePath = './package.json';
        const result = config.getProjectHierarchyConfig(filePath);

        stubDirname.calledOnce.should.be.true;
        stubDirname.firstCall.calledWithExactly(filePath).should.be.true;

        stubExists.calledOnce.should.be.true;
        stubExists.firstCall.calledWithExactly('npm-package-json-lint/package.json').should.be.true;

        stubStats.calledOnce.should.be.true;
        stubStats.firstCall.calledWithExactly('npm-package-json-lint/package.json').should.be.true;

        stubLoadPkgJson.calledOnce.should.be.true;
        stubLoadPkgJson.firstCall.calledWithExactly('npm-package-json-lint/package.json', config).should.be.true;

        stubLoad.notCalled.should.be.true;

        result.should.deep.equal(expectedConfigObj);

        path.dirname.restore();
        fs.existsSync.restore();
        fs.statSync.restore();
        ConfigFile.loadFromPackageJson.restore();
        ConfigFile.load.restore();
      });

      it('and package.json prop exists and has no prop, the config object should returned', function() {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        const stubDirname = sinon.stub(path, 'dirname');
        const stubExists = sinon.stub(fs, 'existsSync');
        const stubStats = sinon.stub(fs, 'statSync');
        const stubLoadPkgJson = sinon.stub(ConfigFile, 'loadFromPackageJson');
        const stubLoad = sinon.stub(ConfigFile, 'load');

        stubDirname.returns('./npm-package-json-lint/');
        stubExists.returns(true);
        stubStats.returns({
          isFile: function() {
            return true;
          }
        });
        stubLoadPkgJson.returns({root: true, rules: {}});
        stubLoad.returns({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'require-name': 'error'
          }
        };
        const filePath = './package.json';
        const result = config.getProjectHierarchyConfig(filePath);

        stubDirname.calledOnce.should.be.true;
        stubDirname.firstCall.calledWithExactly(filePath).should.be.true;

        stubExists.calledTwice.should.be.true;
        stubExists.firstCall.calledWithExactly('npm-package-json-lint/package.json').should.be.true;
        stubExists.secondCall.calledWithExactly('npm-package-json-lint/.npmpackagejsonlintrc.json').should.be.true;

        stubStats.calledTwice.should.be.true;
        stubStats.firstCall.calledWithExactly('npm-package-json-lint/package.json').should.be.true;
        stubStats.secondCall.calledWithExactly('npm-package-json-lint/.npmpackagejsonlintrc.json').should.be.true;

        stubLoadPkgJson.calledOnce.should.be.true;
        stubLoadPkgJson.firstCall.calledWithExactly('npm-package-json-lint/package.json', config).should.be.true;

        stubLoad.calledOnce.should.be.true;
        stubLoad.firstCall.calledWithExactly('npm-package-json-lint/.npmpackagejsonlintrc.json', config).should.be.true;

        result.should.deep.equal(expectedConfigObj);

        path.dirname.restore();
        fs.existsSync.restore();
        fs.statSync.restore();
        ConfigFile.loadFromPackageJson.restore();
        ConfigFile.load.restore();
      });

      it('and rc file does and is root, the config object should returned', function() {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        const stubDirname = sinon.stub(path, 'dirname');
        const stubExists = sinon.stub(fs, 'existsSync');
        const stubStats = sinon.stub(fs, 'statSync');
        const stubLoadPkgJson = sinon.stub(ConfigFile, 'loadFromPackageJson');
        const stubLoad = sinon.stub(ConfigFile, 'load');

        stubDirname.returns('./npm-package-json-lint/');
        stubExists.onCall(0).returns(false);
        stubExists.onCall(1).returns(true);
        stubStats.returns({
          isFile: function() {
            return true;
          }
        });
        stubLoad.returns({root: true, rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          root: true,
          rules: {
            'require-name': 'error'
          }
        };
        const filePath = './package.json';
        const result = config.getProjectHierarchyConfig(filePath);

        stubDirname.calledOnce.should.be.true;
        stubDirname.firstCall.calledWithExactly(filePath).should.be.true;

        stubExists.calledTwice.should.be.true;
        stubExists.firstCall.calledWithExactly('npm-package-json-lint/package.json').should.be.true;
        stubExists.secondCall.calledWithExactly('npm-package-json-lint/.npmpackagejsonlintrc.json').should.be.true;

        stubStats.calledOnce.should.be.true;
        stubStats.firstCall.calledWithExactly('npm-package-json-lint/.npmpackagejsonlintrc.json').should.be.true;

        stubLoadPkgJson.notCalled.should.be.true;

        stubLoad.calledOnce.should.be.true;
        stubLoad.firstCall.calledWithExactly('npm-package-json-lint/.npmpackagejsonlintrc.json', config).should.be.true;

        result.should.deep.equal(expectedConfigObj);

        path.dirname.restore();
        fs.existsSync.restore();
        fs.statSync.restore();
        ConfigFile.loadFromPackageJson.restore();
        ConfigFile.load.restore();
      });

      it('and rc file does and is not root, the config object should returned', function() {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        const stubDirname = sinon.stub(path, 'dirname');
        const stubExists = sinon.stub(fs, 'existsSync');
        const stubStats = sinon.stub(fs, 'statSync');
        const stubLoadPkgJson = sinon.stub(ConfigFile, 'loadFromPackageJson');
        const stubLoad = sinon.stub(ConfigFile, 'load');

        stubDirname.onCall(0).returns('./npm-package-json-lint/');
        stubDirname.onCall(1).returns('./npm-package-json-lint/');
        stubDirname.onCall(2).returns('/home/');
        stubExists.onCall(0).returns(false);
        stubExists.onCall(1).returns(true);
        stubExists.onCall(2).returns(false);
        stubExists.onCall(3).returns(true);
        stubStats.returns({
          isFile: function() {
            return true;
          }
        });

        stubLoadPkgJson.returns({rules: {}});
        stubLoad.onCall(0).returns({root: false, rules: {'require-name': 'error'}});
        stubLoad.onCall(1).returns({root: false, rules: {'require-version': 'error', 'require-name': 'warning'}});

        const expectedConfigObj = {
          root: false,
          rules: {
            'require-name': 'error',
            'require-version': 'error'
          }
        };
        const filePath = './package.json';
        const result = config.getProjectHierarchyConfig(filePath);

        stubDirname.calledThrice.should.be.true;
        stubDirname.firstCall.calledWithExactly(filePath).should.be.true;

        stubExists.callCount.should.equal(4);
        stubExists.firstCall.calledWithExactly('npm-package-json-lint/package.json').should.be.true;
        stubExists.secondCall.calledWithExactly('npm-package-json-lint/.npmpackagejsonlintrc.json').should.be.true;
        stubExists.thirdCall.calledWithExactly('npm-package-json-lint/package.json').should.be.true;

        stubStats.calledTwice.should.be.true;
        stubStats.firstCall.calledWithExactly('npm-package-json-lint/.npmpackagejsonlintrc.json').should.be.true;

        stubLoad.calledTwice.should.be.true;
        stubLoad.firstCall.calledWithExactly('npm-package-json-lint/.npmpackagejsonlintrc.json', config).should.be.true;

        result.should.deep.equal(expectedConfigObj);

        path.dirname.restore();
        fs.existsSync.restore();
        fs.statSync.restore();
        ConfigFile.loadFromPackageJson.restore();
        ConfigFile.load.restore();
      });

      it('and rc file does not, JavaScript config does and is root, the config object should returned', function() {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        const stubDirname = sinon.stub(path, 'dirname');
        const stubExists = sinon.stub(fs, 'existsSync');
        const stubStats = sinon.stub(fs, 'statSync');
        const stubLoadPkgJson = sinon.stub(ConfigFile, 'loadFromPackageJson');
        const stubLoad = sinon.stub(ConfigFile, 'load');

        stubDirname.returns('./npm-package-json-lint/');
        stubExists.onCall(0).returns(false);
        stubExists.onCall(1).returns(false);
        stubExists.onCall(2).returns(true);
        stubStats.returns({
          isFile: function() {
            return true;
          }
        });
        stubLoad.returns({root: true, rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          root: true,
          rules: {
            'require-name': 'error'
          }
        };
        const filePath = './package.json';
        const result = config.getProjectHierarchyConfig(filePath);

        stubDirname.calledOnce.should.be.true;
        stubDirname.firstCall.calledWithExactly(filePath).should.be.true;

        stubExists.calledThrice.should.be.true;
        stubExists.firstCall.calledWithExactly('npm-package-json-lint/package.json').should.be.true;
        stubExists.secondCall.calledWithExactly('npm-package-json-lint/.npmpackagejsonlintrc.json').should.be.true;
        stubExists.thirdCall.calledWithExactly('npm-package-json-lint/npmpackagejsonlint.config.js').should.be.true;

        stubStats.calledOnce.should.be.true;
        stubStats.firstCall.calledWithExactly('npm-package-json-lint/npmpackagejsonlint.config.js').should.be.true;

        stubLoadPkgJson.notCalled.should.be.true;

        stubLoad.calledOnce.should.be.true;
        stubLoad.firstCall.calledWithExactly('npm-package-json-lint/npmpackagejsonlint.config.js', config).should.be.true;

        result.should.deep.equal(expectedConfigObj);

        path.dirname.restore();
        fs.existsSync.restore();
        fs.statSync.restore();
        ConfigFile.loadFromPackageJson.restore();
        ConfigFile.load.restore();
      });

      it('and rc/js config files do not exist, empty object should returned', function() {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        const stubDirname = sinon.stub(path, 'dirname');
        const stubExists = sinon.stub(fs, 'existsSync');
        const stubStats = sinon.stub(fs, 'statSync');
        const stubLoadPkgJson = sinon.stub(ConfigFile, 'loadFromPackageJson');
        const stubLoad = sinon.stub(ConfigFile, 'load');

        stubDirname.returns('./npm-package-json-lint/');
        stubExists.returns(false);

        const expectedConfigObj = {
          rules: {}
        };
        const filePath = './package.json';
        const result = config.getProjectHierarchyConfig(filePath);

        stubDirname.calledOnce.should.be.true;
        stubDirname.firstCall.calledWithExactly(filePath).should.be.true;

        stubExists.calledThrice.should.be.true;
        stubExists.firstCall.calledWithExactly('npm-package-json-lint/package.json').should.be.true;
        stubExists.secondCall.calledWithExactly('npm-package-json-lint/.npmpackagejsonlintrc.json').should.be.true;
        stubExists.thirdCall.calledWithExactly('npm-package-json-lint/npmpackagejsonlint.config.js').should.be.true;

        stubStats.notCalled.should.be.true;

        stubLoadPkgJson.notCalled.should.be.true;

        stubLoad.notCalled.should.be.true;

        result.should.deep.equal(expectedConfigObj);

        path.dirname.restore();
        fs.existsSync.restore();
        fs.statSync.restore();
        ConfigFile.loadFromPackageJson.restore();
        ConfigFile.load.restore();
      });

      it('and pkg prop does not exist, config files do, but useConfigFiles is false, then empty config object should returned', function() {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: false,
          rules: {}
        };
        const config = new Config(options, linterContext);

        const stubDirname = sinon.stub(path, 'dirname');
        const stubExists = sinon.stub(fs, 'existsSync');
        const stubStats = sinon.stub(fs, 'statSync');
        const stubLoadPkgJson = sinon.stub(ConfigFile, 'loadFromPackageJson');
        const stubLoad = sinon.stub(ConfigFile, 'load');

        stubDirname.returns('./npm-package-json-lint/');
        stubExists.returns(true);
        stubStats.returns({
          isFile: function() {
            return true;
          }
        });
        stubLoadPkgJson.returns({rules: {}});
        stubLoad.returns({root: true, rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
          }
        };
        const filePath = './package.json';
        const result = config.getProjectHierarchyConfig(filePath);

        stubDirname.calledOnce.should.be.true;
        stubDirname.firstCall.calledWithExactly(filePath).should.be.true;

        stubExists.calledOnce.should.be.true;
        stubExists.firstCall.calledWithExactly('npm-package-json-lint/package.json').should.be.true;

        stubStats.calledOnce.should.be.true;
        stubStats.firstCall.calledWithExactly('npm-package-json-lint/package.json').should.be.true;

        stubLoadPkgJson.calledOnce.should.be.true;
        stubLoadPkgJson.firstCall.calledWithExactly('npm-package-json-lint/package.json', config).should.be.true;

        stubLoad.notCalled.should.be.true;

        result.should.deep.equal(expectedConfigObj);

        path.dirname.restore();
        fs.existsSync.restore();
        fs.statSync.restore();
        ConfigFile.loadFromPackageJson.restore();
        ConfigFile.load.restore();
      });
    });
  });
});
