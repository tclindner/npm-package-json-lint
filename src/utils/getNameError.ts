/**
 * Gets the error message indicating why the name is invalid.
 *
 * @param   {object} results Results from validate-npm-package-name
 * @returns {string}         Error/warning message
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNameError = (results: any): any => {
  // Errors are returned for names that were never valid
  if (results.errors && results.errors.length > 0) {
    return results.errors[0];
  }

  // Warnings are returned for names that are no longer valid
  if (results.warnings && results.warnings.length > 0) {
    return results.warnings[0];
  }

  // Ensure that an error message is returned in any case
  return 'name invalid';
};
