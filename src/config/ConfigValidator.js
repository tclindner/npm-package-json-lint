const ConfigSchema = require('./ConfigSchema');

/**
 * Validates object rule config
 *
 * @param  {Object}     ruleConfig  Object rule
 * @return {Boolean}               True if config is valid, false if not
 * @static
 */
const isObjectRuleConfigValid = ruleConfig => {
  if (typeof ruleConfig === 'string' && ruleConfig === 'off') {
    return true;
  }

  if (typeof ruleConfig === 'string' && ruleConfig !== 'off') {
    throw new Error('\t- is an object type rule. It must be set to "off" if an object is not supplied.');
  }

  return ConfigSchema.isObjectRuleSchemaValid(ruleConfig);
};

/**
 * Validates optional object rule config
 *
 * @param  {Object}   ruleConfig  Object rule
 * @return {Boolean}              True if config is valid, false if not
 * @static
 */
const isOptionalObjRuleConfigValid = ruleConfig => {
  const object = 1;

  if (typeof ruleConfig === 'string') {
    return ConfigSchema.isStandardRuleSchemaValid(ruleConfig);
  }

  if (ConfigSchema.isObjectRuleSchemaValid(ruleConfig)) {
    if (ruleConfig[object].hasOwnProperty('exceptions')) {
      return ConfigSchema.isOptionalObjExceptSchemaValid(ruleConfig[object].exceptions);
    }
  }

  return true;
};

/**
 * Validates array rule config
 *
 * @param  {Array}     ruleConfig  Array rule
 * @param  {number}    minItems    Min number of items in the array
 * @return {Boolean}               True if config is valid, false if not
 * @static
 */
const isArrayRuleConfigValid = (ruleConfig, minItems) => {
  if (typeof ruleConfig === 'string' && ruleConfig === 'off') {
    return true;
  }

  if (typeof ruleConfig === 'string' && ruleConfig !== 'off') {
    throw new Error('\t- is an array type rule. It must be set to "off" if an array is not supplied.');
  }

  return ConfigSchema.isArrayRuleSchemaValid(ruleConfig, minItems);
};

/**
 * Validates standard rule config
 *
 * @param {Object}      ruleConfig  Value for standard rule config
 * @return {Boolean}                True if config is valid, error if not
 * @static
 */
const isStandardRuleConfigValid = ruleConfig => {
  return ConfigSchema.isStandardRuleSchemaValid(ruleConfig);
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
        isArrayRuleConfigValid(userConfig, ruleModule.minItems);
      } else if (ruleModule.ruleType === 'object') {
        isObjectRuleConfigValid(userConfig);
      } else if (ruleModule.ruleType === 'optionalObject') {
        isOptionalObjRuleConfigValid(userConfig);
      } else {
        isStandardRuleConfigValid(userConfig);
      }
    } catch (err) {
      const modifiedErrorMessage = `Configuration for rule "${ruleName}" is invalid:\n${err.message}`;

      if (typeof source === 'string') {
        throw new Error(`${source}:\n\t${modifiedErrorMessage}`);
      } else {
        throw new Error(modifiedErrorMessage);
      }
    }
  }
};

/**
 * Validates only the rules of a config object
 *
 * @param {Object} rulesConfig The rules config object to validate.
 * @param {String} source The name of the configuration source to report in any errors.
 * @param {Object} rules  Rules object
 * @returns {undefined} No return
 * @static
 */
const validateRules = (rulesConfig, source, rules) => {
  if (!rulesConfig) {
    return;
  }

  Object.keys(rulesConfig).forEach(ruleName => {
    const ruleModule = rules.get(ruleName);

    validateRule(ruleModule, ruleName, rulesConfig[ruleName], source);
  });
};

/**
 * Validates entire config object, including top-level properties.
 *
 * @param {Object} config The config object to validate.
 * @param {String} source The name of the configuration source to report in any errors.
 * @param {Object} rules  Rules object
 * @returns {undefined} No return
 * @static
 */
const validate = (config, source, rules) => {
  ConfigSchema.isConfigObjectSchemaValid(config, source);
  validateRules(config.rules, source, rules);
};

module.exports = {
  validate,
  validateRules
};
