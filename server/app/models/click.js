'use strict';

var db = require('../db');
// var LinkModel = require('./link');

var Schema = db.mongoose.Schema;
var ObjectId = Schema.ObjectId;

var clickSchema = new Schema({
  link_id: ObjectId,
  date: { type: Date, default: Date.now }
});

var ClickModel = db.mongoose.model('Click', clickSchema);

// var ClickModel = db.Model.extend({
  
//   tableName: 'clicks',

//   hasTimestamps: true,
  
//   link: function () {
//     return this.belongsTo('Link', 'link_id');
//   }
// });

// module.exports = db.model('Click', ClickModel);

module.exports = ClickModel;
