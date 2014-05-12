'use strict';

// ## Module dependencies
var express = require('express')
  , http = require('http');

var Config = require('./config/index.js')
  , log = require('./utils/logger')
  , middleware = require('./middleware')
  , routes = require('./app/routes');

var cfg = new Config().getSync();

// Initializes the server
var server = express();

log.info('Configurations loaded... initializing the server');

// ## Middlesware
middleware(server, cfg);

// ## Initialize Routes
routes.page(server, cfg);
routes.api(server, cfg);
routes.auth(server, cfg);
routes.shorty(server, cfg);

// Start the server
server.set('port', cfg.server.port);
http.createServer(server).listen(server.get('port'), function () {
  log.info('Express server listening on port ' + server.get('port'));
});

module.exports = server;