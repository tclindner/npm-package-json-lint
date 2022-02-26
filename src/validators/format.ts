import semver from 'semver';
import {PackageJson} from 'type-fest';

/**
 * Determines whether or not the string is lowercase
 *
 * @param name Name
 * @return True if the string is lowercase or is missing. False if it is not.
 */
export const isLowercase = (name: string): boolean => name === name.toLowerCase();

/**
 * Determines whether or not the node's value is a valid semantic version
 *
 * @param packageJsonData Valid JSON
 * @param nodeName Name of a node in the package.json file
 * @return True if the node is a valid version number or is missing. False if it is not.
 */
export const isValidVersionNumber = (packageJsonData: PackageJson, nodeName: string): boolean => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  return semver.valid(packageJsonData[nodeName]) !== null;
};
