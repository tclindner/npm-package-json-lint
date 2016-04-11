module.exports = function(grunt) {

  grunt.config("jscs", {
    main: {
      options: {
        config: ".jscsrc"
      },
      src: [
        "src/**/*.js",
        "grunt/**/*.js",
        "tests/unit/**/*.js",
        "*.js"
      ]
    }
  });

  grunt.loadNpmTasks("grunt-jscs");
};
