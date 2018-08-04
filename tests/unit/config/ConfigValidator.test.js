'use strict';

const chai = require('chai');
const sinon = require('sinon');
const ConfigValidator = require('./../../../src/config/ConfigValidator');
const NpmPackageJsonLint = require('./../../../src/NpmPackageJsonLint');

const should = chai.should();
const linterContext = new NpmPackageJsonLint();

describe('ConfigValidator Unit Tests', function() {
  describe('validate method', function() {
    context('when validate is called with a valid schema and rules', function() {
      it('all top level items, an exception should not be thrown', function() {
        const config = {
          'extends': 'value',
          'rules': {},
          'root': true
        };
        const source = 'cli';
        const stub = sinon.stub(ConfigValidator, 'validateRules').returns(true);

        ConfigValidator.validate(config, source, linterContext);
        ConfigValidator.validateRules.restore();
      });

      it('extends and rules only for top level items, an exception should not be thrown', function() {
        const config = {
          'extends': 'value',
          'rules': {}
        };
        const source = 'cli';
        const stub = sinon.stub(ConfigValidator, 'validateRules').returns(true);

        ConfigValidator.validate(config, source, linterContext);
        ConfigValidator.validateRules.restore();
      });

      it('extends and root only for top level items, an exception should not be thrown', function() {
        const config = {
          'extends': 'value',
          'root': true
        };
        const source = 'cli';
        const stub = sinon.stub(ConfigValidator, 'validateRules').returns(true);

        ConfigValidator.validate(config, source, linterContext);
        ConfigValidator.validateRules.restore();
      });

      it('rules and root for top level items, an exception should not be thrown', function() {
        const config = {
          rules: {},
          root: true
        };
        const source = 'cli';
        const stub = sinon.stub(ConfigValidator, 'validateRules').returns(true);

        ConfigValidator.validate(config, source, linterContext);
        ConfigValidator.validateRules.restore();
      });

      it('extends as array items, an exception should not be thrown', function() {
        const config = {
          'extends': ['value', 'value2'],
          'rules': {},
          'root': true
        };
        const source = 'cli';
        const stub = sinon.stub(ConfigValidator, 'validateRules').returns(true);

        ConfigValidator.validate(config, source, linterContext);
        ConfigValidator.validateRules.restore();
      });
    });

    context('when validate is called with an invalid schema and valid rules', function() {
      it('extends is bool, an error should be thrown', function() {
        const config = {
          'extends': false,
          'rules': {},
          'root': true
        };
        const source = 'cli';
        const stub = sinon.stub(ConfigValidator, 'validateRules').returns(true);

        (function() {
          ConfigValidator.validate(config, source, linterContext);
        }).should.throw('npm-package-json-lint configuration in cli is invalid:');

        ConfigValidator.validateRules.restore();
      });

      it('rules is bool, an error should be thrown', function() {
        const config = {
          'extends': ['value', 'value2'],
          'rules': false,
          'root': true
        };
        const source = 'cli';
        const stub = sinon.stub(ConfigValidator, 'validateRules').returns(true);

        (function() {
          ConfigValidator.validate(config, source, linterContext);
        }).should.throw('npm-package-json-lint configuration in cli is invalid:');

        ConfigValidator.validateRules.restore();
      });

      it('root is string, an error should be thrown', function() {
        const config = {
          'extends': ['value', 'value2'],
          'rules': {},
          'root': 'true'
        };
        const source = 'cli';
        const stub = sinon.stub(ConfigValidator, 'validateRules').returns(true);

        (function() {
          ConfigValidator.validate(config, source, linterContext);
        }).should.throw('npm-package-json-lint configuration in cli is invalid:');

        ConfigValidator.validateRules.restore();
      });
    });

    context('when validate is called with a valid schema and invalid rules', function() {
      it('an error should be thrown', function() {
        const config = {
          'extends': 'value',
          'rules': {},
          'root': true
        };
        const source = 'cli';
        const stub = sinon.stub(ConfigValidator, 'validateRules').throws();

        (function() {
          ConfigValidator.validate(config, source, linterContext);
        }).should.throw();

        ConfigValidator.validateRules.restore();
      });
    });
  });

  describe('validateRules method', function() {
    context('isArrayRuleConfigValid tests', function() {
      context('when a rule is an array rule and the first key is not equal to error, warning, or off', function() {
        it('an error should be thrown', function() {
          const ruleConfig = {
            'valid-values-author': [true, ['Thomas', 'Lindner', 'Thomas Lindner']]
          };
          const source = 'cli';

          (function() {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).should.throw('cli:\n\tConfiguration for rule "valid-values-author" is invalid:\n\tfirst key must be set to "error", "warning", or "off". Currently set to "true".');
        });
      });

      context('when a rule is an array rule and the second key is not an Array', function() {
        it('an error should be thrown', function() {
          const ruleConfig = {
            'valid-values-author': ['error', 'Thomas']
          };
          const source = 'cli';

          (function() {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).should.throw('cli:\n\tConfiguration for rule "valid-values-author" is invalid:\n\tsecond key must be set an array. Currently set to "Thomas".');
        });
      });

      context('when a valid array rule config is passed', function() {
        it('true should be returned', function() {
          const ruleConfig = {
            'prefer-property-order': ['error', ['name', 'version']]
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext);
        });
      });

      context('when a valid array rule config is passed with a value of off', function() {
        it('true should be returned', function() {
          const ruleConfig = {
            'prefer-property-order': 'off'
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext);
        });
      });

      context('when a invalid array rule config is passed with a value of error', function() {
        it('true should be returned', function() {
          const ruleConfig = {
            'valid-values-author': 'error'
          };
          const source = 'cli';

          (function() {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).should.throw('cli:\n\tConfiguration for rule "valid-values-author" is invalid:\n\tis an array type rule. It must be set to "off" if an array is not supplied.');
        });
      });
    });

    context('isObjectRuleConfigValid tests', function() {
      context('when a rule is an object rule and the first key is not equal to error, warning, or off', function() {
        it('an error should be thrown', function() {
          const ruleConfig = {
            'description-format': [true, {requireCapitalFirstLetter: true, requireEndingPeriod: true}]
          };
          const source = 'cli';

          (function() {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).should.throw('cli:\n\tConfiguration for rule "description-format" is invalid:\n\tfirst key must be set to "error", "warning", or "off". Currently set to "true".');
        });
      });

      context('when a rule is an object rule and the second key is not an Object', function() {
        it('an error should be thrown', function() {
          const ruleConfig = {
            'description-format': ['error', 'Thomas']
          };
          const source = 'cli';

          (function() {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).should.throw('cli:\n\tConfiguration for rule "description-format" is invalid:\n\tsecond key must be set an object. Currently set to "Thomas".');
        });
      });

      context('when a valid object rule config is passed', function() {
        it('true should be returned', function() {
          const ruleConfig = {
            'description-format': ['error', {requireCapitalFirstLetter: true, requireEndingPeriod: true}]
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext);
        });
      });

      context('when a valid object rule config is passed with a value of off', function() {
        it('true should be returned', function() {
          const ruleConfig = {
            'description-format': 'off'
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext);
        });
      });

      context('when a invalid object rule config is passed with a value of error', function() {
        it('true should be returned', function() {
          const ruleConfig = {
            'description-format': 'error'
          };
          const source = 'cli';

          (function() {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).should.throw('cli:\n\tConfiguration for rule "description-format" is invalid:\n\tis an object type rule. It must be set to "off" if an object is not supplied.');
        });
      });
    });

    context('isStandardRuleConfigValid tests', function() {
      context('when a standard rule is passed with a value of error', function() {
        it('true should be returned', function() {
          const ruleConfig = {
            'require-author': 'error'
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext);
        });
      });

      context('when a standard rule is passed with a value of warning', function() {
        it('true should be returned', function() {
          const ruleConfig = {
            'require-author': 'warning'
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext);
        });
      });

      context('when a standard rule is passed with a value of off', function() {
        it('true should be returned', function() {
          const ruleConfig = {
            'require-author': 'off'
          };
          const source = 'cli';

          ConfigValidator.validateRules(ruleConfig, source, linterContext);
        });
      });

      context('when a rule is set to a boolean', function() {
        it('an error should be thrown', function() {
          const ruleConfig = {
            'require-author': true
          };
          const source = 'cli';

          (function() {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).should.throw('cli:\n\tConfiguration for rule "require-author" is invalid:\n\tmust be set to "error", "warning", or "off". Currently set to "true".');
        });
      });

      context('when a rule is set to a number', function() {
        it('an error should be thrown', function() {
          const dummyValue = 1;
          const ruleConfig = {
            'require-author': dummyValue
          };
          const source = 'cli';

          (function() {
            ConfigValidator.validateRules(ruleConfig, source, linterContext);
          }).should.throw('cli:\n\tConfiguration for rule "require-author" is invalid:\n\tmust be set to "error", "warning", or "off". Currently set to "1".');
        });
      });
    });
  });
});
