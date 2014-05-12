'use strict';

// ## Module Dependencies
// var db = require('../db');
var Links = require('../collections/links');
var LinkModel = require('../models/link');
// var Users = require('../collections/users');
// var UserModel = require('../models/user');
var util = require('../../utils');

// ## Module Dependencies
module.exports = function (server, config) {
  
  server.get('/api/example', function (req, res) {
    res.json({config:config});
  });

  server.get('/api/example/:id', function (req, res) {
    res.json({
      id: req.params.id,
      query: req.query
    });
  });

  server.get('/api/links', function (req, res) {
    Links.reset().fetch().then(function (links) {
      res.send(200, links.models);
    });
  });

  server.post('/api/links', function (req, res) {
    var uri = req.body.url;

    if (!util.isValidUrl(uri)) {
      console.log('Not a valid url: ', uri);
      return res.send(404);
    }

    new LinkModel({url: uri}).fetch().then(function (found) {
      if (found) {
        res.send(200, found.attributes);
      } else {
        util.getUrlTitle(uri, function(err, title) {
          if (err) {
            console.log('Error reading URL heading: ', err);
            return res.send(404);
          }

          /* jshint camelcase:false */
          var link = new LinkModel({
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