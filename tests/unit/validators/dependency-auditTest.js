"use strict";

/* eslint max-nested-callbacks: "off" */

const should = require("should");
const requireHelper = require("../../require_helper");
const dependencyAudit = requireHelper("validators/dependency-audit");

describe("dependency-audit Unit Tests", function() {
  describe("hasDependency method", function() {
    const packageJson = {
      dependencies: {
        "grunt-npm-package-json-lint": "^1.0.0"
      }
    };

    context("when the node doesn't exist in the package.json file", function() {
      it("false should be returned", function() {
        const response = dependencyAudit.hasDependency(packageJson, "devDependencies", ["grunt-npm-package-json-lint"]);

        response.should.be.false();
      });
    });

    context("when the node exists in the package.json file and the dependency is present", function() {
      it("true should be returned", function() {
        const response = dependencyAudit.hasDependency(packageJson, "dependencies", ["grunt-npm-package-json-lint"]);

        response.should.be.true();
      });
    });

    context("when the node exists in the package.json file, but the dependency do not", function() {
      it("false should be returned", function() {
        const response = dependencyAudit.hasDependency(packageJson, "dependencies", ["gulp-npm-package-json-lint"]);

        response.should.be.false();
      });
    });
  });

  describe("hasDepPrereleaseVers method", function() {
    const packageJson = {
      dependencies: {
        "npm-package-json-lint": "^1.0.0",
        "grunt-npm-package-json-lint": "^2.0.0-beta1",
        "gulp-npm-package-json-lint": "^2.0.0-rc1"
      }
    };

    context("when the node doesn't exist in the package.json file", function() {
      it("false should be returned", function() {
        const response = dependencyAudit.hasDepPrereleaseVers(packageJson, "devDependencies", ["grunt-npm-package-json-lint"]);

        response.should.be.false();
      });
    });

    context("when the node exists in the package.json file, the dependency is present and the version is pre-release (beta)", function() {
      it("true should be returned", function() {
        const response = dependencyAudit.hasDepPrereleaseVers(packageJson, "dependencies", ["grunt-npm-package-json-lint"]);

        response.should.be.true();
      });
    });

    context("when the node exists in the package.json file, the dependency is present and the version is pre-release (rc)", function() {
      it("true should be returned", function() {
        const response = dependencyAudit.hasDepPrereleaseVers(packageJson, "dependencies", ["gulp-npm-package-json-lint"]);

        response.should.be.true();
      });
    });

    context("when the node exists in the package.json file, the dependency is present and the version is not pre-release", function() {
      it("false should be returned", function() {
        const response = dependencyAudit.hasDepPrereleaseVers(packageJson, "dependencies", ["npm-package-json-lint"]);

        response.should.be.false();
      });
    });
  });
});
