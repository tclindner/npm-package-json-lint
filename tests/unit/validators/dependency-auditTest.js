'use strict';

/* eslint max-nested-callbacks: "off", max-lines: "off" */

const should = require('should');
const requireHelper = require('../../require_helper');
const dependencyAudit = requireHelper('validators/dependency-audit');

describe('dependency-audit Unit Tests', function() {
  describe('hasDependency method', function() {
    const packageJson = {
      dependencies: {
        'grunt-npm-package-json-lint': '^1.0.0'
      }
    };

    context('when the node does not exist in the package.json file', function() {
      it('false should be returned', function() {
        const response = dependencyAudit.hasDependency(packageJson, 'devDependencies', ['grunt-npm-package-json-lint']);

        response.should.be.false();
      });
    });

    context('when the node exists in the package.json file and the dependency is present', function() {
      it('true should be returned', function() {
        const response = dependencyAudit.hasDependency(packageJson, 'dependencies', ['grunt-npm-package-json-lint']);

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, but the dependency do not', function() {
      it('false should be returned', function() {
        const response = dependencyAudit.hasDependency(packageJson, 'dependencies', ['gulp-npm-package-json-lint']);

        response.should.be.false();
      });
    });
  });

  describe('hasDepPrereleaseVers method', function() {
    const packageJson = {
      dependencies: {
        'npm-package-json-lint': '^1.0.0',
        'grunt-npm-package-json-lint': '^2.0.0-beta1',
        'gulp-npm-package-json-lint': '^2.0.0-rc1'
      }
    };

    context('when the node does not exist in the package.json file', function() {
      it('false should be returned', function() {
        const response = dependencyAudit.hasDepPrereleaseVers(packageJson, 'devDependencies', ['grunt-npm-package-json-lint']);

        response.should.be.false();
      });
    });

    context('when the node exists in the package.json file, the dependency is present and the version is pre-release (beta)', function() {
      it('true should be returned', function() {
        const response = dependencyAudit.hasDepPrereleaseVers(packageJson, 'dependencies', ['grunt-npm-package-json-lint']);

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, the dependency is present and the version is pre-release (rc)', function() {
      it('true should be returned', function() {
        const response = dependencyAudit.hasDepPrereleaseVers(packageJson, 'dependencies', ['gulp-npm-package-json-lint']);

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, the dependency is present and the version is not pre-release', function() {
      it('false should be returned', function() {
        const response = dependencyAudit.hasDepPrereleaseVers(packageJson, 'dependencies', ['npm-package-json-lint']);

        response.should.be.false();
      });
    });
  });

  describe('hasDepVersZero method - part 1', function() {
    context('when the node does not exist in the package.json file', function() {
      it('false should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '~ 1.0'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'devDependencies');

        response.should.be.false();
      });
    });

    context('when the node exists in the package.json file, not all versions are 1+', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '~0.6.1-1'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, not all versions are 1+', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>=0.1.97'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, not all versions are 1+', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '0.1.20 || 1.2.4'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, not all versions are 1+', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '0.1.20 || >1.2.4'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, not all versions are 1+', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '0.1.20 || 1.2.4'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, not all versions are 1+', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '0.1.20 || 1.2.4'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, not all versions are 1+', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>=0.2.3 || <0.0.1'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, not all versions are 1+', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>=0.2.3 || <0.0.1'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, not all versions are 1+', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>=0.2.3 || <0.0.1'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, not all versions are 1+', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '~v0.5.4-pre'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        response.should.be.true();
      });
    });
  });

  describe('hasDepVersZero method - part 2', function() {
    context('when the node exists in the package.json file, not all versions are 1+', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '=0.7.x'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, not all versions are 1+', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>=0.7.x'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, not all versions are 1+', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '<=0.7.x'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, not all versions are 1+', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>0.2.3 >0.2.4 <=0.2.5'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, not all versions are 1+', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>=0.2.3 <=0.2.4'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, not all versions are 1+', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^0.1.0 || ~3.0.1 || 5.0.0'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, not all versions are 1+', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^0.1.0 || ~3.0.1 || 5.0.0'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, not all versions are 1+', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^0.1.0 || ~3.0.1 || 5.0.0'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, not all versions are 1+', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^0.1.0 || ~3.0.1 || >4 <=5.0.0'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, not all versions are 1+', function() {
      it('false should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '=0.1.'
          }
        };
        const response = dependencyAudit.hasDepVersZero(packageJson, 'dependencies');

        response.should.be.false();
      });
    });

    context('when the node exists in the package.json file, all versions are 1+', function() {
      it('true should be returned', function() {
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

        response.should.be.false();
      });
    });
  });

  describe('areVersRangesValid method', function() {
    context('when the node does not exist in the package.json file', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^1.0.0',
            'grunt-npm-package-json-lint': '~2.0.0-beta1',
            'gulp-npm-package-json-lint': '^2.0.0-rc1'
          }
        };
        const response = dependencyAudit.areVersRangesValid(packageJson, 'devDependencies', '~');

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, not all versions are ~', function() {
      it('false should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^1.0.0',
            'grunt-npm-package-json-lint': '~2.0.0-beta1',
            'gulp-npm-package-json-lint': '^2.0.0-rc1'
          }
        };
        const response = dependencyAudit.areVersRangesValid(packageJson, 'dependencies', '~');

        response.should.be.false();
      });
    });

    context('when the node exists in the package.json file, all versions are ~', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '~1.0.0',
            'grunt-npm-package-json-lint': '~2.0.0-beta1',
            'gulp-npm-package-json-lint': '~2.0.0-rc1'
          }
        };
        const response = dependencyAudit.areVersRangesValid(packageJson, 'dependencies', '~');

        response.should.be.true();
      });
    });
  });

  describe('isVersionAbsolute method', function() {
    context('when the node does not exist in the package.json file', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^1.0.0',
            'grunt-npm-package-json-lint': '~2.0.0-beta1',
            'gulp-npm-package-json-lint': '^2.0.0-rc1'
          }
        };
        const response = dependencyAudit.isVersionAbsolute(packageJson, 'devDependencies');

        response.should.be.true();
      });
    });

    context('when the node exists in the package.json file, not all versions are absolute', function() {
      it('with caret versioning false should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '^1.0.0',
            'gulp-npm-package-json-lint': '^2.0.0-rc1'
          }
        };
        const response = dependencyAudit.isVersionAbsolute(packageJson, 'dependencies');

        response.should.be.false();
      });
      it('with tilde versioning false should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '~1.0.0',
            'gulp-npm-package-json-lint': '~2.0.0-rc1'
          }
        };
        const response = dependencyAudit.isVersionAbsolute(packageJson, 'dependencies');

        response.should.be.false();
      });
      it('with star versioning false should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '1.0.*',
            'gulp-npm-package-json-lint': '2.*'
          }
        };
        const response = dependencyAudit.isVersionAbsolute(packageJson, 'dependencies');

        response.should.be.false();
      });
      it('with greater versioning false should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>1.0.0',
            'gulp-npm-package-json-lint': '>=2.0.0'
          }
        };
        const response = dependencyAudit.isVersionAbsolute(packageJson, 'dependencies');

        response.should.be.false();
      });
      it('with greater versioning false should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '>1.0.0',
            'gulp-npm-package-json-lint': '>=2.0.0'
          }
        };
        const response = dependencyAudit.isVersionAbsolute(packageJson, 'dependencies');

        response.should.be.false();
      });
      it('with less versioning false should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '<1.0.0',
            'gulp-npm-package-json-lint': '<=2.0.0'
          }
        };
        const response = dependencyAudit.isVersionAbsolute(packageJson, 'dependencies');

        response.should.be.false();
      });
    });

    context('when the node exists in the package.json file, all versions are absolute', function() {
      it('true should be returned', function() {
        const packageJson = {
          dependencies: {
            'npm-package-json-lint': '1.0.0',
            'grunt-npm-package-json-lint': '2.1.0',
            'gulp-npm-package-json-lint': '=2.4.0'
          }
        };
        const response = dependencyAudit.isVersionAbsolute(packageJson, 'dependencies');

        response.should.be.true();
      });
    });

  });

});
