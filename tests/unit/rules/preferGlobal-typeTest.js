"use strict";

let should = require("should");
let requireHelper = require("../../require_helper");
let lint = requireHelper("rules/preferGlobal-type").lint;

describe("preferGlobal-type Unit Tests", function() {
  context("when package.json has node with incorrect type", function() {
    it("LintIssue object should be returned", function() {
      let packageJsonData = {
        preferGlobal: "string"
      };
      let response = lint(packageJsonData);
      response.lintId.should.equal("preferGlobal-type");
      response.lintType.should.equal("error");
      response.node.should.equal("preferGlobal");
      response.lintMessage.should.equal("Type should be a boolean");
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
