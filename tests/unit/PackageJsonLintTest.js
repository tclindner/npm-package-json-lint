"use strict";

let fs = require("fs");
let should = require("should");
let sinon = require("sinon");
let requireHelper = require("../require_helper");
let PackageJsonLint = requireHelper("PackageJsonLint");

describe("PackageJsonLint Unit Tests", function() {
  describe("lint method", function() {
    context("validate that errors and warnings are set", function() {
      it("two errors and zero warnings expected", function() {
        let packageJsonData = {
          name: "ALLCAPS",
          description: true
        };
        let config = {
          "description-type": true,
          "name-format": true
        };
        let options = {
          ignoreWarnings: false
        };
        let packageJsonLint = new PackageJsonLint(packageJsonData, config, options);
        let rules = {
          "description-type": "rules\\description-type.js",
          "name-format": "rules\\name-format.js"
        };
        let rulesStub = sinon.stub(packageJsonLint, "_loadRules").returns(rules);
        let configStub = sinon.stub(packageJsonLint, "_getConfig").returns(config);
        let response = packageJsonLint.lint();
        response.errors.length.should.equal(2);
        response.warnings.length.should.equal(0);
      });
    });

    context("validate that errors and warnings are set", function() {
      it("one error and one warning expected", function() {
        let packageJsonData = {
          name: "ALLCAPS"
        };
        let config = {
          "keywords-recommended": true,
          "name-format": true
        };
        let options = {
          ignoreWarnings: false
        };
        let packageJsonLint = new PackageJsonLint(packageJsonData, config, options);
        let rules = {
          "keywords-recommended": "rules\\keywords-recommended.js",
          "name-format": "rules\\name-format.js"
        };
        let rulesStub = sinon.stub(packageJsonLint, "_loadRules").returns(rules);
        let configStub = sinon.stub(packageJsonLint, "_getConfig").returns(config);
        let response = packageJsonLint.lint();
        response.errors.length.should.equal(1);
        response.warnings.length.should.equal(1);
      });
    });

    context("validate that errors and warnings are set", function() {
      it("one error and one warning expected", function() {
        let packageJsonData = {
          name: "ALLCAPS"
        };
        let config = {
          "keywords-recommended": true,
          "name-format": true
        };
        let options = {
          ignoreWarnings: true
        };
        let packageJsonLint = new PackageJsonLint(packageJsonData, config, options);
        let rules = {
          "keywords-recommended": "rules\\keywords-recommended.js",
          "name-format": "rules\\name-format.js"
        };
        let rulesStub = sinon.stub(packageJsonLint, "_loadRules").returns(rules);
        let configStub = sinon.stub(packageJsonLint, "_getConfig").returns(config);
        let response = packageJsonLint.lint();
        response.errors.length.should.equal(1);
        response.hasOwnProperty("warnings").should.be.false();
      });
    });

    context("validate that errors and warnings are set", function() {
      it("one error and one warning expected", function() {
        let packageJsonData = {
          author: "Caitlin Snow"
        };
        let config = {
          "author-valid-values": [
            "Barry Allen",
            "Iris West"
          ]
        };
        let options = {
          ignoreWarnings: true
        };
        let packageJsonLint = new PackageJsonLint(packageJsonData, config, options);
        let rules = {
          "author-valid-values": "rules\\author-valid-values.js"
        };
        let rulesStub = sinon.stub(packageJsonLint, "_loadRules").returns(rules);
        let configStub = sinon.stub(packageJsonLint, "_getConfig").returns(config);
        let response = packageJsonLint.lint();
        response.errors.length.should.equal(1);
        response.hasOwnProperty("warnings").should.be.false();
      });
    });
  });
});
