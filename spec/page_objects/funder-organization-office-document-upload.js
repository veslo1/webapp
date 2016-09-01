'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(funderOrgId, officeId) {
  return _.extend({
    url: `/#/funders/${funderOrgId}/offices/${officeId}/documents/new`,
    fileUpload: element(by.css('input[name="file"]'))
  }, base);
};
