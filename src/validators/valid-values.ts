import {PackageJson} from 'type-fest';

/**
 * Determines whether a node has a valid value
 *
 * @param packageJsonData Valid JSON
 * @param nodeName Name of a node in the package.json file
 * @param value Value to validate
 * @param validValues Array of valid values to validate against
 * @return True if the node is equal to one of the valid values or is missing. False if it is not.
 */
export const isValidValue = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  nodeName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validValues: any
): boolean => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  return validValues.includes(value);
};

/**
 * Determines whether a node matches a valid value
 *
 * @param packageJsonData Valid JSON
 * @param nodeName Name of a node in the package.json file
 * @param value Value to validate
 * @param validRegexes Array of regex to validate against
 * @return True if the node matches one of the valid regexes or is missing. False if it is not.
 */
export const matchValidValue = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  nodeName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validRegexes: any
): boolean => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  return validRegexes.some((r) => r.test(value));
};
