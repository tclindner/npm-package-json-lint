import isPlainObj from 'is-plain-obj';
import {PackageJson} from 'type-fest';

/**
 * Determines whether or not the node's value is an Array
 *
 * @param packageJsonData Valid JSON
 * @param nodeName Name of a node in the package.json file
 * @return True if the node is an array or is missing. False if it is not.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isArray = (packageJsonData: PackageJson | any, nodeName: string): boolean => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  return Array.isArray(packageJsonData[nodeName]);
};

/**
 * Determines whether or not the node's value is a boolean
 *
 * @param packageJsonData Valid JSON
 * @param nodeName Name of a node in the package.json file
 * @return True if the node is a boolean or is missing. False if it is not.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isBoolean = (packageJsonData: PackageJson | any, nodeName: string): boolean => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  return typeof packageJsonData[nodeName] === 'boolean';
};

/**
 * Determines whether or not the node's value is an object
 *
 * @param packageJsonData Valid JSON
 * @param nodeName Name of a node in the package.json file
 * @return True if the node is an object or is missing. False if it is not.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObject = (packageJsonData: PackageJson | any, nodeName: string): boolean => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  return isPlainObj(packageJsonData[nodeName]);
};

/**
 * Determines whether or not the node's value is a string
 *
 * @param packageJsonData Valid JSON
 * @param nodeName Name of a node in the package.json file
 * @return True if the node is a string or is missing. False if it is not.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
export const isString = (packageJsonData: PackageJson | any, nodeName: string) => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  return typeof packageJsonData[nodeName] === 'string';
};
