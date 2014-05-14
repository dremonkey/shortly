'use strict';

// ## Module Dependencies
var Backbone = require('backbone');
var vm = require('./vm');

var Links = require('./pages/links/links');
var LinksView = require('./pages/links/links.view');
var CreateLinkView = require('./pages/links/create.view');
var LoginView = require('./pages/auth/login.view');
var SignupView = require('./pages/auth/signup.view');

var vents = require('./events');

// Setup the routers
var AppRouter = Backbone.Router.extend({
  routes: {
    // Default - catch all
    'create': 'create',
    'signup': 'signup',
    'login': 'login',
    '*actions': 'defaultAction'
  }
});

var initialize = function (options) {
  var appView = options.appView;
  var router = new AppRouter(options);

  vents.on('route:navigate', function (options) {
    var opts = {};
    
    if (typeof options === 'string') {
      opts.location = options;
    } else {
      opts = options;
    }

    if (opts.refresh) {
      window.location.replace(opts.location);
    } else {
      router.navigate(opts.location, {trigger: true});
    }
  });

  router.on('route:defaultAction', function () {
    var links = new Links();
    var view = vm.create(appView, 'LinksView', LinksView, {collection: links});
    appView.$('#region-main').html(view.render().el);
  });

  router.on('route:create', function () {
    var view = vm.create(appView, 'CreateLinkView', CreateLinkView);
    appView.$('#region-main').html(view.render().el);
  });

  router.on('route:login', function () {
    var view = vm.create(appView, 'LoginView', LoginView);
    appView.$('#region-main').html(view.render().el);
  });

  router.on('route:signup', function () {
    var view = vm.create(appView, 'SignupView', SignupView);
    appView.$('#region-main').html(view.render().el);
  });

  Backbone.history.start();
};


module.exports.initialize = initialize;