"use strict";

/* eslint max-nested-callbacks: "off" */

const fs = require("fs");
const should = require("should");
const sinon = require("sinon");
const requireHelper = require("../require_helper");
const NpmPackageJsonLint = requireHelper("NpmPackageJsonLint");

describe("NpmPackageJsonLint Unit Tests", function() {
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
        let npmPackageJsonLint = new NpmPackageJsonLint(packageJsonData, config, options);
        let rules = {
          "description-type": "rules\\description-type.js",
          "name-format": "rules\\name-format.js"
        };
        let rulesStub = sinon.stub(npmPackageJsonLint, "_loadRules").returns(rules);
        let configStub = sinon.stub(npmPackageJsonLint, "_getConfig").returns(config);
        let response = npmPackageJsonLint.lint();
        let expectedErrorCount = 2;
        let expectedWarningCount = 0;

        response.errors.length.should.equal(expectedErrorCount);
        response.warnings.length.should.equal(expectedWarningCount);
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
        let npmPackageJsonLint = new NpmPackageJsonLint(packageJsonData, config, options);
        let rules = {
          "keywords-recommended": "rules\\keywords-recommended.js",
          "name-format": "rules\\name-format.js"
        };
        let rulesStub = sinon.stub(npmPackageJsonLint, "_loadRules").returns(rules);
        let configStub = sinon.stub(npmPackageJsonLint, "_getConfig").returns(config);
        let response = npmPackageJsonLint.lint();
        let expectedErrorCount = 1;
        let expectedWarningCount = 1;

        response.errors.length.should.equal(expectedErrorCount);
        response.warnings.length.should.equal(expectedWarningCount);
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
        let npmPackageJsonLint = new NpmPackageJsonLint(packageJsonData, config, options);
        let rules = {
          "keywords-recommended": "rules\\keywords-recommended.js",
          "name-format": "rules\\name-format.js"
        };
        let rulesStub = sinon.stub(npmPackageJsonLint, "_loadRules").returns(rules);
        let configStub = sinon.stub(npmPackageJsonLint, "_getConfig").returns(config);
        let response = npmPackageJsonLint.lint();
        let expectedErrorCount = 1;

        response.errors.length.should.equal(expectedErrorCount);
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
        let npmPackageJsonLint = new NpmPackageJsonLint(packageJsonData, config, options);
        let rules = {
          "author-valid-values": "rules\\author-valid-values.js"
        };
        let rulesStub = sinon.stub(npmPackageJsonLint, "_loadRules").returns(rules);
        let configStub = sinon.stub(npmPackageJsonLint, "_getConfig").returns(config);
        let response = npmPackageJsonLint.lint();
        let expectedErrorCount = 1;

        response.errors.length.should.equal(expectedErrorCount);
        response.hasOwnProperty("warnings").should.be.false();
      });
    });
  });
});
