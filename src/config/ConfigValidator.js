/* eslint no-else-return: 'off' */

const Ajv = require('ajv');
const isPlainObj = require('is-plain-obj');
const ConfigSchema = require('./ConfigSchema');

/**
 * Formats an array of schema validation errors.
 *
 * @param {Array} errors An array of error messages to format.
 * @returns {String} Formatted error message
 */
const formatSchemaErrors = (errors) => {
  const secondChar = 1;

  return errors.map((error) => {
    if (error.keyword === 'additionalProperties') {
      const formattedPropertyPath = error.dataPath.length ? `${error.dataPath.slice(secondChar)}.${error.params.additionalProperty}` : error.params.additionalProperty;

      return `Unexpected top-level property "${formattedPropertyPath}"`;
    }

    if (error.keyword === 'type') {
      const formattedField = error.dataPath.slice(secondChar);
      const formattedExpectedType = Array.isArray(error.schema) ? error.schema.join('/') : error.schema;
      const formattedValue = JSON.stringify(error.data);

      return `Property "${formattedField}" is the wrong type (expected ${formattedExpectedType} but got \`${formattedValue}\`)`;
    }

    const field = error.dataPath[0] === '.' ? error.dataPath.slice(secondChar) : error.dataPath;

    return `"${field}" ${error.message}. Value: ${JSON.stringify(error.data)}`;
  }).map((message) => `\t- ${message}.\n`).join('');
};

/**
 * Validates if the severity config is set correctly
 * @param  {String}  severity Severity the rule is set to
 * @return {Boolean}          True if the severity is valid. False if the severity is invalid.
 * @private
 */
const isSeverityInvalid = (severity) => typeof severity !== 'string' || (typeof severity === 'string' && severity !== 'error' && severity !== 'warning' && severity !== 'off');

/**
 * Validates object rule config
 *
 * @param  {Object}     ruleConfig  Object rule
 * @return {Boolean}               True if config is valid, false if not
 * @static
 */
const isObjectRuleConfigValid = (ruleConfig) => {
  const severityIndex = 0;
  const object = 1;

  if (typeof ruleConfig === 'string' && ruleConfig === 'off') {
    return true;
  } else if (typeof ruleConfig === 'string' && ruleConfig !== 'off') {
    throw new Error('is an object type rule. It must be set to "off" if an object is not supplied.');
  } else if (typeof ruleConfig[severityIndex] !== 'string' || isSeverityInvalid(ruleConfig[severityIndex])) {
    throw new Error(`first key must be set to "error", "warning", or "off". Currently set to "${ruleConfig[severityIndex]}".`);
  }

  if (!isPlainObj(ruleConfig[object])) {
    throw new Error(`second key must be set an object. Currently set to "${ruleConfig[object]}".`);
  }

  return true;
};

/**
 * Validates array rule config
 *
 * @param  {Array}     ruleConfig  Array rule
 * @return {Boolean}               True if config is valid, false if not
 * @static
 */
const isArrayRuleConfigValid = (ruleConfig) => {
  const severityIndex = 0;
  const arrayIndex = 1;

  if (typeof ruleConfig === 'string' && ruleConfig === 'off') {
    return true;
  } else if (typeof ruleConfig === 'string' && ruleConfig !== 'off') {
    throw new Error('is an array type rule. It must be set to "off" if an array is not supplied.');
  } else if (typeof ruleConfig[severityIndex] !== 'string' || isSeverityInvalid(ruleConfig[severityIndex])) {
    throw new Error(`first key must be set to "error", "warning", or "off". Currently set to "${ruleConfig[severityIndex]}".`);
  }

  if (!Array.isArray(ruleConfig[arrayIndex])) {
    throw new Error(`second key must be set an array. Currently set to "${ruleConfig[arrayIndex]}".`);
  }

  return true;
};

/**
 * Validates standard rule config
 *
 * @param  {Object}     ruleConfig   Value for standard rule config
 * @return {Boolean}                 True if config is valid, false if not
 * @static
 */
const isStandardRuleConfigValid = (ruleConfig) => {
  if (isSeverityInvalid(ruleConfig)) {
    throw new Error(`must be set to "error", "warning", or "off". Currently set to "${ruleConfig}".`);
  }

  return true;
};

/**
 * Validates configuration of a rule
 *
 * @param {Object} ruleModule The rule object.
 * @param {string} ruleName The rule's unique name.
 * @param {Array|String} userConfig The user's configuration for a rule.
 * @param {String|null} source The name of the configuration source to report in any errors.
 * @returns {undefined} No return
 */
const validateRule = (ruleModule, ruleName, userConfig, source) => {
  if (ruleModule) {
    try {
      if (ruleModule.ruleType === 'array') {
        isArrayRuleConfigValid(userConfig);
      } else if (ruleModule.ruleType === 'object') {
        isObjectRuleConfigValid(userConfig);
      } else {
        isStandardRuleConfigValid(userConfig);
      }
    } catch (err) {
      const modifiedErrorMessage = `Configuration for rule "${ruleName}" is invalid:\n\t${err.message}`;

      if (typeof source === 'string') {
        throw new Error(`${source}:\n\t${modifiedErrorMessage}`);
      } else {
        throw new Error(modifiedErrorMessage);
      }
    }
  }
};

/**
 * Validates the top level properties of the config object.
 *
 * @param {Object} config The config object to validate.
 * @param {string} source The name of the configuration source to report in any errors.
 * @returns {undefined} No return
 */
const validateConfigSchema = (config, source) => {
  const ajv = new Ajv({allErrors: true});
  const schemaValidateResult = ajv.validate(ConfigSchema.get(), config);

  if (!schemaValidateResult) {
    throw new Error(`npm-package-json-lint configuration in ${source} is invalid:\n${formatSchemaErrors(ajv.errors)}`);
  }
};

/**
 * Public ConfigValidator class
 * @class
 */
class ConfigValidator {

  /**
   * Validates entire config object, including top-level properties.
   *
   * @param {Object} config The config object to validate.
   * @param {String} source The name of the configuration source to report in any errors.
   * @param {NpmPackageJsonLint} linterContext Linter context
   * @returns {undefined} No return
   * @static
   */
  static validate(config, source, linterContext) {
    validateConfigSchema(config, source);
    ConfigValidator.validateRules(config.rules, source, linterContext);
  }

  /**
   * Validates only the rules of a config object
   *
   * @param {Object} rulesConfig The rules config object to validate.
   * @param {String} source The name of the configuration source to report in any errors.
   * @param {NpmPackageJsonLint} linterContext Linter context
   * @returns {undefined} No return
   * @static
   */
  static validateRules(rulesConfig, source, linterContext) {
    if (!rulesConfig) {
      return;
    }

    Object.keys(rulesConfig).forEach((ruleName) => {
      const ruleModule = linterContext.getRule(ruleName);

      validateRule(ruleModule, ruleName, rulesConfig[ruleName], source);
    });
  }

}

module.exports = ConfigValidator;
