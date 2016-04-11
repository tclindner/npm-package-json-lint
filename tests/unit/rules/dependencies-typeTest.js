"use strict";

let should = require("should");
let requireHelper = require("../../require_helper");
let lint = requireHelper("rules/dependencies-type").lint;

describe("dependencies-type Unit Tests", function() {
  context("when package.json has node with incorrect type", function() {
    it("LintIssue object should be returned", function() {
      let packageJsonData = {
        dependencies: "dependencies"
      };
      let response = lint(packageJsonData);
      response.lintId.should.equal("dependencies-type");
      response.lintType.should.equal("error");
      response.node.should.equal("dependencies");
      response.lintMessage.should.equal("Type should be an Object");
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
