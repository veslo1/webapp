'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(transactionId) {
  return _.extend({
    url: '/#/transactions/' + transactionId,

    date: element(by.css('.transaction-date')),
    merchant: element(by.css('.merchant-name')),
    project: element(by.css('.project-name')),
    userFullName: element(by.css('.user-full-name')),
    amount: element(by.css('.transaction-amount')),

    lineItems: element.all(by.css('.line-item')),

    lineItemByIndex: function(index) {
      var lineItem = this.lineItems.get(index);

      return {
        sku: lineItem.element(by.css('.sku')),
        description: lineItem.element(by.css('.description')),
        quantity: lineItem.element(by.css('.quantity')),
        unitPrice: lineItem.element(by.css('.unit-price')),
        netAmount: lineItem.element(by.css('.net-amount')),
      };
    },

    newLineItem: {
      sku: element(by.model('transactionView.newLineItem.sku_number')),
      description: element(by.model('transactionView.newLineItem.description')),
      quantity: element(by.model('transactionView.newLineItem.quantity')),
      unitPrice: element(by.model('transactionView.newLineItem.unit_price')),
      netAmount: element(by.model('transactionView.newLineItem.net_amount'))
    }
  }, base);
};
