'use strict';

module.exports = {
  all: {
    files: '<%= paths.compiled.tld %>'
  },

  dist: {
    files: [{
      dot: true,
      src: [
        '<%= paths.compiled.tld %>',
        '<%= paths.dist.tld %>'
      ]
    }]
  },

  // heroku: {
  //   files: [{
  //     dot: true,
  //     src: '<%= paths.heroku.tld %>/client'
  //   }]
  // },

  // azure: {
  //   files: [{
  //     dot: true,
  //     src: '<%= paths.azure.tld %>/client'
  //   }]
  // }
};