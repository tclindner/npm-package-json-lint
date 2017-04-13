module.exports = function(grunt) {

  grunt.config('mochaTest', {
    local: {
      options: {
        reporter: 'spec',
        timeout: 5000
      },
      src: ['tests/unit/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
};
