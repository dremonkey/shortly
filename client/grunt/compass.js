'use strict';

module.exports = {
  options: {
    sassDir: 'app/assets/styles',
    imagesDir: 'app/assets/images',
    fontsDir: 'app/assets/fonts',
    importPath: 'app/components',
    httpImagesPath: '/images',
    httpGeneratedImagesPath: '/images/generated',
    httpFontsPath: '/styles/fonts',
    relativeAssets: false,
    assetCacheBuster: false,
    // raw: 'Sass::Script::Number.precision = 10\n'
  },
  serve: {
    options: {
      debugInfo: true,
      cssDir: '.tmp/styles',
      generatedImagesDir: '.tmp/images/generated'
    }
  }
};