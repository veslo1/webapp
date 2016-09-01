'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var funderOrg = Generators.funderOrganization.new();
var funderOffice = Generators.funderOrgOffice.new({ funder_organization_id: funderOrg.id });

var bankAccountId = 5;

var page = requireHelper.page('funder-organization-office-bank-account-verify')(funderOrg.id, funderOffice.id, bankAccountId);
var specHelper = requireHelper.specHelper(page);

describe('verifying funder office bank account', function() {
  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('funder_organization')(funderOrg),
      requireHelper.request('funder_organization_offices/show')(funderOffice),
      requireHelper.request('funder_organization_offices/members')(funderOffice.id),
      requireHelper.request('funder_organization_offices/potential_primary_contacts')(funderOffice.id),
      requireHelper.request('funder_organization_offices/ach_account/show')(funderOffice.id),
      requireHelper.request('funder_organization_offices/bank_accounts/index')(funderOffice.id),
      requireHelper.request('funder_organization_offices/bank_accounts/verifications')(funderOffice.id, bankAccountId)
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
      expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name } / Verify Bank Account`);
    });

    it('shows bank accounts', function() {
      page.depositAmount1.sendKeys('0.01');
      page.depositAmount2.sendKeys('0.05')

      page.submitButton.click();

      expect(page.toastMessage.getText()).toEqual('Bank account verified.');
      expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name }`);
    });
  });
});
