'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = _.extend({
  url: '/#/my_profile',

  email: element(by.css('.user-email')),

  firstNameInput: element(by.css('input[name="first_name"]')),
  lastNameInput: element(by.css('input[name="last_name"]')),

  address: {
    street1Input: element(by.css('input[name="street1"]')),
    street2Input: element(by.css('input[name="street2"]')),
    cityInput: element(by.css('input[name="city"]')),
    stateInput: element(by.css('select[name="state"]')),
    postalCodeInput: element(by.css('input[name="postal_code"]')),
  },

  homePhoneInput: element(by.css('input[name="home_phone"]')),
  mobilePhoneInput: element(by.css('input[name="mobile_phone"]')),

  company: {
    name: element(by.css('input[name="company_name"]')),
    address: {
      street1Input: element(by.css('input[name="company_street1"]')),
      street2Input: element(by.css('input[name="company_street2"]')),
      cityInput: element(by.css('input[name="company_city"]')),
      stateInput: element(by.css('select[name="company_state"]')),
      postalCodeInput: element(by.css('input[name="company_postal_code"]')),
    },
    workPhoneInput: element(by.css('input[name="company_work_phone"]')),
    mobilePhoneInput: element(by.css('input[name="company_mobile_phone"]')),
    faxInput: element(by.css('input[name="company_fax_phone"]')),
    url: element(by.css('input[name="company_url"]')),
  },

  applyUpdatesButton: element(by.css('input[type=submit]')),
  //roleErrorMessages: element(by.css('.role-error-messages'))
}, base);
