'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var vm = require('../../vm');

var LinkView = require('./link.view');

var View = Backbone.View.extend({

  className: 'links',

  initialize: function () {
    this.collection.on('sync', this.addAll, this);
    this.collection.fetch();
  },

  render: function () {
    this.$el.empty();
    return this;
  },

  addAll: function(){
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(item){
    var view = vm.create(this, 'LinkView', LinkView, {model: item});
    this.$el.append(view.render().el);
  }
});

module.exports = View;