"use strict";

/**
 * Determines whether a node has a valid value
 * @param  {object} packageJsonData Valid JSON
 * @param  {string} nodeName        Name of a node in the package.json file
 * @param  {array}  validValues     Array of valid values to validate against
 * @return {boolean}                True if the node is equal to one of the valid values or is missing. False if it is not.
 */
let isValidValue = function(packageJsonData, nodeName, validValues) {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  return validValues.indexOf(packageJsonData[nodeName]) > -1;
};

module.exports.isValidValue = isValidValue;
