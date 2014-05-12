'use strict';

var liveReloadPort = 35729;

module.exports = {
  options: {
    livereload: liveReloadPort
  },

  gruntfile: {
    files: ['Gruntfile.js']
  },

  js: {
    files: ['app/scripts/{,*/}*.js'],
    tasks: [
      'newer:jshint:app',
      'browserify:app'
    ]
  },

  compass: {
    files: ['app/styles/{,*/}*.{scss,sass}'],
    tasks: ['compass:serve'],
  },

  livereload: {
    files: [
      'app/index.html', // client side index file
      'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
      '.tmp/scripts/**/*.js',
      '.tmp/styles/**/*.css'
    ]
  }
}