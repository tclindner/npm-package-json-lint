const increment = 1;

/**
 * Determines whether an array is in alphabetical order
 * @param  {object} packageJsonData Valid JSON
 * @param  {string} nodeName        Name of a node in the package.json file
 * @return {object}                 Object containing the status and the dependencies that are out of order, if applicable
 */
const isInAlphabeticalOrder = (packageJsonData, nodeName) => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return {
      status: true,
      data: {
        invalidNode: null,
        validNode: null
      }
    };
  }

  let isValid = true;
  let data = {
    invalidNode: null,
    validNode: null
  };
  const nodeKeysOriginal = Object.keys(packageJsonData[nodeName]);
  const nodeKeysSorted = Object.keys(packageJsonData[nodeName]).sort();

  for (let keyIndex = 0;keyIndex < nodeKeysOriginal.length;keyIndex += increment) {
    if (nodeKeysOriginal[keyIndex] !== nodeKeysSorted[keyIndex]) {
      isValid = false;
      data = {
        invalidNode: nodeKeysOriginal[keyIndex],
        validNode: nodeKeysSorted[keyIndex]
      };
      break;
    }
  }

  return {
    status: isValid,
    data
  };
};

module.exports.isInAlphabeticalOrder = isInAlphabeticalOrder;
