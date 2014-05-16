'use strict';

module.exports = {
  options: {
    bundleOptions: {
      debug: true
    },
    watch: true,
    external: [
      'jquery',
      'underscore',
      'backbone'
    ],
  },
  app: {
    files: {
      '<%= paths.compiled.tld %>/scripts/app.js': ['<%= paths.client.tld %>/scripts/main.js']
    }
  },

  dist: {
    bundleOptions: {
      debug: false
    },
    files: {
      '<%= paths.compiled.tld %>/scripts/app.js': ['<%= paths.client.tld %>/scripts/main.js']
    }
  },

  // External modules that don't need to be constantly re-compiled
  vendor: {
    src: [],
    dest: '<%= paths.compiled.tld %>/scripts/vendor.js',
    options: {
      bundleOptions: {
        debug: false
      },
      require: [
        'jquery',
        'underscore',
        'backbone'
      ],
      external: null // Reset this here because it's not needed
    }
  }
}