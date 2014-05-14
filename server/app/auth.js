'use strict';

// var createSession
// req.session.regenerate(function () {
//   req.session.user = 
// })

var isLoggedIn = function (req) {
  // TODO not sure this is secure  
  if (req.cookies && req.cookies.user) {
    var user = req.cookies.user;
    if (req.session && !req.session.user) {
      req.session.user = user;
    }
  }

  return req.session ? !!req.session.user : false;
};

var auth = function (req, res, next) {
  if (!isLoggedIn(req)) {
    res.send(401, 'Unauthorized Access');
  } else {
    next();
  }
};

module.exports = auth;