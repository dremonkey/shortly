'use strict';

var db = require('../db');
var bcrypt = require('bcrypt-nodejs');
var LinkModel = require('./link');
var ClickModel = require('./click');
// var Promise = require('bluebird');

console.log('user click', ClickModel);

var User = db.Model.extend({

  tableName: 'users',

  hasTimestamps: true,

  defaults: {
    username: '',
    password: ''
  },

  links: function () {
    return this.hasMany(LinkModel);
  },

  initialize: function (options) {
    
    this.set('username', options.username);

    if (options.password) {
      var hash = this.secure(options.password);
      this.set('password', hash);
    }
  },

  secure: function (password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    return hash;
  },

  validPassword: function (password) {
    return bcrypt.compareSync(password, this.get('password'));
  }
});

module.exports = User;