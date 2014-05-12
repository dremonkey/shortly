'use strict';

var _ = require('underscore');
var Backbone = require('backbone');

var Model = Backbone.Model.extend({
  
  defaults: {},

  urlRoot: '/api/links',
  
  initialize: function () {},
});

module.exports = Model;
