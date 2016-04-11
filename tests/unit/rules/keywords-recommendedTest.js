"use strict";

let should = require("should");
let requireHelper = require("../../require_helper");
let lint = requireHelper("rules/keywords-recommended").lint;

describe("keywords-recommended Unit Tests", function() {
  context("when package.json has node", function() {
    it("true should be returned", function() {
      let packageJsonData = {
        keywords: "keywords"
      };
      let response = lint(packageJsonData);
      response.should.be.true();
    });
  });

  context("when package.json does not have node", function() {
    it("LintIssue object should be returned", function() {
      let packageJsonData = {};
      let response = lint(packageJsonData);
      response.lintId.should.equal("keywords-recommended");
      response.lintType.should.equal("warning");
      response.node.should.equal("keywords");
      response.lintMessage.should.equal("keywords is recommended");
    });
  });
});
