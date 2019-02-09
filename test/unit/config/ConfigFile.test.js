/* eslint max-lines: 'off', id-length: 'off' */

const Config = require('./../../../src/Config');
const ConfigFile = require('./../../../src/config/ConfigFile');
const ConfigValidator = require('./../../../src/config/ConfigValidator');
const NpmPackageJsonLint = require('./../../../src/NpmPackageJsonLint');
const Parser = require('./../../../src/Parser');

jest.mock('./../../../src/config/ConfigValidator');

const linterContext = new NpmPackageJsonLint();

const options = {
  configFile: '',
  cwd: process.cwd(),
  useConfigFiles: true,
  rules: {}
};
const config = new Config(options, linterContext);

describe('ConfigFile Unit Tests', () => {
  describe('load method', () => {
    test('when file has local extends (valid), a config object is returned', () => {
      const expectedConfigObj = {
        'extends': './test/fixtures/extendsLocal/npmpackagejsonlint.config.js',
        'rules': {
          'require-author': 'error',
          'require-description': 'error'
        }
      };
      const filePath = './test/fixtures/extendsLocal/.npmpackagejsonlintrc.json';
      const result = ConfigFile.load(filePath, config);

      expect(result).toStrictEqual(expectedConfigObj);
    });

    test('when file has local extends (invalid), a config object is returned', () => {
      const filePath = './test/fixtures/extendsLocalInvalid/.npmpackagejsonlintrc.json';

      expect(() => {
        ConfigFile.load(filePath, config);
      }).toThrow();
    });

    test('when file has module extends (valid), a config object is returned', () => {
      const expectedConfigObj = {
        'extends': 'npm-package-json-lint-config-default',
        'rules': {
          'bin-type': 'error',
          'config-type': 'error',
          'cpu-type': 'error',
          'dependencies-type': 'error',
          'description-type': 'error',
          'devDependencies-type': 'error',
          'directories-type': 'error',
          'engines-type': 'error',
          'files-type': 'error',
          'homepage-type': 'error',
          'keywords-type': 'error',
          'license-type': 'error',
          'main-type': 'error',
          'man-type': 'error',
          'name-format': 'error',
          'name-type': 'error',
          'optionalDependencies-type': 'error',
          'os-type': 'error',
          'peerDependencies-type': 'error',
          'preferGlobal-type': 'error',
          'private-type': 'error',
          'repository-type': 'error',
          'require-author': 'error',
          'require-name': 'error',
          'require-version': 'error',
          'scripts-type': 'error',
          'version-format': 'error',
          'version-type': 'error'
        }
      };
      const filePath = './test/fixtures/extendsModule/.npmpackagejsonlintrc.json';
      const result = ConfigFile.load(filePath, config);

      expect(result).toStrictEqual(expectedConfigObj);
    });

    test('when file module extends (invalid), a config object is returned', () => {
      const filePath = './test/fixtures/extendsModuleInvalid/.npmpackagejsonlintrc.json';

      expect(() => {
        ConfigFile.load(filePath, config);
      }).toThrow();
    });

    test('when file is rc file (json), a config object is returned', () => {
      jest.spyOn(Parser, 'parseJavaScriptFile');
      jest.spyOn(Parser, 'parseJsonFile');
      Parser.parseJsonFile.mockReturnValue({rules: {'require-name': 'error'}});

      const expectedConfigObj = {
        rules: {
          'require-name': 'error'
        }
      };
      const filePath = './npmpackagejsonlintrc.json';
      const result = ConfigFile.load(filePath, config);

      expect(Parser.parseJsonFile).toHaveBeenCalledTimes(1);
      expect(Parser.parseJsonFile).toHaveBeenCalledWith(filePath);

      expect(Parser.parseJavaScriptFile).not.toHaveBeenCalled();

      expect(ConfigValidator.validate).toHaveBeenCalledTimes(1);
      expect(ConfigValidator.validate).toHaveBeenCalledWith(expectedConfigObj, filePath, linterContext);

      expect(result).toStrictEqual(expectedConfigObj);
    });

    test('when file is js file, a config object is returned', () => {
      jest.spyOn(Parser, 'parseJsonFile');
      jest.spyOn(Parser, 'parseJavaScriptFile').mockReturnValue({rules: {'require-name': 'error'}});

      const expectedConfigObj = {
        rules: {
          'require-name': 'error'
        }
      };
      const filePath = './npmpackagejsonlint.config.js';
      const result = ConfigFile.load(filePath, config);

      expect(Parser.parseJsonFile).not.toHaveBeenCalled();

      expect(Parser.parseJavaScriptFile).toHaveBeenCalledTimes(1);
      expect(Parser.parseJavaScriptFile).toHaveBeenCalledWith(filePath);

      expect(ConfigValidator.validate).toHaveBeenCalledTimes(1);
      expect(ConfigValidator.validate).toHaveBeenCalledWith(expectedConfigObj, filePath, linterContext);

      expect(result).toStrictEqual(expectedConfigObj);

      Parser.parseJavaScriptFile.mockRestore();
    });

    test('when file is yaml file, an error is thrown', () => {
      const filePath = './npmpackagejsonlint.config.yaml';
      jest.spyOn(Parser, 'parseJsonFile');
      jest.spyOn(Parser, 'parseJavaScriptFile');

      expect(() => {
        ConfigFile.load(filePath, config);
      }).toThrow('Unsupport config file extension. File path: ./npmpackagejsonlint.config.yaml');

      expect(Parser.parseJsonFile).not.toHaveBeenCalled();
      expect(Parser.parseJavaScriptFile).not.toHaveBeenCalled();
      expect(ConfigValidator.validate).not.toHaveBeenCalled();
    });
  });

  describe('createEmptyConfig method', () => {
    test('when called an empty config object is returned', () => {
      const result = ConfigFile.createEmptyConfig();
      const expected = {
        rules: {}
      };

      expect(result).toStrictEqual(expected);
    });
  });

  describe('loadFromPackageJson method', () => {
    test('when package.json property does not exist, an empty config object is returned', () => {
      jest.spyOn(Parser, 'parseJsonFile');
      Parser.parseJsonFile.mockReturnValue({name: 'name'});

      const expectedConfigObj = {
        rules: {}
      };
      const filePath = './package.json';
      const result = ConfigFile.loadFromPackageJson(filePath, config);

      expect(Parser.parseJsonFile).toHaveBeenCalledTimes(1);
      expect(Parser.parseJsonFile).toHaveBeenCalledWith(filePath);

      expect(ConfigValidator.validate).toHaveBeenCalledTimes(1);
      expect(ConfigValidator.validate).toHaveBeenCalledWith({rules: {}}, filePath, linterContext);

      expect(result).toStrictEqual(expectedConfigObj);
    });

    test('when package.json property does exist and is valid, a config object is returned', () => {
      jest.spyOn(Parser, 'parseJsonFile');
      Parser.parseJsonFile.mockReturnValue({
        name: 'name',
        npmPackageJsonLintConfig: {
          rules: {
            'require-name': 'error'
          }
        }
      });

      const expectedConfigObj = {
        rules: {
          'require-name': 'error'
        }
      };
      const filePath = './package.json';
      const result = ConfigFile.loadFromPackageJson(filePath, config);

      expect(Parser.parseJsonFile).toHaveBeenCalledTimes(1);
      expect(Parser.parseJsonFile).toBeCalledWith(filePath);

      expect(ConfigValidator.validate).toHaveBeenCalledTimes(1);
      expect(ConfigValidator.validate).toHaveBeenCalledWith(expectedConfigObj, filePath, linterContext);

      expect(result).toStrictEqual(expectedConfigObj);
    });
  });
});
