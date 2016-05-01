"use strict";

const should = require("should");
const requireHelper = require("../../require_helper");
const lint = requireHelper("rules/version-required").lint;

describe("version-required Unit Tests", function() {
  context("when package.json has node", function() {
    it("true should be returned", function() {
      let packageJsonData = {
        version: "version"
      };
      let response = lint(packageJsonData);

      response.should.be.true();
    });
  });

  context("when package.json does not have node", function() {
    it("LintIssue object should be returned", function() {
      let packageJsonData = {};
      let response = lint(packageJsonData);

      response.lintId.should.equal("version-required");
      response.lintType.should.equal("error");
      response.node.should.equal("version");
      response.lintMessage.should.equal("version is required");
    });
  });
});
