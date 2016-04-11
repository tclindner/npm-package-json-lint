"use strict";

let should = require("should");
let requireHelper = require("../../require_helper");
let lint = requireHelper("rules/name-format").lint;

describe("name-format Unit Tests", function() {
  context("when package.json has node with incorrect format", function() {
    it("LintIssue object should be returned", function() {
      let packageJsonData = {
        name: "ImNotLowercase"
      };
      let response = lint(packageJsonData);
      response.lintId.should.equal("name-format");
      response.lintType.should.equal("error");
      response.node.should.equal("name");
      response.lintMessage.should.equal("Format should be all lowercase");
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
