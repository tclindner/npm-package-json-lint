"use strict";

let should = require("should");
let requireHelper = require("../../require_helper");
let lint = requireHelper("rules/homepage-recommended").lint;

describe("homepage-recommended Unit Tests", function() {
  context("when package.json has node", function() {
    it("true should be returned", function() {
      let packageJsonData = {
        homepage: "homepage"
      };
      let response = lint(packageJsonData);
      response.should.be.true();
    });
  });

  context("when package.json does not have node", function() {
    it("LintIssue object should be returned", function() {
      let packageJsonData = {};
      let response = lint(packageJsonData);
      response.lintId.should.equal("homepage-recommended");
      response.lintType.should.equal("warning");
      response.node.should.equal("homepage");
      response.lintMessage.should.equal("homepage is recommended");
    });
  });
});
