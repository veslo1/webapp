'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var merchant = Generators.merchant.newMerchant();

var bankAccountId = 5;

var page = requireHelper.page('merchant-bank-account-verify')(merchant.id, bankAccountId);
var specHelper = requireHelper.specHelper(page);

describe('verifying merchant bank account', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('merchants/bank_accounts/verifications')(merchant.id, bankAccountId),
      requireHelper.request('merchants/bank_accounts')(merchant.id),
      requireHelper.request('merchant')(merchant),
      requireHelper.request('merchant_locations')(merchant.id),
      requireHelper.request('merchants/ach_account')(merchant.id)
    ]);
    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('page stuff', function() {
    beforeEach(function() {
      specHelper.getOnce();
    });

    it('has correct title', function() {
      expect(page.h4Title.getText()).toEqual(`Merchants / ${merchant.name} / Verify Bank Account`);
    });

    it('shows bank accounts', function() {
      page.depositAmount1.sendKeys('0.01');
      page.depositAmount2.sendKeys('0.05')

      page.submitButton.click();

      expect(page.toastMessage.getText()).toEqual('Bank account verified.');
      expect(page.h2Title.getText()).toEqual('Merchant Details');
    });
  });
});
