'use strict';

/* eslint max-statements: 'off' */

const empty = 0;
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
  const actualNodeList = Object.keys(packageJsonData);
  const preferredNodeOrder = userPreferredNodeOrder.length === empty ? Array.from(defaultPreferredNodeOrder) : Array.from(userPreferredNodeOrder);
  const preferredNodeOrderCopy = Array.from(preferredNodeOrder);

  for (let keyIndex = 0;keyIndex < actualNodeList.length;keyIndex += increment) {
    let preferredNodeOrderItem = null;

    if (!preferredNodeOrder.includes(actualNodeList[keyIndex])) {
      isValid = false;
      msg = `${actualNodeList[keyIndex]} is not in the preferred property list.`;
      break;
    }

    if (!preferredNodeOrderCopy.includes(actualNodeList[keyIndex])) {
      isValid = false;
      msg = `Please move ${actualNodeList[keyIndex]} before ${actualNodeList[keyIndex - increment]}.`;
      break;
    }

    do {
      preferredNodeOrderItem = preferredNodeOrderCopy.shift();

    } while (actualNodeList[keyIndex] !== preferredNodeOrderItem);
  }

  return {
    status: isValid,
    msg
  };
};

module.exports.isInPreferredOrder = isInPreferredOrder;
