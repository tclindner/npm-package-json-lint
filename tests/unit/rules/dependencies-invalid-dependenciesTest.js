"use strict";

let should = require("should");
let requireHelper = require("../../require_helper");
let lint = requireHelper("rules/dependencies-invalid-dependencies").lint;

describe("dependencies-invalid-dependencies Unit Tests", function() {
  context("when package.json has node with an invalid value", function() {
    it("LintIssue object should be returned", function() {
      let packageJsonData = {
        dependencies: {
          "package-json-lint": "^1.0.0"
        }
      };
      let invalidDependencies = [
        "package-json-lint",
        "grunt-package-json-lint"
      ];
      let response = lint(packageJsonData, invalidDependencies);
      response.lintId.should.equal("dependencies-invalid-dependencies");
      response.lintType.should.equal("error");
      response.node.should.equal("dependencies");
      response.lintMessage.should.equal("You are using an invalid dependency. Please remove it.");
    });
  });

  context("when package.json has node with a valid value", function() {
    it("LintIssue object should be returned", function() {
      let packageJsonData = {
        dependencies: {
          "gulp-package-json-lint": "^1.0.0"
        }
      };
      let invalidDependencies = [
        "package-json-lint",
        "grunt-package-json-lint"
      ];
      let response = lint(packageJsonData, invalidDependencies);
      response.should.be.true();
    });
  });

  context("when package.json does not have node", function() {
    it("true should be returned", function() {
      let packageJsonData = {};
      let invalidDependencies = [
        "package-json-lint",
        "grunt-package-json-lint"
      ];
      let response = lint(packageJsonData, invalidDependencies);
      response.should.be.true();
    });
  });
});
