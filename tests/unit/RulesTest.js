"use strict";

/* eslint max-nested-callbacks: "off" */

const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const should = require("should");
const sinon = require("sinon");
const requireHelper = require("../require_helper");
const Rules = requireHelper("Rules");

describe("Rules Unit Tests", function() {
  describe("_registerRule method", function() {
    context("when a ruleId and ruleModule are passed in", function() {
      it("the rules object contains the rule as a key and the module path as a value", function() {
        let rules = new Rules();
        let firstIndex = 0;

        rules._registerRule("key", "c/git/key.js");
        Object.keys(rules.rules)[firstIndex].should.equal("key");
        rules.rules.key.should.equal("c/git/key.js");
      });
    });
  });

  describe("load method", function() {
    context("when load is called", function() {
      before(function() {
        let fsStub = sinon.stub(fs, "readdirSync");
        let pathStub = sinon.stub(path, "join");

        fsStub.onFirstCall().returns(["version-type.js", "version-required.js"]);
        pathStub.onFirstCall().returns("c/git/rules");
        pathStub.onSecondCall().returns("c/git/rules/version-type.js");
        pathStub.onThirdCall().returns("c/git/rules/version-required.js");
      });

      after(function() {
        fs.readdirSync.restore();
        path.join.restore();
      });

      it("an object of rules should be returned", function() {
        let rules = new Rules();
        let result = rules.load();

        rules.rules["version-type"].should.equal("c/git/rules/version-type.js");
        rules.rules["version-required"].should.equal("c/git/rules/version-required.js");
      });
    });

    context("when load is called but a fs error occurs", function() {
      before(function() {
        let fsStub = sinon.stub(fs, "readdirSync").throws();
      });

      after(function() {
        fs.readdirSync.restore();
      });

      it("false is returned", function() {
        let rules = new Rules();
        let result = rules.load();

        result.should.be.false();
      });
    });
  });
});
