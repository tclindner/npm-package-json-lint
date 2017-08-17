'use strict';

const increment = 1;

/**
 * Determines whether an array is in the specified order
 * @param  {Object} packageJsonData     Valid JSON
 * @param  {Array}  preferredNodeOrder  Preferred order of nodes
 * @return {Object}                     Object containing the status and the node that is out of order, if applicable
 */
const isInPreferredOrder = function(packageJsonData, preferredNodeOrder) {
  let isValid = true;
  let data = {
    actualNode: null,
    desiredNode: null
  };
  const actualNodeList = Object.keys(packageJsonData);

  for (let keyIndex = 0;keyIndex < preferredNodeOrder.length;keyIndex += increment) {
    if (typeof actualNodeList[keyIndex] === 'undefined') {
      isValid = false;
      data = {
        actualNode: null,
        desiredNode: preferredNodeOrder[keyIndex]
      };
      break;
    } else if (actualNodeList[keyIndex] !== preferredNodeOrder[keyIndex]) {
      isValid = false;
      data = {
        actualNode: actualNodeList[keyIndex],
        desiredNode: preferredNodeOrder[keyIndex]
      };
      break;
    }
  }

  return {
    status: isValid,
    data
  };
};

module.exports.isInPreferredOrder = isInPreferredOrder;
