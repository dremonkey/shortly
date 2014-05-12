'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var Model = require('./model');

var Collection = Backbone.Collection.extend({
  
  model: Model,
  
  initialize: function () {},
});

module.exports = Collection;