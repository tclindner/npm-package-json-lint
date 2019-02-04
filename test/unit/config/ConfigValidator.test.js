'use strict';

const ConfigValidator = require('./../../../src/config/ConfigValidator');
const NpmPackageJsonLint = require('./../../../src/NpmPackageJsonLint');

const linterContext = new NpmPackageJsonLint();

describe('ConfigValidator Unit Tests', function() {
  describe('validateRules method', function() {
    describe('isArrayRuleConfigValid tests', function() {
      describe('when a rule is an array rule and the first key is not equal to error, warning, or off', function() {
        test('an error should be thrown', function() {
          const ruleConfig = {
            'valid-values-author': [true, ['Thomas', 'Lindner', 'Thomas Lindner']]
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext)
          }).toThrow('cli:\n\tConfiguration for rule "valid-values-author" is invalid:\n\tfirst key must be set to "error", "warning", or "off". Currently set to "true".');
        });
      });

      describe('when a rule is an array rule and the second key is not an Array', function() {
        test('an error should be thrown', function() {
          const ruleConfig = {
            'valid-values-author': ['error', 'Thomas']
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext)
          }).toThrow('cli:\n\tConfiguration for rule "valid-values-author" is invalid:\n\tsecond key must be set an array. Currently set to "Thomas".');
        });
      });

      describe('when a valid array rule config is passed', function() {
        test('true should be returned', function() {
          const ruleConfig = {
            'prefer-property-order': ['error', ['name', 'version']]
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext)
        });
      });

      describe('when a valid array rule config is passed with a value of off', function() {
        test('true should be returned', function() {
          const ruleConfig = {
            'prefer-property-order': 'off'
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext)
        });
      });

      describe('when a invalid array rule config is passed with a value of error', function() {
        test('true should be returned', function() {
          const ruleConfig = {
            'valid-values-author': 'error'
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext)
          }).toThrow('cli:\n\tConfiguration for rule "valid-values-author" is invalid:\n\tis an array type rule. It must be set to "off" if an array is not supplied.');
        });
      });
    });

    describe('isObjectRuleConfigValid tests', function() {
      describe('when a rule is an object rule and the first key is not equal to error, warning, or off', function() {
        test('an error should be thrown', function() {
          const ruleConfig = {
            'description-format': [true, {requireCapitalFirstLetter: true, requireEndingPeriod: true}]
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext)
          }).toThrow('cli:\n\tConfiguration for rule "description-format" is invalid:\n\tfirst key must be set to "error", "warning", or "off". Currently set to "true".');
        });
      });

      describe('when a rule is an object rule and the second key is not an Object', function() {
        test('an error should be thrown', function() {
          const ruleConfig = {
            'description-format': ['error', 'Thomas']
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext)
          }).toThrow('cli:\n\tConfiguration for rule "description-format" is invalid:\n\tsecond key must be set an object. Currently set to "Thomas".');
        });
      });

      describe('when a valid object rule config is passed', function() {
        test('true should be returned', function() {
          const ruleConfig = {
            'description-format': ['error', {requireCapitalFirstLetter: true, requireEndingPeriod: true}]
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext)
        });
      });

      describe('when a valid object rule config is passed with a value of off', function() {
        test('true should be returned', function() {
          const ruleConfig = {
            'description-format': 'off'
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext)
        });
      });

      describe('when a invalid object rule config is passed with a value of error', function() {
        test('true should be returned', function() {
          const ruleConfig = {
            'description-format': 'error'
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext)
          }).toThrow('cli:\n\tConfiguration for rule "description-format" is invalid:\n\tis an object type rule. It must be set to "off" if an object is not supplied.');
        });
      });
    });

    describe('isStandardRuleConfigValid tests', function() {
      describe('when a standard rule is passed with a value of error', function() {
        test('true should be returned', function() {
          const ruleConfig = {
            'require-author': 'error'
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext)
        });
      });

      describe('when a standard rule is passed with a value of warning', function() {
        test('true should be returned', function() {
          const ruleConfig = {
            'require-author': 'warning'
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext)
        });
      });

      describe('when a standard rule is passed with a value of off', function() {
        test('true should be returned', function() {
          const ruleConfig = {
            'require-author': 'off'
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext)
        });
      });

      describe('when a rule is set to a boolean', function() {
        test('an error should be thrown', function() {
          const ruleConfig = {
            'require-author': true
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext)
          }).toThrow('cli:\n\tConfiguration for rule "require-author" is invalid:\n\tmust be set to "error", "warning", or "off". Currently set to "true".');
        });
      });

      describe('when a rule is set to a number', function() {
        test('an error should be thrown', function() {
          const dummyValue = 1;
          const ruleConfig = {
            'require-author': dummyValue
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext)
          }).toThrow('cli:\n\tConfiguration for rule "require-author" is invalid:\n\tmust be set to "error", "warning", or "off". Currently set to "1".');
        });
      });
    });
  });

  describe('validate method', function() {
    describe('when validate is called with a valid schema and rules', function() {
      test('all top level items, an exception should not be thrown', function() {
        const config = {
          'extends': 'value',
          'rules': {},
          'root': true
        };
        const source = 'cli';
        ConfigValidator.validateRules = jest.fn();
        ConfigValidator.validateRules.mockReturnValue(true);

        ConfigValidator.validate(config, source, linterContext);
      });

      test('extends and rules only for top level items, an exception should not be thrown', function() {
        const config = {
          'extends': 'value',
          'rules': {}
        };
        const source = 'cli';
        ConfigValidator.validateRules = jest.fn();
        ConfigValidator.validateRules.mockReturnValue(true);

        ConfigValidator.validate(config, source, linterContext);
      });

      test('extends and root only for top level items, an exception should not be thrown', function() {
        const config = {
          'extends': 'value',
          'root': true
        };
        const source = 'cli';
        ConfigValidator.validateRules = jest.fn();
        ConfigValidator.validateRules.mockReturnValue(true);

        ConfigValidator.validate(config, source, linterContext);
      });

      test('rules and root for top level items, an exception should not be thrown', function() {
        const config = {
          rules: {},
          root: true
        };
        const source = 'cli';
        ConfigValidator.validateRules = jest.fn();
        ConfigValidator.validateRules.mockReturnValue(true);

        ConfigValidator.validate(config, source, linterContext);
      });

      test('extends as array items, an exception should not be thrown', function() {
        const config = {
          'extends': ['value', 'value2'],
          'rules': {},
          'root': true
        };
        const source = 'cli';
        ConfigValidator.validateRules = jest.fn();
        ConfigValidator.validateRules.mockReturnValue(true);

        ConfigValidator.validate(config, source, linterContext);
      });
    });

    describe('when validate is called with an invalid schema and valid rules', function() {
      test('extends is bool, an error should be thrown', function() {
        const config = {
          'extends': false,
          'rules': {},
          'root': true
        };
        const source = 'cli';
        ConfigValidator.validateRules = jest.fn();
        ConfigValidator.validateRules.mockReturnValue(true);

        expect(() => {
          ConfigValidator.validate(config, source, linterContext)
        }).toThrow('npm-package-json-lint configuration in cli is invalid:');
      });

      test('rules is bool, an error should be thrown', function() {
        const config = {
          'extends': ['value', 'value2'],
          'rules': false,
          'root': true
        };
        const source = 'cli';
        ConfigValidator.validateRules = jest.fn();
        ConfigValidator.validateRules.mockReturnValue(true);

        expect(() => {
          ConfigValidator.validate(config, source, linterContext)
        }).toThrow('npm-package-json-lint configuration in cli is invalid:');
      });

      test('root is string, an error should be thrown', function() {
        const config = {
          'extends': ['value', 'value2'],
          'rules': {},
          'root': 'true'
        };
        const source = 'cli';
        ConfigValidator.validateRules = jest.fn();
        ConfigValidator.validateRules.mockReturnValue(true);

        expect(() => {
          ConfigValidator.validate(config, source, linterContext)
        }).toThrow('npm-package-json-lint configuration in cli is invalid:');
      });
    });

    describe('when validate is called with a valid schema and invalid rules', function() {
      test('an error should be thrown', function() {
        const config = {
          'extends': 'value',
          'rules': {},
          'root': true
        };
        const source = 'cli';
        ConfigValidator.validateRules = jest.fn();
        ConfigValidator.validateRules.mockImplementation(() => {
          throw new Error();
        });

        expect(() => {
          ConfigValidator.validate(config, source, linterContext)
        }).toThrow();
      });
    });
  });
});
