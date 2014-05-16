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
    files: ['<%= paths.client.tld %>/scripts/{,*/}*.js'],
    tasks: [
      'newer:jshint:app',
      'browserify:app'
    ]
  },

  compass: {
    files: ['<%= paths.client.tld %>/styles/{,*/}*.{scss,sass}'],
    tasks: ['compass:serve'],
  },

  livereload: {
    files: [
      '<%= paths.client.tld %>/index.html', // client side index file
      '<%= paths.client.tld %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
      '<%= paths.compiled.tld %>/scripts/**/*.js',
      '<%= paths.compiled.tld %>/styles/**/*.css'
    ]
  }
}