'use strict';

var db = require('../db');

var Schema = db.mongoose.Schema;
var ObjectId = Schema.ObjectId;

/* jshint camelcase: false */
var clickSchema = new Schema({
  link_id: ObjectId,
  date: { type: Date, default: Date.now }
});

var ClickModel = db.mongoose.model('Click', clickSchema);

module.exports = ClickModel;
