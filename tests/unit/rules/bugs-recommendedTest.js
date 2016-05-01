"use strict";

const should = require("should");
const requireHelper = require("../../require_helper");
const lint = requireHelper("rules/bugs-recommended").lint;

describe("bugs-required Unit Tests", function() {
  context("when package.json has node", function() {
    it("true should be returned", function() {
      const packageJsonData = {
        bugs: "bugs"
      };
      const response = lint(packageJsonData);

      response.should.be.true();
    });
  });

  context("when package.json does not have node", function() {
    it("LintIssue object should be returned", function() {
      const packageJsonData = {};
      const response = lint(packageJsonData);

      response.lintId.should.equal("bugs-recommended");
      response.lintType.should.equal("warning");
      response.node.should.equal("bugs");
      response.lintMessage.should.equal("bugs is recommended");
    });
  });
});
