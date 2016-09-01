'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(projectId) {
  return _.extend({
    url: '/#/projects/' + projectId + '/materials/overview',

    availableToCommit: element(by.css('.available-to-commit')),
    availableToRequest: element(by.css('.available-to-request')),

    committedFundsSection: element(by.css('.committed-funds')),

    commitmentRows: element.all(by.css('.committed-fund')),

    commitments: function(index) {
      var commitmentRow = this.commitmentRows.get(index);

      return {
        createdAt: commitmentRow.element(by.css('.fund-created-at')),
        toUser: commitmentRow.element(by.css('.fund-to-user')),
        byUser: commitmentRow.element(by.css('.fund-by-user')),
        statusText: commitmentRow.element(by.css('.fund-status')),
        fundAmount: commitmentRow.element(by.css('.fund-amount'))
      };
    },

    cardLoadsSection: element(by.css('.card-loads')),
    cardLoadRows: element.all(by.css('.card-load')),

    cardLoads: function(index) {
      var cardLoadRow = this.cardLoadRows.get(index);

      return {
        createdAt: cardLoadRow.element(by.css('.fund-created-at')),
        userFullName: cardLoadRow.element(by.css('.user-full-name')),
        statusText: cardLoadRow.element(by.css('.fund-status')),
        fundAmount: cardLoadRow.element(by.css('.fund-amount'))
      };
    },

    cardTransactionsSection: element(by.css('.transactions-list')),
    cardTransactionRows: element.all(by.css('.fund-detail')),

    transactionTotal: element(by.css('.card-transaction-total')),

    cardTransactions: function(index) {
      var row = this.cardTransactionRows.get(index);

      return {
        transactedAt: row.element(by.css('.transacted-at')),
        merchantName: row.element(by.css('.merchant-name')),
        merchantNameLink: row.element(by.css('.merchant-name a')),
        transactionAmount: row.element(by.css('.fund-amount'))
      };
    },

    commitMaterialFundsButton: element(by.css('.commit-material-funds-button')),

    commitMaterialFundsForm: {
      commitTo: element(by.model('$ctrl.newCommitment.user_id')),
      commitToOption: function(value) {
        return this.commitTo.element(by.cssContainingText('option', value))
      },
      fundAmount: element(by.model('$ctrl.newCommitment.fund_amount')),
      submitButton: element(by.css('.commit-material-funds-form .submit-button'))
    },

    requestCardLoadButton: element(by.css('.request-card-load-button')),

    requestCardLoadForm: {
      fundAmount: element(by.model('$ctrl.newCardLoad.fund_amount')),
      submitButton: element(by.css('.request-card-load-form .submit-button'))
    },

    activeSectionsTab: element(by.css('.project-tabs li.active')),
  }, base);
};
