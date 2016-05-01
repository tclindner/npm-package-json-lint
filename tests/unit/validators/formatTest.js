"use strict";

/* eslint max-nested-callbacks: "off" */

const should = require("should");
const requireHelper = require("../../require_helper");
const format = requireHelper("validators/format");

describe("format Unit Tests", function() {
  describe("isLowercase method", function() {
    context("when the node doesn't exist in the package.json file", function() {
      it("true should be returned", function() {
        let packageJson = {
          name: "awesome-module"
        };
        let response = format.isLowercase(packageJson, "devDependencies");

        response.should.be.true();
      });
    });

    context("when the node exists in the package.json file and name is lowercase", function() {
      it("true should be returned", function() {
        let packageJson = {
          name: "awesome-module"
        };
        let response = format.isLowercase(packageJson, "name");

        response.should.be.true();
      });
    });

    context("when the node exists in the package.json file, but name is not lowercase", function() {
      it("false should be returned", function() {
        let packageJson = {
          name: "aweSome-moDule"
        };
        let response = format.isLowercase(packageJson, "name");

        response.should.be.false();
      });
    });
  });

  describe("isValidVersionNumber method", function() {
    context("when the node doesn't exist in the package.json file", function() {
      it("true should be returned", function() {
        let packageJson = {
          version: "1.0.0"
        };
        let response = format.isValidVersionNumber(packageJson, "devDependencies");

        response.should.be.true();
      });
    });

    context("when the node exists in the package.json file and version is valid", function() {
      it("true should be returned", function() {
        let packageJson = {
          version: "1.0.0"
        };
        let response = format.isValidVersionNumber(packageJson, "version");

        response.should.be.true();
      });
    });

    context("when the node exists in the package.json file and version is invalid", function() {
      it("false should be returned", function() {
        let packageJson = {
          version: "1a.0"
        };
        let response = format.isValidVersionNumber(packageJson, "version");

        response.should.be.false();
      });
    });

    context("when the node exists in the package.json file and version is invalid", function() {
      it("false should be returned", function() {
        let packageJson = {
          version: "1.a.0"
        };
        let response = format.isValidVersionNumber(packageJson, "version");

        response.should.be.false();
      });
    });
  });
});
