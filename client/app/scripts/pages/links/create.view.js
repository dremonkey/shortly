'use strict';

var _ = require('underscore');
var Backbone = require('backbone');

var LinkModel = require('./link');
var LinkView = require('./link.view');

var tpl = require('../../../templates/create.hbs');

var View = Backbone.View.extend({

  className: 'creator',

  events: {
    'submit': 'shortenUrl'
  },

  initialize: function () {},

  render: function () {
    var html = tpl();
    
    this.$el.html(html);
    return this;
  },

  shortenUrl: function(e) {
    e.preventDefault();

    var $form = this.$el.find('form .text');
    var link = new LinkModel({url: $form.val()})
    
    link.on('request', this.startSpinner, this);
    link.on('sync', this.success, this);
    link.on('error', this.failure, this);
    link.save({});
    $form.val('');
  },

  success: function(link) {
    this.stopSpinner();
    var view = new LinkView({model: link});
    this.$el.find('.message').append(view.render().$el.hide().fadeIn());
  },

  failure: function(model, res) {
    this.stopSpinner();
    this.$el.find('.message')
      .html('Please enter a valid URL')
      .addClass('error');
    return this;
  },

  startSpinner: function() {
    this.$el.find('img').show();
    this.$el.find('form input[type=submit]').attr('disabled', 'true');
    this.$el.find('.message')
      .html('')
      .removeClass('error');
  },

  stopSpinner: function() {
    this.$el.find('img').fadeOut('fast');
    this.$el.find('form input[type=submit]').attr('disabled', null);
    this.$el.find('.message')
      .html('')
      .removeClass('error');
  }
});

module.exports = View;