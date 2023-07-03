import {PackageJson} from 'type-fest';
import {OptionalObjectRuleConfig} from '../types/lint-function';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const semver = require('semver');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasExceptions = (config: any): boolean => typeof config === 'object' && config.hasOwnProperty('exceptions');

export interface AuditDependenciesWithRestrictedVersionResponse {
  hasDependencyWithRestrictedVersion: boolean;
  dependenciesWithRestrictedVersion: string[];
  dependenciesWithoutRestrictedVersion: string[];
}

/**
 * Determines whether or not the package has a given dependency
 * @param packageJsonData Valid JSON
 * @param nodeName Name of a node in the package.json file
 * @param depsToCheckFor An array of packages to check for
 * @return True if the package has a dependency. False if it is not or the node is missing.
 */
export const auditDependenciesWithRestrictedVersion = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  nodeName: string,
  depsToCheckFor: string[]
): AuditDependenciesWithRestrictedVersionResponse => {
  let hasDependencyWithRestrictedVersion = false;
  const dependenciesWithRestrictedVersion = [];
  const dependenciesWithoutRestrictedVersion = [];

  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return {
      hasDependencyWithRestrictedVersion,
      dependenciesWithRestrictedVersion,
      dependenciesWithoutRestrictedVersion,
    };
  }

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const dependencyName in packageJsonData[nodeName]) {
    // eslint-disable-next-line no-restricted-syntax
    for (const depToCheckFor of depsToCheckFor) {
      if (depToCheckFor === dependencyName) {
        hasDependencyWithRestrictedVersion = true;
        dependenciesWithRestrictedVersion.push(dependencyName);
      } else if (
        depToCheckFor.endsWith('*') &&
        dependencyName.startsWith(depToCheckFor.slice(0, Math.max(0, depToCheckFor.length - 1)))
      ) {
        hasDependencyWithRestrictedVersion = true;
        dependenciesWithRestrictedVersion.push(dependencyName);
      } else {
        dependenciesWithoutRestrictedVersion.push(dependencyName);
      }
    }
  }

  return {
    hasDependencyWithRestrictedVersion,
    dependenciesWithRestrictedVersion,
    dependenciesWithoutRestrictedVersion,
  };
};

export interface AuditDependenciesWithRestrictedPrereleaseVersionResponse {
  hasDependencyWithRestrictedPrereleaseVersion: boolean;
  dependenciesWithRestrictedPrereleaseVersion: string[];
  dependenciesWithoutRestrictedPrereleaseVersion: string[];
}

/**
 * Determines whether or not the package has a pre-release version of a given dependency
 * @param packageJsonData Valid JSON
 * @param nodeName Name of a node in the package.json file
 * @param depsToCheckFor An array of packages to check for
 * @return True if the package has a pre-release version of a dependency. False if it is not or the node is missing.
 */
export const auditDependenciesWithRestrictedPrereleaseVersion = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  nodeName: string,
  depsToCheckFor: string[]
): AuditDependenciesWithRestrictedPrereleaseVersionResponse => {
  let hasDependencyWithRestrictedPrereleaseVersion = false;
  const dependenciesWithRestrictedPrereleaseVersion = [];
  const dependenciesWithoutRestrictedPrereleaseVersion = [];

  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return {
      hasDependencyWithRestrictedPrereleaseVersion,
      dependenciesWithRestrictedPrereleaseVersion,
      dependenciesWithoutRestrictedPrereleaseVersion,
    };
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const dependencyName in packageJsonData[nodeName]) {
    if (depsToCheckFor.includes(dependencyName)) {
      const dependencyVersion = packageJsonData[nodeName][dependencyName];

      if (dependencyVersion.includes('-beta') || dependencyVersion.includes('-rc')) {
        hasDependencyWithRestrictedPrereleaseVersion = true;
        dependenciesWithRestrictedPrereleaseVersion.push(dependencyName);
      } else {
        dependenciesWithoutRestrictedPrereleaseVersion.push(dependencyName);
      }
    }
  }

  return {
    hasDependencyWithRestrictedPrereleaseVersion,
    dependenciesWithRestrictedPrereleaseVersion,
    dependenciesWithoutRestrictedPrereleaseVersion,
  };
};

