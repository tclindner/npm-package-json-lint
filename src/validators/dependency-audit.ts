import semver from 'semver';
import {PackageJson} from 'type-fest';

const hasExceptions = (config: any): boolean => typeof config === 'object' && config.hasOwnProperty('exceptions');

/**
 * Determines whether or not the package has a given dependency
 * @param  {object} packageJsonData  Valid JSON
 * @param  {string} nodeName         Name of a node in the package.json file
 * @param  {string} depsToCheckFor   An array of packages to check for
 * @return {boolean}                 True if the package has a dependency. False if it is not or the node is missing.
 */
export const hasDependency = (packageJsonData: PackageJson | any, nodeName: string, depsToCheckFor: string[]): boolean => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return false;
  }

  for (const dependencyName in packageJsonData[nodeName]) {
    for (const depToCheckFor of depsToCheckFor) {
      if (depToCheckFor === dependencyName) {
        return true;
      }

      if (
        depToCheckFor.endsWith('*') &&
        dependencyName.startsWith(depToCheckFor.slice(0, Math.max(0, depToCheckFor.length - 1)))
      ) {
        return true;
      }
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
export const hasDepPrereleaseVers = (packageJsonData: PackageJson | any, nodeName: string, depsToCheckFor: string[]): boolean => {
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
 * @param  {object} packageJsonData   Valid JSON
 * @param  {string} nodeName          Name of a node in the package.json file
 * @param  {object} config            Rule configuration
 * @return {boolean}                  True if the package has a dependency with version 0. False if it does not or the node is missing.
 */
export const hasDepVersZero = (packageJsonData: PackageJson | any, nodeName: string, config: any): boolean => {
  for (const dependencyName in packageJsonData[nodeName]) {
    if (hasExceptions(config) && config.exceptions.includes(dependencyName)) {
      continue;
    }

    const dependencyVersRange = packageJsonData[nodeName][dependencyName];

    if (semver.validRange(dependencyVersRange)) {
      const startIndex = 0;
      const length = 1;
      const dependencyVersion = dependencyVersRange.replace(/\D+/g, '');
      // eslint-disable-next-line unicorn/prefer-string-slice
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
export const doesVersStartsWithRange = (dependencyVersion: string, rangeSpecifier: string): boolean => {
  const firstCharOfStr = 0;

  return dependencyVersion.startsWith(rangeSpecifier, firstCharOfStr);
};

/**
 * Determines whether or not all dependency version ranges match expected range
 * @param  {object} packageJsonData  Valid JSON
 * @param  {string} nodeName         Name of a node in the package.json file
 * @param  {string} rangeSpecifier   A version range specifier
 * @param  {object} config           Rule configuration
 * @return {boolean}                 False if the package has an invalid range. True if it is not or the node is missing.
 */
export const areVersRangesValid = (packageJsonData: PackageJson | any, nodeName: string, rangeSpecifier: string, config: any): boolean => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  let rangesValid = true;

  for (const dependencyName in packageJsonData[nodeName]) {
    if (hasExceptions(config) && config.exceptions.includes(dependencyName)) {
      continue;
    }

    const dependencyVersion = packageJsonData[nodeName][dependencyName];

    if (!doesVersStartsWithRange(dependencyVersion, rangeSpecifier)) {
      rangesValid = false;
    }
  }

  return rangesValid;
};

/**
 * Determines if any dependencies have a version string that starts with the specified invalid range
 * @param  {object} packageJsonData  Valid JSON
 * @param  {string} nodeName         Name of a node in the package.json file
 * @param  {string} rangeSpecifier   A version range specifier
 * @param  {object} config           Rule configuration
 * @return {Boolean}                 True if any dependencies versions start with the invalid range, false if they don't.
 */
export const doVersContainInvalidRange = (packageJsonData: PackageJson | any, nodeName: string, rangeSpecifier: string, config: any): boolean => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return false;
  }

  let containsInvalidVersion = false;

  for (const dependencyName in packageJsonData[nodeName]) {
    if (hasExceptions(config) && config.exceptions.includes(dependencyName)) {
      continue;
    }

    const dependencyVersion = packageJsonData[nodeName][dependencyName];

    if (doesVersStartsWithRange(dependencyVersion, rangeSpecifier)) {
      containsInvalidVersion = true;
    }
  }

  return containsInvalidVersion;
};

export interface AbsoluteVersionCheckerResult {
  onlyAbsoluteVersionDetected: boolean;
  dependenciesChecked: number;
}

/**
 * Determines whether or not all dependency versions are absolut
 * @param {object} packageJsonData    Valid JSON
 * @param {string} nodeName           Name of a node in the package.json file
 * @param {object} config             Rule configuration
 * @return {boolean}                  False if the package has an non-absolute version. True if it is not or the node is missing.
 */
const absoluteVersionChecker = (packageJsonData: PackageJson | any, nodeName: string, config: any): AbsoluteVersionCheckerResult => {
  const notFound = -1;
  const firstCharOfStr = 0;
  let onlyAbsoluteVersionDetected = true;
  let dependenciesChecked = 0;

  for (const dependencyName in packageJsonData[nodeName]) {
    if (hasExceptions(config) && config.exceptions.includes(dependencyName)) {
      continue;
    }

    const dependencyVersion = packageJsonData[nodeName][dependencyName];

    if (
      dependencyVersion.startsWith('^', firstCharOfStr) ||
      dependencyVersion.startsWith('~', firstCharOfStr) ||
      dependencyVersion.startsWith('>', firstCharOfStr) ||
      dependencyVersion.startsWith('<', firstCharOfStr) ||
      dependencyVersion.indexOf('*') !== notFound
    ) {
      onlyAbsoluteVersionDetected = false;
    }

    dependenciesChecked += 1;
  }

  return {
    onlyAbsoluteVersionDetected,
    dependenciesChecked,
  };
};

/**
 * Determines whether or not all dependency versions are absolut
 * @param {object} packageJsonData    Valid JSON
 * @param {string} nodeName           Name of a node in the package.json file
 * @param {object} config             Rule configuration
 * @return {boolean}                  False if the package has an non-absolute version. True if it is not or the node is missing.
 */
export const areVersionsAbsolute = (packageJsonData: PackageJson | any, nodeName: string, config: any): boolean => {
  const {onlyAbsoluteVersionDetected, dependenciesChecked} = absoluteVersionChecker(packageJsonData, nodeName, config);

  return dependenciesChecked > 0 ? onlyAbsoluteVersionDetected : false;
};

/**
 * Determines whether or not all dependency versions are absolut
 * @param {object} packageJsonData    Valid JSON
 * @param {string} nodeName           Name of a node in the package.json file
 * @param {object} config             Rule configuration
 * @return {boolean}                  False if the package has an non-absolute version. True if it is not or the node is missing.
 */
export const doVersContainNonAbsolute = (packageJsonData: PackageJson | any, nodeName: string, config: any): boolean => {
  const {onlyAbsoluteVersionDetected, dependenciesChecked} = absoluteVersionChecker(packageJsonData, nodeName, config);

  return dependenciesChecked > 0 ? !onlyAbsoluteVersionDetected : false;
};

const GITHUB_SHORTCUT_URL = /^(github:)?[^/]+\/[^/]+/;

/**
 * Determines whether or not version is a shortcut to github repository
 * @param version       value of package's version
 * @return {boolean}    True if the version is a shortcut to github repository
 */
const isGithubRepositoryShortcut = (version): boolean => GITHUB_SHORTCUT_URL.test(version);

/**
 * Determines whether or not version is url to archive
 * @param version       value of package's version
 * @return {boolean}    True if the version is url to archive
 */
const isArchiveUrl = (version: string): boolean => version.endsWith('.tgz') || version.endsWith('.tar.gz') || version.endsWith('.zip');

/**
 * Determines whether or not version is git repository url
 * @param version       value of package's version
 * @return {boolean}    True if the version is an git repo url.
 */
const isGitRepositoryUrl = (version: string): boolean => {
  if (isArchiveUrl(version)) {
    return false;
  }

  // based on https://github.com/npm/hosted-git-info
  const protocols = new Set(['git@', 'git://', 'git+https://', 'git+ssh://', 'http://', 'https://']);

  let match = false;

  for (const protocol of protocols) {
    if (version.startsWith(protocol)) {
      match = true;
      break;
    }
  }

  return match;
};

/**
 * Determines whether or not dependency versions are git repository
 * @param {object} packageJsonData    Valid JSON
 * @param {string} nodeName           Name of a node in the package.json file
 * @param {object} config             Rule configuration
 * @return {boolean}                  True if the package has an git repo.
 */
export const doVersContainGitRepository = (packageJsonData: PackageJson | any, nodeName: string, config: any): boolean => {
  for (const dependencyName in packageJsonData[nodeName]) {
    if (hasExceptions(config) && config.exceptions.includes(dependencyName)) {
      continue;
    }

    const dependencyVersion = packageJsonData[nodeName][dependencyName];

    if (isGitRepositoryUrl(dependencyVersion) || isGithubRepositoryShortcut(dependencyVersion)) {
      return true;
    }
  }

  return false;
};

/**
 * Determines whether or not dependency versions contains archive url
 * @param {object} packageJsonData    Valid JSON
 * @param {string} nodeName           Name of a node in the package.json file
 * @param {object} config             Rule configuration
 * @return {boolean}                  True if the package contain archive url.
 */
export const doVersContainArchiveUrl = (packageJsonData: PackageJson | any, nodeName: string, config: any): boolean => {
  for (const dependencyName in packageJsonData[nodeName]) {
    if (hasExceptions(config) && config.exceptions.includes(dependencyName)) {
      continue;
    }

    const dependencyVersion = packageJsonData[nodeName][dependencyName];

    if (isArchiveUrl(dependencyVersion)) {
      return true;
    }
  }

  return false;
};

/**
 * Determines whether or not dependency versions contains file url
 * @param {object} packageJsonData    Valid JSON
 * @param {string} nodeName           Name of a node in the package.json file
 * @param {object} config             Rule configuration
 * @return {boolean}                  True if the package contain file url.
 */
export const doVersContainFileUrl = (packageJsonData: PackageJson | any, nodeName: string, config: any): boolean => {
  for (const dependencyName in packageJsonData[nodeName]) {
    if (hasExceptions(config) && config.exceptions.includes(dependencyName)) {
      continue;
    }

    const dependencyVersion = packageJsonData[nodeName][dependencyName];

    if (dependencyVersion.startsWith('file:')) {
      return true;
    }
  }

  return false;
};
