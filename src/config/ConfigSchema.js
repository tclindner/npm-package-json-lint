const Ajv = require('ajv');
const ajvErrors = require('ajv-errors');

const ajv = new Ajv({allErrors: true, jsonPointers: true});

ajvErrors(ajv);

/**
 * Formats an array of schema validation errors.
 *
 * @param {Array} errors An array of error messages to format.
 * @returns {String} Formatted error message
 */
const formatSchemaErrors = errors => {
  return errors.map(error => `\t- ${error.message}\n`).join('');
};

const standardRuleSchema = {
  type: 'string',
  enum: ['off', 'warning', 'error'],
  errorMessage: {
    type: 'severity must be a string.',
    enum: 'severity must be either "off", "warning", or "error".'
  }
};

const arrayRuleSchema = {
  type: 'array',
  items: [
    standardRuleSchema,
    {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      errorMessage: {
        type: 'the second item in an array rule config must be an array.',
        minItems: 'the second item in an array rule config must have at least 1 item.',
        uniqueItems: 'the second item in an array rule config must have unique items.'
      }
    }
  ],
  minItems: 2,
  maxItems: 2,
  additionalItems: false,
  errorMessage: {
    type: 'rule config must be an array, e.g. ["error", ["value1", "value2"]].',
    minItems: 'array rules must have two items, severity and options array. e.g. ["error", ["value1", "value2"]].',
    maxItems: 'array rules must have two items, severity and options array. e.g. ["error", ["value1", "value2"]].',
    additionalItems:
      'array rules are only allowed two items, severity and the list is values. e.g. ["error", ["value1", "value2"]].'
  }
};

const objectRuleSchema = {
  type: 'array',
  items: [
    standardRuleSchema,
    {
      type: 'object',
      errorMessage: {
        type: 'the second item in an object rule config must be an object.'
      }
    }
  ],
  minItems: 2,
  maxItems: 2,
  additionalItems: false,
  errorMessage: {
    type: 'rule config must be an array, e.g. ["error", {}].',
    minItems: 'object rules must have two items, severity and options object. e.g. ["error", {}].',
    maxItems: 'object rules must have two items, severity and options object. e.g. ["error", {}].',
    additionalItems: 'object rules are only allowed two items, severity and options object. e.g. ["error", {}].'
  }
};

const optionalObjExceptionsSchema = {
  type: 'array',
  items: [
    {
      type: 'string',
      errorMessage: {
        type: 'each exception must be a string.'
      }
    }
  ],
  uniqueItems: true,
  minItems: 1,
  errorMessage: {
    type: 'expections must be an array.',
    minItems: 'expections must have at least 1 item.',
    uniqueItems: 'expections must have unique items.'
  }
};

const configurationSchema = {
  type: 'object',
  properties: {
    extends: {
      type: ['string', 'array'],
      items: {
        type: 'string'
      },
      minItems: 1,
      uniqueItems: true,
      errorMessage: {
        type: 'extends must be either a string or an array of strings.',
        minItems: 'extends must have at least one item if it is an array.',
        uniqueItems: 'extends must have unique items if it is an array.'
      }
    },
    rules: {
      type: 'object',
      errorMessage: {
        type: 'rules must be an object.'
      }
    },
    root: {
      type: 'boolean',
      errorMessage: {
        type: 'root must be a boolean.'
      }
    }
  },
  additionalProperties: true,
  errorMessage: {
    type: 'npm-package-json-lint config should be an object.',
    additionalProperties:
      'npm-package-json-lint config has unexpected top-level property. Valid properties include: `extends`, `rules`, and `root`.'
  }
};

/**
 * Validates standard rules config.
 *
 * @param {Object} ruleConfig The ruleConfig object to validate.
 * @returns {boolean} True if valid. Error if not.
 */
const isStandardRuleSchemaValid = ruleConfig => {
  const validate = ajv.compile(standardRuleSchema);
  const isValid = validate(ruleConfig);

  if (!isValid) {
    throw new Error(`${formatSchemaErrors(validate.errors)}`);
  }

  return true;
};

/**
 * Validates array rules config.
 *
 * @param {Object} ruleConfig The ruleConfig object to validate.
 * @returns {boolean} True if valid. Error if not.
 */
const isArrayRuleSchemaValid = ruleConfig => {
  const validate = ajv.compile(arrayRuleSchema);
  const isValid = validate(ruleConfig);

  if (!isValid) {
    throw new Error(`${formatSchemaErrors(validate.errors)}`);
  }

  return true;
};

/**
 * Validates array rules config.
 *
 * @param {Object} ruleConfig The ruleConfig object to validate.
 * @returns {boolean} True if valid. Error if not.
 */
const isObjectRuleSchemaValid = ruleConfig => {
  const validate = ajv.compile(objectRuleSchema);
  const isValid = validate(ruleConfig);

  if (!isValid) {
    throw new Error(`${formatSchemaErrors(validate.errors)}`);
  }

  return true;
};

/**
 * Validates optional object exceptions config.
 *
 * @param {Object} ruleConfig The ruleConfig object to validate.
 * @returns {boolean} True if valid. Error if not.
 */
const isOptionalObjExceptSchemaValid = ruleConfig => {
  const validate = ajv.compile(optionalObjExceptionsSchema);
  const isValid = validate(ruleConfig);

  if (!isValid) {
    throw new Error(`${formatSchemaErrors(validate.errors)}`);
  }

  return true;
};

/**
 * Validates the top level properties of the config object.
 *
 * @param {Object} config The config object to validate.
 * @param {string} source The name of the configuration source to report in any errors.
 * @returns {boolean} True if valid. Error if not.
 */
const isConfigObjectSchemaValid = (config, source) => {
  const validate = ajv.compile(configurationSchema);
  const isValid = validate(config);

  if (!isValid) {
    throw new Error(`npm-package-json-lint configuration in ${source} is invalid:\n${formatSchemaErrors(validate.errors)}`);
  }

  return true;
};

module.exports = {
  isConfigObjectSchemaValid,
  isStandardRuleSchemaValid,
  isArrayRuleSchemaValid,
  isObjectRuleSchemaValid,
  isOptionalObjExceptSchemaValid
};
