'use strict';

var _ = require('lodash');
var base = require('./base');
var bankAccountForm = require('./new-bank-account-form');

module.exports = function(funderOffice) {
  return _.extend({
    url: `/#/funders/${funderOffice.funder_organization_id}/offices/${funderOffice.id}/bank_accounts/new`,
    form: bankAccountForm
  }, base);
};
