/* eslint no-restricted-syntax: 'off', guard-for-in: 'off' */
const semver = require('semver');

/**
 * Determines whether or not the package has a given dependency
 * @param  {object} packageJsonData         Valid JSON
 * @param  {string} nodeName                Name of a node in the package.json file
 * @param  {string} depsToCheckFor  An array of packages to check for
 * @return {boolean}                        True if the package has a dependency. False if it is not or the node is missing.
 */
const hasDependency = (packageJsonData, nodeName, depsToCheckFor) => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return false;
  }

  for (const dependencyName in packageJsonData[nodeName]) {
    if (depsToCheckFor.includes(dependencyName)) {
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
const hasDepPrereleaseVers = (packageJsonData, nodeName, depsToCheckFor) => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return false;
  }

  for (const dependencyName in packageJsonData[nodeName]) {
    if (depsToCheckFor.includes(dependencyName)) {
      const dependencyVersion = packageJsonData[nodeName][dependencyName];

      if (dependencyVersion.includes('-beta') || dependencyVersion.includes('-rc')) {
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
const hasDepVersZero = (packageJsonData, nodeName) => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return false;
  }

  for (const dependencyName in packageJsonData[nodeName]) {
    const dependencyVersRange = packageJsonData[nodeName][dependencyName];

    if (semver.validRange(dependencyVersRange)) {
      const startIndex = 0;
      const length = 1;
      const dependencyVersion = dependencyVersRange.replace(/[\D]+/g, '');
      const dependencyMjrVersion = dependencyVersion.substr(startIndex, length);

      // if first char is 0 then major version is 0
      if (dependencyMjrVersion === '0') {
        return true;
      }
    }
  }

  return false;
};

/**
 * Determines if the dependencies version string starts with the specified range
 * @param  {String}   dependencyVersion   Dependency's version range
 * @param  {String}   rangeSpecifier      A version range specifier
 * @return {Boolean}                      True if the version starts with the range, false if it doesn't.
 */
const doesVersStartsWithRange = (dependencyVersion, rangeSpecifier) => {
  const firstCharOfStr = 0;

  return dependencyVersion.startsWith(rangeSpecifier, firstCharOfStr);
};

/**
 * Determines whether or not all dependency version ranges match expected range
 * @param  {object} packageJsonData         Valid JSON
 * @param  {string} nodeName                Name of a node in the package.json file
 * @param  {string} rangeSpecifier          A version range specifier
 * @return {boolean}                        False if the package has an invalid range. True if it is not or the node is missing.
 */
const areVersRangesValid = (packageJsonData, nodeName, rangeSpecifier) => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  let rangesValid = true;

  for (const dependencyName in packageJsonData[nodeName]) {
    const dependencyVersion = packageJsonData[nodeName][dependencyName];

    if (!doesVersStartsWithRange(dependencyVersion, rangeSpecifier)) {
      rangesValid = false;
    }
  }

  return rangesValid;
};

/**
 * Determines if any dependencies have a version string that starts with the specified invalid range
 * @param  {object} packageJsonData         Valid JSON
 * @param  {string} nodeName                Name of a node in the package.json file
 * @param  {string} rangeSpecifier          A version range specifier
 * @return {Boolean}                        True if any dependencies versions start with the invalid range, false if they don't.
 */
const doVersContainInvalidRange = (packageJsonData, nodeName, rangeSpecifier) => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return false;
  }

  let containsInvalidVersion = false;

  for (const dependencyName in packageJsonData[nodeName]) {
    const dependencyVersion = packageJsonData[nodeName][dependencyName];

    if (doesVersStartsWithRange(dependencyVersion, rangeSpecifier)) {
      containsInvalidVersion = true;
    }
  }

  return containsInvalidVersion;
};

/**
 * Determines whether or not all dependency versions are absolut
 * @param  {object} packageJsonData         Valid JSON
 * @param  {string} nodeName                Name of a node in the package.json file
 * @return {boolean}                        False if the package has an non-absolute version. True if it is not or the node is missing.
 */
const isVersionAbsolute = (packageJsonData, nodeName) => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  const NOT_FOUND = -1;
  const firstCharOfStr = 0;
  let rangesValid = true;

  for (const dependencyName in packageJsonData[nodeName]) {
    const dependencyVersion = packageJsonData[nodeName][dependencyName];

    if (dependencyVersion.startsWith('^', firstCharOfStr)
      || dependencyVersion.startsWith('~', firstCharOfStr)
      || dependencyVersion.startsWith('>', firstCharOfStr)
      || dependencyVersion.startsWith('<', firstCharOfStr)
      || dependencyVersion.indexOf('*') !== NOT_FOUND
    ) {
      rangesValid = false;
    }
  }

  return rangesValid;
};

module.exports.hasDependency = hasDependency;
module.exports.hasDepPrereleaseVers = hasDepPrereleaseVers;
module.exports.hasDepVersZero = hasDepVersZero;
module.exports.doesVersStartsWithRange = doesVersStartsWithRange;
module.exports.areVersRangesValid = areVersRangesValid;
module.exports.doVersContainInvalidRange = doVersContainInvalidRange;
module.exports.isVersionAbsolute = isVersionAbsolute;
