'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(merchantId, merchantLocationId) {
  return _.extend({
    url: `/#/merchants/${merchantId}/locations/${merchantLocationId}/terminals/new`,
    serialNumber: element(by.model('$ctrl.terminal.serial_number')),
    terminalIdentifier: element(by.model('$ctrl.terminal.terminal_identifier'))
  }, base);
}
