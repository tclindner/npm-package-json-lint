/**
 * Determines whether a node has a valid value
 * @param  {object} packageJsonData Valid JSON
 * @param  {string} nodeName        Name of a node in the package.json file
 * @param  {String} value           Value to validate
 * @param  {array}  validValues     Array of valid values to validate against
 * @return {boolean}                True if the node is equal to one of the valid values or is missing. False if it is not.
 */
const isValidValue = (packageJsonData, nodeName, value, validValues) => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  return validValues.includes(value);
};

/**
 * Determines whether a node matches a valid value
 * @param  {object} packageJsonData Valid JSON
 * @param  {string} nodeName        Name of a node in the package.json file
 * @param  {String} value           Value to validate
 * @param  {array}  validRegexes     Array of regex to validate against
 * @return {boolean}                True if the node matches one of the valid regexes or is missing. False if it is not.
 */
const matchValidValue = (packageJsonData, nodeName, value, validRegexes) => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  return validRegexes.filter((r) => r.test(value)).length > 0;
};

module.exports.isValidValue = isValidValue;
module.exports.matchValidValue = matchValidValue;
