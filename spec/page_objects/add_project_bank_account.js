'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(projectId) {
  return _.extend({
    url: `/#/projects/${projectId}/overview/add_bank_account`,

    accountsList: element.all(by.css('.bank-accounts .bank-account')),

    accounts: function(index) {
      var row = this.accountsList.get(index);

      return {
        accountName: row.element(by.css('.account-name')),
        bankName: row.element(by.css('.bank-name')),
        addButton: row.element(by.css('.add-account-button'))
      };
    },
    activeSectionsTab: element(by.css('.project-tabs li.active')),
  }, base);
}
