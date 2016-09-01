var _ = require('lodash');
var base = require('./base');

module.exports = function(fundId) {
  return _.extend({
    url: `/#/committed_funds/${fundId}`,
    fundAmount: element(by.css('.committed-fund-amount')),
    fundType: element(by.css('.committed-fund-type')),
    toUser: element(by.css('.committed-fund-to-user')),
    fromUser: element(by.css('.committed-fund-from-user')),
    acknowledgedText: element(by.css('.committed-fund-acknowledged-status')),
    acknowledgeButton: element(by.css('.acknowledge-committed-fund-button')),
  }, base);
};
