var _ = require('lodash');
var base = require('./base');

module.exports = function(cardLoadId) {
  return _.extend({
    url: `/#/card_loads/${cardLoadId}`,
    fundAmount: element(by.css('.card-load-amount')),
    toUser: element(by.css('.card-load-to-user')),
    approvedText: element(by.css('.card-load-approved-status')),
    acknowledgedText: element(by.css('.card-load-acknowledged-status')),
    approveButton: element(by.css('.approve-card-load-button')),
    acknowledgeButton: element(by.css('.acknowledge-card-load-button')),
  }, base);
};
