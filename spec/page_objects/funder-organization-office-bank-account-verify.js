'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(funderOrgId, officeId, bankAccountId) {
  return _.extend({
    url: `/#/funders/${funderOrgId}/offices/${officeId}/bank_accounts/${bankAccountId}/verify`,

    depositAmount1: element(by.css('input[name="amount1"]')),
    depositAmount2: element(by.css('input[name="amount2"]'))

  }, base);
};