export interface AuditDependenciesWithMajorVersionOfZeroResponse {
  hasDependencyWithMajorVersionOfZero: boolean;
  dependenciesWithMajorVersionOfZero: string[];
  dependenciesWithoutMajorVersionOfZero: string[];
}

/**
 * Determines whether or not the package has a dependency with a major version of 0
 * @param packageJsonData Valid JSON
 * @param nodeName Name of a node in the package.json file
 * @param config Rule configuration
 * @return True if the package has a dependency with version 0. False if it does not or the node is missing.
 */
export const auditDependenciesWithMajorVersionOfZero = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  nodeName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any
): AuditDependenciesWithMajorVersionOfZeroResponse => {
  let hasDependencyWithMajorVersionOfZero = false;
  const dependenciesWithMajorVersionOfZero = [];
  const dependenciesWithoutMajorVersionOfZero = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const dependencyName in packageJsonData[nodeName]) {
    if (hasExceptions(config) && config.exceptions.includes(dependencyName)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    const dependencyVersRange = packageJsonData[nodeName][dependencyName];

    if (semver.validRange(dependencyVersRange)) {
      const startIndex = 0;
      const length = 1;
      // eslint-disable-next-line unicorn/prefer-string-replace-all
      const dependencyVersion = dependencyVersRange.replace(/\D+/g, '');
      // eslint-disable-next-line unicorn/prefer-string-slice
      const dependencyMjrVersion = dependencyVersion.substr(startIndex, length);

      // if first char is 0 then major version is 0
      if (dependencyMjrVersion === '0') {
        hasDependencyWithMajorVersionOfZero = true;
        dependenciesWithMajorVersionOfZero.push(dependencyName);
      } else {
        dependenciesWithoutMajorVersionOfZero.push(dependencyName);
      }
    }
  }

  return {
    hasDependencyWithMajorVersionOfZero,
    dependenciesWithMajorVersionOfZero,
    dependenciesWithoutMajorVersionOfZero,
  };
};

/**
 * Determines if the dependencies version string starts with the specified range
 * @param  {String}   dependencyVersion   Dependency's version range
 * @param  {String}   rangeSpecifier      A version range specifier
 * @return {Boolean}                      True if the version starts with the range, false if it doesn't.
 */
export const doesVersionStartWithRange = (dependencyVersion: string, rangeSpecifier: string): boolean => {
  const firstCharOfStr = 0;

  return dependencyVersion.startsWith(rangeSpecifier, firstCharOfStr);
};

export interface AuditDependenciesForValidRangeResponse {
  onlyValidVersionsDetected: boolean;
  dependenciesWithValidVersionRange: string[];
  dependenciesWithoutValidVersionRange: string[];
}

/**
 * Determines whether or not all dependency version ranges match expected range
 * @param packageJsonData Valid JSON
 * @param nodeName Name of a node in the package.json file
 * @param rangeSpecifier A version range specifier
 * @param config Rule configuration
 * @return False if the package has an invalid range. True if it is not or the node is missing.
 */
export const auditDependenciesForValidRangeVersions = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  nodeName: string,
  rangeSpecifier: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any
): AuditDependenciesForValidRangeResponse => {
  let onlyValidVersionsDetected = true;
  const dependenciesWithValidVersionRange = [];
  const dependenciesWithoutValidVersionRange = [];

  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return {
      onlyValidVersionsDetected,
      dependenciesWithValidVersionRange: [],
      dependenciesWithoutValidVersionRange: [],
    };
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const dependencyName in packageJsonData[nodeName]) {
    if (hasExceptions(config) && config.exceptions.includes(dependencyName)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    const dependencyVersion = packageJsonData[nodeName][dependencyName];

    if (doesVersionStartWithRange(dependencyVersion, rangeSpecifier)) {
      dependenciesWithValidVersionRange.push(dependencyName);
    } else {
      onlyValidVersionsDetected = false;
      dependenciesWithoutValidVersionRange.push(dependencyName);
    }
  }

  return {
    onlyValidVersionsDetected,
    dependenciesWithValidVersionRange,
    dependenciesWithoutValidVersionRange,
  };
};

