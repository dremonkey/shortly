'use strict';

// ## Module Dependencies
var vents = require('./events');

var views = {};

var create = function (context, name, View, options) {

  var view = new View(options);

  views[name] = view;

  context.children = context.children || {};
  context.children[name] = view;

  vents.trigger('app:log', name + ' Created');
  return view;
};

module.exports.create = create;
module.exports.views = views;