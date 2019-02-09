const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const Rules = require('./../../src/Rules');

jest.mock('fs');
jest.mock('path');

describe('Rules Unit Tests', () => {
  describe('_registerRule method', () => {
    describe('when a ruleId and ruleModule are passed in', () => {
      test('the rules object contains the rule as a key and the module path as a value', () => {
        const rules = new Rules();
        const firstIndex = 0;

        rules._registerRule('key', 'c/git/key.js');
        expect(Object.keys(rules.rules)[firstIndex]).toStrictEqual('key');
        expect(rules.rules.key).toStrictEqual('c/git/key.js');
      });
    });
  });

  describe('get method', () => {
    describe('when get is called for an invalid ruleId', () => {
      test('an error should be thrown', () => {
        fs.readdirSync.mockReturnValue(['version-type.js', 'require-version.js']);
        path.join
          .mockReturnValueOnce('c/git/rules')
          .mockReturnValueOnce('c/git/rules/version-type.js')
          .mockReturnValueOnce('c/git/rules/require-version.js');

        const rules = new Rules();

        rules.load();

        expect(() => {
          rules.get('required-version');
        }).toThrow(chalk.bold.red('Rule, required-version, is invalid. Please ensure it matches a valid option.'));
      });
    });
  });

  describe('load method', () => {
    describe('when load is called', () => {
      test('an object of rules should be returned', () => {
        fs.readdirSync.mockReturnValue(['version-type.js', 'require-version.js']);
        path.join
          .mockReturnValueOnce('c/git/rules')
          .mockReturnValueOnce('c/git/rules/version-type.js')
          .mockReturnValueOnce('c/git/rules/require-version.js');

        const rules = new Rules();
        const result = rules.load();

        expect(rules.rules['version-type']).toStrictEqual('c/git/rules/version-type.js');
        expect(rules.rules['require-version']).toStrictEqual('c/git/rules/require-version.js');
      });
    });

    describe('when load is called but a fs error occurs', () => {
      test('false is returned', () => {
        fs.readdirSync.mockImplementation(() => {
          throw new Error('Error while loading rules from rules directory - ');
        });

        const rules = new Rules();

        expect(() => {
          rules.load();
        }).toThrow('Error while loading rules from rules directory - ');
      });
    });
  });

  describe('getRules method', () => {
    describe('when getRules is called', () => {
      test('the rules object should be returned', () => {
        const rules = new Rules();
        rules._registerRule('ruleId', 'ruleModule');

        expect(rules.getRules()).toStrictEqual({ruleId: 'ruleModule'});
      });
    });

    describe('when load is called but a fs error occurs', () => {
      test('false is returned', () => {
        fs.readdirSync.mockImplementation(() => {
          throw new Error('Error while loading rules from rules directory - ');
        });

        const rules = new Rules();

        expect(() => {
          rules.load();
        }).toThrow('Error while loading rules from rules directory - ');
      });
    });
  });
});
