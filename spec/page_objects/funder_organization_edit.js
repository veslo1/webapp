'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(funderOrgId) {
  return _.extend({
    url: `/#/funders/${funderOrgId}/overview/edit`,
    name: element(by.model('$ctrl.funderOrganization.name')),
    serviceFee: element(by.model('$ctrl.funderOrganization.service_fee')),
  }, base);
};
