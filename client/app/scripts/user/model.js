'use strict';

// var _ = require('underscore');
var Backbone = require('backbone');

var vents = require('../events');

var Model = Backbone.Model.extend({
  
  urlRoot: '/api/users',

  defaults: {
    id: -1,
    username: '',
    link: ''
  },
  
  initialize: function () {
    vents.on('auth:login', this.update, this);
    vents.on('auth:logout', this.destroy, this);
  },

  update: function (user) {
    this.set(user);
  },

  destroy: function () {
    this.set(this.defaults);
  }
});

module.exports = Model;
