'use strict';

var _ = require('lodash');
var base = require('./base');

module.exports = _.extend({
  url: '/#/transactions',

  transactions: element.all(by.css('.transactions .transaction')),

  transactionByIndex: function(index) {
    var row = this.transactions.get(index);

    return {
      date: row.element(by.css('.transaction-date')),
      merchant: row.element(by.css('.merchant-name')),
      detailsLink: row.element(by.css('.merchant-name a')),
      project: row.element(by.css('.project-name')),
      userFullName: row.element(by.css('.user-full-name')),
      amount: row.element(by.css('.transaction-amount')),
    };
  },

  pagination: {
    previousPage: element(by.css('.previous-page-link')),
    currentPage: element(by.css('.current-page-link')),
    nextPage: element(by.css('.next-page-link')),
  }

}, base);
