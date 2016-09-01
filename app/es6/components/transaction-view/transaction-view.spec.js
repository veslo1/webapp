'use strict';

var accounting = require('accounting');
var requireHelper = require('../../../../spec/support/require_helper');

var CardTransactionGenerator = requireHelper.generator('card_transaction');
var transaction = CardTransactionGenerator.newWithLineItems();

var page = requireHelper.page('transaction')(transaction.id);
var specHelper = requireHelper.specHelper(page);

describe('view transaction', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('transaction')(transaction)
    ]);
    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('page stuff', function() {
    beforeEach(function() {
      specHelper.get();
    });

    it('shows transaction details', function() {
      expect(page.h2Title.getText()).toEqual('Transaction Details');

      expect(page.date.getText()).toMatch(page.dateFormatRegex);
      page.date.getText().then(function(dateString) {
        var actual = page.dateToUTCString(dateString);
        var expected = page.dateToUTCString(transaction.transacted_at);
        expect(actual).toEqual(expected);
      });
      expect(page.merchant.getText()).toEqual(transaction.merchant.name);
      expect(page.project.getText()).toEqual(transaction.project.name);
      expect(page.userFullName.getText()).toEqual(transaction.card.user.full_name);
      expect(page.amount.getText()).toEqual(accounting.formatMoney(transaction.amount));

      var lineItem1 = transaction.line_items[0];
      var lineItemEl1 = page.lineItemByIndex(1);

      expect(lineItemEl1.sku.getText()).toEqual(lineItem1.sku_number);
      expect(lineItemEl1.description.getText()).toEqual(lineItem1.description);
      expect(lineItemEl1.quantity.getText()).toEqual("" + lineItem1.quantity);
      expect(lineItemEl1.unitPrice.getText()).toEqual(accounting.formatMoney(lineItem1.unit_price));
      expect(lineItemEl1.netAmount.getText()).toEqual(accounting.formatMoney(lineItem1.net_amount));

      var lineItem2 = transaction.line_items[1];
      var lineItemEl2 = page.lineItemByIndex(2);

      expect(lineItemEl2.sku.getText()).toEqual(lineItem2.sku_number);
      expect(lineItemEl2.description.getText()).toEqual(lineItem2.description);
      expect(lineItemEl2.quantity.getText()).toEqual("" + lineItem2.quantity);
      expect(lineItemEl2.unitPrice.getText()).toEqual(accounting.formatMoney(lineItem2.unit_price));
      expect(lineItemEl2.netAmount.getText()).toEqual(accounting.formatMoney(lineItem2.net_amount));
    });
  });

  describe('adding line items', function() {
    beforeEach(function() {
      specHelper.stubRequests([
        requireHelper.request('create_line_item')(transaction.id)
      ]);

      specHelper.get();
    });

    it('can create a new line item', function() {
      page.newLineItem.sku.sendKeys('SKU123');
      page.newLineItem.description.sendKeys('product description');
      page.newLineItem.quantity.sendKeys('3');
      page.newLineItem.unitPrice.sendKeys('1.23');
      page.newLineItem.netAmount.sendKeys('5.00');

      page.submitButton.click();

      expect(page.toastMessage.getText()).toEqual('Line item created.');
    });
  });
});
