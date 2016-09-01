'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(funderOffice) {
  return _.extend({
    url: `/#/funders/${funderOffice.funder_organization_id}/offices/${funderOffice.id}/responsible_individual/new`,

    firstName: element(by.css('input[name="first_name"]')),
    lastName: element(by.css('input[name="last_name"]')),
    email: element(by.css('input[name="email"]')),
    achAgreementText: element(by.css('.tos-agreement-preface')),
    achAgreementCheckbox: element(by.model('$ctrl.achAccount.ach_agreement')),
    achAgreementLabel: element(by.css('label.tos-agreement')),
    submitButton: element(by.css('.ach-account-submit-button')),
  }, base);
}
