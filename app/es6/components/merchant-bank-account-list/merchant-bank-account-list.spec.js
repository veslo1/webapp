'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var merchant = Generators.merchant.newMerchant();

var bankAccount1 = Generators.bankAccount.new({status: 'microdeposits_added'});
var bankAccount2 = Generators.bankAccount.new();

var page = requireHelper.page('merchant')(merchant.id);
var specHelper = requireHelper.specHelper(page);

var achAccountResponse = {
  status: 'verified'
};

var achAccountRequest = requireHelper.request('merchants/ach_account')(merchant.id, achAccountResponse);

describe('view merchant as admin', function() {
  beforeEach(function() {
    specHelper.setSystemPermissions({ can_manage_merchants: true });

    specHelper.stubRequests([
      requireHelper.request('merchant')(merchant),
      requireHelper.request('merchant_locations')(merchant.id),
      requireHelper.request('merchants/bank_accounts')(merchant.id, [bankAccount1, bankAccount2]),
      achAccountRequest
    ]);

    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('bank accounts list', function() {
    beforeEach(function() {
      specHelper.get();
    });

    it('allows me to view existing bank accounts and add new bank account', function() {
      var accountEl1 = page.bank_accounts(0);

      expect(accountEl1.accountName.getText()).toEqual(bankAccount1.account_info.account_name);

      var accountEl2 = page.bank_accounts(1);

      expect(accountEl2.accountName.getText()).toEqual(bankAccount2.account_info.account_name);

      page.addBankAccountButton.click();
      expect(page.h2Title.getText()).toEqual('New Merchant Bank Account');
    });

    it('allows me to verify bank account', function() {
      var accountEl1 = page.bank_accounts(0);

      accountEl1.verifyButton.click();
      expect(page.h4Title.getText()).toEqual(`Merchants / ${merchant.name} / Verify Bank Account`);
    });
  });

  describe('ach account is verified', function() {
    beforeEach(function() {
      achAccountRequest.response.data.status = 'verified';
      specHelper.get();
    });

    it('does not show document upload alert', function() {
      expect(page.documentUploadNeededAlert.isPresent()).toEqual(false);
      expect(page.documentUploadButton.isPresent()).toEqual(false);
    });
  });

  describe('ach account must upload document', function() {
    beforeEach(function() {
      achAccountRequest.response.data.status = 'customer_verification_document_needed';
      specHelper.get();
    });

    it('can navigate to document upload page', function() {
      page.documentUploadButton.click();
      expect(page.h2Title.getText()).toEqual('Upload Document');
    });
  });

  describe('ach account must upload document', function() {
    beforeEach(function() {
      achAccountRequest.response.data.status = 'customer_verification_document_failed';
      specHelper.get();
    });

    it('can navigate to document upload page', function() {
      page.documentUploadButton.click();
      expect(page.h2Title.getText()).toEqual('Upload Document');
    });
  });
});
