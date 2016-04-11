"use strict";

let should = require("should");
let requireHelper = require("../../require_helper");
let lint = requireHelper("rules/dependencies-invalid-pre-release-dependencies").lint;

describe("dependencies-invalid-pre-release-dependencies Unit Tests", function() {
  context("when package.json has node with an invalid value", function() {
    it("LintIssue object should be returned", function() {
      let packageJsonData = {
        dependencies: {
          "package-json-lint": "^1.0.0-beta"
        }
      };
      let invalidPreReleaseDependencies = [
        "package-json-lint",
        "grunt-package-json-lint"
      ];
      let response = lint(packageJsonData, invalidPreReleaseDependencies);
      response.lintId.should.equal("dependencies-invalid-pre-release-dependencies");
      response.lintType.should.equal("error");
      response.node.should.equal("dependencies");
      response.lintMessage.should.equal("You are using an invalid pre-release dependency. Please remove it.");
    });
  });

  context("when package.json has node with a valid value", function() {
    it("LintIssue object should be returned", function() {
      let packageJsonData = {
        dependencies: {
          "grunt-package-json-lint": "^1.0.0"
        }
      };
      let invalidPreReleaseDependencies = [
        "package-json-lint",
        "grunt-package-json-lint"
      ];
      let response = lint(packageJsonData, invalidPreReleaseDependencies);
      response.should.be.true();
    });
  });

  context("when package.json does not have node", function() {
    it("true should be returned", function() {
      let packageJsonData = {};
      let invalidPreReleaseDependencies = [
        "package-json-lint",
        "grunt-package-json-lint"
      ];
      let response = lint(packageJsonData, invalidPreReleaseDependencies);
      response.should.be.true();
    });
  });
});
