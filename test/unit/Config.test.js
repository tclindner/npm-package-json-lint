const cosmiconfig = require('cosmiconfig');
const Config = require('./../../src/Config');
const applyOverrides = require('../../src/config/applyOverrides');
const applyExtendsIfSpecified = require('../../src/config/applyExtendsIfSpecified');

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

        const loadSyncMock = jest.fn().mockReturnValue({
          rules: {
            'require-version': 'error',
            'require-name': 'error',
            'require-scripts': 'error'
          }
        });
        const searchSyncMock = jest.fn();

        cosmiconfig.mockImplementation(() => {
          return {
            loadSync: loadSyncMock,
            searchSync: searchSyncMock
          };
        });

        const configObj = new Config(cwd, config, configFile, configBaseDirectory);

        const expectedConfigObj = {
          rules: {
            'require-version': 'error',
            'require-name': 'error',
            'require-scripts': 'error'
          }
        };
        const filePath = './package.json';
        const result = configObj.getConfigForFile(filePath);

        expect(result).toStrictEqual(expectedConfigObj);
        expect(applyExtendsIfSpecified).toHaveBeenCalledTimes(0);
        expect(applyOverrides).toHaveBeenCalledTimes(0);
        expect(loadSyncMock).toHaveBeenCalledTimes(1);
        expect(loadSyncMock).toHaveBeenCalledWith(configFile);
        expect(searchSyncMock).toHaveBeenCalledTimes(0);
      });
    });

    describe('when config and configFile are undefined', () => {
      test('a config object should returned with all rules', () => {
        const cwd = process.cwd();
        let config;
        let configFile;
        const configBaseDirectory = '';

        const loadSyncMock = jest.fn();
        const searchSyncMock = jest.fn().mockReturnValue({
          rules: {
            'require-version': 'error',
            'require-name': 'error',
            'require-scripts': 'error'
          }
        });

        cosmiconfig.mockImplementation(() => {
          return {
            loadSync: loadSyncMock,
            searchSync: searchSyncMock
          };
        });

        const configObj = new Config(cwd, config, configFile, configBaseDirectory);

        const expectedConfigObj = {
          rules: {
            'require-version': 'error',
            'require-name': 'error',
            'require-scripts': 'error'
          }
        };
        const filePath = './package.json';
        const result = configObj.getConfigForFile(filePath);

        expect(result).toStrictEqual(expectedConfigObj);
        expect(applyExtendsIfSpecified).toHaveBeenCalledTimes(0);
        expect(applyOverrides).toHaveBeenCalledTimes(0);
        expect(searchSyncMock).toHaveBeenCalledTimes(1);
        expect(searchSyncMock).toHaveBeenCalledWith(filePath);
        expect(loadSyncMock).toHaveBeenCalledTimes(0);
      });
    });

    describe('when config and configFile are undefined and no config found', () => {
      test('an error should be thrown', () => {
        const cwd = process.cwd();
        let config;
        let configFile;
        const configBaseDirectory = '';

        const loadSyncMock = jest.fn();
        const searchSyncMock = jest.fn();

        cosmiconfig.mockImplementation(() => {
          return {
            loadSync: loadSyncMock,
            searchSync: searchSyncMock
          };
        });

        const configObj = new Config(cwd, config, configFile, configBaseDirectory);

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

        const loadSyncMock = jest.fn();
        const searchSyncMock = jest.fn().mockReturnValue({});

        cosmiconfig.mockImplementation(() => {
          return {
            loadSync: loadSyncMock,
            searchSync: searchSyncMock
          };
        });

        const configObj = new Config(cwd, config, configFile, configBaseDirectory);

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
            'require-scripts': 'error'
          },
          overrides: [
            {
              patterns: ['**/package.json'],
              rules: {
                'require-name': 'warning'
              }
            }
          ]
        };
        let configFile;
        const configBaseDirectory = '';

        const loadSyncMock = jest.fn();
        const searchSyncMock = jest.fn();

        cosmiconfig.mockImplementation(() => {
          return {
            loadSync: loadSyncMock,
            searchSync: searchSyncMock
          };
        });
        applyExtendsIfSpecified.mockReturnValue({
          rules: {
            'require-version': 'error',
            'require-name': 'error',
            'require-scripts': 'error'
          },
          overrides: [
            {
              patterns: ['**/package.json'],
              rules: {
                'require-name': 'warning'
              }
            }
          ]
        });
        applyOverrides.mockReturnValue({
          'require-version': 'error',
          'require-name': 'warning',
          'require-scripts': 'error'
        });

        const configObj = new Config(cwd, config, configFile, configBaseDirectory);

        const expectedConfigObj = {
          'require-version': 'error',
          'require-name': 'warning',
          'require-scripts': 'error'
        };
        const filePath = './package.json';
        const result = configObj.getConfigForFile(filePath);

        expect(result).toStrictEqual(expectedConfigObj);
        expect(applyExtendsIfSpecified).toHaveBeenCalledTimes(1);
        expect(applyExtendsIfSpecified).toHaveBeenCalledWith(config, 'PassedConfig');
        expect(applyOverrides).toHaveBeenCalledTimes(1);
        expect(applyOverrides).toHaveBeenCalledWith(cwd, filePath, config.rules, config.overrides);
        expect(searchSyncMock).toHaveBeenCalledTimes(0);
        expect(loadSyncMock).toHaveBeenCalledTimes(0);
      });
    });
  });
});
