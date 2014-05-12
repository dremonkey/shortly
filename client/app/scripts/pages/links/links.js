'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var Model = require('./link');

var Collection = Backbone.Collection.extend({
  
  model: Model,

  url: '/api/links',
  
  initialize: function () {},
});

module.exports = Collection;