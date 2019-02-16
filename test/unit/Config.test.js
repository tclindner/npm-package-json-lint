/* eslint max-lines: 'off', id-length: 'off' */

const fs = require('fs');
const os = require('os');
const path = require('path');
const Config = require('./../../src/Config');
const ConfigFile = require('./../../src/config/ConfigFile');

const linterContext = {};
jest.mock('os');
jest.mock('./../../src/config/ConfigValidator');

describe('Config Unit Tests', () => {
  describe('get method tests', () => {
    describe('when each source has a different rule', () => {
      test('a config object should returned with all rules', () => {
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

        jest.spyOn(config, 'getProjectHierarchyConfig').mockReturnValue({rules: {'require-version': 'error'}});
        jest.spyOn(config, 'loadCliSpecifiedCfgFile').mockReturnValue({rules: {'require-name': 'error'}});
        jest.spyOn(config, 'getUserHomeConfig');

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

    describe('when package.json property does not have rules', () => {
      test('a config object should returned with rules from other sources', () => {
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

        jest.spyOn(config, 'getProjectHierarchyConfig').mockReturnValue({rules: {'require-version': 'error'}});
        jest.spyOn(config, 'loadCliSpecifiedCfgFile').mockReturnValue({rules: {'require-name': 'error'}});
        jest.spyOn(config, 'getUserHomeConfig');

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

    describe('when project hierarchy does not have rules', () => {
      test('a config object should returned with rules from other sources', () => {
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

        jest.spyOn(config, 'getProjectHierarchyConfig').mockReturnValue({rules: {}});
        jest.spyOn(config, 'loadCliSpecifiedCfgFile').mockReturnValue({rules: {'require-name': 'error'}});
        jest.spyOn(config, 'getUserHomeConfig');

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

    describe('when cli specified config does not have rules', () => {
      test('a config object should returned with rules from other sources', () => {
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

        jest.spyOn(config, 'getProjectHierarchyConfig').mockReturnValue({rules: {'require-version': 'error'}});
        jest.spyOn(config, 'loadCliSpecifiedCfgFile').mockReturnValue({rules: {}});
        jest.spyOn(config, 'getUserHomeConfig');

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

    describe('when cli specified rules does not exist', () => {
      test('a config object should returned with rules from other sources', () => {
        const configFile = './configfile';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        jest.spyOn(config, 'getProjectHierarchyConfig').mockReturnValue({rules: {'require-version': 'error'}});
        jest.spyOn(config, 'loadCliSpecifiedCfgFile').mockReturnValue({rules: {'require-name': 'error'}});
        jest.spyOn(config, 'getUserHomeConfig');

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

    describe('when no rules exist in package.json, hierarchy, and cli', () => {
      test('a config object should returned from user home', () => {
        const configFile = './configfile';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        jest.spyOn(config, 'getProjectHierarchyConfig').mockReturnValue({rules: {}});
        jest.spyOn(config, 'loadCliSpecifiedCfgFile').mockReturnValue({rules: {}});
        jest.spyOn(config, 'getUserHomeConfig').mockReturnValue({rules: {'require-name': 'error'}});

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

  describe('loadCliSpecifiedCfgFile method tests', () => {
    test('no passed config, empty config object should be returned', () => {
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

      jest.spyOn(ConfigFile, 'load').mockReturnValue('a');

      const expected = {rules: {}};
      const result = config.loadCliSpecifiedCfgFile(configFile);

      expect(ConfigFile.load).not.toHaveBeenCalled();

      expect(result).toStrictEqual(expected);
    });

    test('scoped module, config object should be returned', () => {
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

      jest.spyOn(ConfigFile, 'load').mockReturnValue('a');

      const expected = 'a';
      const result = config.loadCliSpecifiedCfgFile(configFile);

      expect(ConfigFile.load).toHaveBeenCalledTimes(1);
      expect(ConfigFile.load).toHaveBeenCalledWith(configFile, config);

      expect(result).toStrictEqual(expected);
    });

    test('with resolvable module, config object should be returned', () => {
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
      jest.spyOn(ConfigFile, 'load').mockReturnValue('a');

      const expected = 'a';
      const result = config.loadCliSpecifiedCfgFile(configFile);

      expect(ConfigFile.load).toHaveBeenCalledTimes(1);
      expect(ConfigFile.load).toHaveBeenCalledWith(configFile, config);

      expect(result).toStrictEqual(expected);
    });

    test('with real local file, config object should be returned', () => {
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
      jest.spyOn(ConfigFile, 'load').mockReturnValue('a');

      const expected = 'a';
      const result = config.loadCliSpecifiedCfgFile(configFile);

      expect(ConfigFile.load).toHaveBeenCalledTimes(1);
      expect(ConfigFile.load).toHaveBeenCalledWith(
        `${process.cwd()}/test/fixtures/valid/.npmpackagejsonlintrc.json`,
        config
      );

      expect(result).toStrictEqual(expected);
    });
  });

  describe('loadCliSpecifiedCfgFile method tests', () => {
    describe('when called without config object', () => {
      test('an empty config object should returned', () => {
        const configFile = '';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        jest.spyOn(ConfigFile, 'load');

        const expectedConfigObj = {
          rules: {}
        };
        const result = config.loadCliSpecifiedCfgFile(config.options.configFile);

        expect(ConfigFile.load).not.toHaveBeenCalled();

        expect(result).toStrictEqual(expectedConfigObj);
      });
    });

    describe('when called with config file path that is resolvable', () => {
      test('the config object should returned', () => {
        const configFile = 'eslint-config-tc';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        jest.spyOn(ConfigFile, 'load').mockReturnValue({rules: {'require-name': 'error'}});

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

    describe('when called with config file path starts with @', () => {
      test('the config object should returned', () => {
        const configFile = '@tclindner/eslint-config-tc';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        jest.spyOn(ConfigFile, 'load').mockReturnValue({rules: {'require-name': 'error'}});

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

    describe('when called with config file path is not resolvable and does not start with @', () => {
      test('the config object should returned', () => {
        const configFile = 'npm-package-json-lint-config-my-awesome-config';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        jest.spyOn(ConfigFile, 'load').mockReturnValue({rules: {'require-name': 'error'}});

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

  describe('getUserHomeConfig method tests', () => {
    describe('when called and personalConfig cache exists', () => {
      test('the peronalConfig object should be returned returned', () => {
        const configFile = '';
        const options = {
          configFile,
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        const fsExistsMock = jest.spyOn(fs, 'existsSync');

        config.personalConfig = {
          rules: {
            'required-name': 'error'
          }
        };

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

    describe('when called and personalConfig cache does not exist', () => {
      test('and rc file does, the config object should returned', () => {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        jest.spyOn(ConfigFile, 'load').mockReturnValue({rules: {'require-name': 'error'}});

        const fsExistsMock = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
        jest.spyOn(fs, 'statSync').mockReturnValue({
          isFile() {
            return true;
          }
        });
        os.homedir.mockReturnValue('/home/');

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

      test('and rc file does not, JavaScript config does, the config object should returned', () => {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        jest.spyOn(ConfigFile, 'load').mockReturnValue({rules: {'require-name': 'error'}});

        const fsExistsMock = jest
          .spyOn(fs, 'existsSync')
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(true);
        jest.spyOn(fs, 'statSync').mockReturnValue({
          isFile() {
            return true;
          }
        });
        os.homedir.mockReturnValue('/home/');

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

      test('and rc/js config files do not exist, empty object should returned', () => {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);
        jest.spyOn(ConfigFile, 'load');

        const fsExistsMock = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
        jest.spyOn(fs, 'statSync');
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

  describe('getProjectHierarchyConfig method tests', () => {
    describe('when called', () => {
      test('and package.json prop exists and is root, the config object should returned', () => {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        jest.spyOn(ConfigFile, 'loadFromPackageJson').mockReturnValue({root: true, rules: {'require-name': 'error'}});
        jest.spyOn(ConfigFile, 'load');

        const dirNameMock = jest.spyOn(path, 'dirname').mockReturnValue('./npm-package-json-lint/');
        const fsExistsMock = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
        const fsStatMock = jest.spyOn(fs, 'statSync').mockReturnValue({
          isFile() {
            return true;
          }
        });

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

        dirNameMock.mockRestore();
        dirNameMock.mockRestore();
        fsExistsMock.mockRestore();
        fsStatMock.mockRestore();
        fsStatMock.mockRestore();
      });

      test('and package.json prop exists and root is not set, the config object should returned', () => {
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
        const filePath = './test/fixtures/hierarchyWithoutRoot/subdirectory/package.json';
        const result = config.getProjectHierarchyConfig(filePath);

        expect(result).toStrictEqual(expectedConfigObj);
      });

      test('and package.json prop exists and has no prop, the config object should returned', () => {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        jest.spyOn(ConfigFile, 'loadFromPackageJson').mockReturnValue({root: true, rules: {}});
        jest.spyOn(ConfigFile, 'load').mockReturnValue({root: true, rules: {'require-name': 'error'}});

        const dirNameMock = jest.spyOn(path, 'dirname').mockReturnValue('./npm-package-json-lint/');
        const fsExistsMock = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
        const fsStatMock = jest.spyOn(fs, 'statSync').mockReturnValue({
          isFile() {
            return true;
          }
        });

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

        dirNameMock.mockRestore();
        fsExistsMock.mockRestore();
        fsStatMock.mockRestore();
      });

      test('and rc file does and is root, the config object should returned', () => {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        jest.spyOn(ConfigFile, 'loadFromPackageJson');
        jest.spyOn(ConfigFile, 'load').mockReturnValue({root: true, rules: {'require-name': 'error'}});

        const dirNameMock = jest.spyOn(path, 'dirname').mockReturnValue('./npm-package-json-lint/');
        const fsExistsMock = jest
          .spyOn(fs, 'existsSync')
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(true);
        const fsStatMock = jest.spyOn(fs, 'statSync').mockReturnValue({
          isFile() {
            return true;
          }
        });

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

        dirNameMock.mockRestore();
        fsExistsMock.mockRestore();
        fsStatMock.mockRestore();
      });

      test('and rc file does and is not root, the config object should returned', () => {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        jest.spyOn(ConfigFile, 'loadFromPackageJson').mockReturnValue({rules: {}});
        jest
          .spyOn(ConfigFile, 'load')
          .mockReturnValueOnce({root: false, rules: {'require-name': 'error'}})
          .mockReturnValueOnce({root: false, rules: {'require-version': 'error', 'require-name': 'warning'}});

        const dirNameMock = jest
          .spyOn(path, 'dirname')
          .mockReturnValueOnce('./npm-package-json-lint/')
          .mockReturnValueOnce('./npm-package-json-lint/')
          .mockReturnValueOnce('/home/');
        const fsExistsMock = jest
          .spyOn(fs, 'existsSync')
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(true)
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(true);
        const fsStatMock = jest.spyOn(fs, 'statSync').mockReturnValue({
          isFile() {
            return true;
          }
        });

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

        dirNameMock.mockRestore();
        fsExistsMock.mockRestore();
        fsStatMock.mockRestore();
      });

      test('and rc file does not, JavaScript config does and is root, the config object should returned', () => {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        jest.spyOn(ConfigFile, 'loadFromPackageJson');
        jest.spyOn(ConfigFile, 'load').mockReturnValue({root: true, rules: {'require-name': 'error'}});

        const dirNameMock = jest.spyOn(path, 'dirname').mockReturnValue('./npm-package-json-lint/');
        const fsExistsMock = jest
          .spyOn(fs, 'existsSync')
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(true);
        const fsStatMock = jest.spyOn(fs, 'statSync').mockReturnValue({
          isFile() {
            return true;
          }
        });

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

        dirNameMock.mockRestore();
        fsExistsMock.mockRestore();
        fsStatMock.mockRestore();
      });

      test('and rc/js config files do not exist, empty object should returned', () => {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: true,
          rules: {}
        };
        const config = new Config(options, linterContext);

        jest.spyOn(ConfigFile, 'loadFromPackageJson');
        jest.spyOn(ConfigFile, 'load');

        const dirNameMock = jest
          .spyOn(path, 'dirname')
          .mockReturnValueOnce('./npm-package-json-lint/')
          .mockReturnValueOnce('/home');
        const fsExistsMock = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
        const fsStatMock = jest.spyOn(fs, 'statSync');

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

        dirNameMock.mockRestore();
        fsExistsMock.mockRestore();
        fsStatMock.mockRestore();
      });

      test('and pkg prop does not exist, config files do, but useConfigFiles is false, then empty config object should returned', () => {
        const options = {
          configFile: '',
          cwd: process.cwd(),
          useConfigFiles: false,
          rules: {}
        };
        const config = new Config(options, linterContext);

        jest.spyOn(ConfigFile, 'loadFromPackageJson').mockReturnValue({rules: {}});
        jest.spyOn(ConfigFile, 'load').mockReturnValue({root: true, rules: {'require-name': 'error'}});

        const dirNameMock = jest
          .spyOn(path, 'dirname')
          .mockReturnValueOnce('./npm-package-json-lint/')
          .mockReturnValueOnce('/home');
        const fsExistsMock = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
        const fsStatMock = jest.spyOn(fs, 'statSync').mockReturnValue({
          isFile() {
            return true;
          }
        });

        const expectedConfigObj = {
          rules: {}
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

        dirNameMock.mockRestore();
        fsExistsMock.mockRestore();
        fsStatMock.mockRestore();
      });
    });
  });
});
