'use strict';

module.exports = function (grunt) {

  // Look for grunt config files in the 'grunt' directory
  // Uses load-grunt-tasks to load tasks
  require('load-grunt-config')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // ## Register all Grunt Tasks
  // target can be set using the following syntax: grunt serve:target
  grunt.registerTask('serve', function (target) {

    // If not using the connect server, this runs everything but the connect server...
    // If you want livereload to work with the settings in this file, in your server 
    // inject the livereload snippet using connect-livereload and configure to the same port set here
    if ('noserver' === target) {
      return grunt.task.run([
        'clean:all',
        'newer:jshint',
        'browserify:vendor',
        'browserify:app',
        'concurrent:serve',
        'autoprefixer',
        'watch'
      ]);
    }

    grunt.task.run([
      'clean:all',
      'newer:jshint',
      'browserify:vendor',
      'browserify:app',
      'concurrent:serve',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });
};