export interface AuditDependenciesForInvalidRangeResponse {
  hasInvalidRangeVersions: boolean;
  dependenciesWithInvalidVersionRange: string[];
  dependenciesWithoutInvalidVersionRange: string[];
}

/**
 * Determines if any dependencies have a version string that starts with the specified invalid range
 * @param packageJsonData Valid JSON
 * @param nodeName Name of a node in the package.json file
 * @param rangeSpecifier A version range specifier
 * @param config Rule configuration
 * @return True if any dependencies versions start with the invalid range, false if they don't.
 */
export const auditDependenciesForInvalidRange = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  nodeName: string,
  rangeSpecifier: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any
): AuditDependenciesForInvalidRangeResponse => {
  let hasInvalidRangeVersions = false;
  const dependenciesWithInvalidVersionRange = [];
  const dependenciesWithoutInvalidVersionRange = [];

  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return {
      hasInvalidRangeVersions,
      dependenciesWithInvalidVersionRange,
      dependenciesWithoutInvalidVersionRange,
    };
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const dependencyName in packageJsonData[nodeName]) {
    if (hasExceptions(config) && config.exceptions.includes(dependencyName)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    const dependencyVersion = packageJsonData[nodeName][dependencyName];

    if (doesVersionStartWithRange(dependencyVersion, rangeSpecifier)) {
      hasInvalidRangeVersions = true;
      dependenciesWithInvalidVersionRange.push(dependencyName);
    } else {
      dependenciesWithoutInvalidVersionRange.push(dependencyName);
    }
  }

  return {
    hasInvalidRangeVersions,
    dependenciesWithInvalidVersionRange,
    dependenciesWithoutInvalidVersionRange,
  };
};

export interface AbsoluteVersionCheckerResult {
  onlyAbsoluteVersionDetected: boolean;
  dependenciesChecked: number;
  dependenciesWithAbsoluteVersion: string[];
  dependenciesWithoutAbsoluteVersion: string[];
}

/**
 * Determines whether or not all dependency versions are absolute
 * @param packageJsonData Valid JSON
 * @param nodeName Name of a node in the package.json file
 * @param config Rule configuration
 * @return False if the package has an non-absolute version. True if it is not or the node is missing.
 */
const auditAbsoluteVersions = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  nodeName: string,
  config: OptionalObjectRuleConfig
): AbsoluteVersionCheckerResult => {
  const notFound = -1;
  const firstCharOfStr = 0;
  let onlyAbsoluteVersionDetected = true;
  let dependenciesChecked = 0;
  const dependenciesWithAbsoluteVersion = [];
  const dependenciesWithoutAbsoluteVersion = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const dependencyName in packageJsonData[nodeName]) {
    if (hasExceptions(config) && config.exceptions.includes(dependencyName)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    const dependencyVersion: string = packageJsonData[nodeName][dependencyName];

    if (
      dependencyVersion.startsWith('^', firstCharOfStr) ||
      dependencyVersion.startsWith('~', firstCharOfStr) ||
      dependencyVersion.startsWith('>', firstCharOfStr) ||
      dependencyVersion.startsWith('<', firstCharOfStr) ||
      dependencyVersion.indexOf('*') !== notFound
    ) {
      onlyAbsoluteVersionDetected = false;
      dependenciesWithoutAbsoluteVersion.push(dependencyName);
    } else {
      dependenciesWithAbsoluteVersion.push(dependencyName);
    }

    dependenciesChecked += 1;
  }

  return {
    onlyAbsoluteVersionDetected,
    dependenciesChecked,
    dependenciesWithAbsoluteVersion,
    dependenciesWithoutAbsoluteVersion,
  };
};

