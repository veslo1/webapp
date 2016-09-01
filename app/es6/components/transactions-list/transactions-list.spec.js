'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var page = requireHelper.page('transactions');
var specHelper = requireHelper.specHelper(page);
var accounting = require('accounting');

var CardTransactionGenerator = requireHelper.generator('card_transaction');

var transaction1 = CardTransactionGenerator.new();
var transaction2 = CardTransactionGenerator.new();

describe('transaction page', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('transactions')([ transaction1, transaction2 ]),
      requireHelper.request('transaction')(transaction2),
    ]);
    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('as normal user', function() {
    var transactionEl1, transactionEl2;

    beforeEach(function() {
      specHelper.get();

      transactionEl1 = page.transactionByIndex(1);
      transactionEl2 = page.transactionByIndex(2);
    });

    it('lists merchants', function() {
      expect(page.h2Title.getText()).toEqual('Transactions');

      expect(transactionEl1.date.getText()).toMatch(page.dateFormatRegex);
      transactionEl1.date.getText().then(function(dateString) {
        var actual = page.dateToUTCString(dateString);
        var expected = page.dateToUTCString(transaction1.transacted_at);
        expect(actual).toEqual(expected);
      });
      expect(transactionEl1.merchant.getText()).toEqual(transaction1.merchant.name);
      expect(transactionEl1.project.getText()).toEqual(transaction1.project.name);
      expect(transactionEl1.userFullName.getText()).toEqual(transaction1.card.user.full_name);
      expect(transactionEl1.amount.getText()).toEqual(accounting.formatMoney(transaction1.amount));

      expect(transactionEl2.date.getText()).toMatch(page.dateFormatRegex);
      transactionEl2.date.getText().then(function(dateString) {
        var actual = page.dateToUTCString(dateString);
        var expected = page.dateToUTCString(transaction2.transacted_at);
        expect(actual).toEqual(expected);
      });
      expect(transactionEl2.merchant.getText()).toEqual(transaction2.merchant.name);
      expect(transactionEl2.project.getText()).toEqual(transaction2.project.name);
      expect(transactionEl2.userFullName.getText()).toEqual(transaction2.card.user.full_name);
      expect(transactionEl2.amount.getText()).toEqual(accounting.formatMoney(transaction2.amount));

      expect(page.pagination.currentPage.getText()).toEqual('1');
    });

    it('can click transaction', function() {
      transactionEl2.detailsLink.click();
      expect(page.h2Title.getText()).toEqual('Transaction Details');
    });
  });
});
