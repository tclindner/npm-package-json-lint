"use strict";

const should = require("should");
const requireHelper = require("../../require_helper");
const lint = requireHelper("rules/devDependencies-invalid-dependencies").lint;

describe("devDependencies-invalid-dependencies Unit Tests", function() {
  context("when package.json has node with an invalid value", function() {
    it("LintIssue object should be returned", function() {
      let packageJsonData = {
        devDependencies: {
          "npm-package-json-lint": "^1.0.0"
        }
      };
      let invalidDependencies = [
        "npm-package-json-lint",
        "grunt-npm-package-json-lint"
      ];
      let response = lint(packageJsonData, invalidDependencies);

      response.lintId.should.equal("devDependencies-invalid-dependencies");
      response.lintType.should.equal("error");
      response.node.should.equal("devDependencies");
      response.lintMessage.should.equal("You are using an invalid dependency. Please remove it.");
    });
  });

  context("when package.json has node with a valid value", function() {
    it("LintIssue object should be returned", function() {
      let packageJsonData = {
        devDependencies: {
          "gulp-npm-package-json-lint": "^1.0.0"
        }
      };
      let invalidDependencies = [
        "npm-package-json-lint",
        "grunt-npm-package-json-lint"
      ];
      let response = lint(packageJsonData, invalidDependencies);

      response.should.be.true();
    });
  });

  context("when package.json does not have node", function() {
    it("true should be returned", function() {
      let packageJsonData = {};
      let invalidDependencies = [
        "npm-package-json-lint",
        "grunt-npm-package-json-lint"
      ];
      let response = lint(packageJsonData, invalidDependencies);

      response.should.be.true();
    });
  });
});
