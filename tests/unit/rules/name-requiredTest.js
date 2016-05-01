"use strict";

const should = require("should");
const requireHelper = require("../../require_helper");
const lint = requireHelper("rules/name-required").lint;

describe("name-required Unit Tests", function() {
  context("when package.json has node", function() {
    it("true should be returned", function() {
      const packageJsonData = {
        name: "name"
      };
      const response = lint(packageJsonData);

      response.should.be.true();
    });
  });

  context("when package.json does not have node", function() {
    it("LintIssue object should be returned", function() {
      const packageJsonData = {};
      const response = lint(packageJsonData);

      response.lintId.should.equal("name-required");
      response.lintType.should.equal("error");
      response.node.should.equal("name");
      response.lintMessage.should.equal("name is required");
    });
  });
});
