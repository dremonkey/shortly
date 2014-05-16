'use strict';

module.exports = {
  // Copy files from server -> heroku/server
  heroku: {
    files: [{
      expand: true,
      cwd: '<%= paths.server.tld %>',
      src: [
        'config/**/*.js',
        'utils/**/*.js',
        'middleware/**/*.js',
        'server.js'
      ],
      dest: '<%= paths.heroku.tld %>/server'
    }]
  },

  azure: {
    files: [{
      expand: true,
      cwd: '<%= paths.server.tld %>',
      src: [
        'app/**/*.js',
        'config.js',
        'config/**/*.js',
        'middleware/**/*.js',
        'server.js',
        'utils/**/*.js'
      ],
      dest: '<%= paths.azure.tld %>/server'
    }]
  }
};