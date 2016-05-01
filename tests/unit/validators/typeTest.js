"use strict";

/* eslint max-nested-callbacks: "off" */

const should = require("should");
const requireHelper = require("../../require_helper");
const type = requireHelper("validators/type");

describe("type Unit Tests", function() {
  describe("isArray method", function() {
    context("when the node doesn't exist in the package.json file", function() {
      it("true should be returned", function() {
        let packageJson = {
          name: ["awesome-module"]
        };
        let response = type.isArray(packageJson, "devDependencies");

        response.should.be.true();
      });
    });

    context("when the node exists in the package.json file and it is a string", function() {
      it("false should be returned", function() {
        let packageJson = {
          name: "awesome-module"
        };
        let response = type.isArray(packageJson, "name");

        response.should.be.false();
      });
    });

    context("when the node exists in the package.json file and it is a boolean", function() {
      it("false should be returned", function() {
        let packageJson = {
          name: true
        };
        let response = type.isArray(packageJson, "name");

        response.should.be.false();
      });
    });

    context("when the node exists in the package.json file and it is an object", function() {
      it("false should be returned", function() {
        let packageJson = {
          name: {}
        };
        let response = type.isArray(packageJson, "name");

        response.should.be.false();
      });
    });

    context("when the node exists in the package.json file and it is an array", function() {
      it("true should be returned", function() {
        let packageJson = {
          name: ["awesome-module"]
        };
        let response = type.isArray(packageJson, "name");

        response.should.be.true();
      });
    });
  });

  describe("isBoolean method", function() {
    context("when the node doesn't exist in the package.json file", function() {
      it("true should be returned", function() {
        let packageJson = {
          name: ["awesome-module"]
        };
        let response = type.isBoolean(packageJson, "devDependencies");

        response.should.be.true();
      });
    });

    context("when the node exists in the package.json file and it is a string", function() {
      it("false should be returned", function() {
        let packageJson = {
          name: "awesome-module"
        };
        let response = type.isBoolean(packageJson, "name");

        response.should.be.false();
      });
    });

    context("when the node exists in the package.json file and it is a boolean", function() {
      it("true should be returned", function() {
        let packageJson = {
          name: true
        };
        let response = type.isBoolean(packageJson, "name");

        response.should.be.true();
      });
    });

    context("when the node exists in the package.json file and it is an object", function() {
      it("false should be returned", function() {
        let packageJson = {
          name: {}
        };
        let response = type.isBoolean(packageJson, "name");

        response.should.be.false();
      });
    });

    context("when the node exists in the package.json file and it is an array", function() {
      it("false should be returned", function() {
        let packageJson = {
          name: ["awesome-module"]
        };
        let response = type.isBoolean(packageJson, "name");

        response.should.be.false();
      });
    });
  });

  describe("isObject method", function() {
    context("when the node doesn't exist in the package.json file", function() {
      it("true should be returned", function() {
        let packageJson = {
          name: ["awesome-module"]
        };
        let response = type.isObject(packageJson, "devDependencies");

        response.should.be.true();
      });
    });

    context("when the node exists in the package.json file and it is a string", function() {
      it("false should be returned", function() {
        let packageJson = {
          name: "awesome-module"
        };
        let response = type.isObject(packageJson, "name");

        response.should.be.false();
      });
    });

    context("when the node exists in the package.json file and it is a boolean", function() {
      it("false should be returned", function() {
        let packageJson = {
          name: true
        };
        let response = type.isObject(packageJson, "name");

        response.should.be.false();
      });
    });

    context("when the node exists in the package.json file and it is an object", function() {
      it("true should be returned", function() {
        let packageJson = {
          name: {}
        };
        let response = type.isObject(packageJson, "name");

        response.should.be.true();
      });
    });

    context("when the node exists in the package.json file and it is an array", function() {
      it("false should be returned", function() {
        let packageJson = {
          name: ["awesome-module"]
        };
        let response = type.isObject(packageJson, "name");

        response.should.be.false();
      });
    });
  });

  describe("isString method", function() {
    context("when the node doesn't exist in the package.json file", function() {
      it("true should be returned", function() {
        let packageJson = {
          name: ["awesome-module"]
        };
        let response = type.isString(packageJson, "devDependencies");

        response.should.be.true();
      });
    });

    context("when the node exists in the package.json file and it is a string", function() {
      it("true should be returned", function() {
        let packageJson = {
          name: "awesome-module"
        };
        let response = type.isString(packageJson, "name");

        response.should.be.true();
      });
    });

    context("when the node exists in the package.json file and it is a boolean", function() {
      it("false should be returned", function() {
        let packageJson = {
          name: true
        };
        let response = type.isString(packageJson, "name");

        response.should.be.false();
      });
    });

    context("when the node exists in the package.json file and it is an object", function() {
      it("false should be returned", function() {
        let packageJson = {
          name: {}
        };
        let response = type.isString(packageJson, "name");

        response.should.be.false();
      });
    });

    context("when the node exists in the package.json file and it is an array", function() {
      it("false should be returned", function() {
        let packageJson = {
          name: ["awesome-module"]
        };
        let response = type.isString(packageJson, "name");

        response.should.be.false();
      });
    });
  });
});
