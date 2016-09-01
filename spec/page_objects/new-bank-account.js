'use strict';

var _ = require('lodash');
var base = require('./base');
var bankAccountForm = require('./new-bank-account-form');

module.exports = _.extend({
  url: '/#/bank_accounts/new',
  form: bankAccountForm
}, base);
