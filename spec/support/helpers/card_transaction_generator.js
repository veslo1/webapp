'use strict';

var _ = require('lodash');
var faker = require('faker');
var UserGenerator = require('./random_user_generator');
var ProjectGenerator = require('./project_generator');
var MerchantGenerator = require('./merchant_generator');
var CardTransactionLineItemGenerator = require('./card_transaction_line_item_generator');
var CardGenerator = require('./card_generator');

module.exports = {
  new: function(attrs) {
    attrs = attrs || {};

    var record = {
      id: faker.random.number(),
      project: attrs.project || ProjectGenerator.newProject(),
      merchant: attrs.merchant || MerchantGenerator.newMerchant(),
      card: attrs.card || CardGenerator.newCard(),
      sale: true,
      amount: faker.finance.amount(1, 100000),
      transacted_at: faker.date.past(),
      reference_number: `ref-${faker.random.number()}`,
      sold_by: faker.name.findName(),
      slsp_number: `slsp-${faker.random.number()}`,
      cshr_number: `cshr-${faker.random.number()}`,
      subtotal: faker.finance.amount(1, 100000),
      sales_tax_percent: faker.finance.amount(1, 100000),
      sales_tax_amount: faker.finance.amount(1, 100000),
      line_items: []
    };

    if (attrs) {
      record = _.extend(record, attrs);
    }

    return record;
  },
  newWithLineItems: function(attrs, lineItemsCount) {
    lineItemsCount = lineItemsCount || 5;

    var transaction = this.new(attrs);
    transaction.line_items = [];

    for (var i=0; i<=lineItemsCount; i++) {
      transaction.line_items.push(CardTransactionLineItemGenerator.new());
    }

    return transaction;
  }
};
