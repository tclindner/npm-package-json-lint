import {PackageJson} from 'type-fest';

const increment = 1;

export interface IsInAlphabeticalOrderResult {
  status: boolean;
  data: {
    invalidNode: string | null;
    validNode: string | null;
  };
}

/**
 * Determines whether an array is in alphabetical order
 *
 * @param packageJsonData Valid JSON
 * @param nodeName Name of a node in the package.json file
 * @return Object containing the status and the dependencies that are out of order, if applicable
 */
export const isInAlphabeticalOrder = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  nodeName: string,
): IsInAlphabeticalOrderResult => {
  let isValid = true;
  let data = {
    invalidNode: null,
    validNode: null,
  };
  const nodeKeysOriginal = Object.keys(packageJsonData[nodeName]);
  const nodeKeysSorted = Object.keys(packageJsonData[nodeName]).sort();

  for (let keyIndex = 0; keyIndex < nodeKeysOriginal.length; keyIndex += increment) {
    if (nodeKeysOriginal[keyIndex] !== nodeKeysSorted[keyIndex]) {
      isValid = false;
      data = {
        invalidNode: nodeKeysOriginal[keyIndex],
        validNode: nodeKeysSorted[keyIndex],
      };
      break;
    }
  }

  return {
    status: isValid,
    data,
  };
};
