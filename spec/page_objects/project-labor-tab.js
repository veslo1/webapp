'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(projectId) {
  return _.extend({
    url: `/#/projects/${projectId}/labor/overview`,

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

    payoutsSection: element(by.css('.payouts')),
    payoutRows: element.all(by.css('.payout')),

    payouts: function(index) {
      var payoutRow = this.payoutRows.get(index);

      return {
        createdAt: payoutRow.element(by.css('.fund-created-at')),
        userFullName: payoutRow.element(by.css('.user-full-name')),
        statusText: payoutRow.element(by.css('.fund-status')),
        fundAmount: payoutRow.element(by.css('.fund-amount'))
      };
    },

    commitFundsButton: element(by.css('.commit-labor-funds-button')),

    commitFundsForm: {
      commitTo: element(by.model('$ctrl.newCommitment.user_id')),
      commitToOption: function(value) {
        return this.commitTo.element(by.cssContainingText('option', value))
      },
      fundAmount: element(by.model('$ctrl.newCommitment.fund_amount')),
      submitButton: element(by.css('.commit-labor-funds-form .submit-button'))
    },

    requestPayoutButton: element(by.css('.request-payout-button')),

    requestPayoutForm: {
      fundAmount: element(by.model('$ctrl.newPayout.fund_amount')),
      submitButton: element(by.css('.request-payout-form .submit-button'))
    },

    activeSectionsTab: element(by.css('.project-tabs li.active')),
  }, base);
};
