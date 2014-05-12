'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var tpl = require('../../../templates/footer.hbs');

var View = Backbone.View.extend({
  
  className: 'footer',

  initialize: function () {
    // this.collection.on('change', this.render, this);
    // this.model.on('change', this.render, this);
  },

  render: function () {
    var html = tpl();
    
    this.$el.append(html);
    return this;
  }
});

module.exports = View;