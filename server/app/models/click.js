'use strict';

var db = require('../db');
// var LinkModel = require('./link');

var ClickModel = db.mongoose.model('Click', db.clickSchema);

// var ClickModel = db.Model.extend({
  
//   tableName: 'clicks',

//   hasTimestamps: true,
  
//   link: function () {
//     return this.belongsTo('Link', 'link_id');
//   }
// });

// module.exports = db.model('Click', ClickModel);

module.exports = ClickModel;