export interface AuditDependenciesForAbsoluteVersionResponse {
  onlyAbsoluteVersionsDetected: boolean;
  dependenciesWithAbsoluteVersion: string[];
  dependenciesWithoutAbsoluteVersion: string[];
}

/**
 * Determines whether or not all dependency versions are absolut
 * @param packageJsonData Valid JSON
 * @param nodeName Name of a node in the package.json file
 * @param config Rule configuration
 * @return False if the package has an non-absolute version. True if it is not or the node is missing.
 */
export const auditDependenciesForAbsoluteVersion = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  nodeName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any
): AuditDependenciesForAbsoluteVersionResponse => {
  const {
    onlyAbsoluteVersionDetected,
    dependenciesChecked,
    dependenciesWithAbsoluteVersion,
    dependenciesWithoutAbsoluteVersion,
  } = auditAbsoluteVersions(packageJsonData, nodeName, config);

  return {
    onlyAbsoluteVersionsDetected: dependenciesChecked > 0 ? onlyAbsoluteVersionDetected : false,
    dependenciesWithAbsoluteVersion,
    dependenciesWithoutAbsoluteVersion,
  };
};

export interface AuditDependenciesForNonAbsoluteVersionResponse {
  onlyNonAbsoluteVersionsDetected: boolean;
  dependenciesWithAbsoluteVersion: string[];
  dependenciesWithoutAbsoluteVersion: string[];
}

/**
 * Determines whether or not all dependency versions are absolut
 * @param packageJsonData Valid JSON
 * @param nodeName Name of a node in the package.json file
 * @param config Rule configuration
 * @return False if the package has an non-absolute version. True if it is not or the node is missing.
 */
export const auditDependenciesForNonAbsoluteVersion = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  nodeName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any
): AuditDependenciesForNonAbsoluteVersionResponse => {
  const {
    onlyAbsoluteVersionDetected,
    dependenciesChecked,
    dependenciesWithAbsoluteVersion,
    dependenciesWithoutAbsoluteVersion,
  } = auditAbsoluteVersions(packageJsonData, nodeName, config);

  return {
    onlyNonAbsoluteVersionsDetected: dependenciesChecked > 0 ? !onlyAbsoluteVersionDetected : false,
    dependenciesWithAbsoluteVersion,
    dependenciesWithoutAbsoluteVersion,
  };
};

const GITHUB_SHORTCUT_URL = /^(github:)?[^/]+\/[^/]+/;

/**
 * Determines whether or not version is a shortcut to github repository
 * @param version       value of package's version
 * @return {boolean}    True if the version is a shortcut to github repository
 */
const isGithubRepositoryShortcut = (version): boolean => GITHUB_SHORTCUT_URL.test(version);

/**
 * Determines whether or not version is url to archive
 * @param version       value of package's version
 * @return {boolean}    True if the version is url to archive
 */
const isArchiveUrl = (version: string): boolean =>
  version.endsWith('.tgz') || version.endsWith('.tar.gz') || version.endsWith('.zip');

/**
 * Determines whether or not version is git repository url
 * @param version       value of package's version
 * @return {boolean}    True if the version is an git repo url.
 */
const isGitRepositoryUrl = (version: string): boolean => {
  if (isArchiveUrl(version)) {
    return false;
  }

  // based on https://github.com/npm/hosted-git-info
  const protocols = new Set(['git@', 'git://', 'git+https://', 'git+ssh://', 'http://', 'https://']);

  let match = false;

  // eslint-disable-next-line no-restricted-syntax
  for (const protocol of protocols) {
    if (version.startsWith(protocol)) {
      match = true;
      break;
    }
  }

  return match;
};

export interface AuditDependenciesForGitRepositoryVersionResponse {
  hasGitRepositoryVersions: boolean;
  dependenciesWithGitRepositoryVersion: string[];
  dependenciesWithoutGitRepositoryVersion: string[];
}

