'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(merchantId) {
  return _.extend({
    url: `/#/merchants/${merchantId}/documents/new`,
    fileUpload: element(by.css('input[name="file"]'))
  }, base);
};
