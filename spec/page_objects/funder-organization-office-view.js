'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(funderOrganizationId, officeId) {
  return _.extend({
    url: `/#/funders/${funderOrganizationId}/offices/${officeId}/overview`,
    name: element(by.binding('$ctrl.funderOffice.name')),
    dba: element(by.binding('$ctrl.funderOffice.dba')),
    address: {
      street1: element(by.css('.funder-office-address .street1')),
      street2: element(by.css('.funder-office-address .street2')),
      city: element(by.css('.funder-office-address .city')),
      state: element(by.css('.funder-office-address .state')),
      postalCode: element(by.css('.funder-office-address .postal_code')),
    },
    website: element(by.binding('$ctrl.funderOffice.website')),
    officePhone: element(by.binding('$ctrl.funderOffice.phone_numbers.primary')),
    fax: element(by.binding('$ctrl.funderOffice.phone_numbers.fax')),
    primaryContact: element(by.binding('$ctrl.funderOffice.primary_contact_user.full_name')),

    editOfficeButton: element(by.css('.edit-office-button')),

    officeMembers: element.all(by.css('.office-members .office-member')),

    officeMemberByIndex: function(index) {
      var row = this.officeMembers.get(index);

      return {
        name: row.element(by.css('.user-full-name')),
        nameLink: row.element(by.css('.user-full-name a')),
        email: row.element(by.css('.user-email')),
      };
    },

    newOfficeMemberButton: element(by.css('.add-office-member-button')),
    addAchAccountErrors: element(by.css('.ach-account-prevalidation-errors')),

    officeAchAccount: {
      name: element(by.binding('$ctrl.officeAchAccount.full_name')),
      email: element(by.binding('$ctrl.officeAchAccount.email'))
    },

    newOfficeAchAccountButton: element(by.css('.add-office-ach-account-button')),

    bankAccountsList: element.all(by.css('.bank-accounts .bank-account')),

    bankAccounts: function(index) {
      var row = this.bankAccountsList.get(index);

      return {
        accountName: row.element(by.css('.account-name')),
        bankName: row.element(by.css('.bank-name')),
        verifyButton: row.element(by.css('.verify-button'))
      };
    },

    newOfficeBankAccountButton: element(by.css('.new-bank-account-button')),
    addBankAccountErrors: element(by.css('.bank-account-prevalidation-errors')),

  }, base);
}
