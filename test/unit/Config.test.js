'use strict';

/* eslint max-lines: 'off', id-length: 'off' */

const fs = require('fs');
const os = require('os');
const path = require('path');
const Config = require('./../../src/Config');
const ConfigFile = require('./../../src/config/ConfigFile');
const NpmPackageJsonLint = require('./../../src/NpmPackageJsonLint');

const linterContext = new NpmPackageJsonLint();

describe('Config Unit Tests', function() {
  describe('get method tests', function() {
    describe('when each source has a different rule', function() {
      test('a config object should returned with all rules', function() {
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

        config.getProjectHierarchyConfig = jest.fn();
        config.loadCliSpecifiedCfgFile = jest.fn();
        config.getUserHomeConfig = jest.fn();

        config.getProjectHierarchyConfig.mockReturnValue({rules: {'require-version': 'error'}});
        config.loadCliSpecifiedCfgFile.mockReturnValue({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'require-version': 'error',
            'require-name': 'error',
            'require-scripts': 'error'
          }
        };
        const filePath = './.npmpackagejsonlintrc.json';
        const result = config.get(filePath);

        expect(config.getProjectHierarchyConfig).toHaveBeenCalledTimes(1);
        expect(config.getProjectHierarchyConfig).toHaveBeenCalledWith(filePath);

        expect(config.loadCliSpecifiedCfgFile).toHaveBeenCalledTimes(1);
        expect(config.loadCliSpecifiedCfgFile).toHaveBeenCalledWith(configFile);

        expect(config.getUserHomeConfig).not.toHaveBeenCalled();

        expect(result).toStrictEqual(expectedConfigObj);
      });
    });

    describe('when package.json property does not have rules', function() {
      test('a config object should returned with rules from other sources', function() {
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

        config.getProjectHierarchyConfig = jest.fn();
        config.loadCliSpecifiedCfgFile = jest.fn();
        config.getUserHomeConfig = jest.fn();

        config.getProjectHierarchyConfig.mockReturnValue({rules: {'require-version': 'error'}});
        config.loadCliSpecifiedCfgFile.mockReturnValue({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'require-version': 'error',
            'require-name': 'error',
            'require-scripts': 'error'
          }
        };
        const filePath = './.npmpackagejsonlintrc.json';
        const result = config.get(filePath);

        expect(config.getProjectHierarchyConfig).toHaveBeenCalledTimes(1);
        expect(config.getProjectHierarchyConfig).toHaveBeenCalledWith(filePath);

        expect(config.loadCliSpecifiedCfgFile).toHaveBeenCalledTimes(1);
        expect(config.loadCliSpecifiedCfgFile).toHaveBeenCalledWith(configFile);

        expect(config.getUserHomeConfig).not.toHaveBeenCalled();

        expect(result).toStrictEqual(expectedConfigObj);
      });
    });

    describe('when project hierarchy does not have rules', function() {
      test('a config object should returned with rules from other sources', function() {
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

        config.getProjectHierarchyConfig = jest.fn();
        config.loadCliSpecifiedCfgFile = jest.fn();
        config.getUserHomeConfig = jest.fn();

        config.getProjectHierarchyConfig.mockReturnValue({rules: {}});
        config.loadCliSpecifiedCfgFile.mockReturnValue({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'require-name': 'error',
            'require-scripts': 'error'
          }
        };
        const filePath = './.npmpackagejsonlintrc.json';
        const result = config.get(filePath);

        expect(config.getProjectHierarchyConfig).toHaveBeenCalledTimes(1);
        expect(config.getProjectHierarchyConfig).toHaveBeenCalledWith(filePath);

        expect(config.loadCliSpecifiedCfgFile).toHaveBeenCalledTimes(1);
        expect(config.loadCliSpecifiedCfgFile).toHaveBeenCalledWith(configFile);

        expect(config.getUserHomeConfig).not.toHaveBeenCalled();

        expect(result).toStrictEqual(expectedConfigObj);
      });
    });

    describe('when cli specified config does not have rules', function() {
      test('a config object should returned with rules from other sources', function() {
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

        config.getProjectHierarchyConfig = jest.fn();
        config.loadCliSpecifiedCfgFile = jest.fn();
        config.getUserHomeConfig = jest.fn();

        config.getProjectHierarchyConfig.mockReturnValue({rules: {'require-version': 'error'}});
        config.loadCliSpecifiedCfgFile.mockReturnValue({rules: {}});

        const expectedConfigObj = {
          rules: {
            'require-version': 'error',
            'require-scripts': 'error'
          }
        };
        const filePath = './.npmpackagejsonlintrc.json';
        const result = config.get(filePath);

        expect(config.getProjectHierarchyConfig).toHaveBeenCalledTimes(1);
        expect(config.getProjectHierarchyConfig).toHaveBeenCalledWith(filePath);

        expect(config.loadCliSpecifiedCfgFile).toHaveBeenCalledTimes(1);
        expect(config.loadCliSpecifiedCfgFile).toHaveBeenCalledWith(configFile);

        expect(config.getUserHomeConfig).not.toHaveBeenCalled();

        expect(result).toStrictEqual(expectedConfigObj);
      });
    });

    describe('when cli specified rules does not exist', function() {
      test('a config object should returned with rules from other sources', function() {
        const configFile = './configfile';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        config.getProjectHierarchyConfig = jest.fn();
        config.loadCliSpecifiedCfgFile = jest.fn();
        config.getUserHomeConfig = jest.fn();

        config.getProjectHierarchyConfig.mockReturnValue({rules: {'require-version': 'error'}});
        config.loadCliSpecifiedCfgFile.mockReturnValue({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'require-version': 'error',
            'require-name': 'error'
          }
        };
        const filePath = './.npmpackagejsonlintrc.json';
        const result = config.get(filePath);

        expect(config.getProjectHierarchyConfig).toHaveBeenCalledTimes(1);
        expect(config.getProjectHierarchyConfig).toHaveBeenCalledWith(filePath);

        expect(config.loadCliSpecifiedCfgFile).toHaveBeenCalledTimes(1);
        expect(config.loadCliSpecifiedCfgFile).toHaveBeenCalledWith(configFile);

        expect(config.getUserHomeConfig).not.toHaveBeenCalled();

        expect(result).toStrictEqual(expectedConfigObj);
      });
    });

    describe('when no rules exist in package.json, hierarchy, and cli', function() {
      test('a config object should returned from user home', function() {
        const configFile = './configfile';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        config.getProjectHierarchyConfig = jest.fn();
        config.loadCliSpecifiedCfgFile = jest.fn();
        config.getUserHomeConfig = jest.fn();

        config.getProjectHierarchyConfig.mockReturnValue({rules: {}});
        config.loadCliSpecifiedCfgFile.mockReturnValue({rules: {}});
        config.getUserHomeConfig.mockReturnValue({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'require-name': 'error'
          }
        };
        const filePath = './.npmpackagejsonlintrc.json';
        const result = config.get(filePath);

        expect(config.getProjectHierarchyConfig).toHaveBeenCalledTimes(1);
        expect(config.getProjectHierarchyConfig).toHaveBeenCalledWith(filePath);

        expect(config.loadCliSpecifiedCfgFile).toHaveBeenCalledTimes(1);
        expect(config.loadCliSpecifiedCfgFile).toHaveBeenCalledWith(configFile);

        expect(config.getUserHomeConfig).toHaveBeenCalledTimes(1);

        expect(result).toStrictEqual(expectedConfigObj);
      });
    });
  });

  describe('loadCliSpecifiedCfgFile method tests', function() {
    test('no passed config, empty config object should be returned', function() {
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

      ConfigFile.load = jest.fn();

      ConfigFile.load.mockReturnValue('a');

      const expected = {rules: {}};
      const result = config.loadCliSpecifiedCfgFile(configFile);

      expect(ConfigFile.load).not.toHaveBeenCalled();

      expect(result).toStrictEqual(expected);
    });

    test('scoped module, config object should be returned', function() {
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

      ConfigFile.load = jest.fn();

      ConfigFile.load.mockReturnValue('a');

      const expected = 'a';
      const result = config.loadCliSpecifiedCfgFile(configFile);

      expect(ConfigFile.load).toHaveBeenCalledTimes(1);
      expect(ConfigFile.load).toHaveBeenCalledWith(configFile, config);

      expect(result).toStrictEqual(expected);
    });

    test('with resolvable module, config object should be returned', function() {
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
      ConfigFile.load = jest.fn();

      ConfigFile.load.mockReturnValue('a');

      const expected = 'a';
      const result = config.loadCliSpecifiedCfgFile(configFile);

      expect(ConfigFile.load).toHaveBeenCalledTimes(1);
      expect(ConfigFile.load).toHaveBeenCalledWith(configFile, config);

      expect(result).toStrictEqual(expected);
    });

    test('with real local file, config object should be returned', function() {
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
      ConfigFile.load = jest.fn();

      ConfigFile.load.mockReturnValue('a');

      const expected = 'a';
      const result = config.loadCliSpecifiedCfgFile(configFile);

      expect(ConfigFile.load).toHaveBeenCalledTimes(1);
      expect(ConfigFile.load).toHaveBeenCalledWith(`${process.cwd()}/test/fixtures/valid/.npmpackagejsonlintrc.json`, config);

      expect(result).toStrictEqual(expected);
    });
  });

  describe('loadCliSpecifiedCfgFile method tests', function() {
    describe('when called without config object', function() {
      test('an empty config object should returned', function() {
        const configFile = '';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        ConfigFile.load = jest.fn();

        const expectedConfigObj = {
          rules: {}
        };
        const result = config.loadCliSpecifiedCfgFile(config.options.configFile);

        expect(ConfigFile.load).not.toHaveBeenCalled();

        expect(result).toStrictEqual(expectedConfigObj);
      });
    });

    describe('when called with config file path that is resolvable', function() {
      test('the config object should returned', function() {
        const configFile = 'eslint-config-tc';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        ConfigFile.load = jest.fn();

        ConfigFile.load.mockReturnValue({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'require-name': 'error'
          }
        };
        const result = config.loadCliSpecifiedCfgFile(config.options.configFile);

        expect(ConfigFile.load).toHaveBeenCalledTimes(1);
        expect(ConfigFile.load).toHaveBeenCalledWith(configFile, config);

        expect(result).toStrictEqual(expectedConfigObj);
      });
    });

    describe('when called with config file path starts with @', function() {
      test('the config object should returned', function() {
        const configFile = '@tclindner/eslint-config-tc';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        ConfigFile.load = jest.fn();

        ConfigFile.load.mockReturnValue({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'require-name': 'error'
          }
        };
        const result = config.loadCliSpecifiedCfgFile(config.options.configFile);

        expect(ConfigFile.load).toHaveBeenCalledTimes(1);
        expect(ConfigFile.load).toHaveBeenCalledWith(configFile, config);

        expect(result).toStrictEqual(expectedConfigObj);
      });
    });

    describe('when called with config file path is not resolvable and does not start with @', function() {
      test('the config object should returned', function() {
        const configFile = 'npm-package-json-lint-config-my-awesome-config';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        ConfigFile.load = jest.fn();

        ConfigFile.load.mockReturnValue({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'require-name': 'error'
          }
        };
        const result = config.loadCliSpecifiedCfgFile(config.options.configFile);

        expect(ConfigFile.load).toHaveBeenCalledTimes(1);
        expect(ConfigFile.load).toHaveBeenCalledWith(`${config.options.cwd}/${configFile}`, config);

        expect(result).toStrictEqual(expectedConfigObj);
      });
    });
  });

  describe('getUserHomeConfig method tests', function() {
    describe('when called and personalConfig cache exists', function() {
      test('the peronalConfig object should be returned returned', function() {
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

        fs.existsSync = jest.fn();

        const expectedConfigObj = {
          rules: {
            'required-name': 'error'
          }
        };

        const result = config.getUserHomeConfig();

        expect(fs.existsSync).not.toHaveBeenCalled();

        expect(result).toStrictEqual(expectedConfigObj);
      });
    });

    describe('when called and personalConfig cache does not exist', function() {
      test('and rc file does, the config object should returned', function() {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        fs.existsSync = jest.fn();
        fs.statSync = jest.fn();
        os.homedir = jest.fn();
        ConfigFile.load = jest.fn();

        fs.existsSync.mockReturnValue(true);
        fs.statSync.mockReturnValue({
          isFile: function() {
            return true;
          }
        });
        os.homedir.mockReturnValue('/home/');
        ConfigFile.load.mockReturnValue({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'require-name': 'error'
          }
        };
        const result = config.getUserHomeConfig();

        expect(fs.existsSync).toHaveBeenCalledTimes(1);
        expect(fs.existsSync).toHaveBeenCalledWith('/home/.npmpackagejsonlintrc.json');

        expect(fs.statSync).toHaveBeenCalledTimes(1);
        expect(fs.statSync).toHaveBeenCalledWith('/home/.npmpackagejsonlintrc.json');

        expect(os.homedir).toHaveBeenCalledTimes(1);

        expect(ConfigFile.load).toHaveBeenCalledTimes(1);
        expect(ConfigFile.load).toHaveBeenCalledWith('/home/.npmpackagejsonlintrc.json', config);

        expect(result).toStrictEqual(expectedConfigObj);
        expect(config.personalConfig).toStrictEqual(expectedConfigObj);
      });

      test('and rc file does not, JavaScript config does, the config object should returned', function() {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        fs.existsSync = jest.fn();
        fs.statSync = jest.fn();
        os.homedir = jest.fn();
        ConfigFile.load = jest.fn();

        fs.existsSync
          .mockReturnValue(false)
          .mockReturnValue(true);
        fs.statSync.mockReturnValue({
          isFile: function() {
            return true;
          }
        });
        os.homedir.mockReturnValue('/home/');
        ConfigFile.load.mockReturnValue({rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
            'require-name': 'error'
          }
        };
        const result = config.getUserHomeConfig();

        expect(fs.existsSync).toHaveBeenCalledTimes(2);
        expect(fs.existsSync).toHaveBeenNthCalledWith(1, '/home/.npmpackagejsonlintrc.json');
        expect(fs.existsSync).toHaveBeenNthCalledWith(2, '/home/npmpackagejsonlint.config.js');

        expect(fs.statSync).toHaveBeenCalledTimes(1);
        expect(fs.statSync).toHaveBeenCalledWith('/home/npmpackagejsonlint.config.js');

        expect(os.homedir).toHaveBeenCalledTimes(1);

        expect(ConfigFile.load).toHaveBeenCalledTimes(1);
        expect(ConfigFile.load).toHaveBeenCalledWith('/home/npmpackagejsonlint.config.js', config);

        expect(result).toStrictEqual(expectedConfigObj);
        expect(config.personalConfig).toStrictEqual(expectedConfigObj);
      });

      test('and rc/js config files do not exist, empty object should returned', function() {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        fs.existsSync = jest.fn();
        fs.statSync = jest.fn();
        os.homedir = jest.fn();
        ConfigFile.load = jest.fn();

        fs.existsSync.mockReturnValue(false);
        os.homedir.mockReturnValue('/home/');

        const expectedConfigObj = {};
        const result = config.getUserHomeConfig();

        expect(fs.existsSync).toHaveBeenCalledTimes(2);
        expect(fs.existsSync).toHaveBeenNthCalledWith(1, '/home/.npmpackagejsonlintrc.json');
        expect(fs.existsSync).toHaveBeenNthCalledWith(2, '/home/npmpackagejsonlint.config.js');

        expect(fs.statSync).not.toHaveBeenCalled();

        expect(os.homedir).toHaveBeenCalledTimes(1);

        expect(ConfigFile.load).not.toHaveBeenCalled();

        expect(result).toStrictEqual(expectedConfigObj);
        expect(config.personalConfig).toStrictEqual(expectedConfigObj);
      });
    });
  });

  describe('getProjectHierarchyConfig method tests', function() {
    describe('when called', function() {
      test('and package.json prop exists and is root, the config object should returned', function() {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        path.dirname = jest.fn();
        fs.existsSync = jest.fn();
        fs.statSync = jest.fn();
        ConfigFile.loadFromPackageJson = jest.fn();
        ConfigFile.load = jest.fn();

        path.dirname.mockReturnValue('./npm-package-json-lint/');
        fs.existsSync.mockReturnValue(true);
        fs.statSync.mockReturnValue({
          isFile: function() {
            return true;
          }
        });
        ConfigFile.loadFromPackageJson.mockReturnValue({root: true, rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          root: true,
          rules: {
            'require-name': 'error'
          }
        };
        const filePath = './package.json';
        const result = config.getProjectHierarchyConfig(filePath);

        expect(path.dirname).toHaveBeenCalledTimes(1);
        expect(path.dirname).toHaveBeenCalledWith(filePath);

        expect(fs.existsSync).toHaveBeenCalledTimes(1);
        expect(fs.existsSync).toHaveBeenCalledWith('npm-package-json-lint/package.json');

        expect(fs.statSync).toHaveBeenCalledTimes(1);
        expect(fs.statSync).toHaveBeenCalledWith('npm-package-json-lint/package.json');

        expect(ConfigFile.loadFromPackageJson).toHaveBeenCalledTimes(1);
        expect(ConfigFile.loadFromPackageJson).toHaveBeenCalledWith('npm-package-json-lint/package.json', config);

        expect(ConfigFile.load).not.toHaveBeenCalled();

        expect(result).toStrictEqual(expectedConfigObj);
      });

      test('and package.json prop exists and root is not set, the config object should returned', function() {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: false,
          rules: {}
        };
        const config = new Config(options, linterContext);

        const expectedConfigObj = {
          root: true,
          rules: {
            'require-author': 'error',
            'version-format': 'error'
          }
        };
        const filePath = './tests/fixtures/hierarchyWithoutRoot/subdirectory/package.json';
        const result = config.getProjectHierarchyConfig(filePath);

        expect(result).toStrictEqual(expectedConfigObj);
      });

      test('and package.json prop exists and has no prop, the config object should returned', function() {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        path.dirname = jest.fn();
        fs.existsSync = jest.fn();
        fs.statSync = jest.fn();
        ConfigFile.loadFromPackageJson = jest.fn();
        ConfigFile.load = jest.fn();

        path.dirname.mockReturnValue('./npm-package-json-lint/');
        fs.existsSync.mockReturnValue(true);
        fs.statSync.mockReturnValue({
          isFile: function() {
            return true;
          }
        });
        ConfigFile.loadFromPackageJson.mockReturnValue({root: true, rules: {}});
        ConfigFile.load.mockReturnValue({root: true, rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          root: true,
          rules: {
            'require-name': 'error'
          }
        };
        const filePath = './package.json';
        const result = config.getProjectHierarchyConfig(filePath);

        expect(path.dirname).toHaveBeenCalledTimes(1);
        expect(path.dirname).toHaveBeenCalledWith(filePath);

        expect(fs.existsSync).toHaveBeenCalledTimes(2);
        expect(fs.existsSync).toHaveBeenNthCalledWith(1, 'npm-package-json-lint/package.json');
        expect(fs.existsSync).toHaveBeenNthCalledWith(2, 'npm-package-json-lint/.npmpackagejsonlintrc.json');

        expect(fs.statSync).toHaveBeenCalledTimes(2);
        expect(fs.statSync).toHaveBeenNthCalledWith(1, 'npm-package-json-lint/package.json');
        expect(fs.statSync).toHaveBeenNthCalledWith(2, 'npm-package-json-lint/.npmpackagejsonlintrc.json');

        expect(ConfigFile.loadFromPackageJson).toHaveBeenCalledTimes(1);
        expect(ConfigFile.loadFromPackageJson).toHaveBeenCalledWith('npm-package-json-lint/package.json', config);

        expect(ConfigFile.load).toHaveBeenCalledTimes(1);
        expect(ConfigFile.load).toHaveBeenCalledWith('npm-package-json-lint/.npmpackagejsonlintrc.json', config);

        expect(result).toStrictEqual(expectedConfigObj);
      });

      test('and rc file does and is root, the config object should returned', function() {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        path.dirname = jest.fn();
        fs.existsSync = jest.fn();
        fs.statSync = jest.fn();
        ConfigFile.loadFromPackageJson = jest.fn();
        ConfigFile.load = jest.fn();

        path.dirname.mockReturnValue('./npm-package-json-lint/');
        fs.existsSync
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(true);
        fs.statSync.mockReturnValue({
          isFile: function() {
            return true;
          }
        });
        ConfigFile.load.mockReturnValue({root: true, rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          root: true,
          rules: {
            'require-name': 'error'
          }
        };
        const filePath = './package.json';
        const result = config.getProjectHierarchyConfig(filePath);

        expect(path.dirname).toHaveBeenCalledTimes(1);
        expect(path.dirname).toHaveBeenCalledWith(filePath);

        expect(fs.existsSync).toHaveBeenCalledTimes(2);
        expect(fs.existsSync).toHaveBeenNthCalledWith(1, 'npm-package-json-lint/package.json');
        expect(fs.existsSync).toHaveBeenNthCalledWith(2, 'npm-package-json-lint/.npmpackagejsonlintrc.json');

        expect(fs.statSync).toHaveBeenCalledTimes(1);
        expect(fs.statSync).toHaveBeenCalledWith('npm-package-json-lint/.npmpackagejsonlintrc.json');

        expect(ConfigFile.loadFromPackageJson).not.toHaveBeenCalled();

        expect(ConfigFile.load).toHaveBeenCalledTimes(1);
        expect(ConfigFile.load).toHaveBeenCalledWith('npm-package-json-lint/.npmpackagejsonlintrc.json', config);

        expect(result).toStrictEqual(expectedConfigObj);
      });

      test('and rc file does and is not root, the config object should returned', function() {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        path.dirname = jest.fn();
        fs.existsSync = jest.fn();
        fs.statSync = jest.fn();
        ConfigFile.loadFromPackageJson = jest.fn();
        ConfigFile.load = jest.fn();

        path.dirname
          .mockReturnValueOnce('./npm-package-json-lint/')
          .mockReturnValueOnce('./npm-package-json-lint/')
          .mockReturnValueOnce('/home/');
        fs.existsSync
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(true)
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(true);
        fs.statSync.mockReturnValue({
          isFile: function() {
            return true;
          }
        });

        ConfigFile.loadFromPackageJson.mockReturnValue({rules: {}});
        ConfigFile.load
          .mockReturnValueOnce({root: false, rules: {'require-name': 'error'}})
          .mockReturnValueOnce({root: false, rules: {'require-version': 'error', 'require-name': 'warning'}});

        const expectedConfigObj = {
          root: false,
          rules: {
            'require-name': 'error',
            'require-version': 'error'
          }
        };
        const filePath = './package.json';
        const result = config.getProjectHierarchyConfig(filePath);

        expect(path.dirname).toHaveBeenCalledTimes(3);
        expect(path.dirname).toHaveBeenCalledWith(filePath);

        expect(fs.existsSync).toHaveBeenCalledTimes(4);
        expect(fs.existsSync).toHaveBeenNthCalledWith(1, 'npm-package-json-lint/package.json');
        expect(fs.existsSync).toHaveBeenNthCalledWith(2, 'npm-package-json-lint/.npmpackagejsonlintrc.json');
        expect(fs.existsSync).toHaveBeenNthCalledWith(3, 'npm-package-json-lint/package.json');

        expect(fs.statSync).toHaveBeenCalledTimes(2);
        expect(fs.statSync).toHaveBeenCalledWith('npm-package-json-lint/.npmpackagejsonlintrc.json');

        expect(ConfigFile.load).toHaveBeenCalledTimes(2);
        expect(ConfigFile.load).toHaveBeenCalledWith('npm-package-json-lint/.npmpackagejsonlintrc.json', config);

        expect(result).toStrictEqual(expectedConfigObj);
      });

      test('and rc file does not, JavaScript config does and is root, the config object should returned', function() {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        path.dirname = jest.fn();
        fs.existsSync = jest.fn();
        fs.statSync = jest.fn();
        ConfigFile.loadFromPackageJson = jest.fn();
        ConfigFile.load = jest.fn();

        path.dirname.mockReturnValue('./npm-package-json-lint/');
        fs.existsSync
          .mockReturnValueOnce(false)
          .mockReturnValue(false)
          .mockReturnValue(true);
        fs.statSync.mockReturnValue({
          isFile: function() {
            return true;
          }
        });
        ConfigFile.load.mockReturnValue({root: true, rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          root: true,
          rules: {
            'require-name': 'error'
          }
        };
        const filePath = './package.json';
        const result = config.getProjectHierarchyConfig(filePath);

        expect(path.dirname).toHaveBeenCalledTimes(1);
        expect(path.dirname).toHaveBeenCalledWith(filePath);

        expect(fs.existsSync).toHaveBeenCalledTimes(3);
        expect(fs.existsSync).toHaveBeenNthCalledWith(1, 'npm-package-json-lint/package.json');
        expect(fs.existsSync).toHaveBeenNthCalledWith(2, 'npm-package-json-lint/.npmpackagejsonlintrc.json');
        expect(fs.existsSync).toHaveBeenNthCalledWith(3, 'npm-package-json-lint/npmpackagejsonlint.config.js');

        expect(fs.statSync).toHaveBeenCalledTimes(1);
        expect(fs.statSync).toHaveBeenCalledWith('npm-package-json-lint/npmpackagejsonlint.config.js');

        expect(ConfigFile.loadFromPackageJson).not.toHaveBeenCalled();

        expect(ConfigFile.load).toHaveBeenCalledTimes(1);
        expect(ConfigFile.load).toHaveBeenCalledWith('npm-package-json-lint/npmpackagejsonlint.config.js', config);

        expect(result).toStrictEqual(expectedConfigObj);
      });

      test('and rc/js config files do not exist, empty object should returned', function() {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        path.dirname = jest.fn();
        fs.existsSync = jest.fn();
        fs.statSync = jest.fn();
        ConfigFile.loadFromPackageJson = jest.fn();
        ConfigFile.load = jest.fn();

        path.dirname
          .mockReturnValueOnce('./npm-package-json-lint/')
          .mockReturnValueOnce('/home');
        fs.existsSync.mockReturnValue(false);

        const expectedConfigObj = {
          rules: {}
        };
        const filePath = './package.json';
        const result = config.getProjectHierarchyConfig(filePath);

        expect(path.dirname).toHaveBeenCalledTimes(2);
        expect(path.dirname).toHaveBeenCalledWith(filePath);

        expect(fs.existsSync).toHaveBeenCalledTimes(3);
        expect(fs.existsSync).toHaveBeenNthCalledWith(1, 'npm-package-json-lint/package.json');
        expect(fs.existsSync).toHaveBeenNthCalledWith(2, 'npm-package-json-lint/.npmpackagejsonlintrc.json');
        expect(fs.existsSync).toHaveBeenNthCalledWith(3, 'npm-package-json-lint/npmpackagejsonlint.config.js');

        expect(fs.statSync).not.toHaveBeenCalled();

        expect(ConfigFile.loadFromPackageJson).not.toHaveBeenCalled();

        expect(ConfigFile.load).not.toHaveBeenCalled();

        expect(result).toStrictEqual(expectedConfigObj);
      });

      test('and pkg prop does not exist, config files do, but useConfigFiles is false, then empty config object should returned', function() {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: false,
          rules: {}
        };
        const config = new Config(options, linterContext);

        path.dirname = jest.fn();
        fs.existsSync = jest.fn();
        fs.statSync = jest.fn();
        ConfigFile.loadFromPackageJson = jest.fn();
        ConfigFile.load = jest.fn();

        path.dirname
          .mockReturnValueOnce('./npm-package-json-lint/')
          .mockReturnValueOnce('/home');
        fs.existsSync.mockReturnValue(true);
        fs.statSync.mockReturnValue({
          isFile: function() {
            return true;
          }
        });
        ConfigFile.loadFromPackageJson.mockReturnValue({rules: {}});
        ConfigFile.load.mockReturnValue({root: true, rules: {'require-name': 'error'}});

        const expectedConfigObj = {
          rules: {
          }
        };
        const filePath = './package.json';
        const result = config.getProjectHierarchyConfig(filePath);

        expect(path.dirname).toHaveBeenCalledTimes(2);
        expect(path.dirname).toHaveBeenCalledWith(filePath);

        expect(fs.existsSync).toHaveBeenCalledTimes(1);
        expect(fs.existsSync).toHaveBeenCalledWith('npm-package-json-lint/package.json');

        expect(fs.statSync).toHaveBeenCalledTimes(1);
        expect(fs.statSync).toHaveBeenCalledWith('npm-package-json-lint/package.json');

        expect(ConfigFile.loadFromPackageJson).toHaveBeenCalledTimes(1);
        expect(ConfigFile.loadFromPackageJson).toHaveBeenCalledWith('npm-package-json-lint/package.json', config);

        expect(ConfigFile.load).not.toHaveBeenCalled();

        expect(result).toStrictEqual(expectedConfigObj);
      });
    });
  });
});
