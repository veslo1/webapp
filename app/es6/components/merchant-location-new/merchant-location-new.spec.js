'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var merchant = Generators.merchant.newMerchant();
var user1 = Generators.user.newUser();
var user2 = Generators.user.newUser();

var account1 = Generators.bankAccount.new();
var account2 = Generators.bankAccount.new();

var page = requireHelper.page('merchant_location_new')(merchant.id);
var specHelper = requireHelper.specHelper(page);

describe('new merchant location', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('potential_merchant_primary_contacts')([ user1, user2 ]),
      requireHelper.request('merchant_location_create')(merchant.id),
      requireHelper.request('merchant')(merchant),
      requireHelper.request('merchant_locations')(merchant.id),
      requireHelper.request('merchants/bank_accounts')(merchant.id, [account1, account2])
    ]);
    specHelper.simulateNormalUser();
    specHelper.get();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('can create merchant location', function() {
    expect(page.h2Title.getText()).toEqual('New Merchant Location');

    page.name.sendKeys('Saratoga, FL - Lowes');
    page.storeNumber.sendKeys('034');
    page.street1.sendKeys('Street 1');
    page.street2.sendKeys('Street 2');
    page.city.sendKeys('Saratoga');
    page.state.sendKeys('FL');
    page.postalCode.sendKeys('34233');
    page.phone.sendKeys('123-456-8876');
    page.fax.sendKeys('321-164-8876');
    page.primaryContactOption(user2.full_name).click();
    page.bankAccountOption(account2.account_info.account_name).click();

    page.submitButton.click();

    expect(page.toastMessage.getText()).toEqual('Merchant Location created.');
    expect(page.h2Title.getText()).toEqual('Merchant Details');
  });
});
