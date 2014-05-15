'use strict';

var db = require('../db');
var bcrypt = require('bcrypt-nodejs');
// var Promise = require('bluebird');

var Schema = db.mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  date: { type: Date, default: Date.now }
});

userSchema.pre('save', function (next) {
  this.password = this.hash(this.password);
  next();
});

userSchema.methods.links = function (cb) {
  var LinkModel = require('./link');
  LinkModel.find({user_id: this._id}, cb);
};

userSchema.methods.hash = function (password) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  return hash;
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

var UserModel = db.mongoose.model('User', userSchema);

module.exports = UserModel;

// var UserModel = db.Model.extend({

//   tableName: 'users',

//   hasTimestamps: true,

//   defaults: {
//     username: '',
//     password: ''
//   },

//   links: function () {
//     // @NOTE
//     // Leaving this here to demonstrate an alternative way of
//     // satisfying the circular dependency issue.
//     //
//     // Necessary to avoid circular dependecy problem
//     // @see http://selfcontained.us/2012/05/08/node-js-circular-dependencies/
//     // var LinkModel = require('./link');
//     // return this.hasMany(LinkModel);

//     return this.hasMany('Link');
//   },

//   initialize: function (options) {
//     this.on('creating', function (model) {
//       var hash = this.secure(model.get('password'));
//       model.set('password', hash);
//     });
//   },

//   secure: function (password) {
//     var salt = bcrypt.genSaltSync(10);
//     var hash = bcrypt.hashSync(password, salt);

//     return hash;
//   },

//   validPassword: function (password) {
//     return bcrypt.compareSync(password, this.get('password'));
//   }
// });

// Necessary to avoid circular dependecy problem
// @see https://github.com/tgriesser/bookshelf/wiki/Plugin:-Model-Registry
// module.exports = db.model('User', UserModel);