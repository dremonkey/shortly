'use strict';

// ## Module Dependencies
var db = require('../db');
var crypto = require('crypto');

// ## Models
var ClickModel = require('./click');
var UserModel = require('./user');

var LinkModel = db.Model.extend({
  
  tableName: 'urls',
  
  hasTimestamps: true,
  
  defaults: {
    visits: 0
  },

  user: function() {
    // @NOTE
    // Leaving this here to demonstrate an alternative way of
    // satisfying the circular dependency issue.
    //
    // Necessary to avoid circular dependecy problem
    // @see http://selfcontained.us/2012/05/08/node-js-circular-dependencies/
    // var UserModel = require('./user');
    // return this.belongsTo(UserModel, ' user_id');

    return this.belongsTo('User', 'user_id');
  },

  clicks: function () {
    // console.log('link hasMany', this.hasMany(ClickModel));
    // return this.hasMany(ClickModel);
    return this.hasMany('Click', 'link_id');
  },

  initialize: function () {
    debugger;
    this.on('creating', function (model){
      var shasum = crypto.createHash('sha1');
      shasum.update(model.get('url') + model.get('user_id'));
      model.set('code', shasum.digest('hex').slice(0, 5));
    });
  }
});

// Necessary to avoid circular dependecy problem
// @see https://github.com/tgriesser/bookshelf/wiki/Plugin:-Model-Registry
module.exports = db.model('Link', LinkModel);