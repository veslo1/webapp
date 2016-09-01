'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = _.extend({
  companyInfo: {
    name: element(by.css('input[name="company_name"]')),
    dba: element(by.css('input[name="company_dba"]')),
    ein: element(by.css('input[name="company_ein"]')),
    type: element(by.css('select[name="company_type"]')),
    website: element(by.css('input[name="company_website"]'))
  },

  userInfo: {
    email: element(by.css('input[name="user_email"]')),
    firstName: element(by.css('input[name="user_first_name"]')),
    lastName: element(by.css('input[name="user_last_name"]')),

    address: {
      street1: element(by.css('input[name="street1"]')),
      street2: element(by.css('input[name="street2"]')),
      city: element(by.css('input[name="city"]')),
      state: element(by.css('select[name="user_state"]')),
      postalCode: element(by.css('input[name="postal_code"]'))
    },

    phoneNumber: element(by.css('input[name="user_phone_number"]')),
    email: element(by.css('input[name="user_email"]'))
  },

  accountInfo: {
    accountName: element(by.css('input[name="account_name"]')),
    accountType: element(by.css('select[name="account_type"]')),
    routingNumber: element(by.css('input[name="routing_number"]')),
    routingNumberConfirmation: element(by.css('input[name="routing_number_confirmation"]')),
    accountNumber: element(by.css('input[name="account_number"]')),
    accountNumberConfirmation: element(by.css('input[name="account_number_confirmation"]')),
  },

  tosAgreementPreface: element(by.css('.tos-agreement-preface')),
  dwollaAchAgreementCheckbox: element(by.css('input[name="dwolla_ach_agreement"]'))

}, base);
