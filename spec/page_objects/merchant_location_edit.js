'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(merchantId, merchantLocationId) {
  return _.extend({
    url: `/#/merchants/${merchantId}/locations/${merchantLocationId}/edit`,
    name: element(by.css('input[name="name"]')),
    storeNumber: element(by.css('input[name="store_number"]')),
    street1: element(by.model('$ctrl.merchantLocation.address.street1')),
    street2: element(by.model('$ctrl.merchantLocation.address.street2')),
    city: element(by.model('$ctrl.merchantLocation.address.city')),
    state: element(by.css('select[name="state"]')),
    postalCode: element(by.model('$ctrl.merchantLocation.address.postal_code')),
    phone: element(by.css('input[name="primary_phone"]')),
    fax: element(by.css('input[name="fax"]')),
    primaryContactDropdown: element(by.model('$ctrl.merchantLocation.primary_contact_user_id')),
    primaryContactOption: function(value) {
      return this.primaryContactDropdown.element(by.cssContainingText('option', value));
    },
    bankAccountDropdown: element(by.model('$ctrl.merchantLocation.bank_account_id')),
    bankAccountOption: function(value) {
      return this.bankAccountDropdown.element(by.cssContainingText('option', value));
    }
  }, base);
};
