module.exports = function(grunt) {

  grunt.config("jsonlint", {
    main: {
      src: [
        "src/**/*.json",
        "grunt/*.json",
        "tests/unit/**/*.json",
        "*.json",
        ".jscsrc",
        ".jshintrc",
        ".packagejsonlintrc"
      ]
    }
  });

  grunt.loadNpmTasks("grunt-jsonlint");
};
