'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var merchant = Generators.merchant.newMerchant();

var merchantLocation1 = Generators.merchantLocation.new({merchant_id: merchant.id});
var merchantLocation2 = Generators.merchantLocation.new({merchant_id: merchant.id});

var page = requireHelper.page('merchant')(merchant.id);
var specHelper = requireHelper.specHelper(page);

describe('view merchant', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('merchant')(merchant),
      requireHelper.request('potential_merchant_primary_contacts')([]),
      requireHelper.request('merchant_locations')(merchant.id, [merchantLocation1, merchantLocation2]),
      requireHelper.request('merchant_location')(merchantLocation1),
      requireHelper.request('merchants/ach_account')(merchant.id)
    ]);
    specHelper.simulateNormalUser();
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('as normal user', function() {
    beforeEach(function() {
      specHelper.get();
    })

    it('shows merchant detail', function() {
      expect(page.h2Title.getText()).toEqual('Merchant Details');
      expect(page.detailsHeader.getText()).toEqual(`Merchants / ${merchant.name}`);

      expect(page.merchantId.getText()).toEqual('' + merchant.merchant_id);

      var address = page.address();
      expect(address.street1.getText()).toEqual(merchant.address.street1);
      expect(address.street2.getText()).toEqual(merchant.address.street2);
      expect(address.city.getText()).toEqual(merchant.address.city);
      expect(address.state.getText()).toEqual(merchant.address.state);
      expect(address.postalCode.getText()).toEqual(merchant.address.postal_code);

      expect(page.primaryPhone.getText()).toEqual(merchant.phone_numbers.primary);
      expect(page.faxPhone.getText()).toEqual(merchant.phone_numbers.fax);

      expect(page.primaryContactUser.full_name.getText()).toEqual(merchant.primary_contact_user.full_name);

      var locationEl1 = page.merchant_locations(0);

      expect(locationEl1.name.getText()).toEqual(merchantLocation1.name);
      expect(locationEl1.location.getText()).toContain(merchantLocation1.address.city);
      expect(locationEl1.location.getText()).toContain(merchantLocation1.address.state);
      expect(locationEl1.location.getText()).toContain(merchantLocation1.address.postal_code);
      expect(locationEl1.primaryContact.getText()).toEqual(merchantLocation1.primary_contact_user.full_name);

      var locationEl2 = page.merchant_locations(1);

      expect(locationEl2.name.getText()).toEqual(merchantLocation2.name);
      expect(locationEl2.location.getText()).toContain(merchantLocation2.address.city);
      expect(locationEl2.location.getText()).toContain(merchantLocation2.address.state);
      expect(locationEl2.location.getText()).toContain(merchantLocation2.address.postal_code);
      expect(locationEl2.primaryContact.getText()).toEqual(merchantLocation2.primary_contact_user.full_name);

      expect(page.addLocationButton.isPresent()).toEqual(false);
      expect(page.addBankAccountButton.isPresent()).toEqual(false);
      expect(page.editButton.isPresent()).toEqual(false);
    });

    it('allows me to view merchant location detail', function() {
      var locationEl1 = page.merchant_locations(0);
      locationEl1.detailLink.click();

      expect(page.h2Title.getText()).toEqual('Merchant Location Details');
    });
  });

  describe('as an admin user', function() {
    beforeEach(function() {
      specHelper.setSystemPermissions({ can_manage_merchants: true });

      specHelper.stubRequests([
        requireHelper.request('merchants/bank_accounts')(merchant.id)
      ]);

      specHelper.get();
    })

    it('allows me to edit the merchant', function() {
      page.editButton.click();
      expect(page.h2Title.getText()).toEqual('Edit Merchant');
    });

    it('allows me to add merchant location', function() {
      page.addLocationButton.click();
      expect(page.h2Title.getText()).toEqual('New Merchant Location');
    });
  });
});
