'use strict';

/* jshint camelcase:false */

// ## Module Dependencies
var db = require('../db');

// ## Models
var ClickModel = require('../models/click');
var LinkModel = require('../models/link');

module.exports = function (server) {

  /************************************************************/
  // Handle the wildcard route last - if all other routes fail
  // assume the route is a short code and try and handle it here.
  // If the short-code doesn't exist, send the user to '/'
  /************************************************************/

  server.get('/*', function (req, res) {
    var code = req.params[0];

    LinkModel.findOne({code: code}, function (err, link) {
      if (!link) {
        res.redirect('/');
      } else {

        var click = new ClickModel({
          link_id: link._id
        });

        click.save(function (err, click) {
          console.log(link);

          // update the link visits counter
          link.visits += 1;
          link.save(function (err, link) {
            return res.redirect(link.url);
          });
        });
      }
    });
  });
};