'use strict';

// ## Configurations
// Setup your installations for various environments
var config, path;

// Module dependencies
path = require('path');

config = {};

// ## Development Environment Configurations
config.development = {
  db: {
    client: 'sqlite3',
    connection: {
      host: '127.0.0.1',
      user: 'your_database_user',
      password: 'password',
      database: 'shortlydb',
      charset: 'utf8',
      filename: path.join(__dirname, './db/shortly.sqlite')
    }
  },
  dirs: {
    views: path.resolve(__dirname, '../client/app'),
    static: [
      path.resolve(__dirname, '../client/app'),
      path.resolve(__dirname, '../client/.tmp'),
      path.resolve(__dirname, '../client/app/assets'),
    ]
  },
  livereload: 35729,
  server: {
    // Host to be passed to node's `net.Server#listen()`
    host: '127.0.0.1',

    // Port to be passed to node's `net.Server#listen()`
    port: process.env.PORT || 3000
  }
};


// ## Production Environment Configurations
config.production = {
  db: {},
  dirs: {
    views: path.resolve(__dirname, '../client'),
    static: path.resolve(__dirname, '../client')
  },
  livereload: false,
  server: {
    // Host to be passed to node's `net.Server#listen()`
    host: '127.0.0.1',

    // Port to be passed to node's `net.Server#listen()`
    port: process.env.PORT || 3000
  }
};

module.exports = config;