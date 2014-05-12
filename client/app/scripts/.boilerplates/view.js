'use strict';

var _ = require('underscore');
var Backbone = require('backbone');

var View = Backbone.View.extend({
  el: 'div',

  className: '',

  template: _.template(''),

  initialize: function () {
    // this.collection.on('change', this.render, this);
    // this.model.on('change', this.render, this);
  },

  render: function () {
    return this;
  }
});

module.exports = View;