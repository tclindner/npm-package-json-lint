const {exists} = require('../validators/property');
const LintIssue = require('../LintIssue');

const lintId = 'no-repeated-dependencies';
const ruleType = 'standard';

const dependenciesNode = 'dependencies';
const devDependenciesNode = 'devDependencies';

const lint = (packageJsonData, severity) => {
  if (!exists(packageJsonData, dependenciesNode)) {
    return true;
  }

  if (!exists(packageJsonData, devDependenciesNode)) {
    return true;
  }

  const dependencies = Object.keys(packageJsonData[dependenciesNode]);
  const devDependencies = Object.keys(packageJsonData[devDependenciesNode]);

  /* eslint-disable-next-line no-restricted-syntax */
  for (const dependency of dependencies) {
    if (devDependencies.includes(dependency)) {
      return new LintIssue(
        lintId,
        severity,
        `${dependenciesNode}|${devDependenciesNode}`,
        `${dependency} exists in both ${dependenciesNode} and ${devDependenciesNode}. Please remove it from one of the dependency lists.`
      );
    }
  }

  return true;
};

module.exports = {
  lint,
  ruleType
};
