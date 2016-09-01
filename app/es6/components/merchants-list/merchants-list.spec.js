'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var page = requireHelper.page('merchants');
var specHelper = requireHelper.specHelper(page);

var merchant1 = Generators.merchant.newMerchant();
var merchant2 = Generators.merchant.newMerchant();

describe('Merchants', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('merchants')([ merchant1, merchant2 ]),
      requireHelper.request('potential_merchant_primary_contacts')([]),
      requireHelper.request('merchant')(merchant1),
      requireHelper.request('merchant_locations')(merchant1.id)
    ]);
    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('as normal user', function() {
    beforeEach(function() {
      specHelper.getOnce();
    });

    it('lists merchants', function() {
      expect(page.h2Title.getText()).toEqual('Merchants');

      var merchantEl1 = page.merchantByIndex(1);

      expect(merchantEl1.name.getText()).toEqual(merchant1.name);
      expect(merchantEl1.location.getText()).toContain(merchant1.address.city);
      expect(merchantEl1.location.getText()).toContain(merchant1.address.state);
      expect(merchantEl1.location.getText()).toContain(merchant1.address.postal_code);
      expect(merchantEl1.primaryContact.getText()).toEqual(merchant1.primary_contact_user.full_name);

      var merchantEl2 = page.merchantByIndex(2);

      expect(merchantEl2.name.getText()).toEqual(merchant2.name);
      expect(merchantEl2.location.getText()).toContain(merchant2.address.city);
      expect(merchantEl2.location.getText()).toContain(merchant2.address.state);
      expect(merchantEl2.location.getText()).toContain(merchant2.address.postal_code);
      expect(merchantEl2.primaryContact.getText()).toEqual(merchant2.primary_contact_user.full_name);

      expect(page.newMerchantButton.isPresent()).toEqual(false);
    });

    it('allow user to view merchant', function() {
      var merchantEl1 = page.merchantByIndex(1);

      merchantEl1.nameLink.click();

      expect(page.h2Title.getText()).toEqual('Merchant Details');
    });
  });

  describe('when user can create merchants', function() {
    beforeEach(function() {
      specHelper.setSystemPermissions({ can_manage_merchants: true });
      specHelper.get();
    });

    it('can click add new merchant button', function() {
      page.newMerchantButton.click();
      expect(page.h2Title.getText()).toEqual('New Merchant');
    });
  });
});
