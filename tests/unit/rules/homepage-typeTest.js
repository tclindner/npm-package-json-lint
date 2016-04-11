"use strict";

let should = require("should");
let requireHelper = require("../../require_helper");
let lint = requireHelper("rules/homepage-type").lint;

describe("homepage-type Unit Tests", function() {
  context("when package.json has node with incorrect type", function() {
    it("LintIssue object should be returned", function() {
      let packageJsonData = {
        homepage: true
      };
      let response = lint(packageJsonData);
      response.lintId.should.equal("homepage-type");
      response.lintType.should.equal("error");
      response.node.should.equal("homepage");
      response.lintMessage.should.equal("Type should be a string");
    });
  });

  context("when package.json does not have node", function() {
    it("true should be returned", function() {
      let packageJsonData = {};
      let response = lint(packageJsonData);
      response.should.be.true();
    });
  });
});
