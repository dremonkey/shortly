'use strict';

module.exports = function (server) {
  server.get('/', function (req, res) {
    res.sendfile('index.html', {root: server.get('views')});
  });
};