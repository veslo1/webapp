'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var bankAccountId = 5;

var page = requireHelper.page('user-bank-account-verify')(bankAccountId);
var specHelper = requireHelper.specHelper(page);

describe('my bank accounts', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('bank_accounts/verifications')(bankAccountId),
      requireHelper.request('bank_accounts')(),
      requireHelper.request('ach_account')()
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
      expect(page.h2Title.getText()).toEqual('Verify Bank Account');
    });

    it('shows bank accounts', function() {
      page.depositAmount1.sendKeys('0.01');
      page.depositAmount2.sendKeys('0.05')

      page.submitButton.click();

      expect(page.toastMessage.getText()).toEqual('Bank account verified.');
      expect(page.h2Title.getText()).toEqual('My Bank Accounts');
    });
  });
});
