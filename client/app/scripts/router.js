'use strict';

// ## Module Dependencies
var Backbone = require('backbone');
var vm = require('./vm');

var Links = require('./pages/links/links');
var LinksView = require('./pages/links/links.view');
var CreateLinkView = require('./pages/links/create.view');

// Setup the routers
var AppRouter = Backbone.Router.extend({
  routes: {
    // Default - catch all
    'create': 'create',
    '*actions': 'defaultAction'
  }
});

var initialize = function (options) {
  var appView = options.appView;
  var router = new AppRouter(options);

  router.on('route:defaultAction', function () {
    var links = new Links();
    var linksView = vm.create(appView, 'LinksView', LinksView, {collection: links});
    appView.$('#region-main').html(linksView.render().el);
  });

  router.on('route:create', function () {
    var createLinkView = vm.create(appView, 'CreateLinkView', CreateLinkView);
    appView.$('#region-main').html(createLinkView.render().el);
  });

  Backbone.history.start();
};


module.exports.initialize = initialize;