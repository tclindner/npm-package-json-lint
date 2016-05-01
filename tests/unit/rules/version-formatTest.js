"use strict";

const should = require("should");
const requireHelper = require("../../require_helper");
const lint = requireHelper("rules/version-format").lint;

describe("version-format Unit Tests", function() {
  context("when package.json has node with invalid version", function() {
    it("LintIssue object should be returned", function() {
      const packageJsonData = {
        version: "1.a.0"
      };
      const response = lint(packageJsonData);

      response.lintId.should.equal("version-format");
      response.lintType.should.equal("error");
      response.node.should.equal("version");
      response.lintMessage.should.equal("Format must be a valid semantic version");
    });
  });

  context("when package.json has node with valid version", function() {
    it("LintIssue object should be returned", function() {
      const packageJsonData = {
        version: "1.0.0"
      };
      const response = lint(packageJsonData);

      response.should.be.true();
    });
  });

  context("when package.json does not have node", function() {
    it("true should be returned", function() {
      const packageJsonData = {};
      const response = lint(packageJsonData);

      response.should.be.true();
    });
  });
});
