'use strict';

// ## Module Dependencies
// var db = require('../db');
var Links = require('../collections/links');
var LinkModel = require('../models/link');
var Users = require('../collections/users');
var UserModel = require('../models/user');
var util = require('../../utils');
var auth = require('../auth');

module.exports = function (server) {

  server.get('/api/users', auth, function (req, res) {
    Users.reset().fetch().then(function (users) {
      res.send(200, users.models);
    });
  });

  server.get('/api/users/:id', auth, function (req, res) {
    var id = req.params.id;
    if (typeof id === 'string') {
      new UserModel({username: id}).fetch().then(function (user) {
        res.send(200, user.links());
      });
    }
  });

  server.get('/api/links', auth, function (req, res) {
    var user = req.session.user;

    Links.reset().fetch().then(function (links) {
      res.send(200, links.models);
    });  
    // console.log(user);
    // new UserModel({username: user.username}).fetch().then(function (user) {
    //   console.log(user.links());
    // });
  });

  server.post('/api/links', auth, function (req, res) {
    var uri = req.body.url;
    var user = req.session.user;
    
    if (!util.isValidUrl(uri)) {
      console.log('Not a valid url: ', uri);
      return res.send(404);
    }

    new LinkModel({url: uri}).fetch().then(function (exists) {
      if (exists) {
        res.send(200, exists.attributes);
      } else {
        util.getUrlTitle(uri, function(err, title) {
          if (err) {
            console.log('Error reading URL heading: ', err);
            return res.send(404);
          }

          /* jshint camelcase:false */
          var link = new LinkModel({
            user_id: user.id,
            url: uri,
            title: title,
            base_url: req.headers.origin
          });

          link.save().then(function(newLink) {
            Links.add(newLink);
            res.send(200, newLink);
          });
        });
      }
    });
  });
};