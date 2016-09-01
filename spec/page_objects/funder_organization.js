'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(funderOrganizationId) {
  return _.extend({
    url: `/#/funders/${funderOrganizationId}/overview/index`,

    name: element(by.css('.funder-organization-name')),
    service_fee: element(by.css('.funder-organization-service-fee')),
    editButton: element(by.css('.edit-funder-organization-button'))

  }, base);
};
