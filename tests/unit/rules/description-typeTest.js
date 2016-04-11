"use strict";

let should = require("should");
let requireHelper = require("../../require_helper");
let lint = requireHelper("rules/description-type").lint;

describe("description-type Unit Tests", function() {
  context("when package.json has node with incorrect type", function() {
    it("LintIssue object should be returned", function() {
      let packageJsonData = {
        description: true
      };
      let response = lint(packageJsonData);
      response.lintId.should.equal("description-type");
      response.lintType.should.equal("error");
      response.node.should.equal("description");
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
