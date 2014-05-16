'use strict';

module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: '<%= paths.client.tld %>/images',
      src: '{,*/}*.{png,jpg,jpeg,gif,webp}',
      dest: '<%= paths.dist.tld %>/images'
    }]
  }
};