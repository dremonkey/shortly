'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var tpl = require('../../../templates/login.hbs');
var vents = require('../../events');

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

    $.post('/login', data, function (res, status) {
      if (res.redirect) {
        vents.trigger('auth:login', res.user);
        window.location.replace('/#' + res.redirect);
      }
    });
  }
});

module.exports = View;