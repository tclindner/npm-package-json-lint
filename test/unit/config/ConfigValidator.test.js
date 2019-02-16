const ConfigValidator = require('./../../../src/config/ConfigValidator');
const NpmPackageJsonLint = require('./../../../src/NpmPackageJsonLint');

const linterContext = new NpmPackageJsonLint();

describe('ConfigValidator Unit Tests', () => {
  describe('validateRules method', () => {
    describe('isArrayRuleConfigValid tests', () => {
      describe('when a rule is an array rule and the first key is not equal to error, warning, or off', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'valid-values-author': [true, ['Thomas', 'Lindner', 'Thomas Lindner']]
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "valid-values-author" is invalid:\n\tfirst key must be set to "error", "warning", or "off". Currently set to "true".'
          );
        });
      });

      describe('when a rule is an array rule and the second key is not an Array', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'valid-values-author': ['error', 'Thomas']
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "valid-values-author" is invalid:\n\tsecond key must be set an array. Currently set to "Thomas".'
          );
        });
      });

      describe('when a valid array rule config is passed', () => {
        test('true should be returned', () => {
          const ruleConfig = {
            'prefer-property-order': ['error', ['name', 'version']]
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext);
        });
      });

      describe('when a valid array rule config is passed with a value of off', () => {
        test('true should be returned', () => {
          const ruleConfig = {
            'prefer-property-order': 'off'
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext);
        });
      });

      describe('when a invalid array rule config is passed with a value of error', () => {
        test('true should be returned', () => {
          const ruleConfig = {
            'valid-values-author': 'error'
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "valid-values-author" is invalid:\n\tis an array type rule. It must be set to "off" if an array is not supplied.'
          );
        });
      });
    });

    describe('isObjectRuleConfigValid tests', () => {
      describe('when a rule is an object rule and the first key is not equal to error, warning, or off', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'description-format': [true, {requireCapitalFirstLetter: true, requireEndingPeriod: true}]
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "description-format" is invalid:\n\tfirst key must be set to "error", "warning", or "off". Currently set to "true".'
          );
        });
      });

      describe('when a rule is an object rule and the second key is not an Object', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'description-format': ['error', 'Thomas']
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "description-format" is invalid:\n\tsecond key must be set an object. Currently set to "Thomas".'
          );
        });
      });

      describe('when a valid object rule config is passed', () => {
        test('true should be returned', () => {
          const ruleConfig = {
            'description-format': ['error', {requireCapitalFirstLetter: true, requireEndingPeriod: true}]
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext);
        });
      });

      describe('when a valid object rule config is passed with a value of off', () => {
        test('true should be returned', () => {
          const ruleConfig = {
            'description-format': 'off'
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext);
        });
      });

      describe('when a invalid object rule config is passed with a value of error', () => {
        test('true should be returned', () => {
          const ruleConfig = {
            'description-format': 'error'
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "description-format" is invalid:\n\tis an object type rule. It must be set to "off" if an object is not supplied.'
          );
        });
      });
    });

    describe('isStandardRuleConfigValid tests', () => {
      describe('when a standard rule is passed with a value of error', () => {
        test('true should be returned', () => {
          const ruleConfig = {
            'require-author': 'error'
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext);
        });
      });

      describe('when a standard rule is passed with a value of warning', () => {
        test('true should be returned', () => {
          const ruleConfig = {
            'require-author': 'warning'
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext);
        });
      });

      describe('when a standard rule is passed with a value of off', () => {
        test('true should be returned', () => {
          const ruleConfig = {
            'require-author': 'off'
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext);
        });
      });

      describe('when a rule is set to a boolean', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'require-author': true
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "require-author" is invalid:\n\tmust be set to "error", "warning", or "off". Currently set to "true".'
          );
        });
      });

      describe('when a rule is set to a number', () => {
        test('an error should be thrown', () => {
          const dummyValue = 1;
          const ruleConfig = {
            'require-author': dummyValue
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "require-author" is invalid:\n\tmust be set to "error", "warning", or "off". Currently set to "1".'
          );
        });
      });
    });
  });

  describe('validate method', () => {
    describe('when validate is called with a valid schema and rules', () => {
      test('all top level items, an exception should not be thrown', () => {
        const config = {
          extends: 'value',
          rules: {},
          root: true
        };
        const source = 'cli';
        jest.spyOn(ConfigValidator, 'validateRules').mockReturnValue(true);

        ConfigValidator.validate(config, source, linterContext);
      });

      test('extends and rules only for top level items, an exception should not be thrown', () => {
        const config = {
          extends: 'value',
          rules: {}
        };
        const source = 'cli';
        jest.spyOn(ConfigValidator, 'validateRules').mockReturnValue(true);

        ConfigValidator.validate(config, source, linterContext);
      });

      test('extends and root only for top level items, an exception should not be thrown', () => {
        const config = {
          extends: 'value',
          root: true
        };
        const source = 'cli';
        jest.spyOn(ConfigValidator, 'validateRules').mockReturnValue(true);

        ConfigValidator.validate(config, source, linterContext);
      });

      test('rules and root for top level items, an exception should not be thrown', () => {
        const config = {
          rules: {},
          root: true
        };
        const source = 'cli';
        jest.spyOn(ConfigValidator, 'validateRules').mockReturnValue(true);

        ConfigValidator.validate(config, source, linterContext);
      });

      test('extends as array items, an exception should not be thrown', () => {
        const config = {
          extends: ['value', 'value2'],
          rules: {},
          root: true
        };
        const source = 'cli';
        jest.spyOn(ConfigValidator, 'validateRules').mockReturnValue(true);

        ConfigValidator.validate(config, source, linterContext);
      });
    });

    describe('when validate is called with an invalid schema and valid rules', () => {
      test('extends is bool, an error should be thrown', () => {
        const config = {
          extends: false,
          rules: {},
          root: true
        };
        const source = 'cli';
        jest.spyOn(ConfigValidator, 'validateRules').mockReturnValue(true);

        expect(() => {
          ConfigValidator.validate(config, source, linterContext);
        }).toThrow('npm-package-json-lint configuration in cli is invalid:');
      });

      test('rules is bool, an error should be thrown', () => {
        const config = {
          extends: ['value', 'value2'],
          rules: false,
          root: true
        };
        const source = 'cli';
        jest.spyOn(ConfigValidator, 'validateRules').mockReturnValue(true);

        expect(() => {
          ConfigValidator.validate(config, source, linterContext);
        }).toThrow('npm-package-json-lint configuration in cli is invalid:');
      });

      test('root is string, an error should be thrown', () => {
        const config = {
          extends: ['value', 'value2'],
          rules: {},
          root: 'true'
        };
        const source = 'cli';
        jest.spyOn(ConfigValidator, 'validateRules').mockReturnValue(true);

        expect(() => {
          ConfigValidator.validate(config, source, linterContext);
        }).toThrow('npm-package-json-lint configuration in cli is invalid:');
      });
    });

    describe('when validate is called with a valid schema and invalid rules', () => {
      test('an error should be thrown', () => {
        const config = {
          extends: 'value',
          rules: {},
          root: true
        };
        const source = 'cli';
        jest.spyOn(ConfigValidator, 'validateRules').mockImplementation(() => {
          throw new Error();
        });

        expect(() => {
          ConfigValidator.validate(config, source, linterContext);
        }).toThrow();
      });
    });
  });
});
