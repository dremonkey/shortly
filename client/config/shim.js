'use strict';

module.exports = {

  jquery: '$',
  
  underscore: '_',
  
  backbone: {
    exports: 'Backbone',
    depends: {
      jquery: '$',
      underscore: 'underscore'
    }
  }
};