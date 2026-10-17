/**
Gets the error message indicating why the name is invalid.

@param   {object} results Results from validate-npm-package-name
@returns {string}         Error/warning message
*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNameError = (results: any): any => {
  // Errors are returned for names that were never valid; warnings are returned for names that are no longer valid.
  // Ensure that an error message is returned in any case.
  if (results.errors && results.errors.length > 0) {
    return results.errors[0];
  }

  return results.warnings && results.warnings.length > 0 ? results.warnings[0] : 'name invalid';
};
