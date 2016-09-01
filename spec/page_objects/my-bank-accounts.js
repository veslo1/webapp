'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = _.extend({
  url: '/#/bank_accounts/overview',

  accountsList: element.all(by.css('.bank-accounts .bank-account')),
  documentUploadNeededAlert: element(by.css('.document-upload-needed-alert')),
  documentUploadButton: element(by.css('.document-upload-button')),

  accounts: function(index) {
    var row = this.accountsList.get(index);

    return {
      accountName: row.element(by.css('.account-name')),
      verifyButton: row.element(by.css('.verify-button'))
    };
  },

  newBankAccountButton: element(by.css('.new-bank-account-button'))

}, base);
