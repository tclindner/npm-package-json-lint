/**
 * Determines whether or not the node exists in the package.json file
 * @param  {object} packageJsonData Valid JSON
 * @param  {string} nodeName        Name of a node in the package.json file
 * @return {boolean}                True if the node exists. False if it is not.
 */
const exists = (packageJsonData, nodeName) => {
  return packageJsonData.hasOwnProperty(nodeName);
};

module.exports = {
  exists
};
