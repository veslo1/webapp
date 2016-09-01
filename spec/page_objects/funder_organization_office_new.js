'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(funderOrganizationId) {
  return _.extend({
    url: `/#/funders/${funderOrganizationId}/offices/new`,
    name: element(by.css('input[name="name"]')),
    dba: element(by.css('input[name="dba"]')),
    address: {
      street1: element(by.css('input[name="street1"]')),
      street2: element(by.css('input[name="street2"]')),
      city: element(by.css('input[name="city"]')),
      state: element(by.css('select[name="state"]')),
      postalCode: element(by.css('input[name="postal_code"]')),
    },
    website: element(by.css('input[name="website"]')),
    officePhone: element(by.css('input[name="primary_phone"]')),
    fax: element(by.css('input[name="fax"]')),
    ein: element(by.css('input[name="ein"]')),
    companyType: element(by.css('select[name="company_type"]')),
    companyTypeOption: function(value) {
      return this.companyType.element(by.cssContainingText('option', value));
    },
    primaryContactDropdown: element(by.css('select[name="primary_contact_user_id"]')),
    primaryContactOption: function(value) {
      return this.primaryContactDropdown.element(by.cssContainingText('option', value));
    }
  }, base);
}
