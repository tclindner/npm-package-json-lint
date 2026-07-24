import {getNameError} from '../../../src/utils/getNameError';

const genericErrorMessage = 'name invalid';
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getResults = (shouldIncludeErrors = true, shouldIncludeWarnings = true) => {
  const results = {
    validForNewPackages: false,
    validForOldPackages: !shouldIncludeErrors,
    warnings: ['first warning', 'second warning'],
    errors: ['first error', 'second error'],
  };

  if (!shouldIncludeErrors) {
    delete results.errors;
  }

  if (!shouldIncludeWarnings) {
    delete results.warnings;
  }

  return results;
};

describe('getNameError Unit Tests', () => {
  test('if errors - returns first error', () => {
    const results = getResults(true, true);
    expect(getNameError(results)).toBe(results.errors[0]);
  });

  test('if warnings and no errors - returns first warning', () => {
    const results = getResults(false, true);
    expect(getNameError(results)).toBe(results.warnings[0]);
  });

  test('if no warnings and no errors - returns generic error message', () => {
    const results = getResults(false, false);
    expect(getNameError(results)).toBe(genericErrorMessage);
  });
});
