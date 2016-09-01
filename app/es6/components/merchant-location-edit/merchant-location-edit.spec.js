'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var merchant = Generators.merchant.newMerchant();
var merchantLocation = Generators.merchantLocation.new({merchant_id: merchant.id});

var user1 = Generators.user.newUser();
var user2 = Generators.user.newUser();

var account1 = Generators.bankAccount.new();
var account2 = Generators.bankAccount.new();

var page = requireHelper.page('merchant_location_edit')(merchant.id, merchantLocation.id);
var specHelper = requireHelper.specHelper(page);

describe('edit merchant', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('merchant')(merchant),
      requireHelper.request('merchant_location')(merchantLocation),
      requireHelper.request('potential_merchant_primary_contacts')([ user1, user2 ]),
      requireHelper.request('merchant_location_update')(merchantLocation.id),
      requireHelper.request('merchants/bank_accounts')(merchant.id, [account1, account2])
    ]);
    specHelper.simulateNormalUser();
    specHelper.get();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('can edit merchant', function() {
    expect(page.h2Title.getText()).toEqual('Edit Merchant Location');
    expect(page.detailsHeader.getText()).toEqual(`Merchants / ${merchant.name} / ${merchantLocation.name}`);

    page.name.sendKeys('Lowes');
    page.storeNumber.sendKeys('L123');
    page.street1.sendKeys('Street 1');
    page.street2.sendKeys('Street 2');
    page.city.sendKeys('St. Louis');
    page.state.sendKeys('MO');
    page.postalCode.sendKeys('63110');
    page.phone.sendKeys('123-456-8876');
    page.fax.sendKeys('321-164-8876');
    page.primaryContactOption(user2.full_name).click();
    page.bankAccountOption(account1.account_info.account_name).click();

    page.submitButton.click();

    expect(page.toastMessage.getText()).toEqual('Merchant Location updated.');
    expect(page.h2Title.getText()).toEqual('Merchant Location Details');
  });
});
