'use strict';

var requireHelper = require('../../../../spec/support/require_helper');
var Generators = requireHelper.generators();

var funderOrg = Generators.funderOrganization.new();
var funderOffice = Generators.funderOrgOffice.new({ funder_organization_id: funderOrg.id });
var achAccount = Generators.achAccount.new();

var page = requireHelper.page('funder-organization-office-ach-account-new')(funderOffice);
var specHelper = requireHelper.specHelper(page);

var createAchAccountRequest = requireHelper.request('funder_organization_offices/ach_account/create')(funderOffice.id);

describe('add funder office ach account', function() {
  var userEl1, userEl2;

  beforeEach(function() {
    specHelper.stubRequests([
      requireHelper.request('funder_organization')(funderOrg),
      requireHelper.request('funder_organization_offices/show')(funderOffice),
      requireHelper.request('funder_organization_offices/members')(funderOffice.id),
      requireHelper.request('funder_organization_offices/ach_account/show')(funderOffice.id, achAccount),
      requireHelper.request('funder_organization_offices/bank_accounts/index')(funderOffice.id),
      createAchAccountRequest
    ]);

    specHelper.simulateNormalUser();
    specHelper.setSystemPermissions({ can_manage_funders: true });
  });

  afterEach(function() {
    specHelper.teardown();
  });

  describe('page stuff', function() {
    it('is correct', function() {
      specHelper.get();

      expect(page.h2Title.getText()).toEqual(funderOrg.name);
      expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name} / Add Responsible Individual`);

      expect(page.achAgreementText.getText()).toEqual(`In order to use the payment functionality of our application, you must open a "White Label" account provided by Dwolla, Inc. ("Dwolla") and you must accept the Dwolla Terms of Service and Privacy Policy. Any funds held in the Dwolla account are held by Dwolla's financial institution partners as set out in the Dwolla Terms of Service. You authorize BuildPay to share your identity and account data with Dwolla for the purposes of opening and supporting your Dwolla account, and you are responsible for the accuracy and completeness of that data. You understand that you will access and manage your Dwolla account through the BuildPay application, and Dwolla account notifications will be sent by BuildPay, not Dwolla. BuildPay will provide customer support for your Dwolla account activity, and can be reached at 1.844.303.5123.`)
      expect(page.achAgreementLabel.getText()).toEqual(`I agree`)
    });
  });

  describe('successful response', function() {
    it('can create ach account', function() {
      specHelper.get();

      page.firstName.sendKeys('some');
      page.lastName.sendKeys('user');
      page.email.sendKeys('user@somesite.com');

      expect(page.submitButton.isEnabled()).toEqual(false);
      page.achAgreementCheckbox.click();
      expect(page.submitButton.isEnabled()).toEqual(true);

      page.submitButton.click();

      expect(page.h2Title.getText()).toEqual(funderOrg.name);
      expect(page.detailsHeader.getText()).toEqual(`Offices / ${funderOffice.name}`);
      expect(page.toastMessage.getText()).toEqual('Office responsible individual added.');
    });
  });
});
