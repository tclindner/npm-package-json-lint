module.exports = function(grunt) {

  grunt.config("instrument", {
    files: "src/**/*.js",
    options: {
      lazy: true,
      basePath: "tests/coverage/instrument/"
    }
  });

  grunt.config("storeCoverage", {
    options: {
      dir: "tests/coverage/reports"
    }
  });

  grunt.config("makeReport", {
    src: "tests/coverage/reports/**/*.json",
    options: {
      type: "lcov",
      dir: "tests/coverage/reports",
      print: "detail"
    }
  });

  grunt.loadNpmTasks("grunt-istanbul");
};
