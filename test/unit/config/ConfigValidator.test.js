const ConfigValidator = require('./../../../src/config/ConfigValidator');
const NpmPackageJsonLint = require('./../../../src/NpmPackageJsonLint');

// const linterContext = new NpmPackageJsonLint();
const linterContext = null;

describe.skip('ConfigValidator Unit Tests', () => {
  describe('validateRules method', () => {
    describe('when called with null rulesConfig', () => {
      test('undefined should be returned', () => {
        const ruleConfig = null;
        const source = 'cli';

        const actual = ConfigValidator.validateRules(ruleConfig, source, linterContext);
        expect(actual).toBeUndefined();
      });
    });

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
            'cli:\n\tConfiguration for rule "valid-values-author" is invalid:\n\t- severity must be a string.\n\t- severity must be either "off", "warning", or "error".'
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
            'cli:\n\tConfiguration for rule "valid-values-author" is invalid:\n\t- the second item in an array rule config must be an array.'
          );
        });
      });

      describe('when a rule is an array rule and the second key is an Array with no items', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'valid-values-author': ['error', []]
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "valid-values-author" is invalid:\n\t- the second item in an array rule config must have at least 1 item.'
          );
        });
      });

      describe('when a rule is an array rule and the second key is an Array with duplicate items', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'valid-values-author': ['error', ['item1', 'item2', 'item1']]
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "valid-values-author" is invalid:\n\t- the second item in an array rule config must have unique items.'
          );
        });
      });

      describe('when a rule is an array rule and it is set to false', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'valid-values-author': false
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "valid-values-author" is invalid:\n\t- rule config must be an array, e.g. ["error", ["value1", "value2"]].'
          );
        });
      });

      describe('when a rule is an array rule and the array is empty', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'valid-values-author': []
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "valid-values-author" is invalid:\n\t- array rules must have two items, severity and options array. e.g. ["error", ["value1", "value2"]].'
          );
        });
      });

      describe('when a rule is an array rule and the array has too many items', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'valid-values-author': ['error', ['test'], 'extra']
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "valid-values-author" is invalid:\n\t- array rules must have two items, severity and options array. e.g. ["error", ["value1", "value2"]].\n\t- array rules are only allowed two items, severity and the list is values. e.g. ["error", ["value1", "value2"]].'
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
            'cli:\n\tConfiguration for rule "valid-values-author" is invalid:\n\t- is an array type rule. It must be set to "off" if an array is not supplied.'
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
            'cli:\n\tConfiguration for rule "description-format" is invalid:\n\t- severity must be a string.\n\t- severity must be either "off", "warning", or "error".'
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
            'cli:\n\tConfiguration for rule "description-format" is invalid:\n\t- the second item in an object rule config must be an object.'
          );
        });
      });

      describe('when a rule is an object rule and it is set to false', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'description-format': false
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "description-format" is invalid:\n\t- rule config must be an array, e.g. ["error", {}].'
          );
        });
      });

      describe('when a rule is an object rule and the array is empty', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'description-format': []
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "description-format" is invalid:\n\t- object rules must have two items, severity and options object. e.g. ["error", {}].'
          );
        });
      });

      describe('when a rule is an object rule and the array has too many items', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'description-format': ['error', {}, 'extra']
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "description-format" is invalid:\n\t- object rules must have two items, severity and options object. e.g. ["error", {}].\n\t- object rules are only allowed two items, severity and options object. e.g. ["error", {}].'
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
            'cli:\n\tConfiguration for rule "description-format" is invalid:\n\t- is an object type rule. It must be set to "off" if an object is not supplied.'
          );
        });
      });
    });

    describe('isOptionalObjRuleConfigValid tests', () => {
      describe('when a rule is an optionalObject rule, is standard format, and the value is not equal to error, warning, or off', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'prefer-no-version-zero-dependencies': 'true'
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "prefer-no-version-zero-dependencies" is invalid:\n\t- severity must be either "off", "warning", or "error".'
          );
        });
      });

      describe('when a rule is an optionalObject rule, object is passed, and the first key is not equal to error, warning, or off', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'prefer-no-version-zero-dependencies': ['true', {}]
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "prefer-no-version-zero-dependencies" is invalid:\n\t- severity must be either "off", "warning", or "error".'
          );
        });
      });

      describe('when a rule is an optionalObject rule and the second key is not an Object', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'prefer-no-version-zero-dependencies': ['error', 'Thomas']
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "prefer-no-version-zero-dependencies" is invalid:\n\t- the second item in an object rule config must be an object.'
          );
        });
      });

      describe('when a rule is an optionalObject rule, exceptions is not an array', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'prefer-no-version-zero-dependencies': ['error', {exceptions: 'module1'}]
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "prefer-no-version-zero-dependencies" is invalid:\n\t- expections must be an array.'
          );
        });
      });

      describe('when a rule is an optionalObject rule, exceptions is empty array', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'prefer-no-version-zero-dependencies': ['error', {exceptions: []}]
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "prefer-no-version-zero-dependencies" is invalid:\n\t- expections must have at least 1 item.'
          );
        });
      });

      describe('when a rule is an optionalObject rule, exceptions array has dups', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'prefer-no-version-zero-dependencies': ['error', {exceptions: ['module1', 'module1']}]
          };
          const source = null;

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'Configuration for rule "prefer-no-version-zero-dependencies" is invalid:\n\t- expections must have unique items.'
          );
        });
      });

      describe('when a rule is an optionalObject rule, exceptions array has invalid items', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'prefer-no-version-zero-dependencies': ['error', {exceptions: [1]}]
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "prefer-no-version-zero-dependencies" is invalid:\n\t- each exception must be a string.'
          );
        });
      });

      describe('when a rule is an optionalObject rule and it is set to false', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'prefer-no-version-zero-dependencies': false
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "prefer-no-version-zero-dependencies" is invalid:\n\t- rule config must be an array, e.g. ["error", {}].'
          );
        });
      });

      describe('when a rule is an optionalObject rule and the array is empty', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'prefer-no-version-zero-dependencies': []
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "prefer-no-version-zero-dependencies" is invalid:\n\t- object rules must have two items, severity and options object. e.g. ["error", {}].'
          );
        });
      });

      describe('when a rule is an optionalObject rule and the array has too many items', () => {
        test('an error should be thrown', () => {
          const ruleConfig = {
            'prefer-no-version-zero-dependencies': ['error', {}, 'extra']
          };
          const source = 'cli';

          expect(() => {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).toThrow(
            'cli:\n\tConfiguration for rule "prefer-no-version-zero-dependencies" is invalid:\n\t- object rules must have two items, severity and options object. e.g. ["error", {}].\n\t- object rules are only allowed two items, severity and options object. e.g. ["error", {}].'
          );
        });
      });

      describe('when a valid object rule config is passed with exceptions', () => {
        test('true should be returned', () => {
          const ruleConfig = {
            'prefer-no-version-zero-dependencies': ['error', {exceptions: ['module1']}]
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext);
        });
      });

      describe('when a valid object rule config is passed with a value of off', () => {
        test('true should be returned', () => {
          const ruleConfig = {
            'prefer-no-version-zero-dependencies': 'off'
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext);
        });
      });

      describe('when a valid object rule config is passed with a value of error', () => {
        test('true should be returned', () => {
          const ruleConfig = {
            'prefer-no-version-zero-dependencies': 'error'
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext);
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
            'cli:\n\tConfiguration for rule "require-author" is invalid:\n\t- severity must be a string.\n\t- severity must be either "off", "warning", or "error".'
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
            'cli:\n\tConfiguration for rule "require-author" is invalid:\n\t- severity must be a string.\n\t- severity must be either "off", "warning", or "error".'
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
        }).toThrow(
          'npm-package-json-lint configuration in cli is invalid:\n\t- extends must be either a string or an array of strings.\n'
        );
      });

      test('extends is an array with no items, an error should be thrown', () => {
        const config = {
          extends: [],
          rules: {},
          root: true
        };
        const source = 'cli';
        jest.spyOn(ConfigValidator, 'validateRules').mockReturnValue(true);

        expect(() => {
          ConfigValidator.validate(config, source, linterContext);
        }).toThrow(
          'npm-package-json-lint configuration in cli is invalid:\n\t- extends must have at least one item if it is an array.\n'
        );
      });

      test('extends is an array with duplicate items, an error should be thrown', () => {
        const config = {
          extends: ['module1', 'module1'],
          rules: {},
          root: true
        };
        const source = 'cli';
        jest.spyOn(ConfigValidator, 'validateRules').mockReturnValue(true);

        expect(() => {
          ConfigValidator.validate(config, source, linterContext);
        }).toThrow(
          'npm-package-json-lint configuration in cli is invalid:\n\t- extends must have unique items if it is an array.\n'
        );
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
        }).toThrow('npm-package-json-lint configuration in cli is invalid:\n\t- rules must be an object.\n');
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
        }).toThrow('npm-package-json-lint configuration in cli is invalid:\n\t- root must be a boolean.\n');
      });

      test('config is a string, an error should be thrown', () => {
        const config = 'my config';
        const source = 'cli';
        jest.spyOn(ConfigValidator, 'validateRules').mockReturnValue(true);

        expect(() => {
          ConfigValidator.validate(config, source, linterContext);
        }).toThrow(
          'npm-package-json-lint configuration in cli is invalid:\n\t- npm-package-json-lint config should be an object.\n'
        );
      });

      test('config has extra properties, an error should be thrown', () => {
        const config = {
          extends: 'module1',
          rules: {},
          root: true,
          extraProp: true
        };
        const source = 'cli';
        jest.spyOn(ConfigValidator, 'validateRules').mockReturnValue(true);

        expect(() => {
          ConfigValidator.validate(config, source, linterContext);
        }).toThrow(
          'npm-package-json-lint configuration in cli is invalid:\n\t- npm-package-json-lint config has unexpected top-level property. Valid properties include: `extends`, `rules`, and `root`.\n'
        );
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
