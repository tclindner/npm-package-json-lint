'use strict';

/**
 * Determines whether an array is in alphabetical order
 * @param  {object} packageJsonData Valid JSON
 * @param  {string} nodeName        Name of a node in the package.json file
 * @return {boolean}                True if the node is in alphabetical order or is missing. False if it is not.
 */
const isInAlphabeticalOrder = function(packageJsonData, nodeName) {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  let isValid = true;
  const increment = 1;
  const nodeKeysOriginal = Object.keys(packageJsonData[nodeName]);
  let nodeKeysSorted = Object.keys(packageJsonData[nodeName]);

  nodeKeysSorted = nodeKeysSorted.sort();

  for (let keyIndex = 0;keyIndex <= nodeKeysOriginal.length;keyIndex += increment) {
    if (nodeKeysOriginal[keyIndex] !== nodeKeysSorted[keyIndex]) {
      isValid = false;
      break;
    }
  }

  return isValid;
};

module.exports.isInAlphabeticalOrder = isInAlphabeticalOrder;
