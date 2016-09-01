'use strict';

var _ = require('lodash');
var base = require('./base');
var bankAccountForm = require('./new-bank-account-form');

module.exports = function(merchantId) {
  return _.extend({
    url: `/#/merchants/${merchantId}/bank_accounts/new`,
    form: bankAccountForm
  }, base);
};
