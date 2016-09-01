'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(funderOrganizationId) {
  return _.extend({
    url: `/#/funders/${funderOrganizationId}/offices/index`,

    offices: element.all(by.css('.funder-org-offices .funder-org-office')),

    officeByIndex: function(index) {
      var row = this.offices.get(index);

      return {
        name: row.element(by.css('.funder-org-office-name')),
        nameLink: row.element(by.css('.funder-org-office-name a')),
        location: row.element(by.css('.funder-org-office-location')),
        primaryContact: row.element(by.css('.funder-org-office-primary-contact'))
      };
    },

    newOfficeButton: element(by.css('.add-funder-organization-office-button'))

  }, base);
}
