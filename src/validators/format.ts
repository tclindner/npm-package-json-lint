import semver from 'semver';
import {PackageJson} from 'type-fest';

/**
 * Determines whether or not the node's value is a valid semantic version
 *
 * @param packageJsonData Valid JSON
 * @param nodeName Name of a node in the package.json file
 * @return True if the node is a valid version number or is missing. False if it is not.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidVersionNumber = (packageJsonData: PackageJson | any, nodeName: string): boolean => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  return semver.valid(packageJsonData[nodeName]) !== null;
};
