'use strict';

var _ = require('underscore');
var Backbone = require('backbone');

var tpl = require('../../../templates/home.hbs');

var View = Backbone.View.extend({

  initialize: function () {},

  render: function () {
    var html = tpl();
    
    this.$el.append(html);
    return this;
  }
});

module.exports = View;