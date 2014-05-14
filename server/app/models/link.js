'use strict';

// ## Module Dependencies
var db = require('../db');
var ClickModel = require('./click');
var crypto = require('crypto');
var UserModel = require('./user');

var LinkModel = db.Model.extend({
  
  tableName: 'urls',
  
  hasTimestamps: true,
  
  defaults: {
    visits: 0
  },

  clicks: function () {
    return this.hasMany(ClickModel);
  },

  user: function() {
    return this.belongsTo(UserModel, 'user_id');
  },

  initialize: function () {
    this.on('creating', function (model){
      var shasum = crypto.createHash('sha1');
      shasum.update(model.get('url') + model.get('user_id'));
      model.set('code', shasum.digest('hex').slice(0, 5));
    });
  }
});

module.exports = LinkModel;
