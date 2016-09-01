'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = _.extend({
  url: '/#/merchants/new',
  name: element(by.css('input[name="name"]')),
  merchantId: element(by.css('input[name="merchant_id"]')),
  street1: element(by.model('$ctrl.merchant.address.street1')),
  street2: element(by.model('$ctrl.merchant.address.street2')),
  city: element(by.model('$ctrl.merchant.address.city')),
  state: element(by.css('select[name="state"]')),
  postalCode: element(by.model('$ctrl.merchant.address.postal_code')),
  phone: element(by.css('input[name="primary_phone"]')),
  fax: element(by.css('input[name="fax"]')),
  primaryContactDropdown: element(by.model('$ctrl.merchant.primary_contact_user_id')),
  primaryContactOption: function(value) {
    return this.primaryContactDropdown.element(by.cssContainingText('option', value));
  },
}, base);
