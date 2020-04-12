const parser = require('jsonc-parser');

/**
 * Determines whether or not the node exists in the package.json file
 * @param  {object} packageJsonData Valid JSON
 * @param  {string} nodeName        Name of a node in the package.json file
 * @return {boolean}                True if the node exists. False if it is not.
 */
const exists = (packageJsonData, nodeName) => {
  return packageJsonData.hasOwnProperty(nodeName);
};

/**
 * Search for duplicate properties in package.json file
 * @param  {string}  packageJsonSource JSON source string
 * @return {string[]}                  List of duplicate property names.
 */
const findDuplicatePropNames = packageJsonSource => {
  const tree = parser.parseTree(packageJsonSource);

  if (!tree) {
    return [];
  }

  const traverse = (node, dups = []) => {
    const foundProps = new Map();

    // eslint-disable-next-line no-restricted-syntax
    for (const child of node.children) {
      const [propNameNode, propValNode] = child.children;
      const propName = propNameNode.value;

      if (foundProps.has(propName)) {
        dups.push(propName);
      } else {
        foundProps.set(propName, true);
      }

      if (propValNode.type === 'object') {
        traverse(propValNode, dups);
      }
    }

    return dups;
  };

  return traverse(tree);
};

module.exports = {
  exists,
  findDuplicatePropNames
};
