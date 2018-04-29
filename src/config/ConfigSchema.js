'use strict';

/**
 * Top level config properties
 * @type {Object}
 */
const topLevelConfigProperties = {
  'extends': {type: ['string', 'array']},
  'rules': {type: 'object'},
  'root': {type: 'boolean'}
};

/**
 * Config schema defintion
 * @type {Object}
 */
const configurationSchema = {
  type: 'object',
  properties: topLevelConfigProperties,
  additionalProperties: false
};

/**
 * Public ConfigSchema class
 * @class
 */
class ConfigSchema {

  /**
   * Gets configuration schema
   *
   * @returns {Object} schema object
   */
  static get() {
    return configurationSchema;
  }

}

module.exports = ConfigSchema;
