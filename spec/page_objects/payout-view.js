var _ = require('lodash');
var base = require('./base');

module.exports = function(fundId) {
  return _.extend({
    url: `/#/payouts/${fundId}`,
    fundAmount: element(by.css('.payout-amount')),
    toUser: element(by.css('.payout-to-user')),
    approvedText: element(by.css('.payout-approved-status')),
    acknowledgedText: element(by.css('.payout-acknowledged-status')),
    approveButton: element(by.css('.approve-payout-button')),
    acknowledgeButton: element(by.css('.acknowledge-payout-button')),
  }, base);
};
