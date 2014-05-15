'use strict';

// ## Module Dependencies
// var Bookshelf = require('bookshelf');
var Config = require('../config/index.js');
var mongoose = require('mongoose');
var url = require('url');

var cfg = new Config().getSync();
var dbconfig = cfg.db.connection;

// Initializes the database
// var db = Bookshelf.initialize(dbconfig);
var host = dbconfig.host + ':' + dbconfig.port + '/';
var auth = dbconfig.user + ':' + dbconfig.password;
var uri = 'mongodb://' + auth + '@' + host + dbconfig.database;

var conn = mongoose.connect(uri);

// Load Bookshelf Plugins
// db.plugin('registry');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var urlSchema = new Schema({
  user_id: ObjectId,
  url: String,
  base_url: String,
  code: String,
  visits: Number,
  date: { type: Date, default: Date.now }
});

urlSchema.methods.test = function (cb) {
  console.log('test');
}

// db.knex.schema.hasTable('urls').then(function (exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.integer('user_id').references('id').inTable('users');
//       // link.integer('user_id');
//       link.string('url', 255);
//       link.string('base_url', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

var clickSchema = new Schema({
  link_id: ObjectId,
  date: { type: Date, default: Date.now }
});

// db.knex.schema.hasTable('clicks').then(function (exists) {
//   if (!exists) {
//     db.knex.schema.createTable('clicks', function (click) {
//       click.increments('id').primary();
//       click.integer('link_id');
//       click.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

var userSchema = new Schema({
  username: String,
  password: String,
  date: { type: Date, default: Date.now }
});

// db.knex.schema.hasTable('users').then(function (exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username');
//       user.string('password');
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// // Alter Table
// // db.knex.schema.hasTable('urls').then(function (exists) {
// //   if (exists) {
// //     db.knex.schema.table('urls', function (link) {
// //       link.integer('user_id').references('id').inTable('users');
// //     }).then(function (table) {
// //       console.log('Altered Table', table);
// //     });
// //   }
// // });

// module.exports = db;

exports.clickSchema = clickSchema;
exports.conn = conn;
exports.mongoose = mongoose
exports.urlSchema = urlSchema;
exports.userSchema = userSchema;
