"use strict";

const inArray = require("in-array");
const semver = require("semver");

/**
 * Determines whether or not the package has a given dependency
 * @param  {object} packageJsonData         Valid JSON
 * @param  {string} nodeName                Name of a node in the package.json file
 * @param  {string} depsToCheckFor  An array of packages to check for
 * @return {boolean}                        True if the package has a dependency. False if it is not or the node is missing.
 */
const hasDependency = function(packageJsonData, nodeName, depsToCheckFor) {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return false;
  }

  for (const dependencyName in packageJsonData[nodeName]) {
    if (inArray(depsToCheckFor, dependencyName)) {
      return true;
    }
  }

  return false;
};

/**
 * Determines whether or not the package has a pre-release version of a given dependency
 * @param  {object} packageJsonData         Valid JSON
 * @param  {string} nodeName                Name of a node in the package.json file
 * @param  {string} depsToCheckFor          An array of packages to check for
 * @return {boolean}                        True if the package has a pre-release version of a dependency. False if it is not or the node is missing.
 */
const hasDepPrereleaseVers = function(packageJsonData, nodeName, depsToCheckFor) {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return false;
  }

  for (const dependencyName in packageJsonData[nodeName]) {
    if (inArray(depsToCheckFor, dependencyName)) {
      const dependencyVersion = packageJsonData[nodeName][dependencyName];

      if (dependencyVersion.includes("-beta") || dependencyVersion.includes("-rc")) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Determines whether or not the package has a dependency with a major version of 0
 * @param  {object} packageJsonData         Valid JSON
 * @param  {string} nodeName                Name of a node in the package.json file
 * @return {boolean}                        True if the package has a dependency with version 0. False if it does not or the node is missing.
 */
const hasDepVersZero = function(packageJsonData, nodeName) {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return false;
  }

  for (const dependencyName in packageJsonData[nodeName]) {
    const dependencyVersRange = packageJsonData[nodeName][dependencyName];

    if (semver.validRange(dependencyVersRange)) {
      const startIndex = 0;
      const length = 1;
      const dependencyVersion = dependencyVersRange.replace(/[\D]+/g, "");
      const dependencyMjrVersion = dependencyVersion.substr(startIndex, length);

      // if first char is 0 then major version is 0
      if (dependencyMjrVersion === "0") {
        return true;
      }
    }
  }

  return false;
};

/**
 * Determines whether or not all dependency version ranges match expected range
 * @param  {object} packageJsonData         Valid JSON
 * @param  {string} nodeName                Name of a node in the package.json file
 * @param  {string} rangeSpecifier          A version range specifier
 * @return {boolean}                        False if the package has an invalid range. True if it is not or the node is missing.
 */
const areVersRangesValid = function(packageJsonData, nodeName, rangeSpecifier) {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  const firstCharOfStr = 0;
  let rangesValid = true;

  for (const dependencyName in packageJsonData[nodeName]) {
    const dependencyVersion = packageJsonData[nodeName][dependencyName];

    if (!dependencyVersion.startsWith(rangeSpecifier, firstCharOfStr)) {
      rangesValid = false;
    }
  }

  return rangesValid;
};

module.exports.hasDependency = hasDependency;
module.exports.hasDepPrereleaseVers = hasDepPrereleaseVers;
module.exports.hasDepVersZero = hasDepVersZero;
module.exports.areVersRangesValid = areVersRangesValid;
