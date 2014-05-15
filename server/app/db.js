'use strict';

// ## Module Dependencies
var Bookshelf = require('bookshelf');
var Config = require('../config/index.js');

var cfg = new Config().getSync();
var dbconfig = cfg.db;

// Initializes the database
var db = Bookshelf.initialize(dbconfig);

// Load Bookshelf Plugins
db.plugin('registry');

db.knex.schema.hasTable('urls').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('urls', function (link) {
      link.increments('id').primary();
      link.integer('user_id').references('id').inTable('users');
      // link.integer('user_id');
      link.string('url', 255);
      link.string('base_url', 255);
      link.string('code', 100);
      link.string('title', 255);
      link.integer('visits');
      link.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('clicks').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('clicks', function (click) {
      click.increments('id').primary();
      click.integer('link_id');
      click.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('users').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username');
      user.string('password');
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

// Alter Table
// db.knex.schema.hasTable('urls').then(function (exists) {
//   if (exists) {
//     db.knex.schema.table('urls', function (link) {
//       link.integer('user_id').references('id').inTable('users');
//     }).then(function (table) {
//       console.log('Altered Table', table);
//     });
//   }
// });

module.exports = db;