'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var merchant = Generators.merchant.newMerchant();

var merchantLocation = Generators.merchantLocation.new({merchant_id: merchant.id});

var terminal1 = Generators.terminal.new();
var terminal2 = Generators.terminal.new();

var page = requireHelper.page('merchant_location')(merchant.id, merchantLocation.id);
var specHelper = requireHelper.specHelper(page);

describe('view merchant location', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('merchant')(merchant),
      requireHelper.request('potential_merchant_primary_contacts')([]),
      requireHelper.request('merchant_location')(merchantLocation),
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

    it('shows merchant location detail', function() {
      expect(page.h2Title.getText()).toEqual('Merchant Location Details');
      expect(page.detailsHeader.getText()).toEqual(`Merchants / ${merchant.name} / ${merchantLocation.name}`);

      expect(page.storeNumber.getText()).toEqual(merchantLocation.store_number);

      var address = page.address();
      expect(address.street1.getText()).toEqual(merchantLocation.address.street1);
      expect(address.street2.getText()).toEqual(merchantLocation.address.street2);
      expect(address.city.getText()).toEqual(merchantLocation.address.city);
      expect(address.state.getText()).toEqual(merchantLocation.address.state);
      expect(address.postalCode.getText()).toEqual(merchantLocation.address.postal_code);

      expect(page.primaryPhone.getText()).toEqual(merchantLocation.phone_numbers.primary);
      expect(page.faxPhone.getText()).toEqual(merchantLocation.phone_numbers.fax);

      expect(page.primaryContactUser.full_name.getText()).toEqual(merchantLocation.primary_contact_user.full_name);

      expect(page.bankAccountName.isPresent()).toEqual(false);

      expect(page.editButton.isPresent()).toEqual(false);

      expect(page.terminalSection.isPresent()).toEqual(false);
    });
  });

  describe('as an admin user', function() {
    beforeEach(function() {
      specHelper.stubRequests([
        requireHelper.request('terminals')(merchantLocation.id, [ terminal1, terminal2 ]),
        requireHelper.request('merchants/bank_accounts')(merchant.id, [])
      ]);

      specHelper.setSystemPermissions({ can_manage_merchants: true });
    })

    it('allows me to edit the merchant location', function() {
      specHelper.get();
      page.editButton.click();
      expect(page.h2Title.getText()).toEqual('Edit Merchant Location');
    });

    it('displays bank account name and terminals', function() {
      specHelper.get();
      expect(page.bankAccountName.isPresent()).toEqual(true);

      expect(page.terminalSection.isPresent()).toEqual(true);

      var terminalEl1 = page.terminalByIndex(0);
      expect(terminalEl1.serialNumber.getText()).toEqual(terminal1.serial_number);
      expect(terminalEl1.terminalIdentifier.getText()).toEqual(terminal1.terminal_identifier);

      var terminalEl2 = page.terminalByIndex(1);
      expect(terminalEl2.serialNumber.getText()).toEqual(terminal2.serial_number);
      expect(terminalEl2.terminalIdentifier.getText()).toEqual(terminal2.terminal_identifier);
    });

    describe('bank account is verified', function() {

      it('allows me to add merchant terminal', function() {
        specHelper.get();
        page.newTerminalButton.click();
        expect(page.h2Title.getText()).toEqual('New Merchant Terminal');
      });
    })

    describe('bank account is NOT verified', function() {
      beforeEach(function() {
        merchantLocation.bank_account_verified = false;
        specHelper.get();
      });

      it('does not show add terminal button', function() {
        expect(page.newTerminalButton.isPresent()).toEqual(false);
      })

    })
  });
});
