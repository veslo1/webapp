'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = function(projectId, transactionId) {
  return _.extend({
    url: `/#/projects/${projectId}/materials/card_transactions/${transactionId}`,
    activeSectionsTab: element(by.css('.project-tabs li.active')),

    transactedDate: element(by.css('.transacted-date')),
    merchantName: element(by.css('.merchant-name')),
    amount: element(by.css('.transaction-amount')),
    soldBy: element(by.css('.sold-by')),
    slspNumber: element(by.css('.slsp-number')),
    cshrNumber: element(by.css('.cshr-number')),
    subtotal: element(by.css('.subtotal')),
    salesTaxAmount: element(by.css('.sales-tax-amount')),

    cardTransactionDetailRows: element.all(by.repeater('lineItem in $ctrl.transaction.line_items')),

    cardTransactionDetailByIndex: function(index) {
      var detailRow = this.cardTransactionDetailRows.get(index);

      return {
        sku: detailRow.element(by.css('.sku')),
        description: detailRow.element(by.css('.description')),
        quantity: detailRow.element(by.css('.quantity')),
        unitPrice: detailRow.element(by.css('.unit-price')),
        netAmount: detailRow.element(by.css('.net-amount'))
      };
    }
  }, base);
};
