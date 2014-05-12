'use strict';

var db = require('../db');
var LinkModel = require('./link.js');

var Click = db.Model.extend({
  tableName: 'clicks',
  hasTimestamps: true,
  link: function() {
    return this.belongsTo(LinkModel, 'link_id');
  }
});

module.exports = Click;
