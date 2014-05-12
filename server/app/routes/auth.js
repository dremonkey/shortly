'use strict';


// ## Module Dependencies
module.exports = function (server) {

  server.post('/logout', function (req) {
    console.log(req.params);
  });

  server.post('/login', function (req) {
    console.log(req.params);
  });
};