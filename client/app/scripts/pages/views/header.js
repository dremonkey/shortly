'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var vents = require('../../events');

var tpl = require('../../../templates/header.hbs');

var View = Backbone.View.extend({
  
  className: 'header',

  initialize: function () {},

  navLinks: [], // TODO make a model

  addNav: function (link) {

    var defaults = {
      href: '#',
      title: 'link',
      classes: ''
    };

    link = _.defaults(link, defaults);
    this.navLinks.push(link)
  },

  render: function () {
    this.addNav({href: '/#', title: 'All Links', classes: 'nav-item index'});
    this.addNav({href: '/#/create', title: 'Shorten', classes: 'nav-item create'});

    var html = tpl({links: this.navLinks, brand: 'Shortly'});
    
    this.$el.append(html);
    return this;
  }
});

module.exports = View;