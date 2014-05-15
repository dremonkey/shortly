'use strict';

/* jshint camelcase:false */

// ## Module Dependencies
var db = require('../db');
var crypto = require('crypto');

// ## Models
var ClickModel = require('./click');

var Schema = db.mongoose.Schema;
var ObjectId = Schema.ObjectId;

var urlSchema = new Schema({
  user_id: ObjectId,
  url: String,
  base_url: String,
  code: String,
  visits: {type: Number, default: 0},
  date: {type: Date, default: Date.now}
});

urlSchema.pre('save', function (next) {
  var shasum = crypto.createHash('sha1');
  
  shasum.update(this.url + this.user_id);
  this.code = shasum.digest('hex').slice(0, 5);

  next();
});

urlSchema.methods.clicks = function (cb) {
  ClickModel.find({'link_id': this._id}, cb);
};

var LinkModel = db.mongoose.model('Link', urlSchema);

module.exports = LinkModel;