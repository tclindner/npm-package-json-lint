"use strict";

const should = require("should");
const requireHelper = require("../../require_helper");
const lint = requireHelper("rules/dependencies-invalid-dependencies").lint;

describe("dependencies-invalid-dependencies Unit Tests", function() {
  context("when package.json has node with an invalid value", function() {
    it("LintIssue object should be returned", function() {
      const packageJsonData = {
        dependencies: {
          "npm-package-json-lint": "^1.0.0"
        }
      };
      const invalidDependencies = [
        "npm-package-json-lint",
        "grunt-npm-package-json-lint"
      ];
      const response = lint(packageJsonData, invalidDependencies);

      response.lintId.should.equal("dependencies-invalid-dependencies");
      response.lintType.should.equal("error");
      response.node.should.equal("dependencies");
      response.lintMessage.should.equal("You are using an invalid dependency. Please remove it.");
    });
  });

  context("when package.json has node with a valid value", function() {
    it("LintIssue object should be returned", function() {
      const packageJsonData = {
        dependencies: {
          "gulp-npm-package-json-lint": "^1.0.0"
        }
      };
      const invalidDependencies = [
        "npm-package-json-lint",
        "grunt-npm-package-json-lint"
      ];
      const response = lint(packageJsonData, invalidDependencies);

      response.should.be.true();
    });
  });

  context("when package.json does not have node", function() {
    it("true should be returned", function() {
      const packageJsonData = {};
      const invalidDependencies = [
        "npm-package-json-lint",
        "grunt-npm-package-json-lint"
      ];
      const response = lint(packageJsonData, invalidDependencies);

      response.should.be.true();
    });
  });
});
