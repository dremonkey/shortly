'use strict';

var ClickModel = require('../models/click');
var db = require('../db');
var LinkModel = require('../models/link');


module.exports = function (server) {

  /************************************************************/
  // Handle the wildcard route last - if all other routes fail
  // assume the route is a short code and try and handle it here.
  // If the short-code doesn't exist, send the user to '/'
  /************************************************************/

  server.get('/*', function (req, res) {
    new LinkModel({ code: req.params[0] }).fetch().then(function (link) {
      if (!link) {
        res.redirect('/');
      } else {

        /* jshint camelcase:false */
        var click = new ClickModel({
          link_id: link.get('id')
        });

        click.save().then(function() {
          db.knex('urls')
            .where('code', '=', link.get('code'))
            .update({
              visits: link.get('visits') + 1,
            }).then(function() {
              return res.redirect(link.get('url'));
            });
        });
      }
    });
  });
};