/**
 * Determines whether or not dependency versions are git repository
 * @param packageJsonData Valid JSON
 * @param nodeName Name of a node in the package.json file
 * @param config Rule configuration
 * @return True if the package has an git repo.
 */
export const auditDependenciesForGitRepositoryVersion = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  nodeName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any
): AuditDependenciesForGitRepositoryVersionResponse => {
  let hasGitRepositoryVersions = false;
  const dependenciesWithGitRepositoryVersion = [];
  const dependenciesWithoutGitRepositoryVersion = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const dependencyName in packageJsonData[nodeName]) {
    if (hasExceptions(config) && config.exceptions.includes(dependencyName)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    const dependencyVersion = packageJsonData[nodeName][dependencyName];

    if (isGitRepositoryUrl(dependencyVersion) || isGithubRepositoryShortcut(dependencyVersion)) {
      hasGitRepositoryVersions = true;
      dependenciesWithGitRepositoryVersion.push(dependencyName);
    } else {
      dependenciesWithoutGitRepositoryVersion.push(dependencyName);
    }
  }

  return {
    hasGitRepositoryVersions,
    dependenciesWithGitRepositoryVersion,
    dependenciesWithoutGitRepositoryVersion,
  };
};

export interface AuditDependenciesForArchiveUrlVersionResponse {
  hasArchiveUrlVersions: boolean;
  dependenciesWithArchiveUrlVersion: string[];
  dependenciesWithoutArchiveUrlVersion: string[];
}

/**
 * Determines whether or not dependency versions contains archive url
 * @param packageJsonData Valid JSON
 * @param nodeName Name of a node in the package.json file
 * @param config Rule configuration
 * @return True if the package contain archive url.
 */
export const auditDependenciesForArchiveUrlVersion = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  nodeName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any
): AuditDependenciesForArchiveUrlVersionResponse => {
  let hasArchiveUrlVersions = false;
  const dependenciesWithArchiveUrlVersion = [];
  const dependenciesWithoutArchiveUrlVersion = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const dependencyName in packageJsonData[nodeName]) {
    if (hasExceptions(config) && config.exceptions.includes(dependencyName)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    const dependencyVersion = packageJsonData[nodeName][dependencyName];

    if (isArchiveUrl(dependencyVersion)) {
      hasArchiveUrlVersions = true;
      dependenciesWithArchiveUrlVersion.push(dependencyName);
    } else {
      dependenciesWithoutArchiveUrlVersion.push(dependencyName);
    }
  }

  return {
    hasArchiveUrlVersions,
    dependenciesWithArchiveUrlVersion,
    dependenciesWithoutArchiveUrlVersion,
  };
};

export interface AuditDependenciesForFileUrlVersionResponse {
  hasFileUrlVersions: boolean;
  dependenciesWithFileUrlVersion: string[];
  dependenciesWithoutFileUrlVersion: string[];
}

/**
 * Determines whether or not dependency versions contains file url
 * @param packageJsonData Valid JSON
 * @param nodeName Name of a node in the package.json file
 * @param config Rule configuration
 * @return True if the package contain file url.
 */
export const auditDependenciesForFileUrlVersion = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  nodeName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any
): AuditDependenciesForFileUrlVersionResponse => {
  let hasFileUrlVersions = false;
  const dependenciesWithFileUrlVersion = [];
  const dependenciesWithoutFileUrlVersion = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const dependencyName in packageJsonData[nodeName]) {
    if (hasExceptions(config) && config.exceptions.includes(dependencyName)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    const dependencyVersion = packageJsonData[nodeName][dependencyName];

    if (dependencyVersion.startsWith('file:')) {
      hasFileUrlVersions = true;
      dependenciesWithFileUrlVersion.push(dependencyName);
    } else {
      dependenciesWithoutFileUrlVersion.push(dependencyName);
    }
  }

  return {
    hasFileUrlVersions,
    dependenciesWithFileUrlVersion,
    dependenciesWithoutFileUrlVersion,
  };
};
