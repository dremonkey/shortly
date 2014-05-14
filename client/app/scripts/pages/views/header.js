'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var vents = require('../../events');

var tpl = require('../../../templates/header.hbs');

var View = Backbone.View.extend({

  _user: null,
  
  className: 'header',

  navLinks: [], // TODO make a model
  userLinks: [], // TODO make a model

  events: {
    'click .logout': 'logout'
  },

  initialize: function (options) {

    this._user = options.user;

    // this nasty hack is needed because the nav links aren't a model
    if (this.navLinks.length === 0) {
      this.addNav({href: '/#', title: 'All Links', classes: 'nav-item index'});
      this.addNav({href: '/#/create', title: 'Shorten', classes: 'nav-item create'});
    }

    // this nasty hack is needed because the user links aren't a model
    this.userLinks = [];
    if (this._user.get('username')) {
      this.addUserLink({href: '/#/logout', title: 'logout', classes: 'nav-item logout'});  
    } else {
      this.addUserLink({href: '/#/login', title: 'login', classes: 'nav-item login'});
      this.addUserLink({href: '/#/signup', title: 'signup', classes: 'nav-item signup'});
    }
    
  },

  addNav: function (link) {
    var defaults = {
      href: '#',
      title: 'link',
      classes: ''
    };

    link = _.defaults(link, defaults);
    this.navLinks.push(link)
  },

  addUserLink: function (link) {
    var defaults = {
      href: '#',
      title: 'link',
      classes: ''
    };

    link = _.defaults(link, defaults);
    this.userLinks.push(link)
  },

  render: function () {
    var username = this._user.get('username');
    var html = tpl({brand: 'Shortly', navLinks: this.navLinks, userLinks: this.userLinks, username: username});
    
    this.$el.append(html);
    return this;
  },

  logout: function (e) {
    e.preventDefault();

    $.post('/logout', null, function (res, status) {
      vents.trigger('auth:logout');
      vents.trigger('route:navigate', {location: res.redirect, refresh: true});
    });
  }
});

module.exports = View;