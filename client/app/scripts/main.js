'use strict';

// ## Module Dependencies
var AppView = require('./app');
var router = require('./router');
var UserModel = require('./user/model');
var vm = require('./vm');

var user = new UserModel();
var appView = vm.create({}, 'AppView', AppView, {model: user});

appView.render();
router.initialize({appView: appView});
