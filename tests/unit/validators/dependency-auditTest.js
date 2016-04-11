"use strict";

let should = require("should");
let requireHelper = require("../../require_helper");
let dependencyAudit = requireHelper("validators/dependency-audit");

describe("dependency-audit Unit Tests", function() {
  describe("hasDependency method", function() {
    let packageJson = {
      dependencies: {
        "grunt-package-json-lint": "^1.0.0"
      }
    };

    context("when the node doesn't exist in the package.json file", function() {
      it("false should be returned", function() {
        let response = dependencyAudit.hasDependency(packageJson, "devDependencies", "grunt-package-json-lint");
        response.should.be.false();
      });
    });

    context("when the node exists in the package.json file and the dependency is present", function() {
      it("true should be returned", function() {
        let response = dependencyAudit.hasDependency(packageJson, "dependencies", "grunt-package-json-lint");
        response.should.be.true();
      });
    });

    context("when the node exists in the package.json file, but the dependency do not", function() {
      it("false should be returned", function() {
        let response = dependencyAudit.hasDependency(packageJson, "dependencies", "gulp-package-json-lint");
        response.should.be.false();
      });
    });
  });

  describe("hasDependencyPrereleaseVersion method", function() {
    let packageJson = {
      dependencies: {
        "package-json-lint": "^1.0.0",
        "grunt-package-json-lint": "^2.0.0-beta1",
        "gulp-package-json-lint": "^2.0.0-rc1"
      }
    };

    context("when the node doesn't exist in the package.json file", function() {
      it("false should be returned", function() {
        let response = dependencyAudit.hasDependencyPrereleaseVersion(packageJson, "devDependencies", "grunt-package-json-lint");
        response.should.be.false();
      });
    });

    context("when the node exists in the package.json file, the dependency is present and the version is pre-release (beta)", function() {
      it("true should be returned", function() {
        let response = dependencyAudit.hasDependencyPrereleaseVersion(packageJson, "dependencies", "grunt-package-json-lint");
        response.should.be.true();
      });
    });

    context("when the node exists in the package.json file, the dependency is present and the version is pre-release (rc)", function() {
      it("true should be returned", function() {
        let response = dependencyAudit.hasDependencyPrereleaseVersion(packageJson, "dependencies", "gulp-package-json-lint");
        response.should.be.true();
      });
    });

    context("when the node exists in the package.json file, the dependency is present and the version is not pre-release", function() {
      it("false should be returned", function() {
        let response = dependencyAudit.hasDependencyPrereleaseVersion(packageJson, "dependencies", "package-json-lint");
        response.should.be.false();
      });
    });
  });
});
