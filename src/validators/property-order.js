'use strict';

/* eslint max-statements: 'off' */

const notFound = -1;
const empty = 0;
const zero = 0;
const one = 1;
const increment = 1;
const defaultPreferredNodeOrder = [
  'name',
  'version',
  'description',
  'keywords',
  'homepage',
  'bugs',
  'license',
  'author',
  'contributors',
  'files',
  'main',
  'module',
  'jsnext:main',
  'types',
  'typings',
  'style',
  'example',
  'examplestyle',
  'assets',
  'bin',
  'man',
  'directories',
  'repository',
  'scripts',
  'config',
  'pre-commit',
  'browser',
  'browserify',
  'babel',
  'eslintConfig',
  'stylelint',
  'npmPackageJsonLintConfig',
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'bundledDependencies',
  'bundleDependencies',
  'optionalDependencies',
  'engines',
  'engineStrict',
  'os',
  'cpu',
  'preferGlobal',
  'private',
  'publishConfig'
];

/**
 * Determines whether an array is in the specified order
 * @param  {Object} packageJsonData         Valid JSON
 * @param  {Array}  userPreferredNodeOrder  Preferred order of nodes
 * @return {Object}                         Object containing the status and the node that is out of order, if applicable
 */
const isInPreferredOrder = function(packageJsonData, userPreferredNodeOrder) {
  let isValid = true;
  let msg = null;
  const preferredNodeOrder = userPreferredNodeOrder.length === empty ? Array.from(defaultPreferredNodeOrder) : Array.from(userPreferredNodeOrder);
  const fltrdPreferredNodeOrder = preferredNodeOrder.filter((property) => packageJsonData.hasOwnProperty(property));
  const actualNodeList = Object.keys(packageJsonData);
  const fltrdActualNodeList = actualNodeList.filter((property) => preferredNodeOrder.indexOf(property) !== notFound);
  const filteredPreferredOrderMap = new Map();

  fltrdPreferredNodeOrder.forEach((property, index) => {
    filteredPreferredOrderMap.set(property, index);
  });

  for (let keyIndex = 0;keyIndex < fltrdActualNodeList.length;keyIndex += increment) {
    const currentPkgJsonProperty = fltrdActualNodeList[keyIndex];

    const preferredOrderPosition = filteredPreferredOrderMap.get(currentPkgJsonProperty);

    if (preferredOrderPosition !== keyIndex) {
      isValid = false;
      msg = `Please move "${currentPkgJsonProperty}" after "${fltrdPreferredNodeOrder[preferredOrderPosition - one]}".`;
      break;
    }
  }

  return {
    status: isValid,
    msg
  };
};

module.exports.isInPreferredOrder = isInPreferredOrder;
