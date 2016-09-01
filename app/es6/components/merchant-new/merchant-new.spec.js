'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var page = requireHelper.page('merchant_new');
var specHelper = requireHelper.specHelper(page);

var user1 = Generators.user.newUser();
var user2 = Generators.user.newUser();

describe('new merchant', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('create_merchant'),
      requireHelper.request('potential_merchant_primary_contacts')([ user1, user2 ]),
      requireHelper.request('merchants')([])
    ]);
    specHelper.simulateNormalUser();
    specHelper.get();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  it('can create new merchant', function() {
    expect(page.h2Title.getText()).toEqual('New Merchant');

    page.name.sendKeys('Lowes');
    page.merchantId.sendKeys('L123');
    page.street1.sendKeys('Street 1');
    page.street2.sendKeys('Street 2');
    page.city.sendKeys('St. Louis');
    page.state.sendKeys('MO');
    page.postalCode.sendKeys('63110');
    page.phone.sendKeys('123-456-8876');
    page.fax.sendKeys('321-164-8876');
    page.primaryContactOption(user2.full_name).click();

    page.submitButton.click();

    expect(page.toastMessage.getText()).toEqual('Merchant created.');
    expect(page.h2Title.getText()).toEqual('Merchants');
  });
});
