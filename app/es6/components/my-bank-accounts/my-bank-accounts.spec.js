'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var account1 = Generators.bankAccount.new({ status: 'verified' });
var account2 = Generators.bankAccount.new({ status: 'microdeposits_added'});

var page = requireHelper.page('my-bank-accounts');
var specHelper = requireHelper.specHelper(page);

var achAccountResponse = {
  status: 'verified'
};

var achAccountRequest = requireHelper.request('ach_account')(achAccountResponse);

describe('my bank accounts', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('bank_accounts/index')([ account1, account2 ]),
      achAccountRequest
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
      expect(page.h2Title.getText()).toEqual('My Bank Accounts');
    });

    it('shows bank accounts', function() {
      var accountEl1 = page.accounts(0);
      var accountEl2 = page.accounts(1);

      expect(accountEl1.accountName.getText()).toEqual(account1.account_info.account_name);
      expect(accountEl1.verifyButton.isPresent()).toEqual(false);

      expect(accountEl2.accountName.getText()).toEqual(account2.account_info.account_name);
      expect(accountEl2.verifyButton.isPresent()).toEqual(true);
    });

    it('allows me to add a bank account', function() {
      page.newBankAccountButton.click();
      expect(page.h2Title.getText()).toEqual('New Bank Account');
    });
  });

  it('can verify bank account', function() {
    specHelper.get();

    var accountEl2 = page.accounts(1);

    accountEl2.verifyButton.click();

    expect(page.h2Title.getText()).toEqual('Verify Bank Account');
  });
});
