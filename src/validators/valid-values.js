'use strict';

const inArray = require('in-array');

/**
 * Determines whether a node has a valid value
 * @param  {object} packageJsonData Valid JSON
 * @param  {string} nodeName        Name of a node in the package.json file
 * @param  {array}  validValues     Array of valid values to validate against
 * @return {boolean}                True if the node is equal to one of the valid values or is missing. False if it is not.
 */
const isValidValue = function(packageJsonData, nodeName, validValues) {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  return inArray(validValues, packageJsonData[nodeName]);
};

module.exports.isValidValue = isValidValue;
