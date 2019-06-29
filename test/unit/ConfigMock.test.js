const fs = require('fs');
const path = require('path');
const isPathInside = require('is-path-inside');
const Config = require('./../../src/Config');
const ConfigFile = require('./../../src/config/ConfigFile');

const linterContext = {};
jest.mock('os');
jest.mock('path');
jest.mock('./../../src/config/ConfigValidator');
jest.mock('is-path-inside');

describe('Config Unit Tests', () => {
  describe('getProjectHierarchyConfig method tests', () => {
    describe('when called', () => {
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

        path.dirname.mockReturnValueOnce('./npm-package-json-lint/').mockReturnValueOnce('/home');
        path.resolve
          .mockReturnValueOnce('./npm-package-json-lint')
          .mockReturnValueOnce('./npm-package-json-lint')
          .mockReturnValueOnce('./package.json')
          .mockReturnValueOnce('./npm-package-json-lint')
          .mockReturnValueOnce('./npm-package-json-lint');
        path.join
          .mockReturnValueOnce('npm-package-json-lint/package.json')
          .mockReturnValueOnce('npm-package-json-lint/.npmpackagejsonlintrc.json')
          .mockReturnValueOnce('npm-package-json-lint/npmpackagejsonlint.config.js');
        const fsExistsMock = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
        const fsStatMock = jest.spyOn(fs, 'statSync');

        isPathInside.mockReturnValueOnce(true).mockReturnValueOnce(false);

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

        path.dirname.mockReturnValueOnce('./npm-package-json-lint/').mockReturnValueOnce('/home');
        path.resolve
          .mockReturnValueOnce('./npm-package-json-lint')
          .mockReturnValueOnce('./npm-package-json-lint')
          .mockReturnValueOnce('./package.json')
          .mockReturnValueOnce('./npm-package-json-lint')
          .mockReturnValueOnce('./npm-package-json-lint');
        path.join
          .mockReturnValueOnce('npm-package-json-lint/package.json')
          .mockReturnValueOnce('npm-package-json-lint/.npmpackagejsonlintrc.json')
          .mockReturnValueOnce('npm-package-json-lint/npmpackagejsonlint.config.js');
        const fsExistsMock = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
        const fsStatMock = jest.spyOn(fs, 'statSync').mockReturnValue({
          isFile() {
            return true;
          }
        });

        isPathInside.mockReturnValueOnce(true).mockReturnValue(false);

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

        fsExistsMock.mockRestore();
        fsStatMock.mockRestore();
      });
    });
  });
});
