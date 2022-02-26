import {
  isArrayRuleSchemaValid,
  isConfigObjectSchemaValid,
  isObjectRuleSchemaValid,
  isOptionalObjExceptSchemaValid,
  isStandardRuleSchemaValid,
} from './ConfigSchema';

/**
 * Validates object rule config
 *
 * @param  {Object}     ruleConfig  Object rule
 * @return {Boolean}               True if config is valid, false if not
 * @static
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isObjectRuleConfigValid = (ruleConfig: any): any => {
  if (typeof ruleConfig === 'string' && ruleConfig === 'off') {
    return true;
  }

  if (typeof ruleConfig === 'string' && ruleConfig !== 'off') {
    throw new Error('\t- is an object type rule. It must be set to "off" if an object is not supplied.');
  }

  return isObjectRuleSchemaValid(ruleConfig);
};

/**
 * Validates optional object rule config
 *
 * @param  {Object}   ruleConfig  Object rule
 * @return {Boolean}              True if config is valid, false if not
 * @static
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isOptionalObjRuleConfigValid = (ruleConfig: any): any => {
  const object = 1;

  if (typeof ruleConfig === 'string') {
    return isStandardRuleSchemaValid(ruleConfig);
  }

  if (isObjectRuleSchemaValid(ruleConfig) && ruleConfig[object].hasOwnProperty('exceptions')) {
    return isOptionalObjExceptSchemaValid(ruleConfig[object].exceptions);
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isArrayRuleConfigValid = (ruleConfig: any, minItems: any): any => {
  if (typeof ruleConfig === 'string' && ruleConfig === 'off') {
    return true;
  }

  if (typeof ruleConfig === 'string' && ruleConfig !== 'off') {
    throw new Error('\t- is an array type rule. It must be set to "off" if an array is not supplied.');
  }

  return isArrayRuleSchemaValid(ruleConfig, minItems);
};

/**
 * Validates standard rule config
 *
 * @param {Object}      ruleConfig  Value for standard rule config
 * @return {Boolean}                True if config is valid, error if not
 * @static
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStandardRuleConfigValid = (ruleConfig: any): any => isStandardRuleSchemaValid(ruleConfig);

/**
 * Validates configuration of a rule
 *
 * @param {Object} ruleModule The rule object.
 * @param {string} ruleName The rule's unique name.
 * @param {Array|String} userConfig The user's configuration for a rule.
 * @param {String|null} source The name of the configuration source to report in any errors.
 * @returns {undefined} No return
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateRule = (ruleModule: any, ruleName: any, userConfig: any, source: any): any => {
  if (ruleModule) {
    try {
      switch (ruleModule.ruleType) {
        case 'array': {
          isArrayRuleConfigValid(userConfig, ruleModule.minItems);

          break;
        }
        case 'object': {
          isObjectRuleConfigValid(userConfig);

          break;
        }
        case 'optionalObject': {
          isOptionalObjRuleConfigValid(userConfig);

          break;
        }
        default: {
          isStandardRuleConfigValid(userConfig);
        }
      }
    } catch (error_) {
      const modifiedErrorMessage = `Configuration for rule "${ruleName}" is invalid:\n${error_.message}`;

      const error =
        typeof source === 'string' ? new Error(`${source}:\n\t${modifiedErrorMessage}`) : new Error(modifiedErrorMessage);

      throw error;
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateRules = (rulesConfig: any, source: any, rules: any): any => {
  if (!rulesConfig) {
    return;
  }

  Object.keys(rulesConfig).forEach((ruleName) => {
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validate = (config: any, source: any, rules: any): any => {
  isConfigObjectSchemaValid(config, source);
  validateRules(config.rules, source, rules);
};
