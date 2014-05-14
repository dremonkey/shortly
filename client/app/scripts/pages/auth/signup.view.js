'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var tpl = require('../../../templates/signup.hbs');

var View = Backbone.View.extend({

  className: '',

  events: {
    'submit': 'submit'
  },

  initialize: function () {},

  render: function () {
    var html = tpl();

    this.$el.html(html);
    return this;
  },

  submit: function (e) {
    e.preventDefault();
    
    var data = this.$('form').serialize();

    $.post('/signup', data, function (res, status) {
      if (res.redirect) {
        window.location.replace(res.redirect);
      }
    });
  }
});

module.exports = View;