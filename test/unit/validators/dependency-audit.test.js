/* eslint max-lines: "off" */

const dependencyAudit = require('./../../../src/validators/dependency-audit');

describe('dependency-audit Unit Tests', () => {
  describe('hasDependency method', () => {
    const packageJson = {
      dependencies: {
        'grunt-npm-package-json-lint': '^1.0.0'
      }
    };

    describe('when the node does not exist in the package.json file', () => {
      test('false should be returned', () => {
        const response = dependencyAudit.hasDependency(packageJson, 'devDependencies', ['grunt-npm-package-json-lint']);

        expect(response).toBeFalsy();
      });
    });

    describe('when the node exists in the package.json file and the dependency is present', () => {
      test('true should be returned', () => {
        const response = dependencyAudit.hasDependency(packageJson, 'dependencies', ['grunt-npm-package-json-lint']);

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, but the dependency do not', () => {
      test('false should be returned', () => {
        const response = dependencyAudit.hasDependency(packageJson, 'dependencies', ['gulp-npm-package-json-lint']);

        expect(response).toBeFalsy();
      });
    });
  });

  describe('hasDepPrereleaseVers method', () => {
    const packageJson = {
      dependencies: {
        'npm-package-json-lint': '^1.0.0',
        'grunt-npm-package-json-lint': '^2.0.0-beta1',
        'gulp-npm-package-json-lint': '^2.0.0-rc1'
      }
    };

    describe('when the node does not exist in the package.json file', () => {
      test('false should be returned', () => {
        const response = dependencyAudit.hasDepPrereleaseVers(packageJson, 'devDependencies', ['grunt-npm-package-json-lint']);

        expect(response).toBeFalsy();
      });
    });

    describe('when the node exists in the package.json file, the dependency is present and the version is pre-release (beta)', () => {
      test('true should be returned', () => {
        const response = dependencyAudit.hasDepPrereleaseVers(packageJson, 'dependencies', ['grunt-npm-package-json-lint']);

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, the dependency is present and the version is pre-release (rc)', () => {
      test('true should be returned', () => {
        const response = dependencyAudit.hasDepPrereleaseVers(packageJson, 'dependencies', ['gulp-npm-package-json-lint']);

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, the dependency is present and the version is not pre-release', () => {
      test('false should be returned', () => {
        const response = dependencyAudit.hasDepPrereleaseVers(packageJson, 'dependencies', ['npm-package-json-lint']);

        expect(response).toBeFalsy();
      });
    });
  });

  describe('hasDepVersZero method - part 1', () => {
    describe('when the node does not exist in the package.json file', () => {
      test('false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '~ 1.0'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'devDependencies');

        expect(response).toBeFalsy();
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '~0.6.1-1'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>=0.1.97'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '0.1.20 || 1.2.4'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '0.1.20 || >1.2.4'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '0.1.20 || 1.2.4'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '0.1.20 || 1.2.4'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>=0.2.3 || <0.0.1'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>=0.2.3 || <0.0.1'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>=0.2.3 || <0.0.1'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '~v0.5.4-pre'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        expect(response).toBeTruthy();
      });
    });
  });

  describe('hasDepVersZero method - part 2', () => {
    describe('when the node exists in the package.json file, not all versions are 1+', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '=0.7.x'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>=0.7.x'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '<=0.7.x'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>0.2.3 >0.2.4 <=0.2.5'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>=0.2.3 <=0.2.4'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^0.1.0 || ~3.0.1 || 5.0.0'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^0.1.0 || ~3.0.1 || 5.0.0'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^0.1.0 || ~3.0.1 || 5.0.0'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^0.1.0 || ~3.0.1 || >4 <=5.0.0'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, not all versions are 1+', () => {
      test('false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '=0.1.'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        expect(response).toBeFalsy();
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
            'npm-package-json-lint83': '~1.0.0-alpha'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        expect(response).toBeFalsy();
      });
    });
  });

  describe('doesVersStartsWithRange method', () => {
    describe('when dependencyVersion begins with range specifier', () => {
      test('true should be returned', () => {
        const dependencyVersion = '^1.0.0';
        const response = dependencyAudit.doesVersStartsWithRange(dependencyVersion, '^');

        expect(response).toBeTruthy();
      });
    });

    describe('when dependencyVersion does not begin with range specifier', () => {
      test('false should be returned', () => {
        const dependencyVersion = '^1.0.0';
        const response = dependencyAudit.doesVersStartsWithRange(dependencyVersion, '~');

        expect(response).toBeFalsy();
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
            'gulp-npm-package-json-lint': '^2.0.0-rc1'
          }
        };
        const response = dependencyAudit.areVersRangesValid(packageJson, 'devDependencies', '~');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, not all versions are ~', () => {
      test('false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^1.0.0',
            'grunt-npm-package-json-lint': '~2.0.0-beta1',
            'gulp-npm-package-json-lint': '^2.0.0-rc1'
          }
        };
        const response = dependencyAudit.areVersRangesValid(packageJson, 'dependencies', '~');

        expect(response).toBeFalsy();
      });
    });

    describe('when the node exists in the package.json file, all versions are ~', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '~1.0.0',
            'grunt-npm-package-json-lint': '~2.0.0-beta1',
            'gulp-npm-package-json-lint': '~2.0.0-rc1'
          }
        };
        const response = dependencyAudit.areVersRangesValid(packageJson, 'dependencies', '~');

        expect(response).toBeTruthy();
      });
    });
  });

  describe('doVersContainInvalidRange method', () => {
    describe('when the node does not exist in the package.json file', () => {
      test('false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^1.0.0',
            'grunt-npm-package-json-lint': '~2.0.0-beta1',
            'gulp-npm-package-json-lint': '^2.0.0-rc1'
          }
        };
        const response = dependencyAudit.doVersContainInvalidRange(packageJson, 'devDependencies', '~');

        expect(response).toBeFalsy();
      });
    });

    describe('when the node exists in the package.json file and some versions contain invalid ranges', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^1.0.0',
            'grunt-npm-package-json-lint': '~2.0.0-beta1',
            'gulp-npm-package-json-lint': '^2.0.0-rc1'
          }
        };
        const response = dependencyAudit.doVersContainInvalidRange(packageJson, 'dependencies', '~');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file and none of the versions contain an invalid ranges', () => {
      test('false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^1.0.0',
            'grunt-npm-package-json-lint': '^2.0.0-beta1',
            'gulp-npm-package-json-lint': '^2.0.0-rc1'
          }
        };
        const response = dependencyAudit.doVersContainInvalidRange(packageJson, 'dependencies', '~');

        expect(response).toBeFalsy();
      });
    });
  });

  describe('isVersionAbsolute method', () => {
    describe('when the node does not exist in the package.json file', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^1.0.0',
            'grunt-npm-package-json-lint': '~2.0.0-beta1',
            'gulp-npm-package-json-lint': '^2.0.0-rc1'
          }
        };
        const response = dependencyAudit.isVersionAbsolute(packageJson, 'devDependencies');

        expect(response).toBeTruthy();
      });
    });

    describe('when the node exists in the package.json file, not all versions are absolute', () => {
      test('with caret versioning false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^1.0.0',
            'gulp-npm-package-json-lint': '^2.0.0-rc1'
          }
        };
        const response = dependencyAudit.isVersionAbsolute(packageJson, 'dependencies');

        expect(response).toBeFalsy();
      });
      test('with tilde versioning false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '~1.0.0',
            'gulp-npm-package-json-lint': '~2.0.0-rc1'
          }
        };
        const response = dependencyAudit.isVersionAbsolute(packageJson, 'dependencies');

        expect(response).toBeFalsy();
      });
      test('with star versioning false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '1.0.*',
            'gulp-npm-package-json-lint': '2.*'
          }
        };
        const response = dependencyAudit.isVersionAbsolute(packageJson, 'dependencies');

        expect(response).toBeFalsy();
      });
      test('with greater versioning false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>1.0.0',
            'gulp-npm-package-json-lint': '>=2.0.0'
          }
        };
        const response = dependencyAudit.isVersionAbsolute(packageJson, 'dependencies');

        expect(response).toBeFalsy();
      });
      test('with greater versioning false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>1.0.0',
            'gulp-npm-package-json-lint': '>=2.0.0'
          }
        };
        const response = dependencyAudit.isVersionAbsolute(packageJson, 'dependencies');

        expect(response).toBeFalsy();
      });
      test('with less versioning false should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '<1.0.0',
            'gulp-npm-package-json-lint': '<=2.0.0'
          }
        };
        const response = dependencyAudit.isVersionAbsolute(packageJson, 'dependencies');

        expect(response).toBeFalsy();
      });
    });

    describe('when the node exists in the package.json file, all versions are absolute', () => {
      test('true should be returned', () => {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '1.0.0',
            'grunt-npm-package-json-lint': '2.1.0',
            'gulp-npm-package-json-lint': '=2.4.0'
          }
        };
        const response = dependencyAudit.isVersionAbsolute(packageJson, 'dependencies');

        expect(response).toBeTruthy();
      });
    });

  });

});
