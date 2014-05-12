'use strict';

// ## Module Dependencies
var AppView = require('./app');
var router = require('./router');
var vm = require('./vm');
var appView = vm.create({}, 'AppView', AppView);

appView.render();
router.initialize({appView: appView});
