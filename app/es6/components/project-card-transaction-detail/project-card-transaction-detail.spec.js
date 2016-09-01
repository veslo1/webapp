'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var accounting = require('accounting');
var Generators = requireHelper.helper('generators');

var cardTransaction = Generators.cardTransaction.newWithLineItems();

var page = requireHelper.page('project_card_transaction_detail')(cardTransaction.project.id, cardTransaction.id);
var specHelper = requireHelper.specHelper(page);

describe('Card Transaction Details', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('project')(cardTransaction.project),
      requireHelper.request('project/permissions')(cardTransaction.project.id),
      requireHelper.request('project_card_transaction_detail')(cardTransaction.project.id, cardTransaction),
    ]);
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('displays details', function() {
    specHelper.get();

    expect(page.detailsHeader.getText()).toEqual('Materials / Card Transaction #' + cardTransaction.id);

    expect(page.transactedDate.getText()).toMatch(page.dateFormatRegex);

    expect(page.merchantName.getText()).toEqual(cardTransaction.merchant.name);

    expect(page.soldBy.getText()).toEqual(cardTransaction.sold_by);
    expect(page.slspNumber.getText()).toEqual(cardTransaction.slsp_number);
    expect(page.cshrNumber.getText()).toEqual(cardTransaction.cshr_number);
    expect(page.subtotal.getText()).toEqual(accounting.formatMoney(cardTransaction.subtotal));
    expect(page.salesTaxAmount.getText()).toEqual(accounting.formatMoney(cardTransaction.sales_tax_amount) + ' (' + cardTransaction.sales_tax_percent + '%)');
    expect(page.amount.getText()).toEqual(accounting.formatMoney(cardTransaction.amount));

    var line1 = page.cardTransactionDetailByIndex(0);
    var expectedLine = cardTransaction.line_items[0];
    expect(line1.sku.getText()).toEqual(expectedLine.sku_number);
    expect(line1.description.getText()).toEqual(expectedLine.description);
    expect(line1.quantity.getText()).toEqual('' + expectedLine.quantity);
    expect(line1.unitPrice.getText()).toEqual(accounting.formatMoney(expectedLine.unit_price));
    expect(line1.netAmount.getText()).toEqual(accounting.formatMoney(expectedLine.net_amount));

    var line2 = page.cardTransactionDetailByIndex(1);
    expectedLine = cardTransaction.line_items[1];
    expect(line2.sku.getText()).toEqual(expectedLine.sku_number);
    expect(line2.description.getText()).toEqual(expectedLine.description);
    expect(line2.quantity.getText()).toEqual('' + expectedLine.quantity);
    expect(line2.unitPrice.getText()).toEqual(accounting.formatMoney(expectedLine.unit_price));
    expect(line2.netAmount.getText()).toEqual(accounting.formatMoney(expectedLine.net_amount));
  });
});
