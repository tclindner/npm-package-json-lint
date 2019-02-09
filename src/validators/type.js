const isPlainObj = require('is-plain-obj');

/**
 * Determines whether or not the node's value is an Array
 * @param  {object} packageJsonData Valid JSON
 * @param  {string} nodeName        Name of a node in the package.json file
 * @return {boolean}                True if the node is an array or is missing. False if it is not.
 */
const isArray = (packageJsonData, nodeName) => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  return Array.isArray(packageJsonData[nodeName]);
};

/**
 * Determines whether or not the node's value is a boolean
 * @param  {object} packageJsonData Valid JSON
 * @param  {string} nodeName        Name of a node in the package.json file
 * @return {boolean}                True if the node is a boolean or is missing. False if it is not.
 */
const isBoolean = (packageJsonData, nodeName) => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  return typeof packageJsonData[nodeName] === 'boolean';
};

/**
 * Determines whether or not the node's value is an object
 * @param  {object} packageJsonData Valid JSON
 * @param  {string} nodeName        Name of a node in the package.json file
 * @return {boolean}                True if the node is an object or is missing. False if it is not.
 */
const isObject = (packageJsonData, nodeName) => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  return isPlainObj(packageJsonData[nodeName]);
};

/**
 * Determines whether or not the node's value is a string
 * @param  {object} packageJsonData Valid JSON
 * @param  {string} nodeName        Name of a node in the package.json file
 * @return {boolean}                True if the node is a string or is missing. False if it is not.
 */
const isString = (packageJsonData, nodeName) => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  return typeof packageJsonData[nodeName] === 'string';
};

module.exports.isArray = isArray;
module.exports.isBoolean = isBoolean;
module.exports.isObject = isObject;
module.exports.isString = isString;
