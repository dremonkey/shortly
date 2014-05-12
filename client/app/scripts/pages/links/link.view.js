'use strict';

var _ = require('underscore');
var Backbone = require('backbone');

var tpl = require('../../../templates/link.hbs');

var View = Backbone.View.extend({

  className: 'link',

  initialize: function () {},

  render: function () {
    var html = tpl(this.model.attributes);

    this.$el.html(html);
    return this;
  }
});

module.exports = View;