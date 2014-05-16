'use strict';

/* jshint camelcase:false */

// ## Module Dependencies
var LinkModel = require('../models/link');
var UserModel = require('../models/user');
var util = require('../../utils');
var auth = require('../auth');

module.exports = function (server) {

  server.get('/api/links/:id/clicks', function (req, res) {
    var id = req.params.id;

    new LinkModel({_id:id}).clicks(function (err, clicks) {
      if (err) {
        res.send(500, {error: 'Error getting clicks'});
      } else {
        res.send(200, clicks);
      }
    });
  });

  server.get('/api/users', auth, function (req, res) {
    UserModel.find(function (err, users) {
      if (err) {
        res.send(500, {error: 'Error getting users'});
      } else {
        res.send(200, users);
      }
    });
  });

  server.get('/api/users/:username', auth, function (req, res) {
    var username = req.params.username;
    
    UserModel.findOne({username: username}, function (err, user) {
      if (err) {
        res.send(500, {error: 'Error getting user'});
      } else {
        res.send(200, user);
      }
    });
  });

  server.get('/api/links', auth, function (req, res) {
    var id = req.session.user._id;

    new UserModel({_id: id}).links(function (err, links) {
      if (err) {
        res.send(500, {error: 'Error getting link'});
      } else {
        res.send(200, links);
      }
    });
  });

  server.post('/api/links', auth, function (req, res) {
    var uri = req.body.url;
    var user = req.session.user;
    
    if (!util.isValidUrl(uri)) {
      return res.json(400, {error: 'Not a valid url: ' + uri});
    }

    LinkModel.findOne({url: uri}, function (err, link) {
      if (link) {
        return res.send(200, link);
      } else {
        util.getUrlTitle(uri, function (err, title) {
          if (err) {
            console.log('Error reading URL heading: ', err);
            return res.send(404);
          }

          link = new LinkModel({
            user_id: user._id,
            url: uri,
            title: title,
            base_url: req.headers.origin
          });

          link.save(function (err, link) {
            if (err) {
              res.send(500, {error: 'Error saving link'});
            } else {
              res.send(200, link);
            }
          });
        });
      }
    });
  });
};