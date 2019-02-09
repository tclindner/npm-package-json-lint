const semver = require('semver');
const validator = require('validator');

/**
 * Determines whether or not the node's value is lowercase
 * @param  {object} packageJsonData Valid JSON
 * @param  {string} nodeName        Name of a node in the package.json file
 * @return {boolean}                True if the node is lowercase or is missing. False if it is not.
 */
const isLowercase = (packageJsonData, nodeName) => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  return validator.isLowercase(packageJsonData[nodeName]);
};

/**
 * Determines whether or not the node's value is a valid semantic version
 * @param  {object} packageJsonData Valid JSON
 * @param  {string} nodeName        Name of a node in the package.json file
 * @return {boolean}                True if the node is a valid version number or is missing. False if it is not.
 */
const isValidVersionNumber = (packageJsonData, nodeName) => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  return semver.valid(packageJsonData[nodeName]) !== null;
};

module.exports.isLowercase = isLowercase;
module.exports.isValidVersionNumber = isValidVersionNumber;
