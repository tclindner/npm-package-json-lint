"use strict";

let semver = require("semver");

/**
 * Determines whether or not the package has a given dependency
 * @param  {object} packageJsonData         Valid JSON
 * @param  {string} nodeName                Name of a node in the package.json file
 * @param  {string} dependenciesToCheckFor  An array of packages to check for
 * @return {boolean}                        True if the package has a dependency. False if it is not or the node is missing.
 */
let hasDependency = function(packageJsonData, nodeName, dependenciesToCheckFor) {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return false;
  }

  for (let dependencyName in packageJsonData[nodeName]) {
    if (dependenciesToCheckFor.indexOf(dependencyName) > -1) {
      return true;
    }
  }

  return false;
};

/**
 * Determines whether or not the package has a pre-release version of a given dependency
 * @param  {object} packageJsonData         Valid JSON
 * @param  {string} nodeName                Name of a node in the package.json file
 * @param  {string} dependenciesToCheckFor  An array of packages to check for
 * @return {boolean}                        True if the package has a pre-release version of a dependency. False if it is not or the node is missing.
 */
let hasDependencyPrereleaseVersion = function(packageJsonData, nodeName, dependenciesToCheckFor) {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return false;
  }

  for (let dependencyName in packageJsonData[nodeName]) {
    let dependencyVersion = packageJsonData[nodeName][dependencyName];

    if (dependenciesToCheckFor.indexOf(dependencyName) > -1 && (dependencyVersion.includes("-beta") || dependencyVersion.includes("-rc"))) {
      return true;
    }
  }

  return false;
};

module.exports.hasDependency = hasDependency;
module.exports.hasDependencyPrereleaseVersion = hasDependencyPrereleaseVersion;
