const {cosmiconfigSync} = require('cosmiconfig');
const Config = require('../../src/Config');
const applyOverrides = require('../../src/config/applyOverrides');
const applyExtendsIfSpecified = require('../../src/config/applyExtendsIfSpecified');
const Rules = require('../../src/Rules');

const rules = new Rules();
rules.load();

jest.mock('cosmiconfig');
jest.mock('../../src/config/applyOverrides');
jest.mock('../../src/config/applyExtendsIfSpecified');

describe('Config Unit Tests', () => {
  describe('getConfigForFile method tests', () => {
    describe('when config is undefined, but configFile is', () => {
      test('a config object should returned with all rules', () => {
        const cwd = process.cwd();
        let config;
        const configFile = './npmpackagejsonlintrc.json';
        const configBaseDirectory = '';

        const loadMock = jest.fn().mockReturnValue({
          'require-version': 'error',
          'require-name': 'error',
          'require-scripts': 'error',
        });
        const searchMock = jest.fn();

        cosmiconfigSync.mockImplementation(() => ({
          load: loadMock,
          search: searchMock,
        }));

        const configObj = new Config(cwd, config, configFile, configBaseDirectory, rules);

        const expectedConfigObj = {
          'require-version': 'error',
          'require-name': 'error',
          'require-scripts': 'error',
        };
        const filePath = './package.json';
        const result = configObj.getConfigForFile(filePath);

        expect(result).toStrictEqual(expectedConfigObj);
        expect(applyExtendsIfSpecified).toHaveBeenCalledTimes(0);
        expect(applyOverrides).toHaveBeenCalledTimes(0);
        expect(loadMock).toHaveBeenCalledTimes(1);
        expect(loadMock).toHaveBeenCalledWith(configFile);
        expect(searchMock).toHaveBeenCalledTimes(0);
      });
    });

    describe('when config and configFile are undefined', () => {
      test('a config object should returned with all rules', () => {
        const cwd = process.cwd();
        let config;
        let configFile;
        const configBaseDirectory = '';

        const loadMock = jest.fn();
        const searchMock = jest.fn().mockReturnValue({
          'require-version': 'error',
          'require-name': 'error',
          'require-scripts': 'error',
        });

        cosmiconfigSync.mockImplementation(() => ({
          load: loadMock,
          search: searchMock,
        }));

        const configObj = new Config(cwd, config, configFile, configBaseDirectory, rules);

        const expectedConfigObj = {
          'require-version': 'error',
          'require-name': 'error',
          'require-scripts': 'error',
        };
        const filePath = './package.json';
        const result = configObj.getConfigForFile(filePath);

        expect(result).toStrictEqual(expectedConfigObj);
        expect(applyExtendsIfSpecified).toHaveBeenCalledTimes(0);
        expect(applyOverrides).toHaveBeenCalledTimes(0);
        expect(searchMock).toHaveBeenCalledTimes(1);
        expect(searchMock).toHaveBeenCalledWith(filePath);
        expect(loadMock).toHaveBeenCalledTimes(0);
      });
    });

    describe('when config and configFile are undefined and no config found', () => {
      test('an error should be thrown', () => {
        const cwd = process.cwd();
        let config;
        let configFile;
        const configBaseDirectory = '';

        const loadMock = jest.fn();
        const searchMock = jest.fn();

        cosmiconfigSync.mockImplementation(() => ({
          load: loadMock,
          search: searchMock,
        }));

        const configObj = new Config(cwd, config, configFile, configBaseDirectory, rules);

        const filePath = './package.json';

        expect(() => {
          configObj.getConfigForFile(filePath);
        }).toThrow(`No npm-package-json-lint configuration found.\n${filePath}`);
      });
    });

    describe('when config and configFile are undefined, config is found, but has no rules', () => {
      test('a config object should returned with all rules', () => {
        const cwd = process.cwd();
        let config;
        let configFile;
        const configBaseDirectory = '';

        const loadMock = jest.fn();
        const searchMock = jest.fn().mockReturnValue({});

        cosmiconfigSync.mockImplementation(() => ({
          load: loadMock,
          search: searchMock,
        }));

        const configObj = new Config(cwd, config, configFile, configBaseDirectory, rules);

        const filePath = './package.json';

        expect(() => {
          configObj.getConfigForFile(filePath);
        }).toThrow(`No rules specified in configuration.\n${filePath}`);
      });
    });

    describe('when config is defined', () => {
      test('a config object should returned with all rules', () => {
        const cwd = process.cwd();
        const config = {
          rules: {
            'require-version': 'error',
            'require-name': 'error',
            'require-scripts': 'error',
          },
          overrides: [
            {
              patterns: ['**/package.json'],
              rules: {
                'require-name': 'warning',
              },
            },
          ],
        };
        let configFile;
        const configBaseDirectory = '';

        const loadMock = jest.fn();
        const searchMock = jest.fn();

        cosmiconfigSync.mockImplementation(() => ({
          load: loadMock,
          search: searchMock,
        }));
        applyExtendsIfSpecified.mockReturnValue({
          rules: {
            'require-version': 'error',
            'require-name': 'error',
            'require-scripts': 'error',
          },
          overrides: [
            {
              patterns: ['**/package.json'],
              rules: {
                'require-name': 'warning',
              },
            },
          ],
        });
        applyOverrides.mockReturnValue({
          'require-version': 'error',
          'require-name': 'warning',
          'require-scripts': 'error',
        });

        const configObj = new Config(cwd, config, configFile, configBaseDirectory, rules);

        const expectedConfigObj = {
          'require-version': 'error',
          'require-name': 'warning',
          'require-scripts': 'error',
        };
        const filePath = './package.json';
        const result = configObj.getConfigForFile(filePath);

        expect(result).toStrictEqual(expectedConfigObj);
        expect(applyExtendsIfSpecified).toHaveBeenCalledTimes(1);
        expect(applyExtendsIfSpecified).toHaveBeenCalledWith(config, 'PassedConfig');
        expect(applyOverrides).toHaveBeenCalledTimes(1);
        expect(applyOverrides).toHaveBeenCalledWith(cwd, filePath, config.rules, config.overrides);
        expect(searchMock).toHaveBeenCalledTimes(0);
        expect(loadMock).toHaveBeenCalledTimes(0);
      });
    });
  });
});
