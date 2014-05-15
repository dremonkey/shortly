'use strict';

// ## Module Dependencies
var UserModel = require('../models/user');

var authSuccess = function (user, req, res) {
  var maxAge = 15 * 24 * 60 * 60;

  if (!req.session.user) {
    req.session.user = user; // set session
    console.log(req.session.user);
  }
  
  if (!req.cookies.user) {
    res.cookie('user', user, {maxAge: maxAge}); // set cookie
  }
};

module.exports = function (server) {

  server.post('/login', function (req, res) {
    var username = req.body.username;

    UserModel.findOne({username: username}, function (err, user) {
      if (user) {
        user = new UserModel(user);
      
        if (user.validPassword(req.body.password)) {
          authSuccess(user, req, res);
          res.send(200, {redirect: '/', user: user}); // redirect
        } else {
          res.send(200, {error: 'Username/password combination is incorrect'});
        }
      } else {
        res.send(200, {error: 'Username/password combination is incorrect'});
      }
    });
  });

  server.post('/logout', function (req, res) {
    delete req.session.user;
    res.clearCookie('user');
    res.send(200, {redirect: '/'});
  });

  server.post('/signup', function (req, res) {
    var username = req.body.username;

    UserModel.findOne({username: username}, function (err, user) {
      if (!user) {
        
        user = new UserModel(req.body);
        
        user.save(function (err, user) {
          authSuccess(user, req, res);
          res.send(200, {redirect: '/', user: user}); // redirect
        });
      } else {
        res.send(200, {error: 'Username is taken'});
      }
    });
  });
};