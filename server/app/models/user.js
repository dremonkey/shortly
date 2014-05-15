'use strict';

/* jshint camelcase:false */

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