"use strict";

const should = require("should");
const requireHelper = require("../../require_helper");
const lint = requireHelper("rules/devDependencies-invalid-pre-release-dependencies").lint;

describe("devDependencies-invalid-pre-release-dependencies Unit Tests", function() {
  context("when package.json has node with an invalid value", function() {
    it("LintIssue object should be returned", function() {
      const packageJsonData = {
        devDependencies: {
          "npm-package-json-lint": "^1.0.0-beta"
        }
      };
      const invldPreReleaseDeps = [
        "npm-package-json-lint",
        "grunt-npm-package-json-lint"
      ];
      const response = lint(packageJsonData, invldPreReleaseDeps);

      response.lintId.should.equal("devDependencies-invalid-pre-release-dependencies");
      response.lintType.should.equal("error");
      response.node.should.equal("devDependencies");
      response.lintMessage.should.equal("You are using an invalid pre-release dependency. Please remove it.");
    });
  });

  context("when package.json has node with a valid value", function() {
    it("LintIssue object should be returned", function() {
      const packageJsonData = {
        devDependencies: {
          "grunt-npm-package-json-lint": "^1.0.0"
        }
      };
      const invldPreReleaseDeps = [
        "npm-package-json-lint",
        "grunt-npm-package-json-lint"
      ];
      const response = lint(packageJsonData, invldPreReleaseDeps);

      response.should.be.true();
    });
  });

  context("when package.json does not have node", function() {
    it("true should be returned", function() {
      const packageJsonData = {};
      const invldPreReleaseDeps = [
        "npm-package-json-lint",
        "grunt-npm-package-json-lint"
      ];
      const response = lint(packageJsonData, invldPreReleaseDeps);

      response.should.be.true();
    });
  });
});
