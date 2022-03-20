import * as dependencyAudit from '../../../src/validators/dependency-audit';

describe('dependency-audit Unit Tests', () => {
  describe('hasDependency method', () => {
    const packageJson = {
      dependencies: {
        'grunt-npm-package-json-lint': '^1.0.0',
        '@types/node': '^1.0.0',
      },
    };

    describe('when the node does not exist in the package.json file', () => {
      test('false should be returned', () => {
        const response = dependencyAudit.hasDependency(packageJson, 'devDependencies', ['grunt-npm-package-json-lint']);

        expect(response).toBe(false);
      });
    });

    describe('when the node exists in the package.json file and the dependency is present', () => {
      test('true should be returned', () => {
        const response = dependencyAudit.hasDependency(packageJson, 'dependencies', ['grunt-npm-package-json-lint']);

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file and the dependency pattern is present', () => {
      test('true should be returned', () => {
        const response = dependencyAudit.hasDependency(packageJson, 'dependencies', ['@types/*']);

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file and the dependency pattern is missing * (no accidental match).', () => {
      test('false should be returned', () => {
        const response = dependencyAudit.hasDependency(packageJson, 'dependencies', ['@types/']);

        expect(response).toBe(false);
      });
    });

    describe('when the node exists in the package.json file, but the dependency do not', () => {
      test('false should be returned', () => {
        const response = dependencyAudit.hasDependency(packageJson, 'dependencies', ['gulp-npm-package-json-lint']);

        expect(response).toBe(false);
      });
    });
  });

  describe('hasDepPrereleaseVers method', () => {
    const packageJson = {
      dependencies: {
        'npm-package-json-lint': '^1.0.0',
        'grunt-npm-package-json-lint': '^2.0.0-beta1',
        'gulp-npm-package-json-lint': '^2.0.0-rc1',
      },
    };

    describe('when the node does not exist in the package.json file', () => {
      test('false should be returned', () => {
        const response = dependencyAudit.hasDepPrereleaseVers(packageJson, 'devDependencies', [
          'grunt-npm-package-json-lint',
        ]);

        expect(response).toBe(false);
      });
    });

    describe('when the node exists in the package.json file, the dependency is present and the version is pre-release (beta)', () => {
      test('true should be returned', () => {
        const response = dependencyAudit.hasDepPrereleaseVers(packageJson, 'dependencies', ['grunt-npm-package-json-lint']);

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, the dependency is present and the version is pre-release (rc)', () => {
      test('true should be returned', () => {
        const response = dependencyAudit.hasDepPrereleaseVers(packageJson, 'dependencies', ['gulp-npm-package-json-lint']);

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, the dependency is present and the version is not pre-release', () => {
      test('false should be returned', () => {
        const response = dependencyAudit.hasDepPrereleaseVers(packageJson, 'dependencies', ['npm-package-json-lint']);

        expect(response).toBe(false);
      });
    });
  });

  describe('hasDepVersZero method - part 1', () => {
    describe('when the node does not exist in the package.json file', () => {
      test('false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '~ 1.0',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'devDependencies', {});

        expect(response).toBe(false);
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '~0.6.1-1',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies', {});

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+ (scenario 2)', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>=0.1.97',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies', {});

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+ (scenario 3)', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '0.1.20 || 1.2.4',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies', {});

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+ (scenario 4)', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '0.1.20 || >1.2.4',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies', {});

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+ (scenario 5)', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '0.1.20 || 1.2.4',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies', {});

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+ (scenario 6)', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '0.1.20 || 1.2.4',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies', {});

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+ (scenario 7)', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>=0.2.3 || <0.0.1',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies', {});

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+ (scenario 8)', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>=0.2.3 || <0.0.1',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies', {});

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+ (scenario 9)', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>=0.2.3 || <0.0.1',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies', {});

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+ (scenario 10)', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '~v0.5.4-pre',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies', {});

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+, but exception match', () => {
      test('false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '~v0.5.4-pre',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies', {
          exceptions: ['npm-package-json-lint'],
        });

        expect(response).toBe(false);
      });
    });
  });

  describe('hasDepVersZero method - part 2', () => {
    describe('when the node exists in the package.json file, not all versions are 1+', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '=0.7.x',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies', {});

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+ (scenario 2)', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>=0.7.x',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies', {});

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+ (scenario 3)', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '<=0.7.x',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies', {});

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+ (scenario 4)', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>0.2.3 >0.2.4 <=0.2.5',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies', {});

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+ (scenario 5)', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>=0.2.3 <=0.2.4',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies', {});

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+ (scenario 6)', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^0.1.0 || ~3.0.1 || 5.0.0',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies', {});

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+ (scenario 7)', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^0.1.0 || ~3.0.1 || 5.0.0',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies', {});

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+ (scenario 8)', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^0.1.0 || ~3.0.1 || 5.0.0',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies', {});

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+ (scenario 9)', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^0.1.0 || ~3.0.1 || >4 <=5.0.0',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies', {});

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+ (scenario 10)', () => {
      test('false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '=0.1.',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies', {});

        expect(response).toBe(false);
      });
    });

    describe('when the node exists in the package.json file, all versions are 1+', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '~ 1.0',
            'npm-package-json-lint3': '1.0.0 - 2.0.0',
            'npm-package-json-lint4': '1.0.0 - 2.0.0',
            'npm-package-json-lint5': '1.0.0',
            'npm-package-json-lint6': '>=*',
            'npm-package-json-lint8': '*',
            'npm-package-json-lint9': '>=1.0.0',
            'npm-package-json-lint10': '>=1.0.0',
            'npm-package-json-lint11': '>=1.0.0',
            'npm-package-json-lint12': '>1.0.0',
            'npm-package-json-lint13': '>1.0.0',
            'npm-package-json-lint14': '<=2.0.0',
            'npm-package-json-lint15': '<=2.0.0',
            'npm-package-json-lint16': '<=2.0.0',
            'npm-package-json-lint17': '<2.0.0',
            'npm-package-json-lint18': '<2.0.0',
            'npm-package-json-lint19': '>= 1.0.0',
            'npm-package-json-lint20': '>=  1.0.0',
            'npm-package-json-lint21': '>=   1.0.0',
            'npm-package-json-lint22': '> 1.0.0',
            'npm-package-json-lint23': '>  1.0.0',
            'npm-package-json-lint24': '<=   2.0.0',
            'npm-package-json-lint25': '<= 2.0.0',
            'npm-package-json-lint26': '<=  2.0.0',
            'npm-package-json-lint27': '<    2.0.0',
            'npm-package-json-lint28': '<\t2.0.0',
            'npm-package-json-lint38': '||',
            'npm-package-json-lint39': '2.x.x',
            'npm-package-json-lint40': '1.2.x',
            'npm-package-json-lint41': '1.2.x || 2.x',
            'npm-package-json-lint42': '1.2.x || 2.x',
            'npm-package-json-lint43': 'x',
            'npm-package-json-lint44': '2.*.*',
            'npm-package-json-lint45': '1.2.*',
            'npm-package-json-lint46': '1.2.* || 2.*',
            'npm-package-json-lint47': '1.2.* || 2.*',
            'npm-package-json-lint48': '1.2.* || 2.*',
            'npm-package-json-lint49': '*',
            'npm-package-json-lint50': '2',
            'npm-package-json-lint51': '2.3',
            'npm-package-json-lint52': '~2.4',
            'npm-package-json-lint53': '~2.4',
            'npm-package-json-lint54': '~>3.2.1',
            'npm-package-json-lint55': '~1',
            'npm-package-json-lint56': '~>1',
            'npm-package-json-lint57': '~> 1',
            'npm-package-json-lint58': '~1.0',
            'npm-package-json-lint59': '~ 1.0',
            'npm-package-json-lint60': '>=1',
            'npm-package-json-lint61': '>= 1',
            'npm-package-json-lint62': '<1.2',
            'npm-package-json-lint63': '< 1.2',
            'npm-package-json-lint71': '1.0.0 - 2.0.0',
            'npm-package-json-lint72': '^3.0.0',
            'npm-package-json-lint73': '^1.0.0 || ~2.0.1',
            'npm-package-json-lint78': '^1.0.0alpha',
            'npm-package-json-lint79': '~1.0.0alpha',
            'npm-package-json-lint80': '^1.0.0-alpha',
            'npm-package-json-lint81': '~1.0.0-alpha',
            'npm-package-json-lint82': '^1.0.0-alpha',
            'npm-package-json-lint83': '~1.0.0-alpha',
          },
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies', {});

        expect(response).toBe(false);
      });
    });
  });

  describe('doesVersStartsWithRange method', () => {
    describe('when dependencyVersion begins with range specifier', () => {
      test('true should be returned', () => {
        const dependencyVersion = '^1.0.0';
        const response = dependencyAudit.doesVersStartsWithRange(dependencyVersion, '^');

        expect(response).toBe(true);
      });
    });

    describe('when dependencyVersion does not begin with range specifier', () => {
      test('false should be returned', () => {
        const dependencyVersion = '^1.0.0';
        const response = dependencyAudit.doesVersStartsWithRange(dependencyVersion, '~');

        expect(response).toBe(false);
      });
    });
  });

  describe('areVersRangesValid method', () => {
    describe('when the node does not exist in the package.json file', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^1.0.0',
            'grunt-npm-package-json-lint': '~2.0.0-beta1',
            'gulp-npm-package-json-lint': '^2.0.0-rc1',
          },
        };
        const response = dependencyAudit.areVersRangesValid(packageJson, 'devDependencies', '~', {});

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, not all versions are ~', () => {
      test('false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^1.0.0',
            'grunt-npm-package-json-lint': '~2.0.0-beta1',
            'gulp-npm-package-json-lint': '^2.0.0-rc1',
          },
        };
        const response = dependencyAudit.areVersRangesValid(packageJson, 'dependencies', '~', {});

        expect(response).toBe(false);
      });
    });

    describe('when the node exists in the package.json file, all versions are ~', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '~1.0.0',
            'grunt-npm-package-json-lint': '~2.0.0-beta1',
            'gulp-npm-package-json-lint': '~2.0.0-rc1',
          },
        };
        const response = dependencyAudit.areVersRangesValid(packageJson, 'dependencies', '~', {});

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, invalid rangeSpecifier is ~, one version is ^ but has expection', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '~1.0.0',
            'grunt-npm-package-json-lint': '~2.0.0-beta1',
            'gulp-npm-package-json-lint': '^2.0.0-rc1',
          },
        };
        const response = dependencyAudit.areVersRangesValid(packageJson, 'dependencies', '~', {
          exceptions: ['gulp-npm-package-json-lint'],
        });

        expect(response).toBe(true);
      });
    });

    describe('when the node exists in the package.json file, invalid rangeSpecifier is ~, one version is ^ and does not have expection', () => {
      test('false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '~1.0.0',
            'grunt-npm-package-json-lint': '~2.0.0-beta1',
            'gulp-npm-package-json-lint': '^2.0.0-rc1',
          },
        };
        const response = dependencyAudit.areVersRangesValid(packageJson, 'dependencies', '~', {});

        expect(response).toBe(false);
      });
    });
  });

  describe('auditDependenciesForInvalidRange method', () => {
    describe('when the node does not exist in the package.json file', () => {
      test('false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^1.0.0',
            'grunt-npm-package-json-lint': '~2.0.0-beta1',
            'gulp-npm-package-json-lint': '^2.0.0-rc1',
          },
        };
        const response = dependencyAudit.auditDependenciesForInvalidRange(packageJson, 'devDependencies', '~', {});

        expect(response).toStrictEqual({
          hasInvalidRangeVersions: false,
          dependenciesWithInvalidVersionRange: [],
          dependenciesWithoutInvalidVersionRange: [],
        });
      });
    });

    describe('when the node exists in the package.json file and some versions contain invalid ranges', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^1.0.0',
            'grunt-npm-package-json-lint': '~2.0.0-beta1',
            'gulp-npm-package-json-lint': '^2.0.0-rc1',
          },
        };
        const response = dependencyAudit.auditDependenciesForInvalidRange(packageJson, 'dependencies', '~', {});

        expect(response).toStrictEqual({
          hasInvalidRangeVersions: true,
          dependenciesWithInvalidVersionRange: ['grunt-npm-package-json-lint'],
          dependenciesWithoutInvalidVersionRange: ['npm-package-json-lint', 'gulp-npm-package-json-lint'],
        });
      });
    });

    describe('when the node exists in the package.json file and none of the versions contain an invalid ranges', () => {
      test('false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^1.0.0',
            'grunt-npm-package-json-lint': '^2.0.0-beta1',
            'gulp-npm-package-json-lint': '^2.0.0-rc1',
          },
        };
        const response = dependencyAudit.auditDependenciesForInvalidRange(packageJson, 'dependencies', '~', {});

        expect(response).toStrictEqual({
          hasInvalidRangeVersions: false,
          dependenciesWithInvalidVersionRange: [],
          dependenciesWithoutInvalidVersionRange: [
            'npm-package-json-lint',
            'grunt-npm-package-json-lint',
            'gulp-npm-package-json-lint',
          ],
        });
      });
    });

    describe('when the node exists in the package.json file, rangeSpecifier is ~, one version is ^ but has expection', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '~1.0.0',
            'grunt-npm-package-json-lint': '~2.0.0-beta1',
            'gulp-npm-package-json-lint': '^2.0.0-rc1',
          },
        };
        const response = dependencyAudit.auditDependenciesForInvalidRange(packageJson, 'dependencies', '~', {
          exceptions: ['npm-package-json-lint', 'grunt-npm-package-json-lint'],
        });

        expect(response).toStrictEqual({
          hasInvalidRangeVersions: false,
          dependenciesWithInvalidVersionRange: [],
          dependenciesWithoutInvalidVersionRange: ['gulp-npm-package-json-lint'],
        });
      });
    });

    describe('when the node exists in the package.json file, rangeSpecifier is ~, one version is ^ and does not have expection', () => {
      test('false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '~1.0.0',
            'grunt-npm-package-json-lint': '~2.0.0-beta1',
            'gulp-npm-package-json-lint': '^2.0.0-rc1',
          },
        };
        const response = dependencyAudit.auditDependenciesForInvalidRange(packageJson, 'dependencies', '~', {});

        expect(response).toStrictEqual({
          hasInvalidRangeVersions: true,
          dependenciesWithInvalidVersionRange: ['npm-package-json-lint', 'grunt-npm-package-json-lint'],
          dependenciesWithoutInvalidVersionRange: ['gulp-npm-package-json-lint'],
        });
      });
    });
  });

  describe('auditDependenciesForAbsoluteVersion method', () => {
    describe('when the node exists in the package.json file, not all versions are absolute', () => {
      test('with caret versioning false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^1.0.0',
            'gulp-npm-package-json-lint': '^2.0.0-rc1',
          },
        };
        const response = dependencyAudit.auditDependenciesForAbsoluteVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          onlyAbsoluteVersionsDetected: false,
          dependenciesWithAbsoluteVersion: [],
          dependenciesWithoutAbsoluteVersion: ['npm-package-json-lint', 'gulp-npm-package-json-lint'],
        });
      });
      test('with tilde versioning false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '~1.0.0',
            'gulp-npm-package-json-lint': '~2.0.0-rc1',
          },
        };
        const response = dependencyAudit.auditDependenciesForAbsoluteVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          onlyAbsoluteVersionsDetected: false,
          dependenciesWithAbsoluteVersion: [],
          dependenciesWithoutAbsoluteVersion: ['npm-package-json-lint', 'gulp-npm-package-json-lint'],
        });
      });
      test('with star versioning false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '1.0.*',
            'gulp-npm-package-json-lint': '2.*',
          },
        };
        const response = dependencyAudit.auditDependenciesForAbsoluteVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          onlyAbsoluteVersionsDetected: false,
          dependenciesWithAbsoluteVersion: [],
          dependenciesWithoutAbsoluteVersion: ['npm-package-json-lint', 'gulp-npm-package-json-lint'],
        });
      });
      test('with greater versioning false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>1.0.0',
            'gulp-npm-package-json-lint': '>=2.0.0',
          },
        };
        const response = dependencyAudit.auditDependenciesForAbsoluteVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          onlyAbsoluteVersionsDetected: false,
          dependenciesWithAbsoluteVersion: [],
          dependenciesWithoutAbsoluteVersion: ['npm-package-json-lint', 'gulp-npm-package-json-lint'],
        });
      });
      test('with less versioning false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '<1.0.0',
            'gulp-npm-package-json-lint': '<=2.0.0',
          },
        };
        const response = dependencyAudit.auditDependenciesForAbsoluteVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          onlyAbsoluteVersionsDetected: false,
          dependenciesWithAbsoluteVersion: [],
          dependenciesWithoutAbsoluteVersion: ['npm-package-json-lint', 'gulp-npm-package-json-lint'],
        });
      });
    });

    describe('when the node exists in the package.json file, all versions are absolute', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '1.0.0',
            'grunt-npm-package-json-lint': '2.1.0',
            'gulp-npm-package-json-lint': '=2.4.0',
          },
        };
        const response = dependencyAudit.auditDependenciesForAbsoluteVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          onlyAbsoluteVersionsDetected: true,
          dependenciesWithAbsoluteVersion: [
            'npm-package-json-lint',
            'grunt-npm-package-json-lint',
            'gulp-npm-package-json-lint',
          ],
          dependenciesWithoutAbsoluteVersion: [],
        });
      });
    });

    describe('when the node exists in the package.json file, one absolute version but has expection', () => {
      test('false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '1.0.0',
            'grunt-npm-package-json-lint': '~2.0.0-beta1',
            'gulp-npm-package-json-lint': '^2.0.0-rc1',
          },
        };
        const response = dependencyAudit.auditDependenciesForAbsoluteVersion(packageJson, 'dependencies', {
          exceptions: ['npm-package-json-lint'],
        });

        expect(response).toStrictEqual({
          onlyAbsoluteVersionsDetected: false,
          dependenciesWithAbsoluteVersion: [],
          dependenciesWithoutAbsoluteVersion: ['grunt-npm-package-json-lint', 'gulp-npm-package-json-lint'],
        });
      });
    });

    describe('when the node exists in the package.json file, one absolute version and does not have expection', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '1.0.0',
            'grunt-npm-package-json-lint': '~2.0.0-beta1',
            'gulp-npm-package-json-lint': '^2.0.0-rc1',
          },
        };
        const response = dependencyAudit.auditDependenciesForAbsoluteVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          onlyAbsoluteVersionsDetected: false,
          dependenciesWithAbsoluteVersion: ['npm-package-json-lint'],
          dependenciesWithoutAbsoluteVersion: ['grunt-npm-package-json-lint', 'gulp-npm-package-json-lint'],
        });
      });
    });
  });

  describe('auditDependenciesForGitRepositoryVersion method', () => {
    describe('when the node exists in the package.json file', () => {
      test('true should be returned in case of git@ dependency', () => {
        const packageJson = {
          dependencies: {
            'module-name': 'git@github.com:username/repo.git',
          },
        };
        const response = dependencyAudit.auditDependenciesForGitRepositoryVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          hasGitRepositoryVersions: true,
          dependenciesWithGitRepositoryVersion: ['module-name'],
          dependenciesWithoutGitRepositoryVersion: [],
        });
      });

      test('true should be returned in case of git:// dependency', () => {
        const packageJson = {
          dependencies: {
            'module-name': 'git://github.com/username/repo.git',
          },
        };
        const response = dependencyAudit.auditDependenciesForGitRepositoryVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          hasGitRepositoryVersions: true,
          dependenciesWithGitRepositoryVersion: ['module-name'],
          dependenciesWithoutGitRepositoryVersion: [],
        });
      });

      test('true should be returned in case of git+https:// dependency', () => {
        const packageJson = {
          dependencies: {
            'module-name': 'git+https://github.com/username/repo.git',
          },
        };
        const response = dependencyAudit.auditDependenciesForGitRepositoryVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          hasGitRepositoryVersions: true,
          dependenciesWithGitRepositoryVersion: ['module-name'],
          dependenciesWithoutGitRepositoryVersion: [],
        });
      });

      test('true should be returned in case of git+ssh:// dependency', () => {
        const packageJson = {
          dependencies: {
            'module-name': 'git+ssh://github.com/username/repo.git',
          },
        };
        const response = dependencyAudit.auditDependenciesForGitRepositoryVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          hasGitRepositoryVersions: true,
          dependenciesWithGitRepositoryVersion: ['module-name'],
          dependenciesWithoutGitRepositoryVersion: [],
        });
      });

      test('true should be returned in case of http:// dependency', () => {
        const packageJson = {
          dependencies: {
            'module-name': 'http://github.com/username/repo.git',
          },
        };
        const response = dependencyAudit.auditDependenciesForGitRepositoryVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          hasGitRepositoryVersions: true,
          dependenciesWithGitRepositoryVersion: ['module-name'],
          dependenciesWithoutGitRepositoryVersion: [],
        });
      });

      test('true should be returned in case of https:// dependency', () => {
        const packageJson = {
          dependencies: {
            'module-name': 'https://github.com/username/repo.git',
          },
        };
        const response = dependencyAudit.auditDependenciesForGitRepositoryVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          hasGitRepositoryVersions: true,
          dependenciesWithGitRepositoryVersion: ['module-name'],
          dependenciesWithoutGitRepositoryVersion: [],
        });
      });

      test('true should be returned in case of github:… dependency', () => {
        const packageJson = {
          dependencies: {
            'module-name': 'github:username/repo',
          },
        };
        const response = dependencyAudit.auditDependenciesForGitRepositoryVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          hasGitRepositoryVersions: true,
          dependenciesWithGitRepositoryVersion: ['module-name'],
          dependenciesWithoutGitRepositoryVersion: [],
        });
      });

      test('true should be returned in case of github shortcut url dependency', () => {
        const packageJson = {
          dependencies: {
            'module-name': 'username/repo',
          },
        };
        const response = dependencyAudit.auditDependenciesForGitRepositoryVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          hasGitRepositoryVersions: true,
          dependenciesWithGitRepositoryVersion: ['module-name'],
          dependenciesWithoutGitRepositoryVersion: [],
        });
      });

      test('true should be returned in case of github shortcut url dependency with branch', () => {
        const packageJson = {
          dependencies: {
            'module-name': 'org-name/repo#username/issue-42',
          },
        };
        const response = dependencyAudit.auditDependenciesForGitRepositoryVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          hasGitRepositoryVersions: true,
          dependenciesWithGitRepositoryVersion: ['module-name'],
          dependenciesWithoutGitRepositoryVersion: [],
        });
      });

      test('true should be returned in case of github shortcut url dependency with tag', () => {
        const packageJson = {
          dependencies: {
            'module-name': 'username/repo#v2.0.0-rc-1',
          },
        };
        const response = dependencyAudit.auditDependenciesForGitRepositoryVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          hasGitRepositoryVersions: true,
          dependenciesWithGitRepositoryVersion: ['module-name'],
          dependenciesWithoutGitRepositoryVersion: [],
        });
      });
    });

    describe('when the node exists in the package.json file, one absolute version but has expection', () => {
      test('false should be returned', () => {
        const packageJson = {
          dependencies: {
            'module-from-archive': 'https://github.com/miripiruni/repo/archive/v1.2.3.zip',
            'grunt-npm-package-json-lint': '2.0.0',
            'gulp-npm-package-json-lint': '^2.0.0',
          },
        };
        const response = dependencyAudit.auditDependenciesForGitRepositoryVersion(packageJson, 'dependencies', {
          exceptions: ['module-from-archive'],
        });

        expect(response).toStrictEqual({
          hasGitRepositoryVersions: false,
          dependenciesWithGitRepositoryVersion: [],
          dependenciesWithoutGitRepositoryVersion: ['grunt-npm-package-json-lint', 'gulp-npm-package-json-lint'],
        });
      });
    });
  });

  describe('auditDependenciesForNonAbsoluteVersion method', () => {
    describe('when the node exists in the package.json file, not all versions are absolute', () => {
      test('with caret versioning true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^1.0.0',
            'gulp-npm-package-json-lint': '^2.0.0-rc1',
          },
        };
        const response = dependencyAudit.auditDependenciesForNonAbsoluteVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          onlyNonAbsoluteVersionsDetected: true,
          dependenciesWithAbsoluteVersion: [],
          dependenciesWithoutAbsoluteVersion: ['npm-package-json-lint', 'gulp-npm-package-json-lint'],
        });
      });
      test('with tilde versioning true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '~1.0.0',
            'gulp-npm-package-json-lint': '~2.0.0-rc1',
          },
        };
        const response = dependencyAudit.auditDependenciesForNonAbsoluteVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          onlyNonAbsoluteVersionsDetected: true,
          dependenciesWithAbsoluteVersion: [],
          dependenciesWithoutAbsoluteVersion: ['npm-package-json-lint', 'gulp-npm-package-json-lint'],
        });
      });
      test('with star versioning true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '1.0.*',
            'gulp-npm-package-json-lint': '2.*',
          },
        };
        const response = dependencyAudit.auditDependenciesForNonAbsoluteVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          onlyNonAbsoluteVersionsDetected: true,
          dependenciesWithAbsoluteVersion: [],
          dependenciesWithoutAbsoluteVersion: ['npm-package-json-lint', 'gulp-npm-package-json-lint'],
        });
      });
      test('with greater versioning true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>1.0.0',
            'gulp-npm-package-json-lint': '>=2.0.0',
          },
        };
        const response = dependencyAudit.auditDependenciesForNonAbsoluteVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          onlyNonAbsoluteVersionsDetected: true,
          dependenciesWithAbsoluteVersion: [],
          dependenciesWithoutAbsoluteVersion: ['npm-package-json-lint', 'gulp-npm-package-json-lint'],
        });
      });
      test('with less versioning true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '<1.0.0',
            'gulp-npm-package-json-lint': '<=2.0.0',
          },
        };
        const response = dependencyAudit.auditDependenciesForNonAbsoluteVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          onlyNonAbsoluteVersionsDetected: true,
          dependenciesWithAbsoluteVersion: [],
          dependenciesWithoutAbsoluteVersion: ['npm-package-json-lint', 'gulp-npm-package-json-lint'],
        });
      });
    });

    describe('when the node exists in the package.json file, all versions are absolute', () => {
      test('false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '1.0.0',
            'grunt-npm-package-json-lint': '2.1.0',
            'gulp-npm-package-json-lint': '=2.4.0',
          },
        };
        const response = dependencyAudit.auditDependenciesForNonAbsoluteVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          onlyNonAbsoluteVersionsDetected: false,
          dependenciesWithAbsoluteVersion: [
            'npm-package-json-lint',
            'grunt-npm-package-json-lint',
            'gulp-npm-package-json-lint',
          ],
          dependenciesWithoutAbsoluteVersion: [],
        });
      });
    });

    describe('when the node exists in the package.json file, one absolute version but has expection', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '1.0.0',
            'grunt-npm-package-json-lint': '~2.0.0-beta1',
            'gulp-npm-package-json-lint': '^2.0.0-rc1',
          },
        };
        const response = dependencyAudit.auditDependenciesForNonAbsoluteVersion(packageJson, 'dependencies', {
          exceptions: ['npm-package-json-lint'],
        });

        expect(response).toStrictEqual({
          onlyNonAbsoluteVersionsDetected: true,
          dependenciesWithAbsoluteVersion: [],
          dependenciesWithoutAbsoluteVersion: ['grunt-npm-package-json-lint', 'gulp-npm-package-json-lint'],
        });
      });
    });

    describe('when the node exists in the package.json file, one absolute version and does not have expection', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '1.0.0',
            'grunt-npm-package-json-lint': '~2.0.0-beta1',
            'gulp-npm-package-json-lint': '^2.0.0-rc1',
          },
        };
        const response = dependencyAudit.auditDependenciesForNonAbsoluteVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          onlyNonAbsoluteVersionsDetected: true,
          dependenciesWithAbsoluteVersion: ['npm-package-json-lint'],
          dependenciesWithoutAbsoluteVersion: ['grunt-npm-package-json-lint', 'gulp-npm-package-json-lint'],
        });
      });
    });
  });

  describe('auditDependenciesForArchiveUrlVersion method', () => {
    describe('when the node exists in the package.json file, some versions are archive url', () => {
      test('with tar.gz dependency true should be returned', () => {
        const packageJson = {
          dependencies: {
            'my-module': 'https://github.com/miripiruni/repo/archive/v1.2.3.tar.gz',
          },
        };
        const response = dependencyAudit.auditDependenciesForArchiveUrlVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          hasArchiveUrlVersions: true,
          dependenciesWithArchiveUrlVersion: ['my-module'],
          dependenciesWithoutArchiveUrlVersion: [],
        });
      });

      test('with zip dependency true should be returned', () => {
        const packageJson = {
          dependencies: {
            'my-module': 'https://github.com/miripiruni/repo/archive/v1.2.3.zip',
          },
        };
        const response = dependencyAudit.auditDependenciesForArchiveUrlVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          hasArchiveUrlVersions: true,
          dependenciesWithArchiveUrlVersion: ['my-module'],
          dependenciesWithoutArchiveUrlVersion: [],
        });
      });
    });

    describe('when the node exists in the package.json file, all versions are non git', () => {
      test('false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '1.0.0',
            'grunt-npm-package-json-lint': '2.1.0',
            'gulp-npm-package-json-lint': '=2.4.0',
            'module-from-local': 'file:local-module',
            'module-from-archive': 'https://github.com/user/repo.git',
          },
        };
        const response = dependencyAudit.auditDependenciesForArchiveUrlVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          hasArchiveUrlVersions: false,
          dependenciesWithArchiveUrlVersion: [],
          dependenciesWithoutArchiveUrlVersion: [
            'npm-package-json-lint',
            'grunt-npm-package-json-lint',
            'gulp-npm-package-json-lint',
            'module-from-local',
            'module-from-archive',
          ],
        });
      });
    });
  });

  describe('auditDependenciesForFileUrlVersion method', () => {
    describe('when the node exists in the package.json file, some versions are url to file', () => {
      test('with github dependency true should be returned', () => {
        const packageJson = {
          dependencies: {
            'my-module': 'file:local-module',
          },
        };
        const response = dependencyAudit.auditDependenciesForFileUrlVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          hasFileUrlVersions: true,
          dependenciesWithFileUrlVersion: ['my-module'],
          dependenciesWithoutFileUrlVersion: [],
        });
      });
    });

    describe('when the node exists in the package.json file, all versions are non file url', () => {
      test('false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '1.0.0',
            'grunt-npm-package-json-lint': '2.1.0',
            'gulp-npm-package-json-lint': '=2.4.0',
            'module-from-git': 'https://github.com/user/repo.git',
            'module-from-archive': 'https://github.com/user/repo/archive/v1.2.3.tar.gz',
          },
        };
        const response = dependencyAudit.auditDependenciesForFileUrlVersion(packageJson, 'dependencies', {});

        expect(response).toStrictEqual({
          hasFileUrlVersions: false,
          dependenciesWithFileUrlVersion: [],
          dependenciesWithoutFileUrlVersion: [
            'npm-package-json-lint',
            'grunt-npm-package-json-lint',
            'gulp-npm-package-json-lint',
            'module-from-git',
            'module-from-archive',
          ],
        });
      });
    });

    describe('when the node exists in the package.json file, one absolute version but has expection', () => {
      test('false should be returned', () => {
        const packageJson = {
          dependencies: {
            'module-from-file': 'file:local-module',
            'grunt-npm-package-json-lint': '2.0.0',
            'gulp-npm-package-json-lint': '^2.0.0',
          },
        };
        const response = dependencyAudit.auditDependenciesForFileUrlVersion(packageJson, 'dependencies', {
          exceptions: ['module-from-file'],
        });

        expect(response).toStrictEqual({
          hasFileUrlVersions: false,
          dependenciesWithFileUrlVersion: [],
          dependenciesWithoutFileUrlVersion: ['grunt-npm-package-json-lint', 'gulp-npm-package-json-lint'],
        });
      });
    });
  });
});
