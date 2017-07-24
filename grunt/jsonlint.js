module.exports = function(grunt) {

  grunt.config('jsonlint', {
    main: {
      src: [
        'src/**/*.json',
        'grunt/*.json',
        'tests/unit/**/*.json',
        '*.json',
        '.npmpackagejsonlintrc'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-jsonlint');
};
