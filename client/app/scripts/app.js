'use strict';

// ## Module Dependencies
var $ = require('jquery');
var Backbone = require('backbone');

var vm = require('./vm');
var vents = require('./events');

var HeaderView = require('./pages/views/header');
var FooterView = require('./pages/views/footer');

// Make sure Backbone.$ is set
Backbone.$ = $;

var AppView = Backbone.View.extend({
  
  // el should be set to the top level div of your app...
  el: '#realm',

  initialize: function () {
    vents.on('app:log', this.log);
  },

  log: function (msg) {
    console.log('App:', msg);
  },

  render: function () {

    var headerView = vm.create(this, 'HeaderView', HeaderView);
    var footerView = vm.create(this, 'FooterView', FooterView);
    
    this.$('#region-header').html(headerView.render().el);
    this.$('#region-footer').html(footerView.render().el);

    return this;
  }
});
  

module.exports = AppView;