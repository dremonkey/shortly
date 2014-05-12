'use strict';

// ## Module dependencies
var _ = require('lodash');
var request = require('request');

var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

module.exports.isValidUrl = function(url) {
  return url.match(rValidUrl);
};

module.exports.getUrlTitle = function(url, cb) {
  request(url, function(err, res, html) {
    if (err) {
      console.log('Error reading url heading: ', err);
      return cb(err);
    } else {
      var tag = /<title>(.*)<\/title>/;
      var match = html.match(tag);
      var title = match ? match[1] : url;
      return cb(err, title);
    }
  });
};

// Merge params with defaults... BUT unlike lodash.defaults 
// this ensures no value not in default are added
module.exports.params = function (args, defaults) {
  var merged, purge;
  
  args = args || {};
  purge = [];

  // if a parameter string was passed in turn it into an object
  if ('string' === typeof(args)) {
    var _args = {};
    args.split(/,\s?/).forEach(function (el) {
      var kv, key, val;

      kv = el.split('=');
      key = kv[0];
      val = kv[1];

      _args[key] = val;
    });

    args = _args;
  }

  // Merge with defaults... ensure no value not in default are added
  merged = _.mapValues(defaults, function (v, k) {

    var newval = v; // set to default value initially
    
    if (undefined !== args[k]) {
      newval = args[k];

      if ('string' === typeof(newval)) {
        // convert string bool to bool
        if (newval.match(/^true|false$/i)) {
          newval = /true/i.test(newval);
        }
        // convert string int to int
        else if (newval.match(/^\d+$/)) {
          newval = parseInt(newval);
        }
      }
    }

    // create a list of keys of undefined/null values so we can purge it later
    if (undefined === newval || null === newval) purge.push(k);
    return newval;
  });

  // remove all undefined from merged
  for (var i = purge.length - 1; i >= 0; i--) {
    delete merged[purge[i]];
  }

  return merged;
};