'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(merchantId) {
  return _.extend({
    url: `/#/merchants/${merchantId}/view`,

    merchantId: element(by.css('.merchant-id')),
    address: function() {
      var container = element(by.css('.merchant-address'));
      return {
        street1: container.element(by.css('.street1')),
        street2: container.element(by.css('.street2')),
        city: container.element(by.css('.city')),
        state: container.element(by.css('.state')),
        postalCode: container.element(by.css('.postal_code')),
      }
    },
    primaryPhone: element(by.css('.merchant-primary-phone')),
    faxPhone: element(by.css('.merchant-fax-phone')),
    primaryContactUser: {
      full_name: element(by.css('.merchant-contact-full-name'))
    },

    merchantLocations: element.all(by.repeater('location in $ctrl.locations')),
    merchant_locations: function(index) {
      var row = this.merchantLocations.get(index);

      return {
        detailLink: row.element(by.css('.location-name a')),
        name: row.element(by.css('.location-name')),
        location: row.element(by.css('.location-location')),
        primaryContact: row.element(by.css('.location-primary-contact')),
      };
    },

    accountsList: element.all(by.repeater('accountRecord in $ctrl.accounts')),
    bank_accounts: function(index) {
      var row = this.accountsList.get(index);

      return {
        accountName: row.element(by.css('.account-name')),
        verifyButton: row.element(by.css('.verify-button'))
      };
    },

    editButton: element(by.css('.edit-merchant-button')),
    addLocationButton: element(by.css('.add-merchant-location-button')),
    addBankAccountButton: element(by.css('.add-merchant-bank-account-button')),

    documentUploadNeededAlert: element(by.css('.document-upload-needed-alert')),
    documentUploadButton: element(by.css('.document-upload-button')),

  }, base);
};
