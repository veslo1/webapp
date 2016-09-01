'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function() {
  return _.extend({
    url: '/#/documents/new',
    fileUpload: element(by.css('input[name="file"]'))
  }, base);
};
