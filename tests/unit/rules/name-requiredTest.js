"use strict";

let should = require("should");
let requireHelper = require("../../require_helper");
let lint = requireHelper("rules/name-required").lint;

describe("name-required Unit Tests", function() {
  context("when package.json has node", function() {
    it("true should be returned", function() {
      let packageJsonData = {
        name: "name"
      };
      let response = lint(packageJsonData);
      response.should.be.true();
    });
  });

  context("when package.json does not have node", function() {
    it("LintIssue object should be returned", function() {
      let packageJsonData = {};
      let response = lint(packageJsonData);
      response.lintId.should.equal("name-required");
      response.lintType.should.equal("error");
      response.node.should.equal("name");
      response.lintMessage.should.equal("name is required");
    });
  });
});
