'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(merchantId, merchantLocationId) {
  return _.extend({
    url: `/#/merchants/${merchantId}/locations/${merchantLocationId}/view`,

    storeNumber: element(by.css('.merchant-location-store-number')),
    address: function() {
      var container = element(by.css('.merchant-location-address'));
      return {
        street1: container.element(by.css('.street1')),
        street2: container.element(by.css('.street2')),
        city: container.element(by.css('.city')),
        state: container.element(by.css('.state')),
        postalCode: container.element(by.css('.postal_code')),
      }
    },
    primaryPhone: element(by.css('.merchant-location-primary-phone')),
    faxPhone: element(by.css('.merchant-location-fax-phone')),
    primaryContactUser: {
      full_name: element(by.css('.merchant-location-contact-full-name'))
    },

    bankAccountName: element(by.css('.merchant-location-bank-account-name')),

    editButton: element(by.css('.edit-merchant-location-button')),

    terminalSection: element(by.css('.terminals')),

    terminals: element.all(by.repeater('terminal in $ctrl.terminals')),

    terminalByIndex: function(index) {
      var row = this.terminals.get(index);

      return {
        serialNumber: row.element(by.css('.serial-number')),
        terminalIdentifier: row.element(by.css('.terminal-identifier'))
      };
    },

    newTerminalButton: element(by.css('.new-merchant-terminal-button'))
  }, base);
};
