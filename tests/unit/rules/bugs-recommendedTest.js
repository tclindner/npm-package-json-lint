"use strict";

let should = require("should");
let requireHelper = require("../../require_helper");
let lint = requireHelper("rules/bugs-recommended").lint;

describe("bugs-required Unit Tests", function() {
  context("when package.json has node", function() {
    it("true should be returned", function() {
      let packageJsonData = {
        bugs: "bugs"
      };
      let response = lint(packageJsonData);
      response.should.be.true();
    });
  });

  context("when package.json does not have node", function() {
    it("LintIssue object should be returned", function() {
      let packageJsonData = {};
      let response = lint(packageJsonData);
      response.lintId.should.equal("bugs-recommended");
      response.lintType.should.equal("warning");
      response.node.should.equal("bugs");
      response.lintMessage.should.equal("bugs is recommended");
    });
  });
});
