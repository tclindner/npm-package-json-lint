module.exports = function(grunt) {
  // load in package.json to reference any data from it (like the version number)
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });

  // Load Grunt plugins from the config files in the grunt/ directory
  grunt.loadTasks('grunt');
  require('time-grunt')(grunt);

  // Register task for running linters
  grunt.registerTask('lint', [
    'jsonlint',
    'jscs',
    'eslint'
  ]);

  // Register task for coverage
  // Note: This must be run separately. It cannot be run after the
  // normal tests run
  grunt.registerTask('testcoverage', [
    'clean',
    'env:coverage',
    'instrument',
    'mochaTest',
    'storeCoverage',
    'makeReport',
    'coverage'
  ]);

  // Register task for local testing
  grunt.registerTask('local', [
    'lint',
    'mochaTest:local'
  ]);

  // default is just lint and mochaTest
  grunt.registerTask('default', [
    'lint',
    'mochaTest:local'
  ]);
